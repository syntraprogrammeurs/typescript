# 7.6 `as`: TypeScript iets wijsmaken

Je kunt TypeScript ook gewoon zeggen welk type iets heeft, zonder controle. Dat heet een
**type assertion**, met het woord **`as`**:

```ts domein/src/proef.ts
import type { Product } from "./inhoud.ts";

const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera" }');
const product = gegevens as Product;

console.log(product.naam.toUpperCase());
console.log(product.tags.includes("makkelijk"));
```

```text
ALOE VERA
file:///C:/cursus/groenhuis/domein/src/proef.ts:7
console.log(product.tags.includes("makkelijk"));
                         ^

TypeError: Cannot read properties of undefined (reading 'includes')
    at file:///C:/cursus/groenhuis/domein/src/proef.ts:7:26
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

`tsc` zegt niets: je zei dat het een `Product` was. Node stopt op de tweede regel. `as`
is precies even gevaarlijk als `any`, alleen ziet het er beleefder uit.

TypeScript weigert alleen een `as` die **onmogelijk** kan kloppen:

```ts domein/src/proef.ts
const prijs = "7,99";
const getal = prijs as number;
const toch = prijs as unknown as number;
```

```text
src/proef.ts:2:15 - error TS2352: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

2 const getal = prijs as number;
                ~~~~~~~~~~~~~~~

Found 1 error in src/proef.ts:2
```

De tweede regel weigert TypeScript: een tekst kan nooit een getal zijn. De derde regel
gaat via `unknown` en wordt aanvaard. Zie je `as unknown as` in code, dan heeft iemand
TypeScript bewust uitgeschakeld.

> **LET OP**
>
> Gebruik `as` **niet** voor gegevens van buiten. Daarvoor schrijf je een controle. `as` is
> alleen in orde als **jij meer weet dan TypeScript, en dat zeker weet**: bijvoorbeeld in een
> test waar je de gegevens zelf schreef. Telkens je `as` typt, moet je kunnen uitleggen
> waarom je het zeker weet. Kun je dat niet, schrijf dan een controle.

| Schrijfwijze | Wat het doet | Gevaarlijk? |
|---|---|---|
| `x as Product` | TypeScript geloven laten dat `x` een `Product` is | ja |
| `x as unknown as Product` | Idem, ook als het onmogelijk lijkt | zeer |
| `x!` | TypeScript geloven laten dat `x` niet `undefined` of `null` is | ja |
| `[…] as const` | Literal types en `readonly` maken | nee: het maakt het type **strenger** |
| `x satisfies T` | Nakijken dat `x` bij `T` past, zonder het type te veranderen | nee |
