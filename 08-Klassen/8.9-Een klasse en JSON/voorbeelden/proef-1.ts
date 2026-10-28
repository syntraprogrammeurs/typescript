// 8.9 Een klasse en JSON — voorbeeld uit Het Groenhuis, deel I
//
// Wat maakt JSON.stringify van een Product?
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const schaar = het resultaat van Product.nieuw("Snoeischaar", 2450, "c4")
// console.log(…) toont: JSON.stringify(schaar)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.7 Static: een nieuw product (zie 08-Klassen/8.7-static/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar", 2450, "c4");
console.log(JSON.stringify(schaar));

// Uitvoer van `node src/proef.ts`:
// {"id":"8f1914ab-d9ec-4fb4-9ffe-cadf785c5761","slug":"snoeischaar","naam":"Snoeischaar","btwPercentage":21,"categorieId":"c4","tags":[]}
