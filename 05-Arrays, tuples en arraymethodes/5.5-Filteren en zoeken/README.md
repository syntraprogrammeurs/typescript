# 5.5 Filteren en zoeken

Tijd om dit te gebruiken voor Het Groenhuis. Maak `src/zoeken.ts`:

```ts domein/src/zoeken.ts
// Het Groenhuis — de catalogus doorzoeken

import type { Product } from "./inhoud.ts";

export function opVoorraad(producten: Product[]): Product[] {
  return producten.filter((product) => product.voorraad > 0);
}

export function inCategorie(producten: Product[], categorieId: string): Product[] {
  return producten.filter((product) => product.categorieId === categorieId);
}

export function metTag(producten: Product[], tag: string): Product[] {
  return producten.filter((product) => product.tags.includes(tag));
}

export function zoekOpSlug(producten: Product[], slug: string): Product | undefined {
  return producten.find((product) => product.slug === slug);
}
```

| Methode | Geeft terug | Als er niets is |
|---|---|---|
| `filter` | Een lijst met wat voldoet | Een **lege lijst** |
| `find` | Het **eerste** element dat voldoet | `undefined` |
| `findIndex` | De **plaats** van het eerste element dat voldoet | `-1` |
| `some` | `true` als **minstens één** element voldoet | `false` |
| `every` | `true` als **alle** elementen voldoen | `true` (een lege lijst voldoet altijd) |
| `includes` | `true` als de waarde erin zit | `false` |

`zoekOpSlug` geeft `Product | undefined` terug. Dat is eerlijk: een slug die niet
bestaat, levert niets op. Wie de functie gebruikt, moet daar rekening mee houden:

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";
import { zoekOpSlug } from "./zoeken.ts";

const olijfboom = zoekOpSlug(producten, "olijfboom");
console.log(olijfboom.prijsInCent);
```

```text
src/proef.ts:5:13 - error TS18048: 'olijfboom' is possibly 'undefined'.

5 console.log(olijfboom.prijsInCent);
              ~~~~~~~~~

Found 1 error in src/proef.ts:5
```

> **WAAROM**
>
> Waarom geeft `find` geen fout als er niets gevonden wordt? Omdat *niets gevonden* geen
> fout is: een klant die een verkeerde link volgt, een product dat uit de catalogus
> verdween. Het returntype `Product | undefined` dwingt je erover na te denken op de plaats
> waar je het gebruikt. In de API van deel III wordt dat een `404 Not Found`.
