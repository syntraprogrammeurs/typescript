// Op Wielen — een aanvraag verwerken: wat kan, wordt gereserveerd; wat niet kan, krijgt een uitleg

import type { VerhuurService } from "../diensten/verhuurservice.ts";
import { NietVrijFout, VerhuurFout } from "../fouten/fouten.ts";
import type { Reservatie } from "./reservaties.ts";

export interface Aanvraag {
  item: string;
  klant: string;
  van: string;
  tot: string;
}

export type Antwoord = { gelukt: true; reservatie: Reservatie } | { gelukt: false; reden: string; voorstel?: string };

/** Een fout van de verhuur wordt een antwoord voor de klant. Elke andere fout gaat gewoon door. */
export async function verwerk(aanvraag: Aanvraag, dienst: VerhuurService): Promise<Antwoord> {
  try {
    return { gelukt: true, reservatie: await dienst.reserveer(aanvraag) };
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
