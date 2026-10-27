// Op Wielen — de toestand van de vloot

import { alsEuro } from "./prijs.ts";
import { kanVerhuurdWorden, omschrijving, toestandAlsTekst, vloot } from "./vloot.ts";

for (const fiets of vloot) {
  console.log(`${fiets.id}  ${omschrijving(fiets).padEnd(42)} ${toestandAlsTekst(fiets.toestand)}`);
}

const beschikbaar = vloot.filter(kanVerhuurdWorden);
console.log();
console.log(`Nu te huur: ${beschikbaar.map((fiets) => `${fiets.id} (${alsEuro(fiets.dagprijsInCent)})`).join(", ")}`);
