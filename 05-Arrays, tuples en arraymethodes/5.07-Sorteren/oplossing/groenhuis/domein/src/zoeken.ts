// Het Groenhuis — de catalogus doorzoeken

import type { Product } from "./inhoud.ts";
import { metBtw } from "./prijs.ts";

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

export function voorraadwaarde(producten: Product[]): number {
  return producten.reduce((totaal, product) => totaal + product.prijsInCent * product.voorraad, 0);
}

export function aantalPerCategorie(producten: Product[]): { [categorieId: string]: number } {
  return producten.reduce<{ [categorieId: string]: number }>((telling, product) => {
    const huidig = telling[product.categorieId];
    telling[product.categorieId] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(producten: Product[]): Product[] {
  // de klant vergelijkt prijzen met btw, en het btw-tarief verschilt per product
  const prijs = (product: Product) => metBtw(product.prijsInCent, product.btwPercentage);
  return producten.toSorted((a, b) => prijs(a) - prijs(b));
}

export function opNaam(producten: Product[]): Product[] {
  return producten.toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"));
}
