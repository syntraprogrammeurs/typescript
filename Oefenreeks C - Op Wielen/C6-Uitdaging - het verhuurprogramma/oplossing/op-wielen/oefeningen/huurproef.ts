// Op Wielen — fietsen en accessoires samen huren

import { Accessoire, alsEuro, Fiets, Periode, vloot, type Verhuuritem } from "../src/index.ts";

const herfst = Periode.van("2026-10-31", "2026-11-08");
const items: Verhuuritem[] = [
  ...vloot.slice(2, 4).map((gegevens) => new Fiets(gegevens)),
  new Accessoire("a1", "Helm", 300),
  new Accessoire("a2", "Fietskar", 900),
];

for (const item of items) {
  console.log(`${item.omschrijving.padEnd(36)} ${alsEuro(item.prijsVoor(herfst)).padStart(10)}  waarborg ${alsEuro(item.waarborgInCent)}`);
}
const totaal = items.reduce((som, item) => som + item.prijsVoor(herfst), 0);
console.log(`${herfst} (${herfst.aantalDagen} dagen): ${alsEuro(totaal)}`);
