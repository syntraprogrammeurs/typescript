// Het Groenhuis — de regels van het CMS voor producten, op één plaats

import { kies } from "../hulp/kies.ts";
import { SAMENVATTING, type NieuwProduct, type ProductSamenvatting, type ProductWijziging } from "../inhoud/inhoud.ts";
import { Product } from "../inhoud/product.ts";
import type { Repository } from "../opslag/repository.ts";
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
  async nieuw(gegevens: NieuwProduct): Promise<Product> {
    const product = Product.nieuw(gegevens, this.#maakId());
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

  /** Wijzigt een product. De slug blijft dezelfde, ook als de naam verandert: zo blijft elke link werken. */
  async wijzig(slug: string, wijziging: ProductWijziging): Promise<Product> {
    const product = await this.metSlug(slug);
    product.wijzig(wijziging);
    await this.#opslag.bewaar(product);
    return product;
  }

  async publiceer(slug: string): Promise<Product> {
    const product = await this.metSlug(slug);
    product.publiceer();
    await this.#opslag.bewaar(product);
    return product;
  }

  /** Alle producten op naam, met per product alleen wat een overzicht nodig heeft. */
  async samenvattingen(): Promise<ProductSamenvatting[]> {
    const producten = await this.#opslag.alle();
    return producten
      .toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"))
      .map((product) => kies(product.toJSON(), SAMENVATTING));
  }

  /** Hetzelfde overzicht, als tekst voor de terminal. */
  async overzicht(): Promise<string[]> {
    const samenvattingen = await this.samenvattingen();
    return samenvattingen.map((s) => `${s.naam.padEnd(26)}${s.status.padEnd(14)}${String(s.voorraad).padStart(4)} stuks`);
  }
}
