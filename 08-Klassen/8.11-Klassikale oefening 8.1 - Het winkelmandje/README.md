# 8.11 Klassikale oefening 8.1 — Het winkelmandje

**De situatie.** Een klant verzamelt producten in een winkelmandje. Een product kan er alleen
in als het te koop is, en nooit meer stuks dan er in voorraad zijn. Twee keer hetzelfde
product toevoegen verhoogt het aantal.

**Wat je maakt.** Een klasse `Winkelmandje` in `src/winkelmandje.ts`:

1. Een private lijst regels, elk met een `product` en een `aantal`.
2. `voegToe(product, aantal = 1)`, met de twee regels uit de situatie.
3. `verwijder(productId)`.
4. Getters `aantalStuks`, `totaalInCent` (met btw) en `isLeeg`.
5. `toon()`: een tekst met een regel per product en het totaal, of *Je mandje is leeg.*
6. Probeer onderaan: een leeg mandje, twee producten toevoegen, één ervan twee keer, te veel
   stuks, een product dat niet te koop is, en een product verwijderen.

### Uitwerking van oefening 8.1

```ts domein/src/winkelmandje.ts
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
```

```text
Je mandje is leeg.
 2 x Monstera deliciosa          € 52,98
 2 x Terracotta pot 20 cm        € 21,66
                                € 74,64
4 stuks
Geweigerd: Er zijn maar 3 stuks van Monstera deliciosa
Geweigerd: Snoeischaar is niet te koop
 2 x Monstera deliciosa          € 52,98
                                € 52,98
```

**`#regels` begint als lege lijst, zonder constructor.** Een veld mag zijn beginwaarde krijgen
waar het genoemd wordt. Een klasse zonder constructor krijgt er vanzelf een zonder parameters.

**De controle telt wat er al in zit.** Twee keer een monstera toevoegen, als er drie zijn, mag.
Daarna nog twee niet: `regel?.aantal ?? 0` telt de twee in het mandje mee. Wie alleen `aantal >
product.voorraad` controleert, laat de klant er stuk per stuk tien in leggen.

**`regel.aantal = totaal` wijzigt de regel zelf.** Dat mag hier: de regels zijn van het mandje,
en niemand anders heeft ze. `#regels` geeft de lijst nooit naar buiten. Vergelijk met de getter
`blokken` in oefening 8.2, die de lijst wél toont, maar als `readonly`.

**Het mandje bewaart de producten, niet hun prijs.** `totaalInCent` rekent met de prijs van
**nu**. Wijzigt de prijs terwijl het product in het mandje ligt, dan ziet de klant de nieuwe
prijs. Een **bestelling** zal in deel VII de prijs op het moment van bestellen wel bewaren.

**`snoeischaar` is een concept.** `Product.nieuw` maakt altijd een concept zonder voorraad. Het
mandje weigert ze dus om twee redenen; de melding noemt de eerste.

---
