// Op Wielen — proef: de vloot uit data/vloot.json, met alle fouten

import { alsEuro, laadVloot, omschrijving, RICHTPRIJS, toestandAlsTekst } from "../src/index.ts";

const [fietsen, fouten] = laadVloot(new URL("../data/vloot.json", import.meta.url));

for (const fiets of fietsen) {
  const afwijking = fiets.dagprijsInCent !== RICHTPRIJS[fiets.soort] ? ` (richtprijs ${alsEuro(RICHTPRIJS[fiets.soort])})` : "";
  console.log(`${fiets.id}  ${omschrijving(fiets).padEnd(36)} ${alsEuro(fiets.dagprijsInCent)}${afwijking}`);
  console.log(`    ${toestandAlsTekst(fiets.toestand)}`);
}
console.log();
console.log(`${fouten.length} fouten in het bestand:`);
for (const fout of fouten) {
  console.log(`  ${fout}`);
}
