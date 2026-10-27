// Op Wielen — proef: fietsen en reservaties in een register

import { alsEuro, Fiets, GeheugenRegister, groepeerPer, Periode, Reservatieboek, vloot, type Reservatie } from "../src/index.ts";

const fietsen = new GeheugenRegister<Fiets>(vloot.map((gegevens) => new Fiets(gegevens)));
const reservaties = new GeheugenRegister<Reservatie>();
const boek = new Reservatieboek(reservaties);

const aanvragen: [string, string, string, string][] = [
  ["f1", "Sam Peeters", "2026-11-02", "2026-11-04"],
  ["f3", "Lien Maes", "2026-11-02", "2026-11-09"],
  ["f1", "Noor Claes", "2026-11-05", "2026-11-05"],
  ["f4", "Sam Peeters", "2026-11-14", "2026-11-15"],
];
for (const [fietsId, klant, van, tot] of aanvragen) {
  const fiets = await fietsen.zoek(fietsId);
  if (fiets !== undefined) {
    await boek.reserveer(fiets, klant, Periode.van(van, tot));
  }
}

const ebikes = await fietsen.waar((fiets) => fiets.soort === "e-bike");
console.log(`E-bikes: ${ebikes.map((fiets) => fiets.id).join(", ")}`);
for (const [klant, lijst] of groepeerPer(await reservaties.alle(), (r) => r.klant)) {
  const totaal = lijst.reduce((som, r) => som + r.prijsInCent, 0);
  console.log(`${klant.padEnd(12)} ${lijst.map((r) => `${r.item.id} ${r.periode}`).join(", ").padEnd(30)} ${alsEuro(totaal)}`);
}
console.log((await reservaties.zoek("r2"))?.item.omschrijving, await reservaties.zoek("r9"));
