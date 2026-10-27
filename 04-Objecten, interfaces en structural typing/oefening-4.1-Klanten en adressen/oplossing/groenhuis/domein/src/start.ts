// Het Groenhuis — het domein van het CMS

import { categorieen, paginas, producten } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";
import { alsEuro, metBtw } from "./prijs.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  const prijs = alsEuro(metBtw(product.prijsInCent, product.btwPercentage));
  const voorraad = product.voorraad > 0 ? `${product.voorraad} op voorraad` : "uitverkocht";
  return `${product.naam.padEnd(26)}${prijs.padStart(10)}   ${voorraad}`;
}

for (const product of producten) {
  console.log(prijsregel(product));
}
