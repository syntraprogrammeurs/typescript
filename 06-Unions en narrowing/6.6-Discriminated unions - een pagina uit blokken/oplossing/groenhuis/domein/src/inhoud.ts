// 6.6 Discriminated unions: een pagina uit blokken — Het Groenhuis, deel I
//
// Een pagina van het CMS is geen lange tekst. Ze bestaat uit blokken: een stuk tekst, een
// afbeelding, een knop, een lijst producten. Elk soort blok heeft andere gegevens. Een afbeelding
// heeft een url en een alt, een knop een label en een link.
//
// Opbouw van dit bestand:
// import Blok uit "./blokken.ts" (alleen types, verdwijnt bij het wegvegen)
// export type Inhoudsstatus — Een product, categorie of pagina is eerst een concept, wordt dan
//     gepubliceerd, en later gearchiveerd. = een union, de waarde is een van: "concept" |
//     "gepubliceerd" | "gearchiveerd"
// export interface Inhoud — Wat alle inhoud van het CMS gemeen heeft. — de vorm van een object met
//     3 leden:
//     readonly id: string
//     slug: string
//     status: Inhoudsstatus
// export interface Afmetingen — de vorm van een object met 2 leden:
//     hoogteInCm: number
//     potmaatInCm: number
// export interface Categorie extends Inhoud — de vorm van een object met 2 leden:
//     naam: string
//     bovenliggendeId?: string
// export interface Product extends Inhoud — de vorm van een object met 8 leden:
//     naam: string
//     beschrijving?: string
//     prijsInCent: number
//     btwPercentage: number
//     voorraad: number
//     categorieId: string
//     tags: string[]
//     afmetingen?: Afmetingen
// export interface Pagina extends Inhoud — de vorm van een object met 3 leden:
//     titel: string
//     blokken: Blok[]
//     metadata: { [sleutel: string]: string }

// Het Groenhuis — de vorm van de inhoud van het CMS

import type { Blok } from "./blokken.ts";

/** Een product, categorie of pagina is eerst een concept, wordt dan gepubliceerd, en later gearchiveerd. */
export type Inhoudsstatus = "concept" | "gepubliceerd" | "gearchiveerd";

/** Wat alle inhoud van het CMS gemeen heeft. */
export interface Inhoud {
  readonly id: string;
  slug: string;
  status: Inhoudsstatus;
}

export interface Afmetingen {
  hoogteInCm: number;
  potmaatInCm: number;
}

export interface Categorie extends Inhoud {
  naam: string;
  bovenliggendeId?: string;
}

export interface Product extends Inhoud {
  naam: string;
  beschrijving?: string;
  prijsInCent: number;
  btwPercentage: number;
  voorraad: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
}

export interface Pagina extends Inhoud {
  titel: string;
  blokken: Blok[];
  metadata: { [sleutel: string]: string };
}
