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
