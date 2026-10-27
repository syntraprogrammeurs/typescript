// Het Groenhuis — het winkelmandje van een klant
// Hoofdstuk 8, klassikale oefening 8.1, met Geld uit hoofdstuk 9

import { Geld } from "./geld.ts";
import { Product } from "./product.ts";

interface Mandregel {
  product: Product;
  aantal: number;
}

export class Winkelmandje {
  #regels: Mandregel[] = [];

  voegToe(product: Product, aantal = 1): void {
    if (!product.isTeKoop) {
      throw new Error(`${product.naam} is niet te koop`);
    }
    const regel = this.#regels.find((kandidaat) => kandidaat.product.id === product.id);
    const totaal = (regel?.aantal ?? 0) + aantal;
    if (totaal > product.voorraad) {
      throw new Error(`Er zijn maar ${product.voorraad} stuks van ${product.naam}`);
    }
    if (regel === undefined) {
      this.#regels.push({ product, aantal });
    } else {
      regel.aantal = totaal;
    }
  }

  verwijder(productId: string): void {
    this.#regels = this.#regels.filter((regel) => regel.product.id !== productId);
  }

  get aantalStuks(): number {
    return this.#regels.reduce((som, regel) => som + regel.aantal, 0);
  }

  get totaal(): Geld {
    return Geld.som(...this.#regels.map((regel) => regel.product.prijsInclBtw.maal(regel.aantal)));
  }

  get isLeeg(): boolean {
    return this.#regels.length === 0;
  }

  toon(): string {
    if (this.isLeeg) {
      return "Je mandje is leeg.";
    }
    const regels = this.#regels.map(
      ({ product, aantal }) => `${String(aantal).padStart(2)} x ${product.naam.padEnd(24)} ${String(product.prijsInclBtw.maal(aantal)).padStart(10)}`,
    );
    return [...regels, `${"".padEnd(29)}${String(this.totaal).padStart(10)}`].join("\n");
  }
}

const monstera = new Product({
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
});
const pot = new Product({
  id: "p06", slug: "terracotta-pot-20", status: "gepubliceerd", naam: "Terracotta pot 20 cm",
  prijsInCent: 895, btwPercentage: 21, voorraad: 40, categorieId: "c3", tags: [],
});
const snoeischaar = Product.nieuw("Snoeischaar", Geld.vanEuro("24,50"), "c4");

const mandje = new Winkelmandje();
console.log(mandje.toon());
mandje.voegToe(monstera);
mandje.voegToe(pot, 2);
mandje.voegToe(monstera);
console.log(mandje.toon());
console.log(`${mandje.aantalStuks} stuks`);

for (const poging of [() => mandje.voegToe(monstera, 2), () => mandje.voegToe(snoeischaar)]) {
  try {
    poging();
  } catch (fout) {
    console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}

mandje.verwijder("p06");
console.log(mandje.toon());
