// Op Wielen — de fouten van de verhuur

import type { Periode } from "../reservaties/periode.ts";
import type { Reservatie } from "../reservaties/reservaties.ts";

export abstract class VerhuurFout extends Error {
  constructor(melding: string) {
    super(melding);
    this.name = new.target.name;
  }
}

export class OngeldigePeriodeFout extends VerhuurFout {}

/** Een bestand met gegevens heeft niet de vorm die het programma verwacht. */
export class BestandFout extends VerhuurFout {}

/** Gegevens van buiten kloppen niet. Per veld staat wat er mis is. */
export class ValidatieFout extends VerhuurFout {
  readonly velden: { readonly [veld: string]: string };

  constructor(velden: { [veld: string]: string }) {
    super(Object.entries(velden).map(([veld, melding]) => `${veld}: ${melding}`).join("; "));
    this.velden = { ...velden };
  }
}

/** Een fiets kan iets niet in de toestand waarin ze is: een verhuurde fiets opnieuw verhuren, bijvoorbeeld. */
export class ToestandFout extends VerhuurFout {}

export class OnbekendItemFout extends VerhuurFout {
  constructor(id: string) {
    super(`Er is geen fiets of accessoire met nummer ${id}`);
  }
}

export class OnbekendeReservatieFout extends VerhuurFout {
  constructor(id: string) {
    super(`Er is geen reservatie met nummer ${id}`);
  }
}

export class NietVrijFout extends VerhuurFout {
  readonly bezet: Reservatie;

  constructor(omschrijving: string, gevraagd: Periode, bezet: Reservatie) {
    super(`${omschrijving} is niet vrij van ${gevraagd}: al gereserveerd van ${bezet.periode}`);
    this.bezet = bezet;
  }
}
