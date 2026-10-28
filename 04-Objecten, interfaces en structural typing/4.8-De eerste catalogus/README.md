# 4.8 De eerste catalogus

Het Groenhuis heeft nu een vorm voor zijn inhoud. Tijd voor echte gegevens. Maak
`src/catalogus.ts`:

```ts domein/src/catalogus.ts
// Het Groenhuis — voorbeeldgegevens om mee te werken
// Later komen deze uit een bestand (hoofdstuk 16) en daarna uit een databank (deel IV).

import type { Categorie, Pagina, Product } from "./inhoud.ts";

export const categorieen: Categorie[] = [
  { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" },
  { id: "c2", slug: "buitenplanten", naam: "Buitenplanten" },
  { id: "c3", slug: "potten", naam: "Potten" },
  { id: "c4", slug: "gereedschap", naam: "Gereedschap" },
  { id: "c5", slug: "vetplanten", naam: "Vetplanten", bovenliggendeId: "c1" },
];

export const producten: Product[] = [
  {
    id: "p01",
    slug: "monstera-deliciosa",
    naam: "Monstera deliciosa",
    beschrijving: "Grote, gespleten bladeren. Houdt van licht, maar niet van volle zon.",
    prijsInCent: 2499,
    btwPercentage: 6,
    voorraad: 3,
    categorieId: "c1",
    tags: ["makkelijk", "groot"],
    afmetingen: { hoogteInCm: 60, potmaatInCm: 21 },
  },
  {
    id: "p02",
    slug: "sansevieria-trifasciata",
    naam: "Sansevieria trifasciata",
```

Het bestand gaat zo verder, met acht producten en twee pagina's. Je vindt het volledig
in `lessen/04-Objecten, interfaces en structural typing/4.8-De eerste catalogus`.
Neem het daaruit over in plaats van het over te typen.

De eerste regels verdienen aandacht:

```ts
import type { Categorie, Pagina, Product } from "./inhoud.ts";
```

> **BEGRIP — import type**
>
> **`import type`** haalt alleen **types** uit een bestand, geen waarden. Na het wegvegen
> van de types verdwijnt de hele regel.
>
> *Waarom het verplicht is:* `inhoud.ts` bevat alleen interfaces. Na het wegvegen exporteert
> het **niets**. Een gewone `import { Product }` zou Node laten zoeken naar een export
> `Product` die er niet is. Met `verbatimModuleSyntax` in je `tsconfig.json` dwingt
> TypeScript je dat te zeggen:

```ts domein/src/proef.ts
import { Product } from "./inhoud.ts";

const leeg: Product[] = [];
```

```text
src/proef.ts:1:10 - error TS1484: 'Product' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.

1 import { Product } from "./inhoud.ts";
           ~~~~~~~

Found 1 error in src/proef.ts:1
```

Pas `start.ts` aan, zodat het de catalogus toont:

```ts domein/src/start.ts
// Het Groenhuis — het domein van het CMS

import { categorieen, paginas, producten } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";
import { alsEuro, metBtw } from "./prijs.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);
console.log(`${producten.length} producten, ${categorieen.length} categorieën, ${paginas.length} pagina's`);
console.log();

function prijsregel(product: Product): string {
  const prijs = alsEuro(metBtw(product.prijsInCent, product.btwPercentage));
  const voorraad = product.voorraad > 0 ? `${product.voorraad} op voorraad` : "uitverkocht";
  return `${product.naam.padEnd(26)}${prijs.padStart(10)}   ${voorraad}`;
}

for (const product of producten) {
  console.log(prijsregel(product));
}
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

Monstera deliciosa           € 26,49   3 op voorraad
Sansevieria trifasciata      € 15,37   12 op voorraad
Calathea orbifolia           € 24,33   uitverkocht
Aloe vera                     € 8,47   25 op voorraad
Olijfboom                    € 95,39   2 op voorraad
Terracotta pot 20 cm         € 10,83   40 op voorraad
Plantenspuit                 € 15,72   15 op voorraad
Snoeischaar                  € 29,65   uitverkocht
```

> **CONTROLE**
>
> Verander in `catalogus.ts` bij één product `prijsInCent` in `prijs`. Hoeveel fouten toont
> `npm run check`? Twee: een veld dat niet bestaat, en een verplicht veld dat ontbreekt.
> Zet het terug.

---
