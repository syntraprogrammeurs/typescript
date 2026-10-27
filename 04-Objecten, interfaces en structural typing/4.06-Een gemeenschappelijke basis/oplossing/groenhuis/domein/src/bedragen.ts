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
