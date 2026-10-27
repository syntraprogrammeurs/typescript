// Het Groenhuis — het mandje vangt een tekort op door het maximum te nemen
// Hoofdstuk 13, klassikale oefening 13.2

import { RegelFout, VoorraadFout } from "../src/fouten/fouten.ts";
import { Product } from "../src/inhoud/product.ts";
import { Winkelmandje } from "../src/winkel/winkelmandje.ts";

const monstera = new Product({
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
});
const calathea = new Product({
  id: "p03", slug: "calathea-orbifolia", status: "gearchiveerd", naam: "Calathea orbifolia",
  prijsInCent: 2295, btwPercentage: 6, voorraad: 0, categorieId: "c1", tags: [],
});

const mandje = new Winkelmandje();

function voegToeZoveelAlsKan(product: Product, aantal: number): void {
  try {
    mandje.voegToe(product, aantal);
  } catch (fout) {
    if (fout instanceof VoorraadFout) {
      const nog = fout.beschikbaar - (fout.gevraagd - aantal);
      console.log(`${fout.message}. We legden er ${nog} in je mandje.`);
      if (nog > 0) {
        mandje.voegToe(product, nog);
      }
    } else if (fout instanceof RegelFout) {
      console.log(`Niet toegevoegd: ${fout.message}`);
    } else {
      throw fout;
    }
  }
}

voegToeZoveelAlsKan(monstera, 2);
voegToeZoveelAlsKan(monstera, 5);
voegToeZoveelAlsKan(calathea, 1);
console.log(mandje.toon());
console.log(new VoorraadFout("x", 2, 1) instanceof RegelFout);
