// Op Wielen — een register voor alles met een id: het contract, en een uitwerking in het geheugen

/** Elke methode geeft een Promise: een bestand, een databank of een server antwoordt niet meteen. */
export interface Register<T extends { readonly id: string }> {
  alle(): Promise<T[]>;
  zoek(id: string): Promise<T | undefined>;
  waar(voorwaarde: (item: T) => boolean): Promise<T[]>;
  bewaar(...items: T[]): Promise<void>;
  verwijder(id: string): Promise<boolean>;
}

export class GeheugenRegister<T extends { readonly id: string }> implements Register<T> {
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

  async waar(voorwaarde: (item: T) => boolean): Promise<T[]> {
    return [...this.#items.values()].filter(voorwaarde);
  }

  async bewaar(...items: T[]): Promise<void> {
    for (const item of items) {
      this.#items.set(item.id, item);
    }
  }

  async verwijder(id: string): Promise<boolean> {
    return this.#items.delete(id);
  }
}

export function groepeerPer<T, S>(lijst: readonly T[], sleutel: (item: T) => S): Map<S, T[]> {
  const groepen = new Map<S, T[]>();
  for (const item of lijst) {
    const s = sleutel(item);
    groepen.set(s, [...(groepen.get(s) ?? []), item]);
  }
  return groepen;
}
