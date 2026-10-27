// Het Groenhuis — waar iets bewaard wordt, voor elk soort: producten, pagina's, categorieën, klanten

/**
 * Het contract voor elke opslag. T is wat bewaard wordt, Id het type van zijn sleutel.
 * Elke methode geeft een Promise: een bestand, een databank of een server antwoordt niet meteen.
 */
export interface Repository<T, Id = string> {
  alle(): Promise<T[]>;
  zoek(id: Id): Promise<T | undefined>;
  zoekEerste(voorwaarde: (item: T) => boolean): Promise<T | undefined>;
  bewaar(item: T): Promise<void>;
  verwijder(id: Id): Promise<boolean>;
}

/** Alles wat een id heeft, kan in het geheugen bewaard worden. */
export class GeheugenRepository<T extends { readonly id: string }> implements Repository<T> {
  #items = new Map<string, T>();

  constructor(beginwaarden: readonly T[] = []) {
    for (const item of beginwaarden) {
      this.#items.set(item.id, item);
    }
  }

  async alle(): Promise<T[]> {
    return [...this.#items.values()];
  }

  async zoek(id: string): Promise<T | undefined> {
    return this.#items.get(id);
  }

  async zoekEerste(voorwaarde: (item: T) => boolean): Promise<T | undefined> {
    return [...this.#items.values()].find(voorwaarde);
  }

  async bewaar(item: T): Promise<void> {
    this.#items.set(item.id, item);
  }

  async verwijder(id: string): Promise<boolean> {
    return this.#items.delete(id);
  }
}
