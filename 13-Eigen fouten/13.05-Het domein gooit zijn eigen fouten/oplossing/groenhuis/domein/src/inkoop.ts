// Het Groenhuis — welke producten moeten bijbesteld worden?
// Hoofdstuk 5, klassikale oefening 5.2

import { categorieen, producten } from "./catalogus.ts";
import type { CategorieGegevens, ProductGegevens } from "./inhoud.ts";

export const MINIMALE_VOORRAAD = 5;

export type Bestelregel = [naam: string, categorie: string, voorraad: number, bijTeBestellen: number];

function categorienaam(lijst: readonly CategorieGegevens[], id: string): string {
  const categorie = lijst.find((kandidaat) => kandidaat.id === id);
  return categorie === undefined ? "(onbekend)" : categorie.naam;
}

export function bestellijst(
  alle: readonly ProductGegevens[],
  lijst: readonly CategorieGegevens[],
  minimum = MINIMALE_VOORRAAD,
): Bestelregel[] {
  return alle
    .filter((product) => product.voorraad < minimum)
    .toSorted((a, b) => a.voorraad - b.voorraad || a.naam.localeCompare(b.naam, "nl"))
    .map((product) => [product.naam, categorienaam(lijst, product.categorieId), product.voorraad, minimum - product.voorraad]);
}

const regels = bestellijst(producten, categorieen);

console.log(`${"ProductGegevens".padEnd(26)}${"CategorieGegevens".padEnd(16)}${"Voorraad".padStart(9)}${"Bestellen".padStart(11)}`);
for (const [naam, categorie, voorraad, bijTeBestellen] of regels) {
  console.log(`${naam.padEnd(26)}${categorie.padEnd(16)}${String(voorraad).padStart(9)}${String(bijTeBestellen).padStart(11)}`);
}
console.log(`${regels.length} producten onder de ${MINIMALE_VOORRAAD} stuks`);
