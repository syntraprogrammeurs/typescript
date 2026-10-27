// Op Wielen — een aanvraag verwerken: wat kan, wordt gereserveerd; wat niet kan, krijgt een uitleg

import { NietVrijFout, OnbekendItemFout, VerhuurFout } from "../fouten/fouten.ts";
import type { Register } from "../opslag/register.ts";
import type { Verhuuritem } from "../vloot/verhuuritem.ts";
import { Periode } from "./periode.ts";
import type { Reservatie, Reservatieboek } from "./reservaties.ts";

export interface Aanvraag {
  item: string;
  klant: string;
  van: string;
  tot: string;
}

export type Antwoord = { gelukt: true; reservatie: Reservatie } | { gelukt: false; reden: string; voorstel?: string };

export async function verwerk(aanvraag: Aanvraag, items: Register<Verhuuritem>, boek: Reservatieboek): Promise<Antwoord> {
  try {
    const item = await items.zoek(aanvraag.item);
    if (item === undefined) {
      throw new OnbekendItemFout(aanvraag.item);
    }
    const periode = Periode.van(aanvraag.van, aanvraag.tot);
    return { gelukt: true, reservatie: await boek.reserveer(item, aanvraag.klant, periode) };
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
