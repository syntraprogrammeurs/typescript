// 8.4 De klasse Product — voorbeeld uit Het Groenhuis, deel I
//
// Drie velden beginnen met een #: #prijsInCent, #voorraad en #status. Dat zijn private velden: ze
// bestaan alleen binnen de klasse. Van buiten kan niemand ze lezen of wijzigen, ook niet in
// JavaScript.
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const aloe = een nieuw object: new Product({ id: "p04", slug: "aloe-vera", status:
//     "gepubliceerd", naam: "Aloe vera", prijsInCent: 799, btwP…
// aloe.#voorraad krijgt de waarde het getal -5
// console.log(…) toont: aloe.voorraad
// aloe.voorraad krijgt de waarde het getal -5
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.4 De klasse Product (zie 08-Klassen/8.4-De klasse Product/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

import { Product } from "./product.ts";

const aloe = new Product({
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
});

aloe.#voorraad = -5;
console.log(aloe.voorraad);
aloe.voorraad = -5;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:8:6 - error TS18013: Property '#voorraad' is not accessible outside class 'Product' because it has a private identifier.
//
// 8 aloe.#voorraad = -5;
//        ~~~~~~~~~
//
// src/proef.ts:10:6 - error TS2540: Cannot assign to 'voorraad' because it is a read-only property.
//
// 10 aloe.voorraad = -5;
//         ~~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:8
