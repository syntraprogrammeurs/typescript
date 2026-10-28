# 5.8 `readonly`-lijsten

Dat `sort` de lijst zelf wijzigt, is precies de soort fout die je wilt laten tegenhouden.
Een **`readonly`-lijst** kun je lezen, maar niet wijzigen:

```ts domein/src/proef.ts
const tags: readonly string[] = ["makkelijk", "groot"];

tags.push("buiten");
tags.sort();
tags[0] = "eenvoudig";

const gesorteerd = tags.toSorted();
console.log(gesorteerd, tags.length, tags.includes("groot"));
```

```text
src/proef.ts:3:6 - error TS2339: Property 'push' does not exist on type 'readonly string[]'.

3 tags.push("buiten");
       ~~~~

src/proef.ts:4:6 - error TS2339: Property 'sort' does not exist on type 'readonly string[]'.

4 tags.sort();
       ~~~~

src/proef.ts:5:1 - error TS2542: Index signature in type 'readonly string[]' only permits reading.

5 tags[0] = "eenvoudig";
  ~~~~~~~

Found 3 errors in the same file, starting at: src/proef.ts:3
```

Alles wat leest, mag: `length`, `includes`, `map`, `filter`, `toSorted`. Alles wat de
lijst zelf wijzigt, bestaat niet op een `readonly`-lijst: `push`, `pop`, `sort`,
`splice`, en een element vervangen.

Maak de catalogus en de parameters van `zoeken.ts` `readonly`:

```ts domein/src/catalogus.ts
export const categorieen: readonly Categorie[] = [
```

```ts domein/src/zoeken.ts
export function opVoorraad(producten: readonly Product[]): Product[] {
  return producten.filter((product) => product.voorraad > 0);
}
```

> **WAAROM**
>
> Waarom bij de **parameters**? Een functie met `producten: readonly Product[]` belooft dat
> ze de lijst niet wijzigt. Je kunt er elke lijst aan geven, gewone of `readonly`. Omgekeerd
> niet: een `readonly`-lijst aan een functie geven die een gewone lijst wil, weigert
> TypeScript. Die functie zou de lijst immers kunnen wijzigen:

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";

function sorteerOpNaam(lijst: Product[]): Product[] {
  return lijst.sort((a, b) => a.naam.localeCompare(b.naam, "nl"));
}

sorteerOpNaam(producten);
```

```text
src/proef.ts:8:15 - error TS4104: The type 'readonly Product[]' is 'readonly' and cannot be assigned to the mutable type 'Product[]'.

8 sorteerOpNaam(producten);
                ~~~~~~~~~

Found 1 error in src/proef.ts:8
```

> **BEGRIP — readonly bij een lijst**
>
> `readonly Product[]` beschermt de **lijst**: geen elementen erbij, eraf of vervangen.
> De **producten erin** blijven wijzigbaar: `producten[0].voorraad = 5` mag nog altijd,
> als het veld zelf niet `readonly` is. Hoe je ook de elementen beschermt, zie je in
> hoofdstuk 18 met `Readonly<T>`.
