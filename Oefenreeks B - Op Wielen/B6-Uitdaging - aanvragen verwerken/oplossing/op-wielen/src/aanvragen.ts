// Op Wielen — een stapel aanvragen verwerken: wat kan, wordt gereserveerd; wat niet kan, krijgt een uitleg

import { Fiets } from "./fiets.ts";
import { NietVrijFout, OnbekendItemFout, VerhuurFout } from "./fouten.ts";
import { Periode } from "./periode.ts";
import { alsEuro } from "./prijs.ts";
import { Register } from "./register.ts";
import { Reservatieboek, type Reservatie } from "./reservaties.ts";
import { Accessoire, type Verhuuritem } from "./verhuuritem.ts";
import { vloot } from "./vloot.ts";

export interface Aanvraag {
  item: string;
  klant: string;
  van: string;
  tot: string;
}

export type Antwoord = { gelukt: true; reservatie: Reservatie } | { gelukt: false; reden: string; voorstel?: string };

export function verwerk(aanvraag: Aanvraag, items: Register<Verhuuritem>, boek: Reservatieboek): Antwoord {
  try {
    const item = items.zoek(aanvraag.item);
    if (item === undefined) {
      throw new OnbekendItemFout(aanvraag.item);
    }
    const periode = Periode.van(aanvraag.van, aanvraag.tot);
    return { gelukt: true, reservatie: boek.reserveer(item, aanvraag.klant, periode) };
  } catch (fout) {
    if (fout instanceof NietVrijFout) {
      return { gelukt: false, reden: fout.message, voorstel: `vrij vanaf ${fout.bezet.periode.dagErna}` };
    }
    if (fout instanceof VerhuurFout) {
      return { gelukt: false, reden: fout.message };
    }
    throw fout;
  }
}

const items = new Register<Verhuuritem>();
items.voegToe(...vloot.map((gegevens) => new Fiets(gegevens)), new Accessoire("a1", "Helm", 300));
const boek = new Reservatieboek();

const aanvragen: Aanvraag[] = [
  { item: "f1", klant: "Sam Peeters", van: "2026-11-02", tot: "2026-11-04" },
  { item: "f1", klant: "Lien Maes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "f9", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-05", tot: "2026-11-03" },
  { item: "a1", klant: "Noor Claes", van: "2026-11-03", tot: "2026-11-05" },
];

for (const aanvraag of aanvragen) {
  const antwoord = verwerk(aanvraag, items, boek);
  if (antwoord.gelukt) {
    const r = antwoord.reservatie;
    console.log(`OK   ${r.id} ${r.klant}: ${r.item.omschrijving}, ${r.periode}, ${alsEuro(r.prijsInCent)}`);
  } else {
    console.log(`NEE  ${aanvraag.klant}: ${antwoord.reden}${antwoord.voorstel === undefined ? "" : ` (${antwoord.voorstel})`}`);
  }
}
console.log(`Omzet: ${alsEuro(boek.omzetInCent)}`);
