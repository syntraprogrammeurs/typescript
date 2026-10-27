// 2.8 any en de strenge modus — voorbeeld uit Het Groenhuis, deel I
//
// Een parameter zonder type.
//
// Opbouw van dit bestand:
// function verhoog(bedrag) (returntype leidt TypeScript zelf af)
// console.log(…) toont: verhoog("5")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function verhoog(bedrag) {
  return bedrag + 1;
}

console.log(verhoog("5"));

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:1:18 - error TS7006: Parameter 'bedrag' implicitly has an 'any' type.
//
// 1 function verhoog(bedrag) {
//                    ~~~~~~
//
//
// Found 1 error in src/proef.ts:1
