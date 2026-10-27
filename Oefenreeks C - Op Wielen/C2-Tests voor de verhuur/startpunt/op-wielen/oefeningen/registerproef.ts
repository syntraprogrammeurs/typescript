// Op Wielen — proef: fietsen en reservaties in een register

import { alsEuro, Fiets, groepeerPer, Periode, Register, Reservatieboek, vloot, type Reservatie } from "../src/index.ts";

const fietsen = new Register<Fiets>();
fietsen.voegToe(...vloot.map((gegevens) => new Fiets(gegevens)));

const boek = new Reservatieboek();
const reservaties = new Register<Reservatie>();
const aanvragen: [string, string, string, string][] = [
  ["f1", "Sam Peeters", "2026-11-02", "2026-11-04"],
  ["f3", "Lien Maes", "2026-11-02", "2026-11-09"],
  ["f1", "Noor Claes", "2026-11-05", "2026-11-05"],
  ["f4", "Sam Peeters", "2026-11-14", "2026-11-15"],
];
for (const [fietsId, klant, van, tot] of aanvragen) {
  const fiets = fietsen.zoek(fietsId);
  if (fiets !== undefined) {
    reservaties.voegToe(boek.reserveer(fiets, klant, Periode.van(van, tot)));
  }
}

console.log(`E-bikes: ${fietsen.waar((fiets) => fiets.soort === "e-bike").map((fiets) => fiets.id).join(", ")}`);
for (const [klant, lijst] of groepeerPer(reservaties.alle(), (r) => r.klant)) {
  const totaal = lijst.reduce((som, r) => som + r.prijsInCent, 0);
  console.log(`${klant.padEnd(12)} ${lijst.map((r) => `${r.item.id} ${r.periode}`).join(", ").padEnd(30)} ${alsEuro(totaal)}`);
}
console.log(reservaties.zoek("r2")?.item.omschrijving, reservaties.zoek("r9"));
