// Op Wielen — de vloot doorzoeken

import { alsEuro } from "./prijs.ts";
import { omschrijving, vloot } from "./vloot.ts";
import { aantalPerSoort, goedkoopsteEerst, metUitrusting, passend, prijsbereik, vanSoort } from "./zoeken.ts";

console.log("Per soort:", aantalPerSoort(vloot));
console.log("E-bikes:", vanSoort(vloot, "e-bike").map(omschrijving));
console.log("Met een mand:", metUitrusting(vloot, "mand").map((fiets) => fiets.id));
console.log("Voor iemand van 1,70 m:", passend(vloot, 170).map(omschrijving));
console.log("Goedkoopste eerst:", goedkoopsteEerst(vloot).map((fiets) => `${fiets.id} ${alsEuro(fiets.dagprijsInCent)}`).join(" | "));

const bereik = prijsbereik(vloot);
if (bereik !== undefined) {
  const [goedkoopste, duurste] = bereik;
  console.log(`Van ${alsEuro(goedkoopste)} tot ${alsEuro(duurste)} per dag`);
}
console.log("Lege vloot:", prijsbereik([]));
