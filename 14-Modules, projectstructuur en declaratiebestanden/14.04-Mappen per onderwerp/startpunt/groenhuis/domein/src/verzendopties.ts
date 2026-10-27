// Het Groenhuis — de manieren waarop een klant zijn bestelling krijgt
// Hoofdstuk 10, klassikale oefening 10.2

import { Geld } from "./geld.ts";

export abstract class Verzendoptie {
  abstract readonly naam: string;

  abstract kost(totaal: Geld): Geld;

  abstract levertermijnInDagen(): number;

  /** Kan deze optie gebruikt worden voor een bestelling van dit bedrag? Standaard: altijd. */
  isMogelijk(_totaal: Geld): boolean {
    return true;
  }

  omschrijving(totaal: Geld): string {
    const kost = this.kost(totaal);
    const prijs = kost.equals(Geld.NUL) ? "gratis" : kost.toString();
    const dagen = this.levertermijnInDagen();
    const wanneer = dagen === 0 ? "vandaag" : dagen === 1 ? "morgen" : `binnen ${dagen} dagen`;
    return `${this.naam}: ${prijs}, ${wanneer}`;
  }
}

export class Standaard extends Verzendoptie {
  readonly naam: string = "Standaard";
  static readonly GRATIS_VANAF = Geld.vanEuro("50");

  override kost(totaal: Geld): Geld {
    return totaal.isMeerDan(Standaard.GRATIS_VANAF) || totaal.equals(Standaard.GRATIS_VANAF) ? Geld.NUL : Geld.vanEuro("4,95");
  }

  override levertermijnInDagen(): number {
    return 3;
  }
}

export class Express extends Standaard {
  override readonly naam: string = "Express";

  override kost(totaal: Geld): Geld {
    return super.kost(totaal).plus(Geld.vanEuro("3"));
  }

  override levertermijnInDagen(): number {
    return 1;
  }
}

export class AfhalenInDeWinkel extends Verzendoptie {
  readonly naam: string = "Afhalen in de winkel";

  override kost(_totaal: Geld): Geld {
    return Geld.NUL;
  }

  override levertermijnInDagen(): number {
    return 0;
  }
}

export class Koerier extends Verzendoptie {
  readonly naam: string = "Koerier voor grote planten";
  static readonly MINIMUM = Geld.vanEuro("75");

  override kost(_totaal: Geld): Geld {
    return Geld.vanEuro("15");
  }

  override levertermijnInDagen(): number {
    return 2;
  }

  override isMogelijk(totaal: Geld): boolean {
    return !Koerier.MINIMUM.isMeerDan(totaal);
  }
}
