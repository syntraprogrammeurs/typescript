// Het Groenhuis — een bedrag in euro, altijd geldig en nooit veranderd

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
      throw new Error(`Geen geldig bedrag in cent: ${cent}`);
    }
    return new Geld(cent);
  }

  /** "24,99", "24.99" of "24" */
  static vanEuro(tekst: string): Geld {
    const schoon = tekst.trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(schoon)) {
      throw new Error(`Geen geldig bedrag in euro: "${tekst}"`);
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
      throw new Error(`${ander} is meer dan ${this}`);
    }
    return new Geld(this.#cent - ander.#cent);
  }

  maal(aantal: number): Geld {
    if (!Number.isInteger(aantal) || aantal < 0) {
      throw new Error(`Geen geldig aantal: ${aantal}`);
    }
    return new Geld(this.#cent * aantal);
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
