// Het Groenhuis — een product: een soort inhoud, met een prijs en een voorraad

import type { Verkoopbaar } from "./contracten.ts";
import { RegelFout } from "../fouten/fouten.ts";
import { Geld } from "../waarden/geld.ts";
import type { Afmetingen, NieuwProduct, ProductGegevens, ProductWijziging } from "./inhoud.ts";
import { Inhoud } from "./inhoudsklasse.ts";
import { NieuwProductSchema, ProductWijzigingSchema } from "../schemas/productschema.ts";
import { valideer } from "../schemas/valideer.ts";
import { Slug } from "../waarden/slug.ts";

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

  /** Een nieuw product, als concept en zonder voorraad. Zonder btw krijgt het de standaard, zonder tags geen tags. */
  static nieuw(gegevens: NieuwProduct, id: string = crypto.randomUUID()): Product {
    const geldig = valideer(NieuwProductSchema, gegevens);
    return new Product({
      btwPercentage: Product.STANDAARD_BTW,
      tags: [],
      ...geldig,
      id,
      slug: Slug.uitNaam(geldig.naam).toString(),
      status: "concept",
      voorraad: 0,
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

  /** Wijzigt de velden die in de wijziging staan. Eerst wordt alles nagekeken: bij één fout wijzigt er niets. */
  wijzig(wijziging: ProductWijziging): void {
    // ook een wijziging die TypeScript goedkeurt, kan van buiten komen: uit een formulier of een API
    const geldig = valideer(ProductWijzigingSchema, wijziging);

    // wat in de wijziging staat, wint van wat er al was
    const nieuw = { ...this.toJSON(), ...geldig };
    this.naam = nieuw.naam;
    this.btwPercentage = nieuw.btwPercentage;
    this.categorieId = nieuw.categorieId;
    this.tags = [...nieuw.tags];
    this.#prijs = Geld.vanCent(nieuw.prijsInCent);
    if (nieuw.beschrijving !== undefined) {
      this.beschrijving = nieuw.beschrijving;
    }
    if (nieuw.afmetingen !== undefined) {
      this.afmetingen = { ...nieuw.afmetingen };
    }
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
      throw new RegelFout(`Niet genoeg ${this.naam}: ${this.#voorraad} in voorraad, ${-verschil} gevraagd`);
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
