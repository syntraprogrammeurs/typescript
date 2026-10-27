// Op Wielen — huurprijzen
// Alle bedragen in cent.

export const WEEK = 7;
export const BETAALDE_DAGEN_PER_WEEK = 5; // een volle week kost vijf dagen
export const MINIMALE_WAARBORG = 5000;
export const VERZEKERING_PER_DAG = 250;

export function huurprijs(dagen: number, dagprijsInCent: number, verzekering = false): number {
  const weken = Math.floor(dagen / WEEK);
  const losseDagen = Math.min(dagen % WEEK, BETAALDE_DAGEN_PER_WEEK);
  const huur = (weken * BETAALDE_DAGEN_PER_WEEK + losseDagen) * dagprijsInCent;
  return verzekering ? huur + dagen * VERZEKERING_PER_DAG : huur;
}

export function waarborg(dagprijsInCent: number): number {
  return Math.max(MINIMALE_WAARBORG, dagprijsInCent * 3);
}

export function alsEuro(bedragInCent: number, taal = "nl-BE"): string {
  return new Intl.NumberFormat(taal, { style: "currency", currency: "EUR" }).format(bedragInCent / 100);
}

export function som(...bedragenInCent: number[]): number {
  let totaal = 0;
  for (const bedrag of bedragenInCent) {
    totaal += bedrag;
  }
  return totaal;
}
