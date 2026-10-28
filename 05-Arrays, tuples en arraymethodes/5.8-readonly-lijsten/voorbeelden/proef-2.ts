// 5.8 readonly-lijsten — voorbeeld uit Het Groenhuis, deel I
//
// Dat sort de lijst zelf wijzigt, is precies de soort fout die je wilt laten tegenhouden. Een
// readonly-lijst kun je lezen, maar niet wijzigen.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// function sorteerOpNaam(lijst: Product[]): Product[]
// roept sorteerOpNaam(…) aan: sorteerOpNaam(producten)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 5.9 Readonly-arrays en tuples (zie 05-Arrays, tuples en arraymethodes/5.9-Tuples/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { producten } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";

function sorteerOpNaam(lijst: Product[]): Product[] {
  return lijst.sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
}

sorteerOpNaam(producten);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:8:15 - error TS4104: The type 'readonly Product[]' is 'readonly' and cannot be assigned to the mutable type 'Product[]'.
//
// 8 sorteerOpNaam(producten);
//                 ~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:8
