# 3.5 Functies die functies maken

Een korting van tien procent en een van twintig procent verschillen alleen in het
getal. In plaats van twee functies schrijf je een functie die een kortingsregel
**maakt**. Maak `src/korting.ts`:

```ts domein/src/korting.ts
// Het Groenhuis — kortingsregels
// Een kortingsregel krijgt een bedrag in cent en geeft het bedrag na korting terug.

export type Kortingsregel = (bedragInCent: number) => number;

export function procentKorting(percentage: number): Kortingsregel {
  return (bedrag) => Math.round(bedrag * (1 - percentage / 100));
}

export function vasteKorting(kortingInCent: number): Kortingsregel {
  return (bedrag) => Math.max(0, bedrag - kortingInCent);
}

export function vanafBedrag(drempelInCent: number, regel: Kortingsregel): Kortingsregel {
  return (bedrag) => (bedrag >= drempelInCent ? regel(bedrag) : bedrag);
}

export function pasToe(bedragInCent: number, ...regels: Kortingsregel[]): number {
  let resultaat = bedragInCent;
  for (const regel of regels) {
    resultaat = regel(resultaat);
  }
  return resultaat;
}
```

| Functie | Krijgt | Geeft terug |
|---|---|---|
| `procentKorting(10)` | een percentage | een regel die tien procent afhaalt |
| `vasteKorting(1000)` | een bedrag | een regel die tien euro afhaalt, maar nooit onder nul |
| `vanafBedrag(5000, regel)` | een drempel en een andere regel | een regel die die andere regel alleen toepast vanaf vijftig euro |
| `pasToe(bedrag, ...regels)` | een bedrag en een aantal regels | het bedrag na alle regels, in volgorde |

Kijk naar `procentKorting`. De functie die ze teruggeeft, gebruikt `percentage`, ook
lang nadat `procentKorting` klaar is.

> **BEGRIP — Closure**
>
> Een functie onthoudt de variabelen van de plaats waar ze gemaakt werd. Dat heet een
> **closure**. De regel die `procentKorting(10)` teruggeeft, onthoudt `percentage = 10`.
> Elke aanroep van `procentKorting` maakt een nieuwe regel, met haar eigen percentage.

`vanafBedrag` krijgt een **regel** als parameter. Een functie meegeven aan een andere
functie heet een **callback**. Het type van die parameter is gewoon `Kortingsregel`.

Gebruik ze in `start.ts`:

```ts domein/src/start.ts
const lenteactie = vanafBedrag(5000, procentKorting(10));
const cadeaubon = vasteKorting(1000);

console.log(`Met de lenteactie: ${alsEuro(pasToe(totaal, lenteactie))}`);
console.log(`Met de lenteactie en een bon van 10 euro: ${alsEuro(pasToe(totaal, lenteactie, cadeaubon))}`);
console.log(`Eerst de bon, dan de actie: ${alsEuro(pasToe(totaal, cadeaubon, lenteactie))}`);
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
Mandje: € 26,49 + € 15,37 + € 8,95 = € 50,81
Verzending: € 0,00
Met de lenteactie: € 45,73
Met de lenteactie en een bon van 10 euro: € 35,73
Eerst de bon, dan de actie: € 40,81
```

De volgorde maakt uit. Eerst de lenteactie, dan de bon: 50,81 euro wordt eerst
45,73 euro, dan 35,73 euro. Eerst de bon: 50,81 euro wordt 40,81 euro, en dat is
onder de vijftig, dus de lenteactie doet niets meer. Welke volgorde juist is, beslist
de winkel, niet de code. Maar de code moet het wel duidelijk maken: daarom staan de
regels als losse argumenten, in de volgorde waarin ze gelden.

> **CONTROLE**
>
> Ga met de muis over `lenteactie` in `start.ts`. Je ziet `const lenteactie:
> Kortingsregel`. Probeer `pasToe(totaal, 10)`: TypeScript weigert, want `10` is geen
> functie.
