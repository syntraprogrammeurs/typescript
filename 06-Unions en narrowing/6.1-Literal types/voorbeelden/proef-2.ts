// 6.1 Literal types — voorbeeld uit Het Groenhuis, deel I
//
// Ga met de muis over deze twee variabelen.
//
// Opbouw van dit bestand:
// type Btwtarief = een union, de waarde is een van: 0 | 6 | 12 | 21
// type Inhoudsstatus = een union, de waarde is een van: "concept" | "gepubliceerd" |
//     "gearchiveerd"
// let tarief: Btwtarief = het getal 6
// tarief krijgt de waarde het getal 7
// let status: Inhoudsstatus = de tekst "concept"
// status krijgt de waarde de tekst "gepubliseerd"
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

type Btwtarief = 0 | 6 | 12 | 21;
type Inhoudsstatus = "concept" | "gepubliceerd" | "gearchiveerd";

let tarief: Btwtarief = 6;
tarief = 7;

let status: Inhoudsstatus = "concept";
status = "gepubliseerd";

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:5:1 - error TS2322: Type '7' is not assignable to type 'Btwtarief'.
//
// 5 tarief = 7;
//   ~~~~~~
//
// src/proef.ts:8:1 - error TS2820: Type '"gepubliseerd"' is not assignable to type 'Inhoudsstatus'. Did you mean '"gepubliceerd"'?
//
// 8 status = "gepubliseerd";
//   ~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:5
