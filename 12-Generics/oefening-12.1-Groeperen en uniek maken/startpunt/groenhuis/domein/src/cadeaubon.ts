// Het Groenhuis — een cadeaubon: verkoopbaar, maar geen inhoud van het CMS
// Hoofdstuk 11, klassikale oefening 11.1

import type { Verkoopbaar } from "./contracten.ts";
import { Geld } from "./geld.ts";
import { Product } from "./product.ts";
import { Winkelmandje } from "./winkelmandje.ts";

export class Cadeaubon implements Verkoopbaar {
  static readonly BEDRAGEN = [Geld.vanEuro("10"), Geld.vanEuro("25"), Geld.vanEuro("50")];

  readonly id: string;
  readonly prijsInclBtw: Geld;
  readonly isTeKoop = true;
  readonly beschikbaar = undefined;

  constructor(bedrag: Geld) {
    if (!Cadeaubon.BEDRAGEN.some((toegelaten) => toegelaten.equals(bedrag))) {
      throw new Error(`Een cadeaubon van ${bedrag} bestaat niet`);
    }
    this.id = `bon-${bedrag.inCent}`;
    this.prijsInclBtw = bedrag;
  }

  get weergavenaam(): string {
    return `Cadeaubon ${this.prijsInclBtw}`;
  }
}

const pot = new Product({
  id: "p06", slug: "terracotta-pot-20", status: "gepubliceerd", naam: "Terracotta pot 20 cm",
  prijsInCent: 895, btwPercentage: 21, voorraad: 40, categorieId: "c3", tags: [],
});

const mandje = new Winkelmandje();
mandje.voegToe(pot);
mandje.voegToe(new Cadeaubon(Geld.vanEuro("25")), 3);
mandje.voegToe(new Cadeaubon(Geld.vanEuro("25")));
console.log(mandje.toon());

try {
  new Cadeaubon(Geld.vanEuro("30"));
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
