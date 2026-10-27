# 3.3 Restparameters

Een mandje kan twee producten bevatten, of twintig. Een functie die ze allemaal optelt,
neemt een **restparameter**. Voeg `som` toe aan `prijs.ts`:

```ts domein/src/prijs.ts
export function som(...bedragenInCent: number[]): number {
  let totaal = 0;
  for (const bedrag of bedragenInCent) {
    totaal += bedrag;
  }
  return totaal;
}
```

`...bedragenInCent: number[]` betekent: *alle overige argumenten, samen in een lijst van
getallen*. `number[]` lees je als **een lijst van `number`**. Lijsten krijgen een eigen
hoofdstuk, hoofdstuk 5.

Vervang `start.ts` door:

```ts domein/src/start.ts
// Het Groenhuis — het domein van het CMS

import { alsEuro, BTW_PLANTEN, metBtw, som } from "./prijs.ts";
import { verzendkosten } from "./verzending.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const monstera = metBtw(2499, BTW_PLANTEN);
const sansevieria = metBtw(1450, BTW_PLANTEN);
const pot = 895;

const totaal = som(monstera, sansevieria, pot);
console.log(`Mandje: ${alsEuro(monstera)} + ${alsEuro(sansevieria)} + ${alsEuro(pot)} = ${alsEuro(totaal)}`);
console.log(`Verzending: ${alsEuro(verzendkosten(totaal, false))}`);
console.log(`In het Engels: ${alsEuro(totaal, "en-GB")}`);
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
Mandje: € 26,49 + € 15,37 + € 8,95 = € 50,81
Verzending: € 0,00
In het Engels: €50.81
```

> **LET OP**
>
> Het lijkt alsof er een spatie staat tussen `€` en het bedrag. Het is een **vaste spatie**
> (*non-breaking space*): een spatie waarop nooit een nieuwe regel begint. `Intl` zet ze
> er bewust, zodat `€` nooit alleen op het einde van een regel blijft staan. Vergelijk je
> in een test met `"€ 24,99"` met een gewone spatie, dan is dat **niet gelijk**. Je komt
> het tegen in hoofdstuk 15.

Een restparameter staat altijd **als laatste**, en er is er maar één.
