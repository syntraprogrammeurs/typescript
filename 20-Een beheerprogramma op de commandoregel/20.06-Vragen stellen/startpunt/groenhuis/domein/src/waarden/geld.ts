// Het Groenhuis — een bedrag in euro, altijd geldig en nooit veranderd

import { RegelFout, ValidatieFout } from "../fouten/fouten.ts";
import { alsEuro } from "./prijs.ts";

export class Geld {
  readonly #cent: number;

  private constructor(cent: number) {
    this.#cent = cent;
    Object.freeze(this);
  }

  static readonly NUL = new Geld(0);

  static vanCent(cent: number): Geld {
    if (!Number.isInteger(cent) || cent < 0) {
      throw new ValidatieFout({ bedrag: `geen geheel, positief aantal cent: ${cent}` });
    }
    return new Geld(cent);
  }

  /** "24,99", "24.99" of "24" */
  static vanEuro(tekst: string): Geld {
    const schoon = tekst.trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(schoon)) {
      throw new ValidatieFout({ bedrag: `"${tekst}" is geen bedrag in euro` });
    }
    return new Geld(Math.round(Number(schoon) * 100));
  }

  static som(...bedragen: Geld[]): Geld {
    return bedragen.reduce((totaal, bedrag) => totaal.plus(bedrag), Geld.NUL);
  }

  get inCent(): number {
    return this.#cent;
  }

  plus(ander: Geld): Geld {
    return new Geld(this.#cent + ander.#cent);
  }

  min(ander: Geld): Geld {
    if (ander.#cent > this.#cent) {
      throw new RegelFout(`${ander} aftrekken van ${this} geeft een negatief bedrag`);
    }
    return new Geld(this.#cent - ander.#cent);
  }

  maal(aantal: number): Geld {
    if (!Number.isInteger(aantal) || aantal < 0) {
      throw new ValidatieFout({ aantal: `geen geheel, positief getal: ${aantal}` });
    }
    return new Geld(this.#cent * aantal);
  }

  /** Verdeelt het bedrag in gelijke delen. De centen die overschieten, gaan naar de eerste delen. */
  verdeel(delen: number): Geld[] {
    if (!Number.isInteger(delen) || delen < 1) {
      throw new ValidatieFout({ delen: `geen geheel getal vanaf 1: ${delen}` });
    }
    const basis = Math.floor(this.#cent / delen);
    const rest = this.#cent % delen;
    const uitkomst: Geld[] = [];
    for (let i = 0; i < delen; i++) {
      uitkomst.push(new Geld(i < rest ? basis + 1 : basis));
    }
    return uitkomst;
  }

  metBtw(percentage: number): Geld {
    return new Geld(Math.round(this.#cent * (1 + percentage / 100)));
  }

  equals(ander: Geld): boolean {
    return this.#cent === ander.#cent;
  }

  isMeerDan(ander: Geld): boolean {
    return this.#cent > ander.#cent;
  }

  toString(): string {
    return alsEuro(this.#cent);
  }

  toJSON(): number {
    return this.#cent;
  }
}
