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
