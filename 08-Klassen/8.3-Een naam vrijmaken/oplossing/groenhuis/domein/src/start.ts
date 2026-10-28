// 8.3 Een naam vrijmaken — Het Groenhuis, deel I
//
// De klasse die je gaat schrijven, heet Product. Maar Product is al de naam van de interface in
// inhoud.ts. Die interface blijft nodig: ze beschrijft de gegevens van een product, zoals ze in
// een JSON-bestand staan. Geef ze daarom een duidelijkere naam: ProductGegevens.
//
// Opbouw van dit bestand:
// import paginaAlsTekst uit "./blokken.ts"
// import categorieen, paginas uit "./catalogus.ts"
// import ProductGegevens uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// import laadProducten uit "./laden.ts"
// import alsEuro, metBtw uit "./prijs.ts"
// import aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik,
//     voorraadwaarde uit "./zoeken.ts"
// console.log(…) toont: `Het Groenhuis — het domein (Node.js ${process.version})`
// const producten = het resultaat van laadProducten(new URL("../data/producten.json",
//     import.meta.url))
// console.log(…) toont: `${producten.length} producten, ${categorieen.length} categorieën,
//     ${paginas.le…
// console.log(…) toont:
// function prijsregel(product: ProductGegevens): string
// console.log(…) toont: "In de winkel en op voorraad, goedkoopste eerst:"
// for … of: een lus over goedkoopsteEerst(opVoorraad(producten.filter(isZichtbaar)))
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
import type { ProductGegevens } from "./inhoud.ts";
import { laadProducten } from "./laden.ts";
import { alsEuro, metBtw } from "./prijs.ts";
import { aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const producten = laadProducten(new URL("../data/producten.json", import.meta.url));
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: ProductGegevens): string {
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
