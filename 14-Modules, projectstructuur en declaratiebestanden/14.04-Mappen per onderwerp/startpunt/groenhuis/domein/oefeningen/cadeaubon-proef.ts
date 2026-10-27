// Het Groenhuis — de proef van cadeaubon.ts
// Hoofdstuk 11, klassikale oefening 11.1

import { Cadeaubon } from "../src/cadeaubon.ts";
import { Geld } from "../src/geld.ts";
import { Product } from "../src/product.ts";
import { Winkelmandje } from "../src/winkelmandje.ts";

const pot = new Product({
  id: "p06", slug: "terracotta-pot-20", status: "gepubliceerd", naam: "Terracotta pot 20 cm",
  prijsInCent: 895, btwPercentage: 21, voorraad: 40, categorieId: "c3", tags: [],
});

const mandje = new Winkelmandje();
mandje.voegToe(pot);
mandje.voegToe(new Cadeaubon(Geld.vanEuro("25")), 3);
mandje.voegToe(new Cadeaubon(Geld.vanEuro("25")));
console.log(mandje.toon());

try {
  new Cadeaubon(Geld.vanEuro("30"));
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
