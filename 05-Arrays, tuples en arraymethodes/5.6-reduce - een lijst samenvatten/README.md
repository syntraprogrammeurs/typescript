# 5.6 `reduce`: een lijst samenvatten

**`reduce`** loopt de lijst af en bouwt onderweg één waarde op: een totaal, een
telling, een object. Je geeft een functie mee en een **beginwaarde**.

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const stuks = producten.reduce((totaal, product) => totaal + product.voorraad, 0);
console.log(`Stuks in voorraad: ${stuks}`);
```

```text
Stuks in voorraad: 97
```

| Parameter | Betekenis | In het voorbeeld |
|---|---|---|
| `totaal` | De waarde tot nu toe (de **accumulator**) | Het aantal stuks tot nu toe |
| `product` | Het huidige element | Het product van deze ronde |
| `0` | De beginwaarde, en meteen het type van de accumulator | Een `number` |

> **LET OP**
>
> Laat de beginwaarde nooit weg. Zonder beginwaarde neemt `reduce` het **eerste element**
> als beginwaarde: hier een `Product` in plaats van een getal. En bij een lege lijst
> gooit `reduce` dan een fout: `Reduce of empty array with no initial value`.

Bouw je een **object** op, dan kan TypeScript het type niet afleiden uit een lege `{}`.
Je geeft het dan tussen `<…>` mee aan `reduce`:

```ts domein/src/zoeken.ts
export function aantalPerCategorie(producten: Product[]): { [categorieId: string]: number } {
  return producten.reduce<{ [categorieId: string]: number }>((telling, product) => {
    const huidig = telling[product.categorieId];
    telling[product.categorieId] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}
```

Het object telt per categorie hoeveel producten erin zitten. De sleutels kent niemand op
voorhand, dus is het een index signature, zoals `metadata` in hoofdstuk 4. Daarom is
`telling[product.categorieId]` eerst `number | undefined`: de eerste keer is de sleutel
er nog niet.
