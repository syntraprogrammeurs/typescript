// Het Groenhuis — de proef van instellingen.ts
// Hoofdstuk 7, klassikale oefening 7.2

import { laadInstellingen } from "../src/opslag/instellingen.ts";

for (const bestand of ["instellingen.json", "instellingen-deels.json", "instellingen-kapot.json", "bestaat-niet.json"]) {
  console.log(`${bestand}:`);
  const instellingen = await laadInstellingen(new URL(`../data/${bestand}`, import.meta.url));
  console.log(`  gratis verzending vanaf ${instellingen.gratisVerzendingVanaf / 100} euro, verzendkost ${instellingen.verzendkost / 100} euro`);
}
