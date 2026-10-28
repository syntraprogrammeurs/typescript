// 8.9 Een klasse en JSON — voorbeeld uit Het Groenhuis, deel I
//
// Wat maakt JSON.stringify van een Product?
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const schaar = het resultaat van Product.nieuw("Snoeischaar", 2450, "c4")
// const tekst = het resultaat van JSON.stringify(schaar)
// console.log(…) toont: tekst
// const terug = een nieuw object: new Product(JSON.parse(tekst))
// console.log(…) toont: terug.prijsInCent, terug instanceof Product
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.9 Een klasse en JSON (zie 08-Klassen/8.9-Een klasse en JSON/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar", 2450, "c4");
const tekst = JSON.stringify(schaar);
console.log(tekst);

const terug = new Product(JSON.parse(tekst));
console.log(terug.prijsInCent, terug instanceof Product);

// Uitvoer van `node src/proef.ts`:
// {"id":"38d448d3-d056-44ba-aeca-dc681374998d","slug":"snoeischaar","status":"concept","naam":"Snoeischaar","prijsInCent":2450,"btwPercentage":21,"voorraad":0,"categorieId":"c4","tags":[]}
// 2450 true
