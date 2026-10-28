// 8.3 Een naam vrijmaken — Het Groenhuis, deel I
//
// De klasse die je gaat schrijven, heet Product. Maar Product is al de naam van de interface in
// inhoud.ts. Die interface blijft nodig: ze beschrijft de gegevens van een product, zoals ze in
// een JSON-bestand staan. Geef ze daarom een duidelijkere naam: ProductGegevens.
//
// Opbouw van dit bestand:
// import categorieen, producten uit "./catalogus.ts"
// import Categorie, ProductGegevens uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// export const MINIMALE_VOORRAAD = het getal 5
// export type Bestelregel = een tuple van 4: [naam: string, categorie: string, voorraad: number,
//     bijTeBestellen: number]
// function categorienaam(lijst: readonly Categorie[], id: string): string
// export function bestellijst(alle: readonly ProductGegevens[], lijst: readonly Categorie[],
//     minimum = MINIMALE_VOORRAAD): Bestelregel[]
// const regels = het resultaat van bestellijst(producten, categorieen)
// console.log(…) toont:
//     `${"ProductGegevens".padEnd(26)}${"Categorie".padEnd(16)}${"Voorraad".padStart(…
// for … of: een lus over regels
// console.log(…) toont: `${regels.length} producten onder de ${MINIMALE_VOORRAAD} stuks`

// Het Groenhuis — welke producten moeten bijbesteld worden?
// Hoofdstuk 5, klassikale oefening 5.2

import { categorieen, producten } from "./catalogus.ts";
import type { Categorie, ProductGegevens } from "./inhoud.ts";

export const MINIMALE_VOORRAAD = 5;

export type Bestelregel = [naam: string, categorie: string, voorraad: number, bijTeBestellen: number];

function categorienaam(lijst: readonly Categorie[], id: string): string {
  const categorie = lijst.find((kandidaat) => kandidaat.id === id);
  return categorie === undefined ? "(onbekend)" : categorie.naam;
}

export function bestellijst(
  alle: readonly ProductGegevens[],
  lijst: readonly Categorie[],
  minimum = MINIMALE_VOORRAAD,
): Bestelregel[] {
  return alle
    .filter((product) => product.voorraad < minimum)
    .toSorted((a, b) => a.voorraad - b.voorraad || a.naam.localeCompare(b.naam, "nl"))
    .map((product) => [product.naam, categorienaam(lijst, product.categorieId), product.voorraad, minimum - product.voorraad]);
}

const regels = bestellijst(producten, categorieen);

console.log(`${"ProductGegevens".padEnd(26)}${"Categorie".padEnd(16)}${"Voorraad".padStart(9)}${"Bestellen".padStart(11)}`);
for (const [naam, categorie, voorraad, bijTeBestellen] of regels) {
  console.log(`${naam.padEnd(26)}${categorie.padEnd(16)}${String(voorraad).padStart(9)}${String(bijTeBestellen).padStart(11)}`);
}
console.log(`${regels.length} producten onder de ${MINIMALE_VOORRAAD} stuks`);
