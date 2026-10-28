// 4.4 De vorm van een product — Het Groenhuis, deel I
//
// Nu de echte vorm voor Het Groenhuis. Maak src/inhoud.ts.
//
// Opbouw van dit bestand:
// export interface Afmetingen — de vorm van een object met 2 leden:
//     hoogteInCm: number
//     potmaatInCm: number
// export interface Categorie — de vorm van een object met 4 leden:
//     readonly id: string
//     naam: string
//     slug: string
//     bovenliggendeId?: string
// export interface Product — de vorm van een object met 10 leden:
//     readonly id: string
//     naam: string
//     slug: string
//     beschrijving?: string
//     prijsInCent: number
//     btwPercentage: number
//     voorraad: number
//     categorieId: string
//     tags: string[]
//     afmetingen?: Afmetingen

// Het Groenhuis — de vorm van de inhoud van het CMS

export interface Afmetingen {
  hoogteInCm: number;
  potmaatInCm: number;
}

export interface Categorie {
  readonly id: string;
  naam: string;
  slug: string;
  bovenliggendeId?: string;
}

export interface Product {
  readonly id: string;
  naam: string;
  slug: string;
  beschrijving?: string;
  prijsInCent: number;
  btwPercentage: number;
  voorraad: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
}
