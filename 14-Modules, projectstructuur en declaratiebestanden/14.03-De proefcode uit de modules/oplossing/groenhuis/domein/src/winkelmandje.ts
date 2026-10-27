// Het Groenhuis — het winkelmandje van een klant
// Hoofdstuk 8, klassikale oefening 8.1, met Geld uit hoofdstuk 9 en Verkoopbaar uit hoofdstuk 11

import type { Verkoopbaar } from "./contracten.ts";
import { RegelFout, VoorraadFout } from "./fouten.ts";
import { Geld } from "./geld.ts";

interface Mandregel {
  item: Verkoopbaar;
  aantal: number;
}

export class Winkelmandje {
  #regels: Mandregel[] = [];

  voegToe(item: Verkoopbaar, aantal = 1): void {
    if (!item.isTeKoop) {
      throw new RegelFout(`${item.weergavenaam} is niet te koop`);
    }
    const regel = this.#regels.find((kandidaat) => kandidaat.item.id === item.id);
    const totaal = (regel?.aantal ?? 0) + aantal;
    if (item.beschikbaar !== undefined && totaal > item.beschikbaar) {
      throw new VoorraadFout(item.weergavenaam, totaal, item.beschikbaar);
    }
    if (regel === undefined) {
      this.#regels.push({ item, aantal });
    } else {
      regel.aantal = totaal;
    }
  }

  verwijder(id: string): void {
    this.#regels = this.#regels.filter((regel) => regel.item.id !== id);
  }

  get aantalStuks(): number {
    return this.#regels.reduce((som, regel) => som + regel.aantal, 0);
  }

  get totaal(): Geld {
    return Geld.som(...this.#regels.map((regel) => regel.item.prijsInclBtw.maal(regel.aantal)));
  }

  get isLeeg(): boolean {
    return this.#regels.length === 0;
  }

  toon(): string {
    if (this.isLeeg) {
      return "Je mandje is leeg.";
    }
    const regels = this.#regels.map(
      ({ item, aantal }) => `${String(aantal).padStart(2)} x ${item.weergavenaam.padEnd(24)} ${String(item.prijsInclBtw.maal(aantal)).padStart(10)}`,
    );
    return [...regels, `${"".padEnd(29)}${String(this.totaal).padStart(10)}`].join("\n");
  }
}
