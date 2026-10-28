// 6.5 Een status voor alle inhoud — Het Groenhuis, deel I
//
// Een product komt niet meteen in de winkel. De redacteur maakt het als concept, de beheerder
// publiceert het, en wat niet meer verkocht wordt, wordt gearchiveerd: uit de winkel, maar niet
// weg, want oude bestellingen verwijzen ernaar. Voeg de status toe aan inhoud.ts.
//
// Opbouw van dit bestand:
// import categorieen, paginas, producten uit "./catalogus.ts"
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// import alsEuro, metBtw uit "./prijs.ts"
// import aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik,
//     voorraadwaarde uit "./zoeken.ts"
// console.log(…) toont: `Het Groenhuis — het domein (Node.js ${process.version})`
// console.log(…) toont: `${producten.length} producten, ${categorieen.length} categorieën,
//     ${paginas.le…
// console.log(…) toont:
// function prijsregel(product: Product): string
// console.log(…) toont: "In de winkel en op voorraad, goedkoopste eerst:"
// for … of: een lus over goedkoopsteEerst(opVoorraad(producten.filter(isZichtbaar)))
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
import { aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  const prijs = alsEuro(metBtw(product.prijsInCent, product.btwPercentage));
  return `${product.naam.padEnd(26)}${prijs.padStart(10)}   ${product.voorraad} op voorraad`;
}

console.log("In de winkel en op voorraad, goedkoopste eerst:");
for (const product of goedkoopsteEerst(opVoorraad(producten.filter(isZichtbaar)))) {
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
