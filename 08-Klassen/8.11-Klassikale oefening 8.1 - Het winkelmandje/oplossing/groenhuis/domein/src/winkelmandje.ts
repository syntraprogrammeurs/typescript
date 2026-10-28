// 8.11 Klassikale oefening 8.1 — Het winkelmandje
//
// De situatie. Een klant verzamelt producten in een winkelmandje. Een product kan er alleen in als
// het te koop is, en nooit meer stuks dan er in voorraad zijn. Twee keer hetzelfde product
// toevoegen verhoogt het aantal.
//
// Wat je maakt. Een klasse Winkelmandje in src/winkelmandje.ts:
//
// 1. Een private lijst regels, elk met een product en een aantal.
// 2. voegToe(product, aantal = 1), met de twee regels uit de situatie.
// 3. verwijder(productId).
// 4. Getters aantalStuks, totaalInCent (met btw) en isLeeg.
// 5. toon(): een tekst met een regel per product en het totaal, of Je mandje is leeg.
// 6. Probeer onderaan: een leeg mandje, twee producten toevoegen, één ervan twee keer, te veel
//    stuks, een product dat niet te koop is, en een product verwijderen.
//
// Opbouw van dit bestand:
// import alsEuro uit "./prijs.ts"
// import Product uit "./product.ts"
// interface Mandregel — de vorm van een object met 2 leden:
//     product: Product
//     aantal: number
// export class Winkelmandje — met 7 leden:
//     #regels: Mandregel[] = []
//     voegToe(product: Product, aantal = 1): void
//     verwijder(productId: string): void
//     get aantalStuks: number
//     get totaalInCent: number
//     get isLeeg: boolean
//     toon(): string
// const monstera = een nieuw object: new Product({ id: "p01", slug: "monstera-deliciosa", status:
//     "gepubliceerd", naam: "Monstera deliciosa", prij…
// const pot = een nieuw object: new Product({ id: "p06", slug: "terracotta-pot-20", status:
//     "gepubliceerd", naam: "Terracotta pot 20 cm", pri…
// const snoeischaar = het resultaat van Product.nieuw("Snoeischaar", 2450, "c4")
// const mandje = een nieuw object: new Winkelmandje()
// console.log(…) toont: mandje.toon()
// roept mandje.voegToe(…) aan: mandje.voegToe(monstera)
// roept mandje.voegToe(…) aan: mandje.voegToe(pot, 2)
// roept mandje.voegToe(…) aan: mandje.voegToe(monstera)
// console.log(…) toont: mandje.toon()
// console.log(…) toont: `${mandje.aantalStuks} stuks`
// for … of: een lus over [() => mandje.voegToe(monstera, 2), () => mandje.voegToe(snoeischaar)]
// roept mandje.verwijder(…) aan: mandje.verwijder("p06")
// console.log(…) toont: mandje.toon()

// Het Groenhuis — het winkelmandje van een klant
// Hoofdstuk 8, klassikale oefening 8.1

import { alsEuro } from "./prijs.ts";
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

  get totaalInCent(): number {
    return this.#regels.reduce((som, regel) => som + regel.product.prijsInclBtw * regel.aantal, 0);
  }

  get isLeeg(): boolean {
    return this.#regels.length === 0;
  }

  toon(): string {
    if (this.isLeeg) {
      return "Je mandje is leeg.";
    }
    const regels = this.#regels.map(
      ({ product, aantal }) => `${String(aantal).padStart(2)} x ${product.naam.padEnd(24)} ${alsEuro(product.prijsInclBtw * aantal).padStart(10)}`,
    );
    return [...regels, `${"".padEnd(29)}${alsEuro(this.totaalInCent).padStart(10)}`].join("\n");
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
const snoeischaar = Product.nieuw("Snoeischaar", 2450, "c4");

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
