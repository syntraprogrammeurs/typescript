// Het Groenhuis — van een fout naar een melding die een klant begrijpt
// Hoofdstuk 13, klassikale oefening 13.1

import { NietGevondenFout, RegelFout, ValidatieFout } from "./fouten.ts";

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
