// Het Groenhuis — de proef van klant.ts
// Hoofdstuk 4, klassikale oefening 4.1

import { adresregels, adresVoorFactuur, type Klant } from "../src/winkel/klant.ts";

const sam: Klant = {
  id: "k1",
  voornaam: "Sam",
  achternaam: "Peeters",
  email: "sam.peeters@example.com",
  leveradres: { straat: "Veldstraat", huisnummer: "12", bus: "3", postcode: "9000", gemeente: "Gent", land: "België" },
};

const bedrijf: Klant = {
  id: "k2",
  voornaam: "Lien",
  achternaam: "Maes",
  email: "lien@tuinen-maes.example",
  telefoon: "+32 9 123 45 67",
  leveradres: { straat: "Kouter", huisnummer: "1", postcode: "9000", gemeente: "Gent", land: "België" },
  factuuradres: { straat: "Industrieweg", huisnummer: "88", postcode: "9032", gemeente: "Wondelgem", land: "België" },
};

for (const klant of [sam, bedrijf]) {
  console.log(`${klant.voornaam} ${klant.achternaam}`);
  console.log(`  Levering: ${adresregels(klant.leveradres).join(", ")}`);
  console.log(`  Factuur:  ${adresregels(adresVoorFactuur(klant)).join(", ")}`);
}
