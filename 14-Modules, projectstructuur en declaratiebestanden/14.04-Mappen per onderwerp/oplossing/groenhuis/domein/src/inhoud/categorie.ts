// Het Groenhuis — een categorie: een soort inhoud, soms in een andere categorie
// Hoofdstuk 10, klassikale oefening 10.1

import type { CategorieGegevens } from "./inhoud.ts";
import { Inhoud } from "./inhoudsklasse.ts";
import { Slug } from "../waarden/slug.ts";

export class Categorie extends Inhoud {
  naam: string;
  readonly bovenliggende?: Categorie;

  constructor(gegevens: CategorieGegevens, bovenliggende?: Categorie) {
    super(gegevens.id, Slug.van(gegevens.slug), gegevens.status);
    this.naam = gegevens.naam;
    if (bovenliggende !== undefined) {
      this.bovenliggende = bovenliggende;
    }
  }

  override get weergavenaam(): string {
    return this.bovenliggende === undefined ? this.naam : `${this.bovenliggende.weergavenaam} › ${this.naam}`;
  }

  protected override redenOmNietTePubliceren(): string | undefined {
    if (this.bovenliggende !== undefined && !this.bovenliggende.isZichtbaar) {
      return `de bovenliggende categorie ${this.bovenliggende.naam} is niet gepubliceerd`;
    }
    return undefined;
  }
}
