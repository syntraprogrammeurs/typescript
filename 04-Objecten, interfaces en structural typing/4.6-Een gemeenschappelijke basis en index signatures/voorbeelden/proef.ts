// 4.6 Een gemeenschappelijke basis en index signatures — voorbeeld uit Het Groenhuis, deel I
//
// Lees het als: elke sleutel die een tekst is, heeft als waarde een tekst.
//
// Opbouw van dit bestand:
// import Pagina uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// const overOns: Pagina = een object met de velden id, slug, titel, tekst, metadata
// const beschrijving = overOns.metadata["beschrijving"]
// console.log(…) toont: beschrijving.toUpperCase()
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.6 Een gemeenschappelijke basis (zie 04-Objecten, interfaces en structural typing/4.6-Een gemeenschappelijke basis en index signatures/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import type { Pagina } from "./inhoud.ts";

const overOns: Pagina = {
  id: "g1",
  slug: "over-ons",
  titel: "Over ons",
  tekst: "Het Groenhuis is een plantenwinkel in Gent.",
  metadata: { beschrijving: "Wie we zijn", robots: "index" },
};

const beschrijving = overOns.metadata["beschrijving"];
console.log(beschrijving.toUpperCase());

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:12:13 - error TS18048: 'beschrijving' is possibly 'undefined'.
//
// 12 console.log(beschrijving.toUpperCase());
//                ~~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:12
