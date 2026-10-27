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
