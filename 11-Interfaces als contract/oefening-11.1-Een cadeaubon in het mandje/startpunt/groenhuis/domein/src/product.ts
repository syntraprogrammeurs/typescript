// Het Groenhuis — een product: een soort inhoud, met een prijs en een voorraad

import type { Verkoopbaar } from "./contracten.ts";
import { Geld } from "./geld.ts";
import type { Afmetingen, ProductGegevens } from "./inhoud.ts";
import { Inhoud } from "./inhoudsklasse.ts";
import { Slug } from "./slug.ts";

export class Product extends Inhoud implements Verkoopbaar {
  naam: string;
  beschrijving?: string;
  btwPercentage: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
  #prijs: Geld;
  #voorraad: number;

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
    super(gegevens.id, Slug.van(gegevens.slug), gegevens.status);
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
    this.#prijs = Geld.vanCent(gegevens.prijsInCent);
    this.#voorraad = gegevens.voorraad;
  }

  override get weergavenaam(): string {
    return this.naam;
  }

  protected override redenOmNietTePubliceren(): string | undefined {
    return this.#prijs.equals(Geld.NUL) ? "er is nog geen prijs" : undefined;
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

  get isTeKoop(): boolean {
    return this.isZichtbaar && this.#voorraad > 0;
  }

  get beschikbaar(): number {
    return this.#voorraad;
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
      slug: this.slug.toString(),
      status: this.status,
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
