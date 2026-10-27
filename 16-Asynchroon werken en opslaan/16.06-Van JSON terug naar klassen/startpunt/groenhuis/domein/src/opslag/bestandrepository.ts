// Het Groenhuis — dezelfde repository, maar alles blijft bewaard in een JSON-bestand

import { writeFile } from "node:fs/promises";
import { laadProducten } from "./laden.ts";
import { Product } from "../inhoud/product.ts";
import type { Repository } from "./repository.ts";

export class BestandProductRepository implements Repository<Product> {
  readonly #pad: URL;
  #producten: Product[];

  private constructor(pad: URL, producten: Product[]) {
    this.#pad = pad;
    this.#producten = producten;
  }

  /** Een constructor kan niet wachten: daarom leest deze statische methode eerst het bestand. */
  static async open(pad: URL): Promise<BestandProductRepository> {
    const gegevens = await laadProducten(pad);
    return new BestandProductRepository(pad, gegevens.map((element) => new Product(element)));
  }

  async alle(): Promise<Product[]> {
    return [...this.#producten];
  }

  async zoek(id: string): Promise<Product | undefined> {
    return this.#producten.find((product) => product.id === id);
  }

  async zoekEerste(voorwaarde: (product: Product) => boolean): Promise<Product | undefined> {
    return this.#producten.find(voorwaarde);
  }

  async bewaar(product: Product): Promise<void> {
    this.#producten = [...this.#producten.filter((bestaand) => bestaand.id !== product.id), product];
    await this.#schrijf();
  }

  async verwijder(id: string): Promise<boolean> {
    const aantal = this.#producten.length;
    this.#producten = this.#producten.filter((product) => product.id !== id);
    if (this.#producten.length === aantal) {
      return false;
    }
    await this.#schrijf();
    return true;
  }

  async #schrijf(): Promise<void> {
    await writeFile(this.#pad, JSON.stringify(this.#producten, null, 2) + "\n", "utf8");
  }
}
