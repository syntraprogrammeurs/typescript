# 3.8 Klassikale oefening 3.1 — Kortingsregels combineren

**De situatie.** Voor Black Friday geeft Het Groenhuis 25 procent korting, maar
maximaal 15 euro per bestelling. Aan de kassa wil de winkel de Black Friday-korting
en een cadeaubon samen als één regel kunnen gebruiken.

**Wat je maakt.** Twee nieuwe functies in `korting.ts`:

1. `maximaal(maxKortingInCent, regel)`: een kortingsregel die de korting van `regel`
   toepast, maar nooit meer dan `maxKortingInCent` afhaalt.
2. `combineer(...regels)`: een kortingsregel die alle regels na elkaar toepast.
3. Beide geven een `Kortingsregel` terug. Schrijf de returntypes uitdrukkelijk.
4. Toon in `start.ts` de Black Friday-prijs, en de prijs met Black Friday én de bon,
   voor bestellingen van 40 euro, 80 euro en het mandje uit 3.3.

Denk eerst na: hoeveel korting is 25 procent op 40 euro? En op 80 euro?

### Uitwerking van oefening 3.1

```ts domein/src/korting.ts
export function maximaal(maxKortingInCent: number, regel: Kortingsregel): Kortingsregel {
  return (bedrag) => Math.max(regel(bedrag), bedrag - maxKortingInCent);
}

export function combineer(...regels: Kortingsregel[]): Kortingsregel {
  return (bedrag) => pasToe(bedrag, ...regels);
}
```

```ts domein/src/start.ts
// Oefening 3.1: Black Friday
const blackFriday = maximaal(1500, procentKorting(25));
const kassa = combineer(blackFriday, cadeaubon);

for (const bedrag of [4000, 8000, totaal]) {
  console.log(`Black Friday op ${alsEuro(bedrag)}: ${alsEuro(blackFriday(bedrag))}, met bon: ${alsEuro(kassa(bedrag))}`);
}
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
Black Friday op € 40,00: € 30,00, met bon: € 20,00
Black Friday op € 80,00: € 65,00, met bon: € 55,00
Black Friday op € 50,81: € 38,11, met bon: € 28,11
```

**`maximaal` met `Math.max`.** De gewone regel geeft het bedrag **na** korting. Het
laagste bedrag dat mag, is `bedrag - maxKortingInCent`. Het hoogste van die twee is dus
het antwoord. Bij 40 euro is 25 procent 10 euro: dat is minder dan 15, dus de korting
blijft. Bij 80 euro is 25 procent 20 euro: dat is te veel, dus 65 euro in plaats van
60 euro.

**`combineer` gebruikt `pasToe`.** Je hoeft de lus niet opnieuw te schrijven. De
spread `...regels` geeft de lijst weer door als losse argumenten. `combineer` geeft
een **functie** terug: de regels worden pas toegepast als je die functie aanroept.

**`maximaal` neemt een regel, geen percentage.** Daardoor werkt het met elke regel,
ook met `vanafBedrag(…)` of met een regel die je volgend jaar schrijft. Functies die
functies krijgen en teruggeven, kun je eindeloos combineren: `maximaal(1500,
vanafBedrag(5000, procentKorting(25)))` is een geldige regel.

---
