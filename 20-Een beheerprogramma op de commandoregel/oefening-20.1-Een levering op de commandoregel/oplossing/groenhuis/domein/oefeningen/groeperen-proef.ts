// Het Groenhuis — de proef van groeperen.ts
// Hoofdstuk 12, klassikale oefening 12.1

import { groepeer, uniek } from "../src/hulp/groeperen.ts";
import { laadProducten } from "../src/opslag/laden.ts";
import { Product } from "../src/inhoud/product.ts";

const gegevens = await laadProducten(new URL("../data/producten.json", import.meta.url));
const producten = gegevens.map((g) => new Product(g));

for (const [status, groep] of groepeer(producten, (product) => product.status)) {
  console.log(`${status}: ${groep.map((product) => product.naam).join(", ")}`);
}
const perBtw = groepeer(producten, (product) => product.btwPercentage);
console.log(`Tarieven: ${[...perBtw.keys()].join(" en ")} procent`);
const alleTags: string[] = [];
for (const product of producten) {
  alleTags.push(...product.tags);
}
console.log(`Alle tags: ${uniek(alleTags).join(", ")}`);
console.log(`Een product per categorie: ${uniek(producten, (product) => product.categorieId).map((p) => p.naam).join(", ")}`);
