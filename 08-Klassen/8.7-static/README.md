# 8.7 `static`

Soms hoort iets bij de klasse zelf, en niet bij één object. Dat krijgt **`static`**:

```ts domein/src/product.ts
  static readonly STANDAARD_BTW = 21;

  /** Een nieuw product, nog als concept, zonder voorraad. */
  static nieuw(naam: string, prijsInCent: number, categorieId: string): Product {
    return new Product({
      id: crypto.randomUUID(),
      slug: Product.slugVan(naam),
      status: "concept",
      naam,
      prijsInCent,
      btwPercentage: Product.STANDAARD_BTW,
      voorraad: 0,
      categorieId,
      tags: [],
    });
  }

  /** "Terracotta pot 20 cm" wordt "terracotta-pot-20-cm". */
  static slugVan(naam: string): string {
    return naam
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
```

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const schaar = Product.nieuw("Snoeischaar Felco 2", 4995, "c4");
console.log(schaar.slug, schaar.status, schaar.voorraad, schaar.btwPercentage);
console.log(Product.slugVan("Aloë vera & co"));
console.log(schaar.id.length);
```

```text
snoeischaar-felco-2 concept 0 21
aloe-vera-co
36
```

| | Gewoon | `static` |
|---|---|---|
| Hoort bij | elk object apart | de klasse |
| Je roept het op met | `schaar.publiceer()` | `Product.nieuw(…)` |
| Kent `this` als | het object | de klasse zelf |
| Voorbeeld | `prijsInclBtw`, `publiceer()` | `STANDAARD_BTW`, `nieuw()`, `slugVan()` |

`Product.nieuw` is een **fabrieksmethode**: een andere manier om een object te maken, met een
naam die zegt waarvoor. Een nieuw product krijgt altijd een nieuwe `id`, een slug uit de naam,
de status *concept* en geen voorraad. Wie `Product.nieuw` gebruikt, kan die regels niet
vergeten.

`crypto.randomUUID()` maakt een **UUID**: een willekeurige `id` van 36 tekens die nooit twee
keer dezelfde is. Databanken gebruiken ze ook, in deel IV.
