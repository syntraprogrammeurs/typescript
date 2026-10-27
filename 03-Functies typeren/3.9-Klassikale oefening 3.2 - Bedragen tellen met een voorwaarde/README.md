# 3.9 Klassikale oefening 3.2 — Bedragen tellen met een voorwaarde

**De situatie.** De eigenaar wil weten hoeveel producten minder dan 10 euro kosten, en
wat die samen waard zijn. Volgende week wil ze hetzelfde weten voor producten vanaf
25 euro, en daarna voor iets anders. In plaats van telkens een nieuwe functie te
schrijven, maak je functies die een **voorwaarde** meekrijgen.

**Wat je maakt.** Een bestand `src/bedragen.ts` met:

1. Een type `Voorwaarde`: een functie die een bedrag krijgt en `true` of `false`
   teruggeeft.
2. `telWaar(bedragen, voorwaarde)`: hoeveel bedragen voldoen.
3. `somWaar(bedragen, voorwaarde)`: de som van de bedragen die voldoen.
4. `goedkoperDan(grens)`: maakt een voorwaarde.
5. Onderaan, voor de prijzen `[2649, 1537, 895, 1299, 349, 4999, 750]`: het aantal en de
   som onder 10 euro, het aantal vanaf 25 euro met een arrowfunctie, en het aantal ronde
   bedragen (een veelvoud van een euro).

### Uitwerking van oefening 3.2

```ts domein/src/bedragen.ts
// Het Groenhuis — bedragen tellen en optellen die aan een voorwaarde voldoen
// Hoofdstuk 3, klassikale oefening 3.2

import { alsEuro } from "./prijs.ts";

export type Voorwaarde = (bedragInCent: number) => boolean;

export function telWaar(bedragen: number[], voorwaarde: Voorwaarde): number {
  let aantal = 0;
  for (const bedrag of bedragen) {
    if (voorwaarde(bedrag)) {
      aantal++;
    }
  }
  return aantal;
}

export function somWaar(bedragen: number[], voorwaarde: Voorwaarde): number {
  let totaal = 0;
  for (const bedrag of bedragen) {
    if (voorwaarde(bedrag)) {
      totaal += bedrag;
    }
  }
  return totaal;
}

export function goedkoperDan(grensInCent: number): Voorwaarde {
  return (bedrag) => bedrag < grensInCent;
}

const prijzen = [2649, 1537, 895, 1299, 349, 4999, 750];

console.log(`Onder 10 euro: ${telWaar(prijzen, goedkoperDan(1000))} producten`);
console.log(`Samen: ${alsEuro(somWaar(prijzen, goedkoperDan(1000)))}`);
console.log(`Vanaf 25 euro: ${telWaar(prijzen, (bedrag) => bedrag >= 2500)} producten`);
console.log(`Ronde bedragen: ${telWaar(prijzen, (bedrag) => bedrag % 100 === 0)}`);
```

```text
Onder 10 euro: 3 producten
Samen: € 19,94
Vanaf 25 euro: 2 producten
Ronde bedragen: 0
```

**Geen type bij `bedrag` in de arrowfuncties onderaan.** De parameter `voorwaarde` heeft
het type `Voorwaarde`. TypeScript weet dus dat `(bedrag) => bedrag >= 2500` een getal
krijgt: contextuele typering, zoals in 3.4. Ga er met de muis over om het te zien.

**`goedkoperDan` en een arrowfunctie doen hetzelfde.** `goedkoperDan(1000)` is
leesbaarder als je dezelfde voorwaarde vaak nodig hebt; een losse arrowfunctie is
handiger voor een vraag die je één keer stelt.

**Je hebt net `filter` nagebouwd.** `telWaar` en `somWaar` lopen een lijst af en houden
alleen wat voldoet. JavaScript heeft daar ingebouwde methodes voor: `filter`, `reduce`
en verwanten. Je herschrijft beide functies daarmee in hoofdstuk 5, met de types erbij.

---
