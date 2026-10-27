// Het Groenhuis — de proef van percentage.ts
// Hoofdstuk 9, klassikale oefening 9.2

import { Geld } from "../src/waarden/geld.ts";
import { kortingOp, percentage } from "../src/waarden/percentage.ts";

const prijs = Geld.vanEuro("26,49");
const lente = percentage(10);

console.log(`${prijs} met ${lente} % korting: ${kortingOp(prijs, lente)}`);
console.log(`Het percentage is gewoon een getal: ${lente + 5}, ${typeof lente}`);

for (const waarde of [-5, 120, Number.NaN]) {
  try {
    percentage(waarde);
  } catch (fout) {
    console.log(fout instanceof Error ? fout.message : fout);
  }
}
