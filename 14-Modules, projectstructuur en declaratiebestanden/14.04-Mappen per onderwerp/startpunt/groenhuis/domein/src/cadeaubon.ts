// Het Groenhuis — een cadeaubon: verkoopbaar, maar geen inhoud van het CMS
// Hoofdstuk 11, klassikale oefening 11.1

import type { Verkoopbaar } from "./contracten.ts";
import { Geld } from "./geld.ts";

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
