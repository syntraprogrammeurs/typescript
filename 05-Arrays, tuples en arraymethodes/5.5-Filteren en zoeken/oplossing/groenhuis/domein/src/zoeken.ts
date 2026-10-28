// 5.5 Filteren en zoeken — Het Groenhuis, deel I
//
// Tijd om dit te gebruiken voor Het Groenhuis. Maak src/zoeken.ts.
//
// Opbouw van dit bestand:
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// export function opVoorraad(producten: Product[]): Product[]
// export function inCategorie(producten: Product[], categorieId: string): Product[]
// export function metTag(producten: Product[], tag: string): Product[]
// export function zoekOpSlug(producten: Product[], slug: string): Product | undefined

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
