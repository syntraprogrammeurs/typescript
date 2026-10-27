// Het Groenhuis — dezelfde repository, maar alles blijft bewaard in een JSON-bestand

import { writeFileSync } from "node:fs";
import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";
import type { ProductRepository } from "./productrepository.ts";

export class BestandProductRepository implements ProductRepository {
  readonly #pad: URL;
  #producten: Product[];

  constructor(pad: URL) {
    this.#pad = pad;
    this.#producten = laadProducten(pad).map((gegevens) => new Product(gegevens));
  }

  alle(): Product[] {
    return [...this.#producten];
  }

  zoek(id: string): Product | undefined {
    return this.#producten.find((product) => product.id === id);
  }

  zoekOpSlug(slug: string): Product | undefined {
    return this.#producten.find((product) => product.slug.toString() === slug);
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
