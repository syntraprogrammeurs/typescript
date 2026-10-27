// Op Wielen — reservaties, en een boek dat dubbele reservaties weigert

import type { Huurbaar } from "./contracten.ts";
import type { Periode } from "./periode.ts";

export class Reservatie {
  readonly id: string;
  readonly item: Huurbaar;
  readonly klant: string;
  readonly periode: Periode;

  constructor(id: string, item: Huurbaar, klant: string, periode: Periode) {
    this.id = id;
    this.item = item;
    this.klant = klant;
    this.periode = periode;
  }

  get prijsInCent(): number {
    return this.item.prijsVoor(this.periode);
  }
}

export class Reservatieboek {
  #reservaties: Reservatie[] = [];
  #teller = 0;

  isVrij(item: Huurbaar, periode: Periode): boolean {
    return !this.#reservaties.some((r) => r.item.id === item.id && r.periode.overlaptMet(periode));
  }

  reserveer(item: Huurbaar, klant: string, periode: Periode): Reservatie {
    if (!this.isVrij(item, periode)) {
      throw new Error(`${item.omschrijving} is niet vrij van ${periode}`);
    }
    this.#teller++;
    const reservatie = new Reservatie(`r${this.#teller}`, item, klant, periode);
    this.#reservaties.push(reservatie);
    return reservatie;
  }

  voor(item: Huurbaar): readonly Reservatie[] {
    return this.#reservaties.filter((r) => r.item.id === item.id);
  }

  get omzetInCent(): number {
    return this.#reservaties.reduce((som, r) => som + r.prijsInCent, 0);
  }
}
