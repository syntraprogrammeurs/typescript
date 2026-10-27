// 4.1 Een objecttype — voorbeeld uit Het Groenhuis, deel I
//
// Een functie die een product toont, heeft een product nodig. Je kunt de vorm ervan rechtstreeks
// bij de parameter schrijven.
//
// Opbouw van dit bestand:
// function toon(product: { naam: string; prijsInCent: number }): string
// roept toon(…) aan: toon({ naam: "Monstera deliciosa", prijsInCent: 2499 })
// roept toon(…) aan: toon({ naam: "Aloe vera" })
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function toon(product: { naam: string; prijsInCent: number }): string {
  return `${product.naam}: ${product.prijsInCent} cent (${product.voorraad} stuks)`;
}

toon({ naam: "Monstera deliciosa", prijsInCent: 2499 });
toon({ naam: "Aloe vera" });

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:2:67 - error TS2339: Property 'voorraad' does not exist on type '{ naam: string; prijsInCent: number; }'.
//
// 2   return `${product.naam}: ${product.prijsInCent} cent (${product.voorraad} stuks)`;
//                                                                     ~~~~~~~~
//
// src/proef.ts:6:6 - error TS2741: Property 'prijsInCent' is missing in type '{ naam: string; }' but required in type '{ naam: string; prijsInCent: number; }'.
//
// 6 toon({ naam: "Aloe vera" });
//        ~~~~~~~~~~~~~~~~~~~~~
//
//   src/proef.ts:1:40 - 'prijsInCent' is declared here.
//     1 function toon(product: { naam: string; prijsInCent: number }): string {
//                                              ~~~~~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:2
