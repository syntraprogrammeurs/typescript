// Het Groenhuis — de fouten van het domein: wat er mis kan gaan, met een naam

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
