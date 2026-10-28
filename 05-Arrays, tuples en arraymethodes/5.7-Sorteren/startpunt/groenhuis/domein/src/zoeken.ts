// Het Groenhuis — de catalogus doorzoeken

import type { Product } from "./inhoud.ts";

export function opVoorraad(producten: Product[]): Product[] {
  return producten.filter((product) => product.voorraad > 0);
}

export function inCategorie(producten: Product[], categorieId: string): Product[] {
  return producten.filter((product) => product.categorieId === categorieId);
}

export function metTag(producten: Product[], tag: string): Product[] {
  return producten.filter((product) => product.tags.includes(tag));
}

export function zoekOpSlug(producten: Product[], slug: string): Product | undefined {
  return producten.find((product) => product.slug === slug);
}
