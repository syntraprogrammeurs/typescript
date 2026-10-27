// Het Groenhuis — de proef van meldingen.ts
// Hoofdstuk 13, klassikale oefening 13.1

import { NietGevondenFout, RegelFout, ValidatieFout } from "../src/fouten.ts";
import { Geld } from "../src/geld.ts";
import { meldingVoorKlant } from "../src/meldingen.ts";
import { Slug } from "../src/slug.ts";

const fouten: unknown[] = [
  new NietGevondenFout("product", "orchidee"),
  new ValidatieFout({ email: "er ontbreekt een @", postcode: "vier cijfers verwacht" }),
  new RegelFout("Er zijn maar 3 stuks van Monstera deliciosa"),
  new TypeError("Cannot read properties of undefined (reading 'naam')"),
  "een tekst in plaats van een fout",
];

for (const fout of fouten) {
  for (const regel of meldingVoorKlant(fout)) {
    console.log(regel);
  }
}

for (const actie of [() => Geld.vanEuro("vijf"), () => Slug.van("Lente Actie")]) {
  try {
    actie();
  } catch (fout) {
    console.log(meldingVoorKlant(fout).join(" "));
  }
}
