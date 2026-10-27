// Op Wielen — een register dat alles bewaart in een JSON-bestand

import { readFile, writeFile } from "node:fs/promises";
import { BestandFout } from "../fouten/fouten.ts";
import type { Register } from "./register.ts";

/** Maakt van één element uit het bestand weer een echt object, of gooit een fout. */
export type Hydrateer<T> = (gegevens: unknown, plaats: number) => T;

export class BestandRegister<T extends { readonly id: string }> implements Register<T> {
  readonly #pad: URL;
  readonly #items: Map<string, T>;

  private constructor(pad: URL, items: T[]) {
    this.#pad = pad;
    this.#items = new Map(items.map((item) => [item.id, item]));
  }

  /** Leest het bestand en maakt van elk element een T. Een constructor kan niet wachten, deze methode wel. */
  static async open<T extends { readonly id: string }>(pad: URL, maak: Hydrateer<T>): Promise<BestandRegister<T>> {
    const gegevens: unknown = JSON.parse(await readFile(pad, "utf8"));
    if (!Array.isArray(gegevens)) {
      throw new BestandFout("Het bestand bevat geen lijst");
    }
    const lijst: unknown[] = gegevens;
    return new BestandRegister(pad, lijst.map(maak));
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
    await this.#schrijf();
  }

  async verwijder(id: string): Promise<boolean> {
    if (!this.#items.delete(id)) {
      return false;
    }
    await this.#schrijf();
    return true;
  }

  /** JSON.stringify gebruikt de toJSON van elk object, zoals die van Reservatie. */
  async #schrijf(): Promise<void> {
    await writeFile(this.#pad, JSON.stringify([...this.#items.values()], null, 2) + "\n", "utf8");
  }
}
