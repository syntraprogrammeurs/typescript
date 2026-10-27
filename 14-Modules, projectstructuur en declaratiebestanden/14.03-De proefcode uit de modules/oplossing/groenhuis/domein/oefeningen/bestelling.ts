// Het Groenhuis — wat kost een bestelling van drie dezelfde planten?
// Hoofdstuk 2, klassikale oefening 2.2 (de herstelde versie)

import { alsEuro, BTW_PLANTEN, metBtw } from "../src/prijs.ts";

const prijsPerStuk = 1450;
const aantal = 3;

function subtotaal(prijs: number, stuks: number): number {
  return prijs * stuks;
}

const totaal = subtotaal(prijsPerStuk, aantal);
console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN))}`);
console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantal)}`);
