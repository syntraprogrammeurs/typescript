// 8.3 Een naam vrijmaken — Het Groenhuis, deel I
//
// De klasse die je gaat schrijven, heet Product. Maar Product is al de naam van de interface in
// inhoud.ts. Die interface blijft nodig: ze beschrijft de gegevens van een product, zoals ze in
// een JSON-bestand staan. Geef ze daarom een duidelijkere naam: ProductGegevens.
//
// Opbouw van dit bestand:
// import Blok uit "./blokken.ts" (alleen types, verdwijnt bij het wegvegen)
// export type Inhoudsstatus — Een product, categorie of pagina is eerst een concept, wordt dan
//     gepubliceerd, en later gearchiveerd. = een union, de waarde is een van: "concept" |
//     "gepubliceerd" | "gearchiveerd"
// export const STATUSSEN = een lijst van 3 elementen: ["concept", "gepubliceerd", "gearchiveerd"]
//     (as const) — Dezelfde statussen, als lijst die ook bij het uitvoeren bestaat.
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
// export interface ProductGegevens extends Inhoud — de vorm van een object met 8 leden:
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

/** Dezelfde statussen, als lijst die ook bij het uitvoeren bestaat. */
export const STATUSSEN = ["concept", "gepubliceerd", "gearchiveerd"] as const;

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

export interface ProductGegevens extends Inhoud {
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
