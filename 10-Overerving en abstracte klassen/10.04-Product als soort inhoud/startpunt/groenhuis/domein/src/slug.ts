// Het Groenhuis — het stuk van een URL dat een product of pagina aanwijst: "monstera-deliciosa"

export class Slug {
  static readonly PATROON = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  readonly #waarde: string;

  private constructor(waarde: string) {
    this.#waarde = waarde;
    Object.freeze(this);
  }

  static van(tekst: string): Slug {
    if (!Slug.PATROON.test(tekst)) {
      throw new Error(`Geen geldige slug: "${tekst}"`);
    }
    return new Slug(tekst);
  }

  /** "Aloë vera & co" wordt "aloe-vera-co". */
  static uitNaam(naam: string): Slug {
    const waarde = naam
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return Slug.van(waarde);
  }

  equals(ander: Slug): boolean {
    return this.#waarde === ander.#waarde;
  }

  toString(): string {
    return this.#waarde;
  }

  toJSON(): string {
    return this.#waarde;
  }
}
