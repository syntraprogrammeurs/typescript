// 2.10 Klassikale oefening 2.1 — Verzendkosten
//
// De situatie. Het Groenhuis verzendt gratis vanaf 50 euro. Daaronder kost verzenden 4,95 euro.
// Wie zijn bestelling morgen wil, kiest express: dat kost altijd 3 euro extra, ook boven de 50
// euro.
//
// Wat je maakt.
//
// 1. Een bestand src/verzending.ts met drie constanten en een functie verzendkosten(totaalInCent,
//    express). Alle bedragen in cent.
// 2. Types bij beide parameters en bij de returnwaarde.
// 3. In start.ts een lus die de verzendkosten toont voor bestellingen van 26,49 euro, 49,99 euro
//    en precies 50 euro, met en zonder express.
// 4. Controleer met npm run check en npm start.
// 5. Schrijf daarna eens verzendkosten(4999, "ja"). Wat zegt TypeScript? Haal het weer weg.
//
// Opbouw van dit bestand:
// import alsEuro, BTW_PLANTEN, metBtw, metKorting uit "./prijs.ts"
// import verzendkosten uit "./verzending.ts"
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
// for … of: een lus over [2649, 4999, 5000]

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
