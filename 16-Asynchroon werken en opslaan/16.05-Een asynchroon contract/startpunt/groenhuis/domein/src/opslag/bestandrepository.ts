// Het Groenhuis — dezelfde repository, maar alles blijft bewaard in een JSON-bestand

import { writeFileSync } from "node:fs";
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

  alle(): Product[] {
    return [...this.#producten];
  }

  zoek(id: string): Product | undefined {
    return this.#producten.find((product) => product.id === id);
  }

  zoekEerste(voorwaarde: (product: Product) => boolean): Product | undefined {
    return this.#producten.find(voorwaarde);
  }

  bewaar(product: Product): void {
    this.#producten = [...this.#producten.filter((bestaand) => bestaand.id !== product.id), product];
    this.#schrijf();
  }

  verwijder(id: string): boolean {
    const aantal = this.#producten.length;
    this.#producten = this.#producten.filter((product) => product.id !== id);
    if (this.#producten.length === aantal) {
      return false;
    }
    this.#schrijf();
    return true;
  }

  #schrijf(): void {
    writeFileSync(this.#pad, JSON.stringify(this.#producten, null, 2) + "\n", "utf8");
  }
}
