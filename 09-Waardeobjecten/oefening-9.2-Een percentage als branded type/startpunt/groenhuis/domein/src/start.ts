// Het Groenhuis — het domein van het CMS

import { paginaAlsTekst } from "./blokken.ts";
import { categorieen, paginas } from "./catalogus.ts";
import { Geld } from "./geld.ts";
import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";
import { isZichtbaar } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const producten = laadProducten(new URL("../data/producten.json", import.meta.url)).map(
  (gegevens) => new Product(gegevens),
);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  return `${product.naam.padEnd(26)}${String(product.prijsInclBtw).padStart(10)}   ${product.voorraad} op voorraad`;
}

console.log("Te koop, goedkoopste eerst:");
const teKoop = producten.filter((product) => product.isTeKoop);
for (const product of teKoop.toSorted((a, b) => a.prijsInclBtw.inCent - b.prijsInclBtw.inCent)) {
  console.log(`  ${prijsregel(product)}`);
}
console.log();

const voorraadwaarde = Geld.som(...producten.map((product) => product.prijs.maal(product.voorraad)));
console.log(`Waarde van de voorraad (excl. btw): ${voorraadwaarde}`);

console.log();
for (const pagina of paginas.filter(isZichtbaar)) {
  console.log(paginaAlsTekst(pagina));
  console.log();
}
