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

export interface CategorieGegevens extends Inhoud {
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

/** Wat het domein zelf invult bij een nieuw product. */
type ZelfIngevuld = "id" | "slug" | "status" | "voorraad";

/** Wat je opgeeft voor een nieuw product. Voor de btw en de tags is er een standaard. */
export type NieuwProduct = Omit<ProductGegevens, ZelfIngevuld | "btwPercentage" | "tags">
  & Partial<Pick<ProductGegevens, "btwPercentage" | "tags">>;

/** Wat je achteraf aan een product mag wijzigen: elk veld apart, en geen enkel veld is verplicht. */
export type ProductWijziging = Partial<Omit<ProductGegevens, ZelfIngevuld>>;

export interface PaginaGegevens extends Inhoud {
  titel: string;
  blokken: Blok[];
  metadata: { [sleutel: string]: string };
}
