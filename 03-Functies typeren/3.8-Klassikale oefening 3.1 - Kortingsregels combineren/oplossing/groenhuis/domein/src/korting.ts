// 3.8 Klassikale oefening 3.1 — Kortingsregels combineren
//
// De situatie. Voor Black Friday geeft Het Groenhuis 25 procent korting, maar maximaal 15 euro per
// bestelling. Aan de kassa wil de winkel de Black Friday-korting en een cadeaubon samen als één
// regel kunnen gebruiken.
//
// Wat je maakt. Twee nieuwe functies in korting.ts:
//
// 1. maximaal(maxKortingInCent, regel): een kortingsregel die de korting van regel toepast, maar
//    nooit meer dan maxKortingInCent afhaalt.
// 2. combineer(...regels): een kortingsregel die alle regels na elkaar toepast.
// 3. Beide geven een Kortingsregel terug. Schrijf de returntypes uitdrukkelijk.
// 4. Toon in start.ts de Black Friday-prijs, en de prijs met Black Friday én de bon, voor
//    bestellingen van 40 euro, 80 euro en het mandje uit 3.3.
//
// Denk eerst na: hoeveel korting is 25 procent op 40 euro? En op 80 euro?
//
// Opbouw van dit bestand:
// export type Kortingsregel = een functietype: (bedragInCent: number) => number
// export function procentKorting(percentage: number): Kortingsregel
// export function vasteKorting(kortingInCent: number): Kortingsregel
// export function vanafBedrag(drempelInCent: number, regel: Kortingsregel): Kortingsregel
// export function pasToe(bedragInCent: number, ...regels: Kortingsregel[]): number
// export function maximaal(maxKortingInCent: number, regel: Kortingsregel): Kortingsregel
// export function combineer(...regels: Kortingsregel[]): Kortingsregel

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

export function maximaal(maxKortingInCent: number, regel: Kortingsregel): Kortingsregel {
  return (bedrag) => Math.max(regel(bedrag), bedrag - maxKortingInCent);
}

export function combineer(...regels: Kortingsregel[]): Kortingsregel {
  return (bedrag) => pasToe(bedrag, ...regels);
}
