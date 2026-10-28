# 8.12 Klassikale oefening 8.2 — De klasse `Pagina`

**De situatie.** Een redacteur bouwt een pagina blok per blok op: een blok toevoegen, ergens
tussenvoegen, verplaatsen, verwijderen. Een pagina zonder blokken mag niet gepubliceerd worden.

**Wat je maakt.** Een klasse `Pagina` in `src/pagina.ts`, met de blokken uit hoofdstuk 6:

1. Een `id`, een `slug` en een `titel`, die de constructor krijgt. Een pagina begint als
   concept, zonder blokken.
2. Een getter `blokken`, die de blokken toont zonder dat iemand ze van buiten kan wijzigen.
3. `voegBlokToe(blok, plaats)`: standaard achteraan.
4. `verwijderBlok(plaats)` en `verplaatsBlok(van, naar)`, die een plaats weigeren die niet
   bestaat. Schrijf die controle één keer, in een private methode.
5. `publiceer()` en `alsTekst()`.
6. Maak de pagina *Verzorgingstips*: probeer ze leeg te publiceren, voeg drie blokken toe, één
   ervan vooraan, verplaats er een, en publiceer.

### Uitwerking van oefening 8.2

```ts domein/src/pagina.ts
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
```

```text
Geweigerd: Verzorgingstips heeft nog geen inhoud
gepubliceerd, 3 blokken
VERZORGINGSTIPS
[afbeelding: Een gieter]
[ Bekijk de vetplanten → /categorie/vetplanten ]
Geef liever te weinig dan te veel water.
```

**`get blokken(): readonly Blok[]`.** De getter geeft de echte lijst terug, maar met het type
`readonly`. Wie `pagina.blokken.push(…)` probeert, krijgt een typefout. Wie wil wijzigen, moet
langs `voegBlokToe`.

**`toSpliced` in plaats van `splice`.** Elke wijziging maakt een nieuwe lijst. Had iemand de
oude lijst via de getter gekregen, dan verandert die niet onder zijn handen. Dat is hetzelfde
idee als `toSorted` in hoofdstuk 5.

**`#controleerPlaats` is een private methode.** Een `#` werkt ook voor methodes. Van buiten
bestaat ze niet: het is een hulp voor de klasse zelf.

**`plaats = this.#blokken.length` als standaardwaarde.** Een standaardwaarde mag een expressie
zijn, en mag `this` gebruiken. Ze wordt berekend op het moment van de aanroep.

**Twee klassen met dezelfde velden.** `Product` en `Pagina` hebben allebei een `id`, een `slug`,
een `#status` en een `publiceer()`, en de regels voor de status lijken op elkaar. Dat is
dubbel werk, en de reden voor het volgende hoofdstuk dat erop ingaat: hoofdstuk 10, *Overerving*.

---
