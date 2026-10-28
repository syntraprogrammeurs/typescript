// 8.12 Klassikale oefening 8.2 — De klasse Pagina
//
// De situatie. Een redacteur bouwt een pagina blok per blok op: een blok toevoegen, ergens
// tussenvoegen, verplaatsen, verwijderen. Een pagina zonder blokken mag niet gepubliceerd worden.
//
// Wat je maakt. Een klasse Pagina in src/pagina.ts, met de blokken uit hoofdstuk 6:
//
// 1. Een id, een slug en een titel, die de constructor krijgt. Een pagina begint als concept,
//    zonder blokken.
// 2. Een getter blokken, die de blokken toont zonder dat iemand ze van buiten kan wijzigen.
// 3. voegBlokToe(blok, plaats): standaard achteraan.
// 4. verwijderBlok(plaats) en verplaatsBlok(van, naar), die een plaats weigeren die niet bestaat.
//    Schrijf die controle één keer, in een private methode.
// 5. publiceer() en alsTekst().
// 6. Maak de pagina Verzorgingstips: probeer ze leeg te publiceren, voeg drie blokken toe, één
//    ervan vooraan, verplaats er een, en publiceer.
//
// Opbouw van dit bestand:
// import blokAlsTekst, type Blok uit "./blokken.ts"
// import Inhoudsstatus uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// export class Pagina — met 14 leden:
//     readonly id: string
//     slug: string
//     titel: string
//     #blokken: Blok[] = []
//     #status: Inhoudsstatus = "concept"
//     constructor(id: string, slug: string, titel: string)
//     get status: Inhoudsstatus
//     get blokken: readonly Blok[]
//     voegBlokToe(blok: Blok, plaats = this.#blokken.length): void
//     verwijderBlok(plaats: number): void
//     verplaatsBlok(van: number, naar: number): void
//     publiceer(): void
//     alsTekst(): string
//     #controleerPlaats(plaats: number): void
// const tips = een nieuw object: new Pagina("g3", "verzorgingstips", "Verzorgingstips")
// try … catch: vangt fouten op
// roept tips.voegBlokToe(…) aan: tips.voegBlokToe({ soort: "tekst", tekst: "Geef liever te weinig
//     dan te veel water." })
// roept tips.voegBlokToe(…) aan: tips.voegBlokToe({ soort: "knop", label: "Bekijk de vetplanten",
//     link: "/categorie/vetplanten" })
// roept tips.voegBlokToe(…) aan: tips.voegBlokToe({ soort: "afbeelding", url: "/media/gieter.jpg",
//     alt: "Een gieter" }, 0)
// roept tips.verplaatsBlok(…) aan: tips.verplaatsBlok(2, 1)
// roept tips.publiceer(…) aan: tips.publiceer()
// console.log(…) toont: `${tips.status}, ${tips.blokken.length} blokken`
// console.log(…) toont: tips.alsTekst()

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
