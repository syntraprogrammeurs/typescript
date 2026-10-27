// 3.3 Restparameters — Het Groenhuis, deel I
//
// Een mandje kan twee producten bevatten, of twintig. Een functie die ze allemaal optelt, neemt
// een restparameter. Voeg som toe aan prijs.ts.
//
// Opbouw van dit bestand:
// export const BTW_PLANTEN = het getal 6
// export const BTW_STANDAARD = het getal 21
// export function metBtw(prijsExclInCent: number, btwPercentage: number): number
// export function metKorting(prijsInCent: number, kortingPercentage: number): number
// export function alsEuro(prijsInCent: number, taal = "nl-BE"): string
// export function som(...bedragenInCent: number[]): number

// Het Groenhuis — rekenen met prijzen
// Alle bedragen zijn in cent: 24,99 euro is 2499.

export const BTW_PLANTEN = 6; // het verlaagde tarief
export const BTW_STANDAARD = 21; // potten, gereedschap, decoratie

export function metBtw(prijsExclInCent: number, btwPercentage: number): number {
  return Math.round(prijsExclInCent * (1 + btwPercentage / 100));
}

export function metKorting(prijsInCent: number, kortingPercentage: number): number {
  return Math.round(prijsInCent * (1 - kortingPercentage / 100));
}

export function alsEuro(prijsInCent: number, taal = "nl-BE"): string {
  const opmaak = new Intl.NumberFormat(taal, { style: "currency", currency: "EUR" });
  return opmaak.format(prijsInCent / 100);
}

export function som(...bedragenInCent: number[]): number {
  let totaal = 0;
  for (const bedrag of bedragenInCent) {
    totaal += bedrag;
  }
  return totaal;
}
