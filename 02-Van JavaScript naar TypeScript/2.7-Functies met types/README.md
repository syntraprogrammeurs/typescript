# 2.7 Functies met types

De eerste echte code van Het Groenhuis: rekenen met prijzen. Maak `src/prijs.ts`:

```ts domein/src/prijs.ts
// Het Groenhuis — rekenen met prijzen
// Alle bedragen zijn in cent: 24,99 euro is 2499.

export const BTW_PLANTEN = 6; // het verlaagde tarief
export const BTW_STANDAARD = 21; // potten, gereedschap, decoratie

export function metBtw(prijsExclInCent: number, btwPercentage: number): number {
  return Math.round(prijsExclInCent * (1 + btwPercentage / 100));
}

export function metKorting(prijsInCent: number, kortingPercentage: number): number {
  return Math.round(prijsInCent * (1 - kortingPercentage / 100));
}

export function alsEuro(prijsInCent: number): string {
  return (prijsInCent / 100).toFixed(2).replace(".", ",") + " euro";
}
```

Lees de eerste functie van links naar rechts:

```ts
export function metBtw(prijsExclInCent: number, btwPercentage: number): number {
```

| Stuk | Betekenis |
|---|---|
| `prijsExclInCent: number` | De eerste parameter moet een getal zijn |
| `btwPercentage: number` | De tweede ook |
| `): number` | De functie geeft een getal terug |

Gebruik ze in `start.ts`:

```ts domein/src/start.ts
// Het Groenhuis — het domein van het CMS

import { alsEuro, BTW_PLANTEN, metBtw, metKorting } from "./prijs.ts";

const winkel = "Het Groenhuis";
const onderdelen = ["domein", "beheer", "server", "api", "winkel"];

console.log(`${winkel} — het domein`);
console.log(`Node.js ${process.version} op ${process.platform}`);
console.log(`Onderdelen dit jaar: ${onderdelen.join(", ")}`);

const monstera = 2499;
const inclBtw = metBtw(monstera, BTW_PLANTEN);
console.log(`Monstera deliciosa: ${alsEuro(monstera)} excl. btw, ${alsEuro(inclBtw)} incl. btw`);
console.log(`Met 20 % korting: ${alsEuro(metKorting(inclBtw, 20))}`);
```

```powershell
npm run check
npm start
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein
Node.js v24.22.1 op win32
Onderdelen dit jaar: domein, beheer, server, api, winkel
Monstera deliciosa: 24,99 euro excl. btw, 26,49 euro incl. btw
Met 20 % korting: 21,19 euro
```

> **BEGRIP — import met .ts**
>
> `import { metBtw } from "./prijs.ts"` haalt een functie uit een ander bestand, zoals je
> in de browser gewend bent. Het enige verschil: je schrijft de extensie **`.ts`**. Node
> zoekt het bestand dat er letterlijk staat, en dat is `prijs.ts`. Hoe modules in
> TypeScript precies werken, zie je in hoofdstuk 14.

Ga in `start.ts` met de muis over `metBtw`. VS Code toont wat de functie verwacht, zonder dat je `prijs.ts` hoeft te openen:

![Ga met de muis over `metBtw`: VS Code toont de parameters en het returntype.](../img/02-parameters.png)

En wat gebeurt er als je de functie verkeerd gebruikt?

```ts domein/src/proef.ts
import { metBtw } from "./prijs.ts";

const a = metBtw("2499", 6);
const b = metBtw(2499);
const c: string = metBtw(2499, 6);
```

```text
src/proef.ts:3:18 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

3 const a = metBtw("2499", 6);
                   ~~~~~~

src/proef.ts:4:11 - error TS2554: Expected 2 arguments, but got 1.

4 const b = metBtw(2499);
            ~~~~~~

  src/prijs.ts:7:49 - An argument for 'btwPercentage' was not provided.
    7 export function metBtw(prijsExclInCent: number, btwPercentage: number): number {
                                                      ~~~~~~~~~~~~~~~~~~~~~

src/proef.ts:5:7 - error TS2322: Type 'number' is not assignable to type 'string'.

5 const c: string = metBtw(2499, 6);
        ~

Found 3 errors in the same file, starting at: src/proef.ts:3
```

| Fout | Wat er misgaat |
|---|---|
| `TS2345` | Een **argument** van het verkeerde type: tekst waar een getal moet |
| `TS2554` | Het verkeerde **aantal** argumenten |
| `TS2322` | De **returnwaarde** past niet in de variabele: een getal in een `string` |

> **CONTROLE**
>
> Haal `proef.ts` weer weg, en voer `npm run check` uit. Geen fouten? Dan is je project in
> orde.
