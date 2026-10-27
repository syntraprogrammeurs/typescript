// Het Groenhuis — van een fout naar een melding die een klant begrijpt
// Hoofdstuk 13, klassikale oefening 13.1

import { NietGevondenFout, RegelFout, ValidatieFout } from "./fouten.ts";
import { Geld } from "./geld.ts";
import { Slug } from "./slug.ts";

export function meldingVoorKlant(fout: unknown): string[] {
  if (fout instanceof NietGevondenFout) {
    return [`We vonden geen ${fout.soort} "${fout.sleutel}". Misschien is de link verouderd.`];
  }
  if (fout instanceof ValidatieFout) {
    return Object.entries(fout.velden).map(([veld, melding]) => `Kijk het veld ${veld} na: ${melding}.`);
  }
  if (fout instanceof RegelFout) {
    return [fout.message];
  }
  return ["Er ging iets mis aan onze kant. Probeer het later opnieuw."];
}

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
