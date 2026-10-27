// 3.3 Restparameters — Het Groenhuis, deel I
//
// Een mandje kan twee producten bevatten, of twintig. Een functie die ze allemaal optelt, neemt
// een restparameter. Voeg som toe aan prijs.ts.
//
// Opbouw van dit bestand:
// import alsEuro, BTW_PLANTEN, metBtw, som uit "./prijs.ts"
// import verzendkosten uit "./verzending.ts"
// console.log(…) toont: `Het Groenhuis — het domein (Node.js ${process.version})`
// const monstera = het resultaat van metBtw(2499, BTW_PLANTEN)
// const sansevieria = het resultaat van metBtw(1450, BTW_PLANTEN)
// const pot = het getal 895
// const totaal = het resultaat van som(monstera, sansevieria, pot)
// console.log(…) toont: `Mandje: ${alsEuro(monstera)} + ${alsEuro(sansevieria)} + ${alsEuro(pot)}
//     = ${a…
// console.log(…) toont: `Verzending: ${alsEuro(verzendkosten(totaal, false))}`
// console.log(…) toont: `In het Engels: ${alsEuro(totaal, "en-GB")}`

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
