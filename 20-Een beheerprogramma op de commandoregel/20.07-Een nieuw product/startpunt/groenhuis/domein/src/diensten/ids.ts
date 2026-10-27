// Het Groenhuis — waar een nieuw id vandaan komt
// Hoofdstuk 17, klassikale oefening 17.1

/** Een functie die bij elke oproep een nieuw id geeft. */
export type MaakId = () => string;

/** Wat de winkel gebruikt: een id dat niemand kan raden, en dat nooit twee keer voorkomt. */
export const willekeurigId: MaakId = () => crypto.randomUUID();

/** Voor tests en proeven: p1, p2, p3 … Elke teller begint opnieuw bij 1. */
export function teller(voorvoegsel: string): MaakId {
  let laatste = 0;
  return () => {
    laatste++;
    return `${voorvoegsel}${laatste}`;
  };
}
