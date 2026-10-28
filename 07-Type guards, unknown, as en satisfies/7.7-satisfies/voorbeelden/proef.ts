// 7.7 satisfies — voorbeeld uit Het Groenhuis, deel I
//
// Soms wil je dat TypeScript iets nakijkt tegen een type, maar zonder dat het type van je waarde
// verandert. Een tabel met btw-tarieven per soort.
//
// Opbouw van dit bestand:
// type Tarieven = een objecttype met de velden [index]
// const metType: Tarieven = een object met de velden planten, potten: { planten: 6, potten: 21 }
// const metSatisfies = een object met de velden planten, potten: { planten: 6, potten: 21 } (met
//     Tarieven)
// const a: number = metType.planten
// const b: number = metSatisfies.planten
// const c = metSatisfies.pottten
// const d = een object met de velden planten, potten: { planten: 6, potten: "21" } (met Tarieven)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

type Tarieven = { [soort: string]: number };

const metType: Tarieven = { planten: 6, potten: 21 };
const metSatisfies = { planten: 6, potten: 21 } satisfies Tarieven;

const a: number = metType.planten;
const b: number = metSatisfies.planten;
const c = metSatisfies.pottten;
const d = { planten: 6, potten: "21" } satisfies Tarieven;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:6:7 - error TS2322: Type 'number | undefined' is not assignable to type 'number'.
//   Type 'undefined' is not assignable to type 'number'.
//
// 6 const a: number = metType.planten;
//         ~
//
// src/proef.ts:8:24 - error TS2551: Property 'pottten' does not exist on type '{ planten: number; potten: number; }'. Did you mean 'potten'?
//
// 8 const c = metSatisfies.pottten;
//                          ~~~~~~~
//
//   src/proef.ts:4:36 - 'potten' is declared here.
//     4 const metSatisfies = { planten: 6, potten: 21 } satisfies Tarieven;
//                                          ~~~~~~~~~~
//
// src/proef.ts:9:25 - error TS2322: Type 'string' is not assignable to type 'number'.
//
// 9 const d = { planten: 6, potten: "21" } satisfies Tarieven;
//                           ~~~~~~
//
//   src/proef.ts:1:19 - The expected type comes from this index signature.
//     1 type Tarieven = { [soort: string]: number };
//                         ~~~~~~~~~~~~~~~~~~~~~~~
//
//
// Found 3 errors in the same file, starting at: src/proef.ts:6
