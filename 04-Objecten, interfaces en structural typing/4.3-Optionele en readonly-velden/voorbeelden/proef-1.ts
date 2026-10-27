// 4.3 Optionele en readonly-velden — voorbeeld uit Het Groenhuis, deel I
//
// Niet elk product heeft een beschrijving. Een veld dat er niet hoeft te zijn, krijgt een
// vraagteken, net als een optionele parameter. En de id van een product mag nooit veranderen: die
// krijgt readonly.
//
// Opbouw van dit bestand:
// interface Product — de vorm van een object met 3 leden:
//     readonly id: string
//     naam: string
//     beschrijving?: string
// const aloe: Product = een object met de velden id, naam: { id: "p04", naam: "Aloe vera" }
// aloe.naam krijgt de waarde de tekst "Aloë vera"
// aloe.id krijgt de waarde de tekst "p99"
// console.log(…) toont: aloe.beschrijving.length
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Product {
  readonly id: string;
  naam: string;
  beschrijving?: string;
}

const aloe: Product = { id: "p04", naam: "Aloe vera" };
aloe.naam = "Aloë vera";
aloe.id = "p99";

console.log(aloe.beschrijving.length);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:9:6 - error TS2540: Cannot assign to 'id' because it is a read-only property.
//
// 9 aloe.id = "p99";
//        ~~
//
// src/proef.ts:11:13 - error TS18048: 'aloe.beschrijving' is possibly 'undefined'.
//
// 11 console.log(aloe.beschrijving.length);
//                ~~~~~~~~~~~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:9
