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
