// 2.7 Functies met types — Het Groenhuis, deel I
//
// De eerste echte code van Het Groenhuis: rekenen met prijzen. Maak src/prijs.ts.
//
// Opbouw van dit bestand:
// import alsEuro, BTW_PLANTEN, metBtw, metKorting uit "./prijs.ts"
// const winkel = de tekst "Het Groenhuis"
// const onderdelen = een lijst van 5 elementen: ["domein", "beheer", "server", "api", "winkel"]
// console.log(…) toont: `${winkel} — het domein`
// console.log(…) toont: `Node.js ${process.version} op ${process.platform}`
// console.log(…) toont: `Onderdelen dit jaar: ${onderdelen.join(", ")}`
// const monstera = het getal 2499
// const inclBtw = het resultaat van metBtw(monstera, BTW_PLANTEN)
// console.log(…) toont: `Monstera deliciosa: ${alsEuro(monstera)} excl. btw, ${alsEuro(inclBtw)}
//     incl.…
// console.log(…) toont: `Met 20 % korting: ${alsEuro(metKorting(inclBtw, 20))}`

// Het Groenhuis — het domein van het CMS

import { alsEuro, BTW_PLANTEN, metBtw, metKorting } from "./prijs.ts";

const winkel = "Het Groenhuis";
const onderdelen = ["domein", "beheer", "server", "api", "winkel"];

console.log(`${winkel} — het domein`);
console.log(`Node.js ${process.version} op ${process.platform}`);
console.log(`Onderdelen dit jaar: ${onderdelen.join(", ")}`);

const monstera = 2499;
const inclBtw = metBtw(monstera, BTW_PLANTEN);
console.log(`Monstera deliciosa: ${alsEuro(monstera)} excl. btw, ${alsEuro(inclBtw)} incl. btw`);
console.log(`Met 20 % korting: ${alsEuro(metKorting(inclBtw, 20))}`);
