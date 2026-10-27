// Het Groenhuis — het winkelmandje van een klant
// Hoofdstuk 8, klassikale oefening 8.1, met Geld uit hoofdstuk 9 en Verkoopbaar uit hoofdstuk 11

import type { Verkoopbaar } from "../inhoud/contracten.ts";
import { NietGevondenFout, RegelFout, ValidatieFout, VoorraadFout } from "../fouten/fouten.ts";
import { Geld } from "../waarden/geld.ts";

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

  /** Zet het aantal van een product dat al in het mandje ligt. Bij 0 verdwijnt het. */
  wijzigAantal(id: string, aantal: number): void {
    if (!Number.isInteger(aantal) || aantal < 0) {
      throw new ValidatieFout({ aantal: `geen geheel, positief getal: ${aantal}` });
    }
    const regel = this.#regels.find((kandidaat) => kandidaat.item.id === id);
    if (regel === undefined) {
      throw new NietGevondenFout("product in het mandje", id);
    }
    if (aantal === 0) {
      this.verwijder(id);
      return;
    }
    if (regel.item.beschikbaar !== undefined && aantal > regel.item.beschikbaar) {
      throw new VoorraadFout(regel.item.weergavenaam, aantal, regel.item.beschikbaar);
    }
    regel.aantal = aantal;
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
