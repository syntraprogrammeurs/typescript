// Het Groenhuis — de proef van verzendopties.ts
// Hoofdstuk 10, klassikale oefening 10.2

import { Geld } from "../src/geld.ts";
import { AfhalenInDeWinkel, Express, Koerier, Standaard, type Verzendoptie } from "../src/verzendopties.ts";

const opties: Verzendoptie[] = [new Standaard(), new Express(), new AfhalenInDeWinkel(), new Koerier()];

for (const totaal of [Geld.vanEuro("26,49"), Geld.vanEuro("95,39")]) {
  console.log(`Bestelling van ${totaal}:`);
  for (const optie of opties.filter((kandidaat) => kandidaat.isMogelijk(totaal))) {
    console.log(`  ${optie.omschrijving(totaal)}`);
  }
}
