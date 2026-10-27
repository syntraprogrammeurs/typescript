// Op Wielen — de vloot

import { alsEuro } from "./prijs.ts";
import { omschrijving, uitrustingAlsTekst, vloot, type Prijskaart } from "./vloot.ts";

for (const fiets of vloot) {
  console.log(`${omschrijving(fiets).padEnd(42)} ${alsEuro(fiets.dagprijsInCent).padStart(9)}  ${uitrustingAlsTekst(fiets.uitrusting)}`);
}

function prijskaart(item: Prijskaart): string {
  return `${item.naam}: ${alsEuro(item.dagprijsInCent)} per dag`;
}

const helm = { naam: "Helm", dagprijsInCent: 300, maat: "M" };
console.log();
console.log(prijskaart(helm));
console.log(prijskaart({ naam: "Fietskar", dagprijsInCent: 900 }));
