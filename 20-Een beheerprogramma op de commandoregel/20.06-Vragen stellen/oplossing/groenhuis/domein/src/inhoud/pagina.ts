// Het Groenhuis — een pagina van het CMS: een soort inhoud, opgebouwd uit blokken

import { blokAlsTekst, type Blok } from "./blokken.ts";
import { RegelFout } from "../fouten/fouten.ts";
import { Inhoud } from "./inhoudsklasse.ts";
import type { Slug } from "../waarden/slug.ts";

export class Pagina extends Inhoud {
  titel: string;
  #blokken: Blok[] = [];

  constructor(id: string, slug: Slug, titel: string) {
    super(id, slug, "concept");
    this.titel = titel;
  }

  override get weergavenaam(): string {
    return this.titel;
  }

  protected override redenOmNietTePubliceren(): string | undefined {
    return this.#blokken.length === 0 ? "er zijn nog geen blokken" : undefined;
  }

  get blokken(): readonly Blok[] {
    return this.#blokken;
  }

  voegBlokToe(blok: Blok, plaats = this.#blokken.length): void {
    if (plaats < 0 || plaats > this.#blokken.length) {
      throw new RegelFout(`Plaats ${plaats} bestaat niet op ${this.titel}`);
    }
    this.#blokken = this.#blokken.toSpliced(plaats, 0, blok);
  }

  verwijderBlok(plaats: number): void {
    this.#controleerPlaats(plaats);
    this.#blokken = this.#blokken.toSpliced(plaats, 1);
  }

  verplaatsBlok(van: number, naar: number): void {
    this.#controleerPlaats(van);
    this.#controleerPlaats(naar);
    const blok = this.#blokken[van];
    if (blok !== undefined) {
      this.#blokken = this.#blokken.toSpliced(van, 1).toSpliced(naar, 0, blok);
    }
  }

  alsTekst(): string {
    return [this.titel.toUpperCase(), ...this.#blokken.map(blokAlsTekst)].join("\n");
  }

  #controleerPlaats(plaats: number): void {
    if (!Number.isInteger(plaats) || plaats < 0 || plaats >= this.#blokken.length) {
      throw new RegelFout(`Er is geen blok op plaats ${plaats} van ${this.titel}`);
    }
  }
}
