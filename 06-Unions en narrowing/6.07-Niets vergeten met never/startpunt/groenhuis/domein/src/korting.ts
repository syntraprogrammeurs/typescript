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
