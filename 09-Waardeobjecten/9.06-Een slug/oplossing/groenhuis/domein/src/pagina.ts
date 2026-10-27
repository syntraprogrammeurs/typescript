// Het Groenhuis — een pagina van het CMS, met de regels voor haar blokken
// Hoofdstuk 8, klassikale oefening 8.2

import { blokAlsTekst, type Blok } from "./blokken.ts";
import type { Inhoudsstatus } from "./inhoud.ts";

export class Pagina {
  readonly id: string;
  slug: string;
  titel: string;
  #blokken: Blok[] = [];
  #status: Inhoudsstatus = "concept";

  constructor(id: string, slug: string, titel: string) {
    this.id = id;
    this.slug = slug;
    this.titel = titel;
  }

  get status(): Inhoudsstatus {
    return this.#status;
  }

  get blokken(): readonly Blok[] {
    return this.#blokken;
  }

  voegBlokToe(blok: Blok, plaats = this.#blokken.length): void {
    if (plaats < 0 || plaats > this.#blokken.length) {
      throw new Error(`Plaats ${plaats} bestaat niet op ${this.titel}`);
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

  publiceer(): void {
    if (this.#blokken.length === 0) {
      throw new Error(`${this.titel} heeft nog geen inhoud`);
    }
    this.#status = "gepubliceerd";
  }

  alsTekst(): string {
    return [this.titel.toUpperCase(), ...this.#blokken.map(blokAlsTekst)].join("\n");
  }

  #controleerPlaats(plaats: number): void {
    if (!Number.isInteger(plaats) || plaats < 0 || plaats >= this.#blokken.length) {
      throw new Error(`Er is geen blok op plaats ${plaats} van ${this.titel}`);
    }
  }
}

const tips = new Pagina("g3", "verzorgingstips", "Verzorgingstips");

try {
  tips.publiceer();
} catch (fout) {
  console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
}

tips.voegBlokToe({ soort: "tekst", tekst: "Geef liever te weinig dan te veel water." });
tips.voegBlokToe({ soort: "knop", label: "Bekijk de vetplanten", link: "/categorie/vetplanten" });
tips.voegBlokToe({ soort: "afbeelding", url: "/media/gieter.jpg", alt: "Een gieter" }, 0);
tips.verplaatsBlok(2, 1);
tips.publiceer();

console.log(`${tips.status}, ${tips.blokken.length} blokken`);
console.log(tips.alsTekst());
