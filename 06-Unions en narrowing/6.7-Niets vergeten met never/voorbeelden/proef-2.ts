// 6.7 Niets vergeten met never — voorbeeld uit Het Groenhuis, deel I
//
// Als alle soorten afgehandeld zijn, blijft er in default niets meer over: blok is daar van het
// type never, en past in onmogelijk. Vergeet je een soort, dan is blok in default dat vergeten
// type, en weigert TypeScript.
//
// Opbouw van dit bestand:
// import onmogelijk uit "./onmogelijk.ts"
// type Blok = een union, de waarde is een van: { soort: "tekst"; tekst: string } | { soort:
//     "citaat"; tekst: string; auteu…
// function toon(blok: Blok): void
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 6.7 Niets vergeten met never (zie 06-Unions en narrowing/6.7-Niets vergeten met never/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { onmogelijk } from "./onmogelijk.ts";

type Blok = { soort: "tekst"; tekst: string } | { soort: "citaat"; tekst: string; auteur: string };

function toon(blok: Blok): void {
  switch (blok.soort) {
    case "tekst":
      console.log(blok.tekst);
      break;
    default:
      onmogelijk(blok);
  }
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:11:18 - error TS2345: Argument of type '{ soort: "citaat"; tekst: string; auteur: string; }' is not assignable to parameter of type 'never'.
//
// 11       onmogelijk(blok);
//                     ~~~~
//
//
// Found 1 error in src/proef.ts:11
