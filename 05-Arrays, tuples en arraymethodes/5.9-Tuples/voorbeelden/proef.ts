// 5.9 Tuples — voorbeeld uit Het Groenhuis, deel I
//
// Een tuple is een lijst met een vast aantal elementen, elk met een eigen type. De laagste en de
// hoogste prijs uit de catalogus zijn zo'n paar.
//
// Opbouw van dit bestand:
// const bereik: [laagste: number, hoogste: number] = een lijst van 2 elementen: [799, 8999]
// const [laagste, hoogste] = bereik
// const derde = bereik[2]
// const fout: [number, number] = een lijst van 2 elementen: [799, "8999"]
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const bereik: [laagste: number, hoogste: number] = [799, 8999];

const [laagste, hoogste] = bereik;
const derde = bereik[2];
const fout: [number, number] = [799, "8999"];

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:4:22 - error TS2493: Tuple type '[laagste: number, hoogste: number]' of length '2' has no element at index '2'.
//
// 4 const derde = bereik[2];
//                        ~
//
// src/proef.ts:5:38 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 5 const fout: [number, number] = [799, "8999"];
//                                        ~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:4
