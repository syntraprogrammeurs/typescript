// 4.8 De eerste catalogus — voorbeeld uit Het Groenhuis, deel I
//
// Het Groenhuis heeft nu een vorm voor zijn inhoud. Tijd voor echte gegevens. Maak
// src/catalogus.ts.
//
// Opbouw van dit bestand:
// import Product uit "./inhoud.ts"
// const leeg: Product[] = een lijst van 0 elementen: []
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { Product } from "./inhoud.ts";

const leeg: Product[] = [];

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:1:10 - error TS1484: 'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
//
// 1 import { Product } from "./inhoud.ts";
//            ~~~~~~~
//
//
// Found 1 error in src/proef.ts:1
