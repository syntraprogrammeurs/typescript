// Op Wielen — alles wat je kunt huren: fietsen en accessoires

import type { Periode } from "./periode.ts";
import { huurprijs, waarborg } from "./prijs.ts";

export abstract class Verhuuritem {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract readonly dagprijsInCent: number;

  abstract get omschrijving(): string;

  get waarborgInCent(): number {
    return waarborg(this.dagprijsInCent);
  }

  prijsVoor(periode: Periode, verzekering = false): number {
    return huurprijs(periode.aantalDagen, this.dagprijsInCent, verzekering);
  }
}

export class Accessoire extends Verhuuritem {
  readonly naam: string;
  readonly dagprijsInCent: number;

  constructor(id: string, naam: string, dagprijsInCent: number) {
    super(id);
    this.naam = naam;
    this.dagprijsInCent = dagprijsInCent;
  }

  override get omschrijving(): string {
    return this.naam;
  }

  override get waarborgInCent(): number {
    return 0;
  }
}

