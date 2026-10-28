# 5.3 `map`: elk element omzetten

**`map`** maakt een nieuwe lijst, even lang als de oude, met elk element omgezet.

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";
import { alsEuro, metBtw } from "./prijs.ts";

const namen = producten.map((product) => product.naam);

const etiketten = producten.map((product) => ({
  naam: product.naam,
  prijs: alsEuro(metBtw(product.prijsInCent, product.btwPercentage)),
}));

console.log(namen.slice(0, 3));
console.log(etiketten.slice(0, 2));
```

```text
[
  'Monstera deliciosa',
  'Sansevieria trifasciata',
  'Calathea orbifolia'
]
[
  { naam: 'Monstera deliciosa', prijs: '€ 26,49' },
  { naam: 'Sansevieria trifasciata', prijs: '€ 15,37' }
]
```

Je schrijft nergens een type, en toch weet TypeScript alles:

![`etiketten` is een lijst van objecten met een `naam` en een `prijs`, allebei `string`. TypeScript leidt het af uit de arrowfunctie.](../img/05-map.png)

> **LET OP**
>
> Een object teruggeven uit een korte arrowfunctie vraagt **haakjes rond de accolades**:
> `(product) => ({ naam: … })`. Zonder haakjes leest JavaScript de accolades als het
> begin van een functieblok, en geeft de functie niets terug.
