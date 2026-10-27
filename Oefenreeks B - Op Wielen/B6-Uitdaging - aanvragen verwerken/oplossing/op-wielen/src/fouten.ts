// Op Wielen — de fouten van de verhuur

import type { Periode } from "./periode.ts";
import type { Reservatie } from "./reservaties.ts";

export abstract class VerhuurFout extends Error {
  constructor(melding: string) {
    super(melding);
    this.name = new.target.name;
  }
}

export class OngeldigePeriodeFout extends VerhuurFout {}

export class OnbekendItemFout extends VerhuurFout {
  constructor(id: string) {
    super(`Er is geen fiets of accessoire met nummer ${id}`);
  }
}

export class NietVrijFout extends VerhuurFout {
  readonly bezet: Reservatie;

  constructor(omschrijving: string, gevraagd: Periode, bezet: Reservatie) {
    super(`${omschrijving} is niet vrij van ${gevraagd}: al gereserveerd van ${bezet.periode}`);
    this.bezet = bezet;
  }
}
