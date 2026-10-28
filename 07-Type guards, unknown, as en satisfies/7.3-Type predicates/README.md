# 7.3 Type predicates

Een **type predicate** is een functie die `true` of `false` teruggeeft, en TypeScript
daarbij vertelt wat `true` betekent. Maak `src/controle.ts`. Eerst drie kleine
controles:

```ts domein/src/controle.ts
// Het Groenhuis — gegevens van buiten nakijken voor je ze vertrouwt

import { STATUSSEN, type Inhoudsstatus, type Product } from "./inhoud.ts";

/** Een object waarvan je de velden nog niet kent. */
export type OnbekendObject = { [sleutel: string]: unknown };

export function isObject(waarde: unknown): waarde is OnbekendObject {
  return typeof waarde === "object" && waarde !== null && !Array.isArray(waarde);
}

export function isTekstlijst(waarde: unknown): waarde is string[] {
  return Array.isArray(waarde) && waarde.every((element) => typeof element === "string");
}

export function isInhoudsstatus(waarde: unknown): waarde is Inhoudsstatus {
  return STATUSSEN.some((status) => status === waarde);
}
```

Kijk naar het returntype van `isObject`:

```ts
export function isObject(waarde: unknown): waarde is OnbekendObject {
```

**`waarde is OnbekendObject`** betekent: *als deze functie `true` teruggeeft, dan is
`waarde` een `OnbekendObject`*. TypeScript gebruikt dat zoals een `typeof` in een `if`:

```ts domein/src/proef.ts
import { isObject, isTekstlijst } from "./controle.ts";

const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera", "tags": ["makkelijk"] }');

if (isObject(gegevens) && isTekstlijst(gegevens.tags)) {
  console.log(gegevens.tags.join(", "));
}
```

```text
makkelijk
```

![Na `isTekstlijst(gegevens.tags)` weet TypeScript dat `tags` een `string[]` is.](../img/07-predicate.png)

> **BEGRIP — Type predicate**
>
> Een **type predicate** is het returntype `waarde is T` van een functie die `boolean`
> teruggeeft. Wie de functie in een `if` gebruikt, krijgt binnen de `if` het type `T`.
>
> *Opgelet:* TypeScript **controleert niet** of je functie klopt. Schrijf je `return
> true`, dan gelooft TypeScript dat alles een `Product` is. Een type predicate is een
> belofte van jou aan TypeScript. Test ze daarom goed: dat doe je in hoofdstuk 15.

`isInhoudsstatus` gebruikt de lijst `STATUSSEN`. Die zet je in `inhoud.ts`, naast het
type, met `as const` uit hoofdstuk 6:

```ts domein/src/inhoud.ts
/** Een product, categorie of pagina is eerst een concept, wordt dan gepubliceerd, en later gearchiveerd. */
export type Inhoudsstatus = "concept" | "gepubliceerd" | "gearchiveerd";

/** Dezelfde statussen, als lijst die ook bij het uitvoeren bestaat. */
export const STATUSSEN = ["concept", "gepubliceerd", "gearchiveerd"] as const;
```

Nu de controle van een volledig product. In plaats van alleen `true` of `false` geeft ze
een lijst terug met **wat** er niet klopt. Die lijst heb je nodig voor een goede
foutmelding. `isBedrag` bovenaan is een kleine hulp: een geheel getal, niet negatief.

```ts domein/src/controle.ts
function isBedrag(waarde: unknown): waarde is number {
  return typeof waarde === "number" && Number.isInteger(waarde) && waarde >= 0;
}

/** Alles wat niet klopt aan een product, in gewone woorden. Een lege lijst: alles klopt. */
export function foutenInProduct(waarde: unknown): string[] {
  if (!isObject(waarde)) {
    return ["is geen object"];
  }
  const fouten: string[] = [];
  for (const veld of ["id", "slug", "naam", "categorieId"]) {
    if (typeof waarde[veld] !== "string") {
      fouten.push(`${veld} ontbreekt of is geen tekst`);
    }
  }
  if (!isInhoudsstatus(waarde.status)) {
    fouten.push(`status moet ${STATUSSEN.join(", ")} zijn`);
  }
  if (waarde.beschrijving !== undefined && typeof waarde.beschrijving !== "string") {
    fouten.push("beschrijving is geen tekst");
  }
  for (const veld of ["prijsInCent", "btwPercentage", "voorraad"]) {
    if (!isBedrag(waarde[veld])) {
      fouten.push(`${veld} ontbreekt of is geen geheel getal vanaf 0`);
    }
  }
  if (!isTekstlijst(waarde.tags)) {
    fouten.push("tags is geen lijst teksten");
  }
  if (waarde.afmetingen !== undefined) {
    const afmetingen = waarde.afmetingen;
    if (!isObject(afmetingen) || typeof afmetingen.hoogteInCm !== "number" || typeof afmetingen.potmaatInCm !== "number") {
      fouten.push("afmetingen moet een hoogteInCm en een potmaatInCm hebben");
    }
  }
  return fouten;
}

export function isProduct(waarde: unknown): waarde is Product {
  return foutenInProduct(waarde).length === 0;
}
```

`isProduct` is daarna één regel: een product is in orde als er geen fouten zijn.

> **LET OP**
>
> **`waarde[veld]` werkt alleen op een `OnbekendObject`.** Na `isObject(waarde)` heeft
> `waarde` een index signature: elke sleutel geeft `unknown`. Daarom mag je de velden met
> een lus over hun naam nakijken. Op een `Product` zou `waarde[veld]` met een willekeurige
> tekst een fout geven: TypeScript weet dan niet welk veld je bedoelt.

Probeer het met een paar kapotte producten:

```ts domein/src/proef.ts
import { foutenInProduct } from "./controle.ts";

const kapot: unknown[] = [
  "Aloe vera",
  { id: "p04", slug: "aloe-vera", naam: "Aloe vera", categorieId: "c5", status: "gepubliceerd",
    prijsInCent: "7,99", btwPercentage: 6, voorraad: 25, tags: [] },
  { id: "p05", slug: "olijfboom", naam: "Olijfboom", categorieId: "c2", status: "verkocht",
    prijsInCent: 8999, btwPercentage: 6, voorraad: -2, tags: "buiten" },
];

for (const waarde of kapot) {
  console.log(foutenInProduct(waarde));
}
```

```text
[ 'is geen object' ]
[ 'prijsInCent ontbreekt of is geen geheel getal vanaf 0' ]
[
  'status moet concept, gepubliceerd, gearchiveerd zijn',
  'voorraad ontbreekt of is geen geheel getal vanaf 0',
  'tags is geen lijst teksten'
]
```
