// 6.5 Een status voor alle inhoud — Het Groenhuis, deel I
//
// Een product komt niet meteen in de winkel. De redacteur maakt het als concept, de beheerder
// publiceert het, en wat niet meer verkocht wordt, wordt gearchiveerd: uit de winkel, maar niet
// weg, want oude bestellingen verwijzen ernaar. Voeg de status toe aan inhoud.ts.
//
// Opbouw van dit bestand:
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
//     tekst: string
//     metadata: { [sleutel: string]: string }

// Het Groenhuis — de vorm van de inhoud van het CMS

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
  tekst: string;
  metadata: { [sleutel: string]: string };
}
