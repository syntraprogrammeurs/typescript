// 8.7 static — voorbeeld uit Het Groenhuis, deel I
//
// Soms hoort iets bij de klasse zelf, en niet bij één object. Dat krijgt static.
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const schaar = het resultaat van Product.nieuw("Snoeischaar Felco 2", 4995, "c4")
// console.log(…) toont: schaar.slug, schaar.status, schaar.voorraad, schaar.btwPercentage
// console.log(…) toont: Product.slugVan("Aloë vera & co")
// console.log(…) toont: schaar.id.length
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.7 Static: een nieuw product (zie 08-Klassen/8.7-static/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar Felco 2", 4995, "c4");
console.log(schaar.slug, schaar.status, schaar.voorraad, schaar.btwPercentage);
console.log(Product.slugVan("Aloë vera & co"));
console.log(schaar.id.length);

// Uitvoer van `node src/proef.ts`:
// snoeischaar-felco-2 concept 0 21
// aloe-vera-co
// 36
