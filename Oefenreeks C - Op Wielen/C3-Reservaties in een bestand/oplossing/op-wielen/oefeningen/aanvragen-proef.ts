// Op Wielen — proef: een stapel aanvragen verwerken

import { aanbod, alsEuro, GeheugenRegister, Reservatieboek, verwerk, type Aanvraag, type Reservatie, type Verhuuritem } from "../src/index.ts";

const items = new GeheugenRegister<Verhuuritem>(aanbod());
const boek = new Reservatieboek(new GeheugenRegister<Reservatie>());

const aanvragen: Aanvraag[] = [
  { item: "f1", klant: "Sam Peeters", van: "2026-11-02", tot: "2026-11-04" },
  { item: "f1", klant: "Lien Maes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "f9", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-05", tot: "2026-11-03" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
];

for (const aanvraag of aanvragen) {
  const antwoord = await verwerk(aanvraag, items, boek);
  if (antwoord.gelukt) {
    const r = antwoord.reservatie;
    console.log(`OK   ${r.id} ${r.klant}: ${r.item.omschrijving}, ${r.periode}, ${alsEuro(r.prijsInCent)}`);
  } else {
    console.log(`NEE  ${aanvraag.klant}: ${antwoord.reden}${antwoord.voorstel === undefined ? "" : ` (${antwoord.voorstel})`}`);
  }
}
console.log(`Omzet: ${alsEuro(await boek.omzetInCent())}`);
