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

const prijzen = [2649, 1537, 895, 1299, 349, 4999, 750];

console.log(`Onder 10 euro: ${telWaar(prijzen, goedkoperDan(1000))} producten`);
console.log(`Samen: ${alsEuro(somWaar(prijzen, goedkoperDan(1000)))}`);
console.log(`Vanaf 25 euro: ${telWaar(prijzen, (bedrag) => bedrag >= 2500)} producten`);
console.log(`Ronde bedragen: ${telWaar(prijzen, (bedrag) => bedrag % 100 === 0)}`);

const gemiddeld = gemiddelde(prijzen);
console.log(`Gemiddelde prijs: ${gemiddeld === undefined ? "geen prijzen" : alsEuro(gemiddeld)}`);
console.log(`Gemiddelde van niets: ${gemiddelde([])}`);
