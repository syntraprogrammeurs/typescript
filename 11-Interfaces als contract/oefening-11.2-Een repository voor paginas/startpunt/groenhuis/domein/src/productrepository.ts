// Het Groenhuis — waar de producten bewaard worden, zonder te zeggen hoe

import type { Product } from "./product.ts";

/** Het contract: wat elke plaats om producten te bewaren moet kunnen. */
export interface ProductRepository {
  alle(): Product[];
  zoek(id: string): Product | undefined;
  zoekOpSlug(slug: string): Product | undefined;
  bewaar(product: Product): void;
  verwijder(id: string): boolean;
}

/** Een uitwerking die alles in het geheugen houdt: weg als het programma stopt. */
export class GeheugenProductRepository implements ProductRepository {
  #producten = new Map<string, Product>();

  constructor(beginwaarden: Product[] = []) {
    for (const product of beginwaarden) {
      this.bewaar(product);
    }
  }

  alle(): Product[] {
    return [...this.#producten.values()];
  }

  zoek(id: string): Product | undefined {
    return this.#producten.get(id);
  }

  zoekOpSlug(slug: string): Product | undefined {
    return this.alle().find((product) => product.slug.toString() === slug);
  }

  bewaar(product: Product): void {
    this.#producten.set(product.id, product);
  }

  verwijder(id: string): boolean {
    return this.#producten.delete(id);
  }
}
