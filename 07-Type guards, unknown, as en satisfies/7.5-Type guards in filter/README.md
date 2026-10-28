# 7.5 Type guards in `filter`

Een type predicate past ook in `filter`:

```ts domein/src/proef.ts
import { isProduct } from "./controle.ts";

const gegevens: unknown[] = JSON.parse(`[
  { "id": "p04", "slug": "aloe-vera", "naam": "Aloe vera", "categorieId": "c5", "status": "gepubliceerd",
    "prijsInCent": 799, "btwPercentage": 6, "voorraad": 25, "tags": [] },
  { "naam": "kapot" }
]`);

const producten = gegevens.filter(isProduct);
console.log(producten.map((product) => product.naam));
```

```text
[ 'Aloe vera' ]
```

`producten` is een `Product[]`, geen `unknown[]`. Zonder type predicate zou `filter` het
type gewoon laten zoals het was. In hoofdstuk 5 zag je dat TypeScript bij een eenvoudige
voorwaarde, zoals `x !== undefined`, het type predicate **zelf** afleidt. Bij een
controle van tien velden doet het dat niet: dan schrijf je het zelf.
