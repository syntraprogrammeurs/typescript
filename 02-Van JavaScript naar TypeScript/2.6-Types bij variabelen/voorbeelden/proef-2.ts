// 2.6 Types bij variabelen — voorbeeld uit Het Groenhuis, deel I
//
// Een variabele zonder beginwaarde, zonder type.
//
// Opbouw van dit bestand:
// let korting = zonder beginwaarde
// korting krijgt de waarde het getal 20
// korting krijgt de waarde de tekst "twintig"
// function verhoog(bedrag) (returntype leidt TypeScript zelf af)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

let korting;
korting = 20;
korting = "twintig";

function verhoog(bedrag) {
  return bedrag + 1;
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:5:18 - error TS7006: Parameter 'bedrag' implicitly has an 'any' type.
//
// 5 function verhoog(bedrag) {
//                    ~~~~~~
//
//
// Found 1 error in src/proef.ts:5
