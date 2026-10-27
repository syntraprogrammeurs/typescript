// Op Wielen — tariefregels: een bedrag in, een ander bedrag uit

export type Tariefregel = (bedragInCent: number) => number;

export function korting(percentage: number): Tariefregel {
  return (bedrag) => Math.round(bedrag * (1 - percentage / 100));
}

export function toeslag(percentage: number): Tariefregel {
  return (bedrag) => Math.round(bedrag * (1 + percentage / 100));
}

export function alleenAlsMinstens(drempelInCent: number, regel: Tariefregel): Tariefregel {
  return (bedrag) => (bedrag >= drempelInCent ? regel(bedrag) : bedrag);
}

export function metRegels(bedragInCent: number, ...regels: Tariefregel[]): number {
  let resultaat = bedragInCent;
  for (const regel of regels) {
    resultaat = regel(resultaat);
  }
  return resultaat;
}

export const studentenkorting = korting(15);
export const weekendtoeslag = toeslag(20);
export const groepskorting = alleenAlsMinstens(20000, korting(10));
