// Het Groenhuis — het domein van het CMS

import { paginaAlsTekst } from "./blokken.ts";
import { categorieen, paginas } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";
import { laadProducten } from "./laden.ts";
import { alsEuro, metBtw } from "./prijs.ts";
import { aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const producten = laadProducten(new URL("../data/producten.json", import.meta.url));
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

console.log();
for (const pagina of paginas.filter(isZichtbaar)) {
  console.log(paginaAlsTekst(pagina));
  console.log();
}
