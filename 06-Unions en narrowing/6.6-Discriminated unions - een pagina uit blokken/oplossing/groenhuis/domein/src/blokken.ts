// 6.6 Discriminated unions: een pagina uit blokken — Het Groenhuis, deel I
//
// Een pagina van het CMS is geen lange tekst. Ze bestaat uit blokken: een stuk tekst, een
// afbeelding, een knop, een lijst producten. Elk soort blok heeft andere gegevens. Een afbeelding
// heeft een url en een alt, een knop een label en een link.
//
// Opbouw van dit bestand:
// import Pagina uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
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
  }
}

export function paginaAlsTekst(pagina: Pagina): string {
  const regels = pagina.blokken.map(blokAlsTekst);
  return [pagina.titel.toUpperCase(), "", ...regels].join("\n");
}
