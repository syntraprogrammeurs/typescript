// 3.5 Functies die functies maken — Het Groenhuis, deel I
//
// Een korting van tien procent en een van twintig procent verschillen alleen in het getal. In
// plaats van twee functies schrijf je een functie die een kortingsregel maakt. Maak
// src/korting.ts.
//
// Opbouw van dit bestand:
// export type Kortingsregel = een functietype: (bedragInCent: number) => number
// export function procentKorting(percentage: number): Kortingsregel
// export function vasteKorting(kortingInCent: number): Kortingsregel
// export function vanafBedrag(drempelInCent: number, regel: Kortingsregel): Kortingsregel
// export function pasToe(bedragInCent: number, ...regels: Kortingsregel[]): number

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
