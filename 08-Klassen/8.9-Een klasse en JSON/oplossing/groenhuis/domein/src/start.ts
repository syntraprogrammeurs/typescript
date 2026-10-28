// 8.9 Een klasse en JSON — Het Groenhuis, deel I
//
// Wat maakt JSON.stringify van een Product?
//
// Opbouw van dit bestand:
// import paginaAlsTekst uit "./blokken.ts"
// import categorieen, paginas uit "./catalogus.ts"
// import laadProducten uit "./laden.ts"
// import Product uit "./product.ts"
// import alsEuro uit "./prijs.ts"
// import aantalPerCategorie, isZichtbaar, prijsbereik, voorraadwaarde uit "./zoeken.ts"
// console.log(…) toont: `Het Groenhuis — het domein (Node.js ${process.version})`
// const producten = het resultaat van laadProducten(new URL("../data/producten.json",
//     import.meta.url)).map( (gegevens) => new Product(gegevens), )
// console.log(…) toont: `${producten.length} producten, ${categorieen.length} categorieën,
//     ${paginas.le…
// console.log(…) toont:
// function prijsregel(product: Product): string
// console.log(…) toont: "Te koop, goedkoopste eerst:"
// const teKoop = het resultaat van producten.filter((product) => product.isTeKoop)
// for … of: een lus over teKoop.toSorted((a, b) => a.prijsInclBtw - b.prijsInclBtw)
// console.log(…) toont:
// console.log(…) toont: `Waarde van de voorraad (excl. btw):
//     ${alsEuro(voorraadwaarde(producten))}`
// console.log(…) toont: "Producten per categorie:", aantalPerCategorie(producten)
// const bereik = het resultaat van prijsbereik(producten)
// if (bereik !== undefined) …
// console.log(…) toont:
// for … of: een lus over paginas.filter(isZichtbaar)

// Het Groenhuis — het domein van het CMS

import { paginaAlsTekst } from "./blokken.ts";
import { categorieen, paginas } from "./catalogus.ts";
import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";
import { alsEuro } from "./prijs.ts";
import { aantalPerCategorie, isZichtbaar, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const producten = laadProducten(new URL("../data/producten.json", import.meta.url)).map(
  (gegevens) => new Product(gegevens),
);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  const prijs = alsEuro(product.prijsInclBtw);
  return `${product.naam.padEnd(26)}${prijs.padStart(10)}   ${product.voorraad} op voorraad`;
}

console.log("Te koop, goedkoopste eerst:");
const teKoop = producten.filter((product) => product.isTeKoop);
for (const product of teKoop.toSorted((a, b) => a.prijsInclBtw - b.prijsInclBtw)) {
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
