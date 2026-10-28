# 5.4 `filter`: elementen overhouden

**`filter`** maakt een nieuwe lijst met alleen de elementen waarvoor de functie `true`
teruggeeft. Het type blijft hetzelfde: een lijst producten wordt een kortere lijst
producten.

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const uitverkocht = producten.filter((product) => product.voorraad === 0);
console.log(uitverkocht.map((product) => product.naam));

const metPotmaat = producten
  .map((product) => product.afmetingen)
  .filter((afmetingen) => afmetingen !== undefined)
  .map((afmetingen) => afmetingen.potmaatInCm);
console.log(metPotmaat);
```

```text
[ 'Calathea orbifolia', 'Snoeischaar' ]
[ 21, 17, 17, 40 ]
```

Kijk naar het tweede voorbeeld. Na de eerste `map` is het type
`(Afmetingen | undefined)[]`: niet elk product heeft afmetingen. Na de `filter` weet
TypeScript dat de `undefined`'s weg zijn, en mag je `afmetingen.potmaatInCm` schrijven.
TypeScript leidt dat af uit de voorwaarde `afmetingen !== undefined`. Hoe dat werkt,
leer je in hoofdstuk 7.
