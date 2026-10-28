// 8.6 Methodes die de regels bewaken — voorbeeld uit Het Groenhuis, deel I
//
// Typ je monstera. in VS Code, dan zie je wat een product kan. De velden met een # staan er niet
// bij.
//
// Opbouw van dit bestand:
// import Product uit "./product.ts"
// const monstera = een nieuw object: new Product({ id: "p01", slug: "monstera-deliciosa", status:
//     "concept", naam: "Monstera deliciosa", prijsInCe…
// roept monstera.publiceer(…) aan: monstera.publiceer()
// roept monstera.pasVoorraadAan(…) aan: monstera.pasVoorraadAan(-2)
// console.log(…) toont: monstera.status, monstera.voorraad
// for … of: een lus over [() => monstera.pasVoorraadAan(-5), () => { monstera.archiveer();
//     monstera.publiceer(); }]
// console.log(…) toont: monstera.status, monstera.voorraad
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 8.4 De klasse Product (zie 08-Klassen/8.4-De klasse Product/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { Product } from "./product.ts";

const monstera = new Product({
  id: "p01", slug: "monstera-deliciosa", status: "concept", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
});

monstera.publiceer();
monstera.pasVoorraadAan(-2);
console.log(monstera.status, monstera.voorraad);

for (const actie of [() => monstera.pasVoorraadAan(-5), () => { monstera.archiveer(); monstera.publiceer(); }]) {
  try {
    actie();
  } catch (fout) {
    console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}
console.log(monstera.status, monstera.voorraad);

// Uitvoer van `node src/proef.ts`:
// gepubliceerd 1
// Geweigerd: Niet genoeg Monstera deliciosa: 1 in voorraad, 5 gevraagd
// Geweigerd: Monstera deliciosa is gearchiveerd en kan niet meer gepubliceerd worden
// gearchiveerd 1
