// Het Groenhuis — de proef van klantcontrole.ts
// Hoofdstuk 7, klassikale oefening 7.1

import { foutenInKlant, isKlant } from "../src/opslag/klantcontrole.ts";
import { leesJson } from "../src/opslag/laden.ts";

const gegevens = leesJson(new URL("../data/klanten.json", import.meta.url));
const lijst: unknown[] = Array.isArray(gegevens) ? gegevens : [];

const klanten = lijst.filter(isKlant);
console.log(`In orde: ${klanten.map((klant) => `${klant.voornaam} ${klant.achternaam}`).join(", ")}`);

lijst.forEach((element, plaats) => {
  const fouten = foutenInKlant(element);
  if (fouten.length > 0) {
    console.log(`Klant ${plaats + 1}: ${fouten.join("; ")}`);
  }
});
