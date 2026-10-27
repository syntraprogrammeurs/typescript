// Het Groenhuis — taken van het beheer, die alleen het contract kennen

import { Geld } from "./geld.ts";
import { Product } from "./product.ts";
import type { Repository } from "./repository.ts";

export function nieuwProduct(opslag: Repository<Product>, naam: string, prijs: Geld, categorieId: string): Product {
  const product = Product.nieuw(naam, prijs, categorieId);
  opslag.bewaar(product);
  return product;
}

export function levering(opslag: Repository<Product>, slug: string, aantal: number): void {
  const product = opslag.zoekEerste((kandidaat) => kandidaat.slug.toString() === slug);
  if (product === undefined) {
    throw new Error(`Geen product met slug ${slug}`);
  }
  product.pasVoorraadAan(aantal);
  opslag.bewaar(product);
}

export function overzicht(opslag: Repository<Product>): string[] {
  return opslag
    .alle()
    .toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"))
    .map((product) => `${product.naam.padEnd(26)}${product.status.padEnd(14)}${String(product.voorraad).padStart(4)} stuks`);
}
