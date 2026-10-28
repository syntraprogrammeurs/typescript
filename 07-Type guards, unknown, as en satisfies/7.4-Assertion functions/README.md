# 7.4 Assertion functions

Een type predicate geeft `true` of `false`, en jij beslist wat er gebeurt. Vaak wil je
gewoon: *klopt het niet, stop dan met een duidelijke fout*. Daarvoor is er een **assertion
function**. Voeg ze toe aan `controle.ts`:

```ts domein/src/controle.ts
export function controleerProduct(waarde: unknown, waar: string): asserts waarde is Product {
  const fouten = foutenInProduct(waarde);
  if (fouten.length > 0) {
    throw new Error(`${waar}: ${fouten.join("; ")}`);
  }
}
```

**`asserts waarde is Product`** betekent: *als deze functie terugkeert zonder fout, dan
is `waarde` een `Product`*. Na de aanroep hoeft er geen `if` meer:

```ts domein/src/proef.ts
import { controleerProduct } from "./controle.ts";

const goed: unknown = JSON.parse(`{ "id": "p04", "slug": "aloe-vera", "naam": "Aloe vera",
  "categorieId": "c5", "status": "gepubliceerd", "prijsInCent": 799, "btwPercentage": 6,
  "voorraad": 25, "tags": ["makkelijk"] }`);

controleerProduct(goed, "aloe");
console.log(`${goed.naam} kost ${goed.prijsInCent} cent`);

const slecht: unknown = JSON.parse(`{ "naam": "Aloe vera" }`);
controleerProduct(slecht, "het tweede product");
console.log("deze regel wordt nooit bereikt");
```

```text
Aloe vera kost 799 cent
file:///C:/cursus/groenhuis/domein/src/controle.ts:65
    throw new Error(`${waar}: ${fouten.join("; ")}`);
          ^

Error: het tweede product: id ontbreekt of is geen tekst; slug ontbreekt of is geen tekst; categorieId ontbreekt of is geen tekst; status moet concept, gepubliceerd, gearchiveerd zijn; prijsInCent ontbreekt of is geen geheel getal vanaf 0; btwPercentage ontbreekt of is geen geheel getal vanaf 0; voorraad ontbreekt of is geen geheel getal vanaf 0; tags is geen lijst teksten
    at controleerProduct (file:///C:/cursus/groenhuis/domein/src/controle.ts:65:11)
    at file:///C:/cursus/groenhuis/domein/src/proef.ts:11:1
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

| | Type predicate | Assertion function |
|---|---|---|
| Returntype | `waarde is T` | `asserts waarde is T` |
| Geeft terug | `true` of `false` | niets, of gooit een fout |
| Gebruik | `if (isProduct(x)) { … }`, `lijst.filter(isProduct)` | `controleerProduct(x, "…");` en daarna gewoon verder |
| Wanneer | Als *niet in orde* een gewone mogelijkheid is | Als *niet in orde* een fout is die het programma moet stoppen |
