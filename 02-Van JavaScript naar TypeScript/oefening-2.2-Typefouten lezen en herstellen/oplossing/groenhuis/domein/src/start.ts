// Het Groenhuis — het domein van het CMS

import { alsEuro, BTW_PLANTEN, metBtw, metKorting } from "./prijs.ts";
import { verzendkosten } from "./verzending.ts";

const winkel = "Het Groenhuis";
const onderdelen = ["domein", "beheer", "server", "api", "winkel"];

console.log(`${winkel} — het domein`);
console.log(`Node.js ${process.version} op ${process.platform}`);
console.log(`Onderdelen dit jaar: ${onderdelen.join(", ")}`);

const monstera = 2499;
const inclBtw = metBtw(monstera, BTW_PLANTEN);
console.log(`Monstera deliciosa: ${alsEuro(monstera)} excl. btw, ${alsEuro(inclBtw)} incl. btw`);
console.log(`Met 20 % korting: ${alsEuro(metKorting(inclBtw, 20))}`);

for (const totaal of [2649, 4999, 5000]) {
  console.log(
    `Bestelling van ${alsEuro(totaal)}: verzending ${alsEuro(verzendkosten(totaal, false))},` +
      ` express ${alsEuro(verzendkosten(totaal, true))}`,
  );
}
