// Op Wielen — huurprijzen
// Alle bedragen in cent.

export const WEEK = 7;
export const BETAALDE_DAGEN_PER_WEEK = 5; // een volle week kost vijf dagen
export const MINIMALE_WAARBORG = 5000;

export function huurprijs(dagen: number, dagprijsInCent: number): number {
  const weken = Math.floor(dagen / WEEK);
  const losseDagen = Math.min(dagen % WEEK, BETAALDE_DAGEN_PER_WEEK);
  return (weken * BETAALDE_DAGEN_PER_WEEK + losseDagen) * dagprijsInCent;
}

export function waarborg(dagprijsInCent: number): number {
  return Math.max(MINIMALE_WAARBORG, dagprijsInCent * 3);
}

export function alsEuro(bedragInCent: number): string {
  return (bedragInCent / 100).toFixed(2).replace(".", ",") + " euro";
}
