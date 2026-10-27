// Het Groenhuis — het oude postcodebestand gebruiken vanuit TypeScript
// Hoofdstuk 14, klassikale oefening 14.2

import { alsEuro } from "../src/index.ts";
import { gemeenteVoor, LEVERGEBIED, leverkost } from "./oud/postcodes.js";

for (const postcode of ["9000", "9052", "2000"]) {
  const kost = leverkost(postcode, false);
  const gemeente = gemeenteVoor(postcode) ?? "buiten het levergebied";
  console.log(`${postcode} ${gemeente.padEnd(22)} ${kost === null ? "geen levering" : alsEuro(kost)}`);
}
console.log(`We leveren in ${LEVERGEBIED.length} postcodes.`);
