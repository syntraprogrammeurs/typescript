// 3.8 Klassikale oefening 3.1 — Kortingsregels combineren
//
// De situatie. Voor Black Friday geeft Het Groenhuis 25 procent korting, maar maximaal 15 euro per
// bestelling. Aan de kassa wil de winkel de Black Friday-korting en een cadeaubon samen als één
// regel kunnen gebruiken.
//
// Wat je maakt. Twee nieuwe functies in korting.ts:
//
// 1. maximaal(maxKortingInCent, regel): een kortingsregel die de korting van regel toepast, maar
//    nooit meer dan maxKortingInCent afhaalt.
// 2. combineer(...regels): een kortingsregel die alle regels na elkaar toepast.
// 3. Beide geven een Kortingsregel terug. Schrijf de returntypes uitdrukkelijk.
// 4. Toon in start.ts de Black Friday-prijs, en de prijs met Black Friday én de bon, voor
//    bestellingen van 40 euro, 80 euro en het mandje uit 3.3.
//
// Denk eerst na: hoeveel korting is 25 procent op 40 euro? En op 80 euro?
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
