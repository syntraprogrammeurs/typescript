// 2.7 Functies met types — Het Groenhuis, deel I
//
// De eerste echte code van Het Groenhuis: rekenen met prijzen. Maak src/prijs.ts.
//
// Opbouw van dit bestand:
// export const BTW_PLANTEN = het getal 6
// export const BTW_STANDAARD = het getal 21
// export function metBtw(prijsExclInCent: number, btwPercentage: number): number
// export function metKorting(prijsInCent: number, kortingPercentage: number): number
// export function alsEuro(prijsInCent: number): string

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

export function alsEuro(prijsInCent: number): string {
  return (prijsInCent / 100).toFixed(2).replace(".", ",") + " euro";
}
