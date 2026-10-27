// Op Wielen — een huurperiode van de ene dag tot en met de andere, altijd geldig

import { OngeldigePeriodeFout } from "../fouten/fouten.ts";

const DAG = 24 * 60 * 60 * 1000;

function isDatum(tekst: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tekst)) {
    return false;
  }
  const datum = new Date(`${tekst}T00:00:00Z`);
  return !Number.isNaN(datum.getTime()) && datum.toISOString().slice(0, 10) === tekst;
}

export class Periode {
  readonly #van: string;
  readonly #tot: string;

  private constructor(van: string, tot: string) {
    this.#van = van;
    this.#tot = tot;
    Object.freeze(this);
  }

  /** Twee datums als "2026-10-25". De periode loopt tot en met de laatste dag. */
  static van(van: string, tot: string): Periode {
    for (const datum of [van, tot]) {
      if (!isDatum(datum)) {
        throw new OngeldigePeriodeFout(`"${datum}" is geen datum als 2026-10-25`);
      }
    }
    if (tot < van) {
      throw new OngeldigePeriodeFout(`Een periode kan niet eindigen (${tot}) voor ze begint (${van})`);
    }
    return new Periode(van, tot);
  }

  get begin(): string {
    return this.#van;
  }

  get einde(): string {
    return this.#tot;
  }

  get aantalDagen(): number {
    return (Date.parse(this.#tot) - Date.parse(this.#van)) / DAG + 1;
  }

  overlaptMet(ander: Periode): boolean {
    return this.#van <= ander.#tot && ander.#van <= this.#tot;
  }

  /** De dag na het einde: vanaf dan is wat in deze periode bezet was, weer vrij. */
  get dagErna(): string {
    return new Date(Date.parse(this.#tot) + DAG).toISOString().slice(0, 10);
  }

  equals(ander: Periode): boolean {
    return this.#van === ander.#van && this.#tot === ander.#tot;
  }

  toString(): string {
    const kort = (datum: string) => `${datum.slice(8, 10)}/${datum.slice(5, 7)}`;
    return this.#van === this.#tot ? kort(this.#van) : `${kort(this.#van)} – ${kort(this.#tot)}`;
  }

  toJSON(): { van: string; tot: string } {
    return { van: this.#van, tot: this.#tot };
  }
}
