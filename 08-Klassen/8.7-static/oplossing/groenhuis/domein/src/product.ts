// 8.7 static — Het Groenhuis, deel I
//
// Soms hoort iets bij de klasse zelf, en niet bij één object. Dat krijgt static.
//
// Opbouw van dit bestand:
// import Afmetingen, Inhoudsstatus, ProductGegevens uit "./inhoud.ts" (alleen types, verdwijnt bij
//     het wegvegen)
// import metBtw uit "./prijs.ts"
// export class Product — met 24 leden:
//     readonly id: string
//     slug: string
//     naam: string
//     beschrijving?: string
//     btwPercentage: number
//     categorieId: string
//     tags: string[]
//     afmetingen?: Afmetingen
//     #prijsInCent: number
//     #voorraad: number
//     #status: Inhoudsstatus
//     static readonly STANDAARD_BTW = 21
//     static nieuw(naam: string, prijsInCent: number, categorieId: string): Product — Een
//         nieuw product, nog als concept, zonder voorraad.
//     static slugVan(naam: string): string — "Terracotta pot 20 cm" wordt "terracotta-
//         pot-20-cm".
//     constructor(gegevens: ProductGegevens)
//     get prijsInCent: number
//     set prijsInCent(nieuwePrijs: number)
//     get prijsInclBtw: number
//     get voorraad: number
//     get status: Inhoudsstatus
//     get isTeKoop: boolean
//     publiceer(): void
//     archiveer(): void
//     pasVoorraadAan(verschil: number): void

// Het Groenhuis — een product, met de regels die erbij horen

import type { Afmetingen, Inhoudsstatus, ProductGegevens } from "./inhoud.ts";
import { metBtw } from "./prijs.ts";

export class Product {
  readonly id: string;
  slug: string;
  naam: string;
  beschrijving?: string;
  btwPercentage: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
  #prijsInCent: number;
  #voorraad: number;
  #status: Inhoudsstatus;

  static readonly STANDAARD_BTW = 21;

  /** Een nieuw product, nog als concept, zonder voorraad. */
  static nieuw(naam: string, prijsInCent: number, categorieId: string): Product {
    return new Product({
      id: crypto.randomUUID(),
      slug: Product.slugVan(naam),
      status: "concept",
      naam,
      prijsInCent,
      btwPercentage: Product.STANDAARD_BTW,
      voorraad: 0,
      categorieId,
      tags: [],
    });
  }

  /** "Terracotta pot 20 cm" wordt "terracotta-pot-20-cm". */
  static slugVan(naam: string): string {
    return naam
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  constructor(gegevens: ProductGegevens) {
    this.id = gegevens.id;
    this.slug = gegevens.slug;
    this.naam = gegevens.naam;
    if (gegevens.beschrijving !== undefined) {
      this.beschrijving = gegevens.beschrijving;
    }
    this.btwPercentage = gegevens.btwPercentage;
    this.categorieId = gegevens.categorieId;
    this.tags = [...gegevens.tags];
    if (gegevens.afmetingen !== undefined) {
      this.afmetingen = { ...gegevens.afmetingen };
    }
    this.#prijsInCent = gegevens.prijsInCent;
    this.#voorraad = gegevens.voorraad;
    this.#status = gegevens.status;
  }

  get prijsInCent(): number {
    return this.#prijsInCent;
  }

  set prijsInCent(nieuwePrijs: number) {
    if (!Number.isInteger(nieuwePrijs) || nieuwePrijs < 0) {
      throw new Error(`Ongeldige prijs voor ${this.naam}: ${nieuwePrijs}`);
    }
    this.#prijsInCent = nieuwePrijs;
  }

  get prijsInclBtw(): number {
    return metBtw(this.#prijsInCent, this.btwPercentage);
  }

  get voorraad(): number {
    return this.#voorraad;
  }

  get status(): Inhoudsstatus {
    return this.#status;
  }

  get isTeKoop(): boolean {
    return this.#status === "gepubliceerd" && this.#voorraad > 0;
  }

  publiceer(): void {
    if (this.#status === "gearchiveerd") {
      throw new Error(`${this.naam} is gearchiveerd en kan niet meer gepubliceerd worden`);
    }
    if (this.#prijsInCent === 0) {
      throw new Error(`${this.naam} heeft nog geen prijs`);
    }
    this.#status = "gepubliceerd";
  }

  archiveer(): void {
    this.#status = "gearchiveerd";
  }

  pasVoorraadAan(verschil: number): void {
    const nieuw = this.#voorraad + verschil;
    if (nieuw < 0) {
      throw new Error(`Niet genoeg ${this.naam}: ${this.#voorraad} in voorraad, ${-verschil} gevraagd`);
    }
    this.#voorraad = nieuw;
  }
}
