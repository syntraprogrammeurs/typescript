// Het Groenhuis — een categorie: een soort inhoud, soms in een andere categorie
// Hoofdstuk 10, klassikale oefening 10.1

import type { CategorieGegevens } from "./inhoud.ts";
import { Inhoud } from "./inhoudsklasse.ts";
import { Slug } from "./slug.ts";

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

const planten = new Categorie({ id: "c1", slug: "kamerplanten", status: "concept", naam: "Kamerplanten" });
const vetplanten = new Categorie(
  { id: "c5", slug: "vetplanten", status: "concept", naam: "Vetplanten", bovenliggendeId: "c1" },
  planten,
);

for (const stap of [() => vetplanten.publiceer(), () => planten.publiceer(), () => vetplanten.publiceer()]) {
  try {
    stap();
  } catch (fout) {
    console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}
console.log(`${vetplanten.weergavenaam}: ${vetplanten.status}`);
vetplanten.archiveer();
console.log(`${vetplanten.weergavenaam}: ${vetplanten.status}`);
