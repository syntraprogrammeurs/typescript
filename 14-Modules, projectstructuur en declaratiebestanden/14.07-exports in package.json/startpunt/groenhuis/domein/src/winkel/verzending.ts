// Het Groenhuis — verzendkosten
// Hoofdstuk 2, klassikale oefening 2.1

export const GRATIS_VANAF = 5000; // vanaf 50 euro verzenden we gratis
export const VERZENDKOST = 495;
export const TOESLAG_EXPRESS = 300;

export function verzendkosten(totaalInCent: number, express: boolean): number {
  const basis = totaalInCent >= GRATIS_VANAF ? 0 : VERZENDKOST;
  return express ? basis + TOESLAG_EXPRESS : basis;
}
