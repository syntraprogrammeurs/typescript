// 4.3 Optionele en readonly-velden — voorbeeld uit Het Groenhuis, deel I
//
// In tsconfig.json staat exactOptionalPropertyTypes. Daardoor maakt TypeScript een verschil tussen
// een veld dat ontbreekt en een veld dat er staat met de waarde undefined.
//
// Opbouw van dit bestand:
// interface Product — de vorm van een object met 2 leden:
//     naam: string
//     beschrijving?: string
// const zonder: Product = een object met de velden naam: { naam: "Aloe vera" }
// const leeg: Product = een object met de velden naam, beschrijving: { naam: "Aloe vera",
//     beschrijving: undefined }
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Product {
  naam: string;
  beschrijving?: string;
}

const zonder: Product = { naam: "Aloe vera" };
const leeg: Product = { naam: "Aloe vera", beschrijving: undefined };

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:7:7 - error TS2375: Type '{ naam: string; beschrijving: undefined; }' is not assignable to type 'Product' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
//   Types of property 'beschrijving' are incompatible.
//     Type 'undefined' is not assignable to type 'string'.
//
// 7 const leeg: Product = { naam: "Aloe vera", beschrijving: undefined };
//         ~~~~
//
//
// Found 1 error in src/proef.ts:7
