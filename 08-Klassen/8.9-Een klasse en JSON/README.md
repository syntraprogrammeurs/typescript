# 8.9 Een klasse en JSON

Wat maakt `JSON.stringify` van een `Product`?

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar", 2450, "c4");
console.log(JSON.stringify(schaar));
```

```text
{"id":"8f1914ab-d9ec-4fb4-9ffe-cadf785c5761","slug":"snoeischaar","naam":"Snoeischaar","btwPercentage":21,"categorieId":"c4","tags":[]}
```

De prijs, de voorraad en de status ontbreken: ze staan achter een `#`, en `JSON.stringify` ziet
ze niet. Bewaar je zo een product in een bestand, dan ben je ze kwijt. Een methode **`toJSON`**
lost dat op: als ze bestaat, gebruikt `JSON.stringify` wat ze teruggeeft.

```ts domein/src/product.ts
  /** Wat JSON.stringify bewaart: alle gegevens, ook die achter een # staan. */
  toJSON(): ProductGegevens {
    return {
      id: this.id,
      slug: this.slug,
      status: this.#status,
      naam: this.naam,
      ...(this.beschrijving === undefined ? {} : { beschrijving: this.beschrijving }),
      prijsInCent: this.#prijsInCent,
      btwPercentage: this.btwPercentage,
      voorraad: this.#voorraad,
      categorieId: this.categorieId,
      tags: [...this.tags],
      ...(this.afmetingen === undefined ? {} : { afmetingen: { ...this.afmetingen } }),
    };
  }
}
```

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar", 2450, "c4");
const tekst = JSON.stringify(schaar);
console.log(tekst);

const terug = new Product(JSON.parse(tekst));
console.log(terug.prijsInCent, terug instanceof Product);
```

```text
{"id":"38d448d3-d056-44ba-aeca-dc681374998d","slug":"snoeischaar","status":"concept","naam":"Snoeischaar","prijsInCent":2450,"btwPercentage":21,"voorraad":0,"categorieId":"c4","tags":[]}
2450 true
```

`toJSON` geeft `ProductGegevens` terug: dezelfde vorm als in `producten.json`. Daardoor kan de
constructor ze weer inlezen. `...(this.beschrijving === undefined ? {} : { beschrijving: … })`
voegt het veld alleen toe als het er is: een spread van een leeg object voegt niets toe.

> **LET OP**
>
> Na `JSON.parse` heb je **geen** `Product` meer, maar een gewoon object. Methodes en getters
> zijn weg: in JSON bestaan alleen gegevens. Je maakt er weer een `Product` van met `new
> Product(…)`. Dat heet **hydrateren**, en je doet het in hoofdstuk 16 voor elke opslag.

Gebruik de klasse nu in `start.ts`:

```ts domein/src/start.ts
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

```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

Te koop, goedkoopste eerst:
  Aloe vera                     € 8,47   25 op voorraad
  Terracotta pot 20 cm         € 10,83   40 op voorraad
  Sansevieria trifasciata      € 15,37   12 op voorraad
  Plantenspuit                 € 15,72   15 op voorraad
  Monstera deliciosa           € 26,49   3 op voorraad
  Olijfboom                    € 95,39   2 op voorraad
…
```

De functies uit `zoeken.ts`, zoals `voorraadwaarde`, verwachten `ProductGegevens`. Ze werken
toch met een lijst `Product`: structural typing uit hoofdstuk 4. Een `Product` heeft alle velden
van `ProductGegevens`, sommige als getter.
