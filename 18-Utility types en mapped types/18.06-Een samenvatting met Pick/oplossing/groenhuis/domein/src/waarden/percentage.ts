// Het Groenhuis — een percentage tussen 0 en 100, als branded type
// Hoofdstuk 9, klassikale oefening 9.2

import { Geld } from "./geld.ts";

export type Percentage = number & { readonly __soort: "Percentage" };

export function percentage(waarde: number): Percentage {
  if (!Number.isFinite(waarde) || waarde < 0 || waarde > 100) {
    throw new Error(`Een percentage ligt tussen 0 en 100, niet ${waarde}`);
  }
  return waarde as Percentage;
}

export function kortingOp(bedrag: Geld, korting: Percentage): Geld {
  return Geld.vanCent(Math.round(bedrag.inCent * (1 - korting / 100)));
}
