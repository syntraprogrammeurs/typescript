// Het Groenhuis — de regels van het CMS voor producten, op één plaats

import { Product } from "../inhoud/product.ts";
import type { Repository } from "../opslag/repository.ts";
import type { Geld } from "../waarden/geld.ts";
import { willekeurigId, type MaakId } from "./ids.ts";
import { controleerVrijeSlug, vindOpSlug } from "./slugs.ts";

export class ProductService {
  readonly #opslag: Repository<Product>;
  readonly #maakId: MaakId;

  constructor(opslag: Repository<Product>, maakId: MaakId = willekeurigId) {
    this.#opslag = opslag;
    this.#maakId = maakId;
  }

  /** Een nieuw product, als concept. Twee producten met dezelfde slug kan niet. */
  async nieuw(naam: string, prijs: Geld, categorieId: string): Promise<Product> {
    const product = Product.nieuw(naam, prijs, categorieId, this.#maakId());
    await controleerVrijeSlug(this.#opslag, product.slug);
    await this.#opslag.bewaar(product);
    return product;
  }

  async metSlug(slug: string): Promise<Product> {
    return vindOpSlug(this.#opslag, "product", slug);
  }

  /** Er komen stuks bij (of, met een negatief aantal, er gaan stuks af). */
  async levering(slug: string, aantal: number): Promise<Product> {
    const product = await this.metSlug(slug);
    product.pasVoorraadAan(aantal);
    await this.#opslag.bewaar(product);
    return product;
  }

  async publiceer(slug: string): Promise<Product> {
    const product = await this.metSlug(slug);
    product.publiceer();
    await this.#opslag.bewaar(product);
    return product;
  }

  async overzicht(): Promise<string[]> {
    const producten = await this.#opslag.alle();
    return producten
      .toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"))
      .map((product) => `${product.naam.padEnd(26)}${product.status.padEnd(14)}${String(product.voorraad).padStart(4)} stuks`);
  }
}
