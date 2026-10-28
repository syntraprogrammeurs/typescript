// 6.10 Klassikale oefening 6.2 — Zoeken met optionele filters
//
// De situatie. In het beheer komt een zoekvak, met daarnaast een paar filters: een status, een
// maximale prijs, en een vinkje alleen op voorraad. Elke filter mag leeg blijven.
//
// Wat je maakt.
//
// 1. In zoeken.ts een interface Zoekfilter met vier optionele velden: tekst, status,
//    maxPrijsInCent en alleenOpVoorraad.
// 2. Een functie zoek(producten, filter) die alleen de ingevulde filters toepast. De tekst zoekt
//    in de naam en in de tags, zonder rekening te houden met hoofdletters of spaties ervoor en
//    erna.
// 3. Een bestand src/zoek-proef.ts dat zeven zoekvragen uitprobeert, waaronder een lege filter,
//    een lege tekst en een maximale prijs van 0.
// 4. Gebruik ?. en ?? waar ze passen.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// import zoek, type Zoekfilter uit "./zoeken.ts"
// const vragen: Zoekfilter[] = een lijst van 7 elementen, het eerste: {}
// for … of: een lus over vragen

// Het Groenhuis — de zoekfunctie uitproberen
// Hoofdstuk 6, klassikale oefening 6.2

import { producten } from "./catalogus.ts";
import { zoek, type Zoekfilter } from "./zoeken.ts";

const vragen: Zoekfilter[] = [
  {},
  { tekst: "makkelijk" },
  { tekst: "  MONSTERA " },
  { maxPrijsInCent: 1000 },
  { maxPrijsInCent: 0 },
  { status: "gepubliceerd", alleenOpVoorraad: true, maxPrijsInCent: 2000 },
  { tekst: "" },
];

for (const vraag of vragen) {
  const namen = zoek(producten, vraag).map((product) => product.naam);
  console.log(JSON.stringify(vraag));
  console.log(`  ${namen.length} gevonden: ${namen.join(", ")}`);
}
