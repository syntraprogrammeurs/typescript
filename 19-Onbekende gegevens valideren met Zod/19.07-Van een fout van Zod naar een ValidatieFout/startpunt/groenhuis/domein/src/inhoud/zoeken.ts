// Het Groenhuis — de catalogus doorzoeken

import type { Inhoud, Inhoudsstatus, ProductGegevens } from "./inhoud.ts";
import { metBtw } from "../waarden/prijs.ts";

/** Mag een klant dit zien? Gebruik: producten.filter(isZichtbaar) */
export function isZichtbaar(inhoud: Inhoud): boolean {
  return inhoud.status === "gepubliceerd";
}

export function opVoorraad(producten: readonly ProductGegevens[]): ProductGegevens[] {
  return producten.filter((product) => product.voorraad > 0);
}

export function inCategorie(producten: readonly ProductGegevens[], categorieId: string): ProductGegevens[] {
  return producten.filter((product) => product.categorieId === categorieId);
}

export function metTag(producten: readonly ProductGegevens[], tag: string): ProductGegevens[] {
  return producten.filter((product) => product.tags.includes(tag));
}

export function zoekOpSlug(producten: readonly ProductGegevens[], slug: string): ProductGegevens | undefined {
  return producten.find((product) => product.slug === slug);
}

export function voorraadwaarde(producten: readonly ProductGegevens[]): number {
  return producten.reduce((totaal, product) => totaal + product.prijsInCent * product.voorraad, 0);
}

export function aantalPerCategorie(producten: readonly ProductGegevens[]): { [categorieId: string]: number } {
  return producten.reduce<{ [categorieId: string]: number }>((telling, product) => {
    const huidig = telling[product.categorieId];
    telling[product.categorieId] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(producten: readonly ProductGegevens[]): ProductGegevens[] {
  // de klant vergelijkt prijzen met btw, en het btw-tarief verschilt per product
  const prijs = (product: ProductGegevens) => metBtw(product.prijsInCent, product.btwPercentage);
  return producten.toSorted((a, b) => prijs(a) - prijs(b));
}

export function opNaam(producten: readonly ProductGegevens[]): ProductGegevens[] {
  return producten.toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"));
}

export function prijsbereik(producten: readonly ProductGegevens[]): [laagste: number, hoogste: number] | undefined {
  if (producten.length === 0) {
    return undefined;
  }
  const prijzen = producten.map((product) => product.prijsInCent);
  return [Math.min(...prijzen), Math.max(...prijzen)];
}

export interface Zoekfilter {
  tekst?: string;
  status?: Inhoudsstatus;
  maxPrijsInCent?: number;
  alleenOpVoorraad?: boolean;
}

export function zoek(producten: readonly ProductGegevens[], filter: Zoekfilter): ProductGegevens[] {
  const tekst = filter.tekst?.trim().toLowerCase() ?? "";
  const alleenOpVoorraad = filter.alleenOpVoorraad ?? false;

  return producten.filter((product) => {
    if (tekst !== "" && !product.naam.toLowerCase().includes(tekst) && !product.tags.includes(tekst)) {
      return false;
    }
    if (filter.status !== undefined && product.status !== filter.status) {
      return false;
    }
    if (filter.maxPrijsInCent !== undefined && product.prijsInCent > filter.maxPrijsInCent) {
      return false;
    }
    if (alleenOpVoorraad && product.voorraad === 0) {
      return false;
    }
    return true;
  });
}
