// 3.5 Functies die functies maken — Het Groenhuis, deel I
//
// Een korting van tien procent en een van twintig procent verschillen alleen in het getal. In
// plaats van twee functies schrijf je een functie die een kortingsregel maakt. Maak
// src/korting.ts.
//
// Opbouw van dit bestand:
// import pasToe, procentKorting, vanafBedrag, vasteKorting uit "./korting.ts"
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
// const lenteactie = het resultaat van vanafBedrag(5000, procentKorting(10))
// const cadeaubon = het resultaat van vasteKorting(1000)
// console.log(…) toont: `Met de lenteactie: ${alsEuro(pasToe(totaal, lenteactie))}`
// console.log(…) toont: `Met de lenteactie en een bon van 10 euro: ${alsEuro(pasToe(totaal,
//     lenteactie,…
// console.log(…) toont: `Eerst de bon, dan de actie: ${alsEuro(pasToe(totaal, cadeaubon,
//     lenteactie))}`

// Het Groenhuis — het domein van het CMS

import { pasToe, procentKorting, vanafBedrag, vasteKorting } from "./korting.ts";
import { alsEuro, BTW_PLANTEN, metBtw, som } from "./prijs.ts";
import { verzendkosten } from "./verzending.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const monstera = metBtw(2499, BTW_PLANTEN);
const sansevieria = metBtw(1450, BTW_PLANTEN);
const pot = 895;

const totaal = som(monstera, sansevieria, pot);
console.log(`Mandje: ${alsEuro(monstera)} + ${alsEuro(sansevieria)} + ${alsEuro(pot)} = ${alsEuro(totaal)}`);
console.log(`Verzending: ${alsEuro(verzendkosten(totaal, false))}`);

const lenteactie = vanafBedrag(5000, procentKorting(10));
const cadeaubon = vasteKorting(1000);

console.log(`Met de lenteactie: ${alsEuro(pasToe(totaal, lenteactie))}`);
console.log(`Met de lenteactie en een bon van 10 euro: ${alsEuro(pasToe(totaal, lenteactie, cadeaubon))}`);
console.log(`Eerst de bon, dan de actie: ${alsEuro(pasToe(totaal, cadeaubon, lenteactie))}`);
