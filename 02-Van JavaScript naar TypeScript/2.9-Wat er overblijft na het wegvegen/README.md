# 2.9 Wat er overblijft na het wegvegen

Je kunt zelf zien wat Node van een TypeScript-bestand maakt. Node heeft er een functie
voor:

```ts domein/src/proef.ts
import { stripTypeScriptTypes } from "node:module";

const code = `export function metBtw(prijs: number, btw: number): number {
  return Math.round(prijs * (1 + btw / 100));
}`;

console.log(stripTypeScriptTypes(code));
```

```text
export function metBtw(prijs        , btw        )         {
  return Math.round(prijs * (1 + btw / 100));
}
(node:12345) ExperimentalWarning: stripTypeScriptTypes is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
```

Elk type is vervangen door spaties. De rest blijft letter voor letter staan. Daarom
kloppen de regels en kolommen in een foutmelding van Node met je eigen bestand.

De waarschuwing *ExperimentalWarning* gaat over de functie `stripTypeScriptTypes` zelf,
niet over het uitvoeren van TypeScript. Die functie heb je verder nooit nodig.

> **BEGRIP — erasableSyntaxOnly**
>
> TypeScript kent een paar onderdelen die je niet kunt wegvegen, omdat ze zelf JavaScript
> **maken**: `enum`, `namespace` en *parameter properties* in een constructor. Node kan
> die niet uitvoeren. **`erasableSyntaxOnly`** laat `tsc` ze weigeren, zodat je ze niet per
> ongeluk gebruikt.
>
> *Wanneer je ze toch tegenkomt:* in oudere projecten, en in NestJS (deel VII), dat zijn
> code eerst laat vertalen. Wat ze doen en wat je in de plaats gebruikt, zie je in
> hoofdstuk 8 en 18.

---
