// Het Groenhuis — een etiket voor alles wat een naam en een prijs heeft
// Hoofdstuk 4, klassikale oefening 4.2

import { producten } from "./catalogus.ts";
import { alsEuro } from "../src/prijs.ts";

export interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

export function etiket(item: Prijsetiket): string {
  return `[ ${item.naam} — ${alsEuro(item.prijsInCent)} ]`;
}

const express = { naam: "Express-levering", prijsInCent: 300, levertermijn: "morgen" };
const cadeaubon: Prijsetiket = { naam: "Cadeaubon", prijsInCent: 2500 };

for (const product of producten) {
  if (product.voorraad === 0) {
    console.log(etiket(product));
  }
}
console.log(etiket(express));
console.log(etiket(cadeaubon));
