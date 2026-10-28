# 5.11 Klassikale oefening 5.1 — Herschrijven met `filter` en `reduce`

**De situatie.** In hoofdstuk 3 schreef je `telWaar` en `somWaar` in `bedragen.ts`, met
een lus en een teller. Nu je `filter` en `reduce` kent, kan het korter.

**Wat je maakt.**

1. Herschrijf `telWaar` en `somWaar` met `filter`, `length` en `reduce`. Geen `for` meer.
2. Maak de parameters `readonly`.
3. Voeg `gemiddelde(bedragen)` toe: het gemiddelde, afgerond op een cent. Wat geef je
   terug voor een lege lijst? Kies een returntype dat dat eerlijk zegt.
4. Controleer dat de uitvoer van de vier bestaande regels niet verandert.

### Uitwerking van oefening 5.1

```ts domein/src/bedragen.ts
// Het Groenhuis — bedragen tellen en optellen die aan een voorwaarde voldoen
// Hoofdstuk 3, klassikale oefening 3.2, herschreven in hoofdstuk 5, klassikale oefening 5.1

import { alsEuro } from "./prijs.ts";

export type Voorwaarde = (bedragInCent: number) => boolean;

export function telWaar(bedragen: readonly number[], voorwaarde: Voorwaarde): number {
  return bedragen.filter(voorwaarde).length;
}

export function somWaar(bedragen: readonly number[], voorwaarde: Voorwaarde): number {
  return bedragen.filter(voorwaarde).reduce((totaal, bedrag) => totaal + bedrag, 0);
}

export function gemiddelde(bedragen: readonly number[]): number | undefined {
  if (bedragen.length === 0) {
    return undefined;
  }
  return Math.round(bedragen.reduce((totaal, bedrag) => totaal + bedrag, 0) / bedragen.length);
}

export function goedkoperDan(grensInCent: number): Voorwaarde {
  return (bedrag) => bedrag < grensInCent;
}

```

```text
Onder 10 euro: 3 producten
Samen: € 19,94
Vanaf 25 euro: 2 producten
Ronde bedragen: 0
Gemiddelde prijs: € 17,83
Gemiddelde van niets: undefined
```

**`bedragen.filter(voorwaarde)` zonder arrowfunctie.** `voorwaarde` is al een functie
van het juiste type. Je kunt ze rechtstreeks doorgeven: `filter((bedrag) =>
voorwaarde(bedrag))` doet hetzelfde, met een omweg.

**`gemiddelde` geeft `number | undefined`.** Het gemiddelde van niets bestaat niet. Je
zou `0` kunnen teruggeven, maar dan lijkt het alsof de producten gratis zijn. Of `NaN`,
want dat geeft `0 / 0`: dan rekent iedereen die het gebruikt stilzwijgend met `NaN`
verder. `undefined` in het returntype dwingt wie de functie gebruikt, om het geval van de
lege lijst zelf af te handelen. Dat zie je onderaan: `gemiddeld === undefined ? … : …`.

**Wat de uitvoer bewijst.** De eerste vier regels zijn dezelfde als in hoofdstuk 3. Dat
is precies wat je wilt bij herschrijven: de code verandert, het gedrag niet. In
hoofdstuk 15 laat je dat nakijken door een test, in plaats van met je ogen.

---
