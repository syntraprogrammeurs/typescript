// Het Groenhuis — de fouten van het domein: wat er mis kan gaan, met een naam

import { gelukt, mislukt, type Resultaat } from "./resultaat.ts";

/** De ouder van alle fouten die het domein bewust gooit. */
export abstract class DomeinFout extends Error {
  constructor(melding: string, opties?: ErrorOptions) {
    super(melding, opties);
    this.name = new.target.name;
  }
}

/** Iets wat gevraagd werd, bestaat niet. */
export class NietGevondenFout extends DomeinFout {
  readonly soort: string;
  readonly sleutel: string;

  constructor(soort: string, sleutel: string) {
    super(`${soort} ${sleutel} bestaat niet`);
    this.soort = soort;
    this.sleutel = sleutel;
  }
}

/** Een of meer waarden zijn ongeldig. Per veld staat wat er mis is. */
export class ValidatieFout extends DomeinFout {
  readonly velden: { readonly [veld: string]: string };

  constructor(velden: { [veld: string]: string }) {
    super(Object.entries(velden).map(([veld, melding]) => `${veld}: ${melding}`).join("; "));
    this.velden = { ...velden };
  }
}

/** De waarden zijn geldig, maar wat gevraagd wordt, mag niet volgens de regels van de winkel. */
export class RegelFout extends DomeinFout {}

/** Voert een actie uit en wacht erop. Een fout van het domein wordt een resultaat; elke andere fout gaat gewoon door. */
export async function probeer<T>(actie: () => Promise<T>): Promise<Resultaat<T, DomeinFout>> {
  try {
    return gelukt(await actie());
  } catch (fout) {
    if (fout instanceof DomeinFout) {
      return mislukt(fout);
    }
    throw fout;
  }
}

/** Er worden meer stuks gevraagd dan er zijn. */
export class VoorraadFout extends RegelFout {
  readonly gevraagd: number;
  readonly beschikbaar: number;

  constructor(naam: string, gevraagd: number, beschikbaar: number) {
    super(`Er zijn maar ${beschikbaar} stuks van ${naam}, je vroeg er ${gevraagd}`);
    this.gevraagd = gevraagd;
    this.beschikbaar = beschikbaar;
  }
}
