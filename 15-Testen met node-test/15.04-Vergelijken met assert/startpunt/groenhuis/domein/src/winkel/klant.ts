// Het Groenhuis — klanten en hun adressen
// Hoofdstuk 4, klassikale oefening 4.1

export interface Adres {
  straat: string;
  huisnummer: string;
  bus?: string;
  postcode: string;
  gemeente: string;
  land: string;
}

export interface Klant {
  readonly id: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon?: string;
  leveradres: Adres;
  factuuradres?: Adres;
}

export function adresregels(adres: Adres): string[] {
  let straat = `${adres.straat} ${adres.huisnummer}`;
  if (adres.bus !== undefined) {
    straat += ` bus ${adres.bus}`;
  }
  return [straat, `${adres.postcode} ${adres.gemeente}`, adres.land];
}

export function adresVoorFactuur(klant: Klant): Adres {
  if (klant.factuuradres !== undefined) {
    return klant.factuuradres;
  }
  return klant.leveradres;
}
