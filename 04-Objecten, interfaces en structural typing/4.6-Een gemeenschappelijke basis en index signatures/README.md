# 4.6 Een gemeenschappelijke basis en index signatures

Zet de basis in `inhoud.ts`, en voeg de vorm van een **pagina** toe:

```ts domein/src/inhoud.ts
// Het Groenhuis — de vorm van de inhoud van het CMS

/** Wat alle inhoud van het CMS gemeen heeft. */
export interface Inhoud {
  readonly id: string;
  slug: string;
}

export interface Afmetingen {
  hoogteInCm: number;
  potmaatInCm: number;
}

export interface Categorie extends Inhoud {
  naam: string;
  bovenliggendeId?: string;
}

export interface Product extends Inhoud {
  naam: string;
  beschrijving?: string;
  prijsInCent: number;
  btwPercentage: number;
  voorraad: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
}

export interface Pagina extends Inhoud {
  titel: string;
  tekst: string;
  metadata: { [sleutel: string]: string };
}
```

`/** … */` is een **documentatiecommentaar**. VS Code toont het als je met de muis over
`Inhoud` gaat, waar je het ook gebruikt.

Kijk naar `metadata`. Een pagina heeft gegevens voor zoekmachines: een beschrijving,
soms een instructie voor robots, soms iets anders. Welke sleutels er zijn, weet je op
voorhand niet. Dat beschrijf je met een **index signature**:

```ts
metadata: { [sleutel: string]: string };
```

Lees het als: *elke sleutel die een tekst is, heeft als waarde een tekst*.

```ts domein/src/proef.ts
import type { Pagina } from "./inhoud.ts";

const overOns: Pagina = {
  id: "g1",
  slug: "over-ons",
  titel: "Over ons",
  tekst: "Het Groenhuis is een plantenwinkel in Gent.",
  metadata: { beschrijving: "Wie we zijn", robots: "index" },
};

const beschrijving = overOns.metadata["beschrijving"];
console.log(beschrijving.toUpperCase());
```

```text
src/proef.ts:12:13 - error TS18048: 'beschrijving' is possibly 'undefined'.

12 console.log(beschrijving.toUpperCase());
               ~~~~~~~~~~~~

Found 1 error in src/proef.ts:12
```

> **LET OP**
>
> Een index signature belooft niet dat een sleutel bestaat. `metadata["auteur"]` kan
> evengoed niets zijn. Door `noUncheckedIndexedAccess` in je `tsconfig.json` zegt
> TypeScript dat eerlijk: het type is `string | undefined`. Zonder die instelling zou
> TypeScript beweren dat het een `string` is, en zou de regel hierboven pas fout lopen
> bij het uitvoeren. Hoe je `undefined` netjes afhandelt, zie je in hoofdstuk 6.
