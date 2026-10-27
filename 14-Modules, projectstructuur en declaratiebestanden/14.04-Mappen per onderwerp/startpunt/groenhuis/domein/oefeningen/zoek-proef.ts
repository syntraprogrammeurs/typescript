// Het Groenhuis — de zoekfunctie uitproberen
// Hoofdstuk 6, klassikale oefening 6.2

import { producten } from "./catalogus.ts";
import { zoek, type Zoekfilter } from "../src/zoeken.ts";

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
