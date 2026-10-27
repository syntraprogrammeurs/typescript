// Op Wielen — proef: een stapel aanvragen verwerken, op een vaste dag

import { aanbod, alsEuro, GeheugenRegister, Reservatieboek, VerhuurService, verwerk, type Aanvraag, type Reservatie, type Verhuuritem } from "../src/index.ts";

const dienst = new VerhuurService(
  new GeheugenRegister<Verhuuritem>(aanbod()),
  new Reservatieboek(new GeheugenRegister<Reservatie>()),
  () => "2026-10-25",
);

const aanvragen: Aanvraag[] = [
  { item: "f1", klant: "Sam Peeters", van: "2026-11-02", tot: "2026-11-04" },
  { item: "f1", klant: "Lien Maes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "f9", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-05", tot: "2026-11-03" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "f5", klant: "Lien Maes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "f4", klant: "Sam Peeters", van: "2026-10-20", tot: "2026-10-27" },
];

for (const aanvraag of aanvragen) {
  const antwoord = await verwerk(aanvraag, dienst);
  if (antwoord.gelukt) {
    const r = antwoord.reservatie;
    console.log(`OK   ${r.id} ${r.klant}: ${r.item.omschrijving}, ${r.periode}, ${alsEuro(r.prijsInCent)}`);
  } else {
    console.log(`NEE  ${aanvraag.klant}: ${antwoord.reden}${antwoord.voorstel === undefined ? "" : ` (${antwoord.voorstel})`}`);
  }
}
const totaal = (await dienst.reservaties()).reduce((som, r) => som + r.prijsInCent, 0);
console.log(`Omzet: ${alsEuro(totaal)}`);
