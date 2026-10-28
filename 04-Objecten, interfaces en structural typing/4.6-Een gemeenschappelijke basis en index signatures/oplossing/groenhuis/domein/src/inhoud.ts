// 4.6 Een gemeenschappelijke basis en index signatures — Het Groenhuis, deel I
//
// Zet de basis in inhoud.ts, en voeg de vorm van een pagina toe.
//
// Opbouw van dit bestand:
// export interface Inhoud — Wat alle inhoud van het CMS gemeen heeft. — de vorm van een object met
//     2 leden:
//     readonly id: string
//     slug: string
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
//     tekst: string
//     metadata: { [sleutel: string]: string }

// Het Groenhuis — de vorm van de inhoud van het CMS

/** Wat alle inhoud van het CMS gemeen heeft. */
export interface Inhoud {
  readonly id: string;
  slug: string;
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
  tekst: string;
  metadata: { [sleutel: string]: string };
}
