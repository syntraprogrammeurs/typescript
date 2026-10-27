// Het Groenhuis — een repository die alles bewaart in een JSON-bestand, voor elk soort

import { writeFile } from "node:fs/promises";
import { leesLijst } from "./laden.ts";
import type { Repository } from "./repository.ts";

/** Maakt van één element uit het bestand weer een echt object, of gooit een fout. */
export type Hydrateer<T> = (gegevens: unknown, plaats: number) => T;

export class BestandRepository<T extends { readonly id: string }> implements Repository<T> {
  readonly #pad: URL;
  #items: Map<string, T>;

  private constructor(pad: URL, items: T[]) {
    this.#pad = pad;
    this.#items = new Map(items.map((item) => [item.id, item]));
  }

  /** Leest het bestand en maakt van elk element een T. Een constructor kan niet wachten, deze methode wel. */
  static async open<T extends { readonly id: string }>(pad: URL, maak: Hydrateer<T>): Promise<BestandRepository<T>> {
    const lijst = await leesLijst(pad);
    return new BestandRepository(pad, lijst.map(maak));
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
    await this.#schrijf();
  }

  async verwijder(id: string): Promise<boolean> {
    if (!this.#items.delete(id)) {
      return false;
    }
    await this.#schrijf();
    return true;
  }

  /** JSON.stringify gebruikt de toJSON van elk object, zoals die van Product. */
  async #schrijf(): Promise<void> {
    await writeFile(this.#pad, JSON.stringify([...this.#items.values()], null, 2) + "\n", "utf8");
  }
}
