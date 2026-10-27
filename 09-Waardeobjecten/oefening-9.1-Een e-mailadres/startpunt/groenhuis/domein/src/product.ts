// Het Groenhuis — een product, met de regels die erbij horen

import { Geld } from "./geld.ts";
import type { Afmetingen, Inhoudsstatus, ProductGegevens } from "./inhoud.ts";
import { Slug } from "./slug.ts";

export class Product {
  readonly id: string;
  naam: string;
  beschrijving?: string;
  btwPercentage: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
  #slug: Slug;
  #prijs: Geld;
  #voorraad: number;
  #status: Inhoudsstatus;

  static readonly STANDAARD_BTW = 21;

  /** Een nieuw product, nog als concept, zonder voorraad. */
  static nieuw(naam: string, prijs: Geld, categorieId: string): Product {
    return new Product({
      id: crypto.randomUUID(),
      slug: Slug.uitNaam(naam).toString(),
      status: "concept",
      naam,
      prijsInCent: prijs.inCent,
      btwPercentage: Product.STANDAARD_BTW,
      voorraad: 0,
      categorieId,
      tags: [],
    });
  }

  constructor(gegevens: ProductGegevens) {
    this.id = gegevens.id;
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
    this.#slug = Slug.van(gegevens.slug);
    this.#prijs = Geld.vanCent(gegevens.prijsInCent);
    this.#voorraad = gegevens.voorraad;
    this.#status = gegevens.status;
  }

  get slug(): Slug {
    return this.#slug;
  }

  get prijs(): Geld {
    return this.#prijs;
  }

  get prijsInclBtw(): Geld {
    return this.#prijs.metBtw(this.btwPercentage);
  }

  wijzigPrijs(nieuwePrijs: Geld): void {
    this.#prijs = nieuwePrijs;
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
    if (this.#prijs.equals(Geld.NUL)) {
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

  /** Wat JSON.stringify bewaart: dezelfde vorm als in producten.json. */
  toJSON(): ProductGegevens {
    return {
      id: this.id,
      slug: this.#slug.toString(),
      status: this.#status,
      naam: this.naam,
      ...(this.beschrijving === undefined ? {} : { beschrijving: this.beschrijving }),
      prijsInCent: this.#prijs.inCent,
      btwPercentage: this.btwPercentage,
      voorraad: this.#voorraad,
      categorieId: this.categorieId,
      tags: [...this.tags],
      ...(this.afmetingen === undefined ? {} : { afmetingen: { ...this.afmetingen } }),
    };
  }
}
