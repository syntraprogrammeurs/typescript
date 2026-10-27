// Op Wielen — een register voor alles met een id: fietsen, accessoires, reservaties

export class Register<T extends { readonly id: string }> {
  #items = new Map<string, T>();

  voegToe(...items: T[]): void {
    for (const item of items) {
      this.#items.set(item.id, item);
    }
  }

  zoek(id: string): T | undefined {
    return this.#items.get(id);
  }

  alle(): T[] {
    return [...this.#items.values()];
  }

  waar(voorwaarde: (item: T) => boolean): T[] {
    return this.alle().filter(voorwaarde);
  }

  verwijder(id: string): boolean {
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
