# 7.1 Het probleem met `JSON.parse`

```ts domein/src/proef.ts
import type { Product } from "./inhoud.ts";

const tekst = '{ "naam": "Aloe vera", "prijsInCent": "7,99" }';
const product: Product = JSON.parse(tekst);

console.log(product.prijsInCent * 2);
console.log(product.tags.length);
```

```text
NaN
file:///C:/cursus/groenhuis/domein/src/proef.ts:7
console.log(product.tags.length);
                         ^

TypeError: Cannot read properties of undefined (reading 'length')
    at file:///C:/cursus/groenhuis/domein/src/proef.ts:7:26
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

`tsc` vindt **niets**, en toch loopt het twee keer mis: een prijs die tekst is, en een
lijst `tags` die er niet is. Ga met de muis over `JSON.parse`:

![`JSON.parse` geeft `any` terug: TypeScript kijkt het resultaat niet na.](../img/07-json-parse.png)

`JSON.parse` geeft **`any`** terug. Uit hoofdstuk 2 weet je wat dat betekent: TypeScript
kijkt niets meer na. Je schreef `const product: Product`, en TypeScript geloofde je.
