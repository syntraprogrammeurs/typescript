# 8.4 De klasse `Product`

Maak `src/product.ts`:

```ts domein/src/product.ts
// Het Groenhuis — een product, met de regels die erbij horen

import type { Afmetingen, Inhoudsstatus, ProductGegevens } from "./inhoud.ts";
import { metBtw } from "./prijs.ts";

export class Product {
  readonly id: string;
  slug: string;
  naam: string;
  beschrijving?: string;
  btwPercentage: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
  #prijsInCent: number;
  #voorraad: number;
  #status: Inhoudsstatus;

  constructor(gegevens: ProductGegevens) {
    this.id = gegevens.id;
    this.slug = gegevens.slug;
    this.naam = gegevens.naam;
    if (gegevens.beschrijving !== undefined) {
      this.beschrijving = gegevens.beschrijving;
    }
    this.btwPercentage = gegevens.btwPercentage;
    this.categorieId = gegevens.categorieId;
    this.tags = [...gegevens.tags];
    if (gegevens.afmetingen !== undefined) {
      this.afmetingen = { ...gegevens.afmetingen };
    }
    this.#prijsInCent = gegevens.prijsInCent;
    this.#voorraad = gegevens.voorraad;
    this.#status = gegevens.status;
  }
```

De constructor krijgt `ProductGegevens`: zo maak je van de gegevens uit het JSON-bestand een
`Product` met regels.

### Velden met een `#`

Drie velden beginnen met een **`#`**: `#prijsInCent`, `#voorraad` en `#status`. Dat zijn
**private velden**: ze bestaan alleen **binnen** de klasse. Van buiten kan niemand ze lezen of
wijzigen, ook niet in JavaScript:

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const aloe = new Product({
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
});

aloe.#voorraad = -5;
console.log(aloe.voorraad);
aloe.voorraad = -5;
```

```text
src/proef.ts:8:6 - error TS18013: Property '#voorraad' is not accessible outside class 'Product' because it has a private identifier.

8 aloe.#voorraad = -5;
       ~~~~~~~~~

src/proef.ts:10:6 - error TS2540: Cannot assign to 'voorraad' because it is a read-only property.

10 aloe.voorraad = -5;
        ~~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:8
```

Wie de voorraad wil lezen, gebruikt `aloe.voorraad`, zonder `#`. Dat is een **getter**, uit
8.5. Wie ze wil wijzigen, moet langs `pasVoorraadAan`, uit 8.6.

### Optionele velden in een klasse

Kijk naar `beschrijving` in de constructor:

```ts
    if (gegevens.beschrijving !== undefined) {
      this.beschrijving = gegevens.beschrijving;
    }
```

Waarom niet gewoon `this.beschrijving = gegevens.beschrijving`? Door
`exactOptionalPropertyTypes` uit hoofdstuk 4. `gegevens.beschrijving` kan `undefined` zijn,
en `undefined` toekennen aan een veld met een `?` mag niet: het veld moet dan **ontbreken**.

```ts domein/src/proef.ts
interface Gegevens {
  beschrijving?: string;
}

class Plant {
  beschrijving?: string;

  constructor(gegevens: Gegevens) {
    this.beschrijving = gegevens.beschrijving;
  }
}
```

```text
src/proef.ts:9:5 - error TS2412: Type 'string | undefined' is not assignable to type 'string' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
  Type 'undefined' is not assignable to type 'string'.

9     this.beschrijving = gegevens.beschrijving;
      ~~~~~~~~~~~~~~~~~

Found 1 error in src/proef.ts:9
```

### Kopieën van lijsten en objecten

`this.tags = [...gegevens.tags]` maakt een **kopie** van de lijst. Zonder kopie zouden het
product en de gegevens dezelfde lijst delen: een tag toevoegen aan het ene, voegt ze ook
toe aan het andere. Een klasse die haar eigen gegevens bewaakt, maakt kopieën van wat ze
binnenkrijgt.
