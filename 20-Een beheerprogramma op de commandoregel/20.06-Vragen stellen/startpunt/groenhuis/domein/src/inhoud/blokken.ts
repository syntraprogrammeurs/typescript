// Het Groenhuis — de blokken waaruit een pagina van het CMS bestaat

import type { PaginaGegevens } from "./inhoud.ts";
import { onmogelijk } from "../hulp/onmogelijk.ts";

export interface Tekstblok {
  soort: "tekst";
  tekst: string;
}

export interface Afbeeldingsblok {
  soort: "afbeelding";
  url: string;
  alt: string;
  bijschrift?: string;
}

export interface Knopblok {
  soort: "knop";
  label: string;
  link: string;
}

export interface Productlijstblok {
  soort: "productlijst";
  categorieId: string;
  maximum: number;
}

export type Blok = Tekstblok | Afbeeldingsblok | Knopblok | Productlijstblok;

/** De soorten blokken: "tekst" | "afbeelding" | "knop" | "productlijst". */
export type Bloksoort = Blok["soort"];

/** Het blok van één soort: BlokVan<"knop"> is een Knopblok. */
export type BlokVan<S extends Bloksoort> = Extract<Blok, { soort: S }>;

/** De blokken van één soort, met het type van die soort. */
export function blokkenVan<S extends Bloksoort>(blokken: readonly Blok[], soort: S): BlokVan<S>[] {
  return blokken.filter((blok): blok is BlokVan<S> => blok.soort === soort);
}

/** Hoeveel blokken er zijn van elke soort, ook van de soorten die niet voorkomen. */
export function telBlokken(blokken: readonly Blok[]): Record<Bloksoort, number> {
  const telling: Record<Bloksoort, number> = { tekst: 0, afbeelding: 0, knop: 0, productlijst: 0 };
  for (const blok of blokken) {
    telling[blok.soort]++;
  }
  return telling;
}

export function blokAlsTekst(blok: Blok): string {
  switch (blok.soort) {
    case "tekst":
      return blok.tekst;
    case "afbeelding":
      return blok.bijschrift === undefined ? `[afbeelding: ${blok.alt}]` : `[afbeelding: ${blok.alt}] ${blok.bijschrift}`;
    case "knop":
      return `[ ${blok.label} → ${blok.link} ]`;
    case "productlijst":
      return `[de eerste ${blok.maximum} producten uit categorie ${blok.categorieId}]`;
    default:
      return onmogelijk(blok);
  }
}

export function paginaAlsTekst(pagina: PaginaGegevens): string {
  const regels = pagina.blokken.map(blokAlsTekst);
  return [pagina.titel.toUpperCase(), "", ...regels].join("\n");
}
