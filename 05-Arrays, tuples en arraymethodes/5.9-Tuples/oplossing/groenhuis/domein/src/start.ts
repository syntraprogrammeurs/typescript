// 5.9 Tuples — Het Groenhuis, deel I
//
// Een tuple is een lijst met een vast aantal elementen, elk met een eigen type. De laagste en de
// hoogste prijs uit de catalogus zijn zo'n paar.
//
// Opbouw van dit bestand:
// import categorieen, paginas, producten uit "./catalogus.ts"
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// import alsEuro, metBtw uit "./prijs.ts"
// import aantalPerCategorie, goedkoopsteEerst, opVoorraad, prijsbereik, voorraadwaarde uit
//     "./zoeken.ts"
// console.log(…) toont: `Het Groenhuis — het domein (Node.js ${process.version})`
// console.log(…) toont: `${producten.length} producten, ${categorieen.length} categorieën,
//     ${paginas.le…
// console.log(…) toont:
// function prijsregel(product: Product): string
// console.log(…) toont: "Op voorraad, goedkoopste eerst:"
// for … of: een lus over goedkoopsteEerst(opVoorraad(producten))
// console.log(…) toont:
// console.log(…) toont: `Waarde van de voorraad (excl. btw):
//     ${alsEuro(voorraadwaarde(producten))}`
// console.log(…) toont: "Producten per categorie:", aantalPerCategorie(producten)
// const bereik = het resultaat van prijsbereik(producten)
// if (bereik !== undefined) …

// Het Groenhuis — het domein van het CMS

import { categorieen, paginas, producten } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";
import { alsEuro, metBtw } from "./prijs.ts";
import { aantalPerCategorie, goedkoopsteEerst, opVoorraad, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  const prijs = alsEuro(metBtw(product.prijsInCent, product.btwPercentage));
  return `${product.naam.padEnd(26)}${prijs.padStart(10)}   ${product.voorraad} op voorraad`;
}

console.log("Op voorraad, goedkoopste eerst:");
for (const product of goedkoopsteEerst(opVoorraad(producten))) {
  console.log(`  ${prijsregel(product)}`);
}
console.log();
console.log(`Waarde van de voorraad (excl. btw): ${alsEuro(voorraadwaarde(producten))}`);
console.log("Producten per categorie:", aantalPerCategorie(producten));

const bereik = prijsbereik(producten);
if (bereik !== undefined) {
  const [laagste, hoogste] = bereik;
  console.log(`Prijzen van ${alsEuro(laagste)} tot ${alsEuro(hoogste)} (excl. btw)`);
}
