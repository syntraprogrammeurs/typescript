// Het Groenhuis — waar iets bewaard wordt, voor elk soort: producten, pagina's, categorieën, klanten

/** Het contract voor elke opslag. T is wat bewaard wordt, Id het type van zijn sleutel. */
export interface Repository<T, Id = string> {
  alle(): T[];
  zoek(id: Id): T | undefined;
  zoekEerste(voorwaarde: (item: T) => boolean): T | undefined;
  bewaar(item: T): void;
  verwijder(id: Id): boolean;
}

/** Alles wat een id heeft, kan in het geheugen bewaard worden. */
export class GeheugenRepository<T extends { readonly id: string }> implements Repository<T> {
  #items = new Map<string, T>();

  constructor(beginwaarden: readonly T[] = []) {
    for (const item of beginwaarden) {
      this.bewaar(item);
    }
  }

  alle(): T[] {
    return [...this.#items.values()];
  }

  zoek(id: string): T | undefined {
    return this.#items.get(id);
  }

  zoekEerste(voorwaarde: (item: T) => boolean): T | undefined {
    return this.alle().find(voorwaarde);
  }

  bewaar(item: T): void {
    this.#items.set(item.id, item);
  }

  verwijder(id: string): boolean {
    return this.#items.delete(id);
  }
}
