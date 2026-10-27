// Het Groenhuis — taken van het beheer, die alleen het contract kennen

import { NietGevondenFout } from "../fouten/fouten.ts";
import { Geld } from "../waarden/geld.ts";
import { Product } from "./product.ts";
import type { Repository } from "../opslag/repository.ts";

export async function nieuwProduct(opslag: Repository<Product>, naam: string, prijs: Geld, categorieId: string): Promise<Product> {
  const product = Product.nieuw(naam, prijs, categorieId);
  await opslag.bewaar(product);
  return product;
}

export async function levering(opslag: Repository<Product>, slug: string, aantal: number): Promise<void> {
  const product = await opslag.zoekEerste((kandidaat) => kandidaat.slug.toString() === slug);
  if (product === undefined) {
    throw new NietGevondenFout("product", slug);
  }
  product.pasVoorraadAan(aantal);
  await opslag.bewaar(product);
}

export async function overzicht(opslag: Repository<Product>): Promise<string[]> {
  const producten = await opslag.alle();
  return producten
    .toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"))
    .map((product) => `${product.naam.padEnd(26)}${product.status.padEnd(14)}${String(product.voorraad).padStart(4)} stuks`);
}
