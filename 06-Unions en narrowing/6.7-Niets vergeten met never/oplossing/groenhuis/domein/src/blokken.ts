// 6.7 Niets vergeten met never — Het Groenhuis, deel I
//
// Volgende maand wil de redactie een nieuw soort blok: een citaat van een klant. Je voegt het toe
// aan de union. Maar blokAlsTekst weet er niets van. Wat gebeurt er?
//
// Opbouw van dit bestand:
// import Pagina uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// import onmogelijk uit "./onmogelijk.ts"
// export interface Tekstblok — de vorm van een object met 2 leden:
//     soort: "tekst"
//     tekst: string
// export interface Afbeeldingsblok — de vorm van een object met 4 leden:
//     soort: "afbeelding"
//     url: string
//     alt: string
//     bijschrift?: string
// export interface Knopblok — de vorm van een object met 3 leden:
//     soort: "knop"
//     label: string
//     link: string
// export interface Productlijstblok — de vorm van een object met 3 leden:
//     soort: "productlijst"
//     categorieId: string
//     maximum: number
// export type Blok = een union, de waarde is een van: Tekstblok | Afbeeldingsblok | Knopblok |
//     Productlijstblok
// export function blokAlsTekst(blok: Blok): string
// export function paginaAlsTekst(pagina: Pagina): string

// Het Groenhuis — de blokken waaruit een pagina van het CMS bestaat

import type { Pagina } from "./inhoud.ts";
import { onmogelijk } from "./onmogelijk.ts";

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

export function paginaAlsTekst(pagina: Pagina): string {
  const regels = pagina.blokken.map(blokAlsTekst);
  return [pagina.titel.toUpperCase(), "", ...regels].join("\n");
}
