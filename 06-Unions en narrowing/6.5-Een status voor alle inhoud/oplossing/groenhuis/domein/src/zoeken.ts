// 6.5 Een status voor alle inhoud — Het Groenhuis, deel I
//
// Een product komt niet meteen in de winkel. De redacteur maakt het als concept, de beheerder
// publiceert het, en wat niet meer verkocht wordt, wordt gearchiveerd: uit de winkel, maar niet
// weg, want oude bestellingen verwijzen ernaar. Voeg de status toe aan inhoud.ts.
//
// Opbouw van dit bestand:
// import Inhoud, Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// import metBtw uit "./prijs.ts"
// export function isZichtbaar(inhoud: Inhoud): boolean — Mag een klant dit zien? Gebruik:
//     producten.filter(isZichtbaar)
// export function opVoorraad(producten: readonly Product[]): Product[]
// export function inCategorie(producten: readonly Product[], categorieId: string): Product[]
// export function metTag(producten: readonly Product[], tag: string): Product[]
// export function zoekOpSlug(producten: readonly Product[], slug: string): Product | undefined
// export function voorraadwaarde(producten: readonly Product[]): number
// export function aantalPerCategorie(producten: readonly Product[]): { [categorieId: string]:
//     number }
// export function goedkoopsteEerst(producten: readonly Product[]): Product[]
// export function opNaam(producten: readonly Product[]): Product[]
// export function prijsbereik(producten: readonly Product[]): [laagste: number, hoogste: number] |
//     undefined

// Het Groenhuis — de catalogus doorzoeken

import type { Inhoud, Product } from "./inhoud.ts";
import { metBtw } from "./prijs.ts";

/** Mag een klant dit zien? Gebruik: producten.filter(isZichtbaar) */
export function isZichtbaar(inhoud: Inhoud): boolean {
  return inhoud.status === "gepubliceerd";
}

export function opVoorraad(producten: readonly Product[]): Product[] {
  return producten.filter((product) => product.voorraad > 0);
}

export function inCategorie(producten: readonly Product[], categorieId: string): Product[] {
  return producten.filter((product) => product.categorieId === categorieId);
}

export function metTag(producten: readonly Product[], tag: string): Product[] {
  return producten.filter((product) => product.tags.includes(tag));
}

export function zoekOpSlug(producten: readonly Product[], slug: string): Product | undefined {
  return producten.find((product) => product.slug === slug);
}

export function voorraadwaarde(producten: readonly Product[]): number {
  return producten.reduce((totaal, product) => totaal + product.prijsInCent * product.voorraad, 0);
}

export function aantalPerCategorie(producten: readonly Product[]): { [categorieId: string]: number } {
  return producten.reduce<{ [categorieId: string]: number }>((telling, product) => {
    const huidig = telling[product.categorieId];
    telling[product.categorieId] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(producten: readonly Product[]): Product[] {
  // de klant vergelijkt prijzen met btw, en het btw-tarief verschilt per product
  const prijs = (product: Product) => metBtw(product.prijsInCent, product.btwPercentage);
  return producten.toSorted((a, b) => prijs(a) - prijs(b));
}

export function opNaam(producten: readonly Product[]): Product[] {
  return producten.toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"));
}

export function prijsbereik(producten: readonly Product[]): [laagste: number, hoogste: number] | undefined {
  if (producten.length === 0) {
    return undefined;
  }
  const prijzen = producten.map((product) => product.prijsInCent);
  return [Math.min(...prijzen), Math.max(...prijzen)];
}
