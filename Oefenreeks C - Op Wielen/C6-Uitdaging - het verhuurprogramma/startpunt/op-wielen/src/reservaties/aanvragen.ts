// Op Wielen — een aanvraag van buiten verwerken: eerst nakijken, dan reserveren, en altijd een antwoord

import type { VerhuurService } from "../diensten/verhuurservice.ts";
import { NietVrijFout, VerhuurFout } from "../fouten/fouten.ts";
import { AanvraagSchema } from "../schemas/reservatieschema.ts";
import { valideer } from "../schemas/valideer.ts";
import type { Reservatie } from "./reservaties.ts";

export type Antwoord = { gelukt: true; reservatie: Reservatie } | { gelukt: false; reden: string; voorstel?: string };

/** De aanvraag komt van buiten: ze is unknown tot het schema ze nakeek. */
export async function verwerk(invoer: unknown, dienst: VerhuurService): Promise<Antwoord> {
  try {
    return { gelukt: true, reservatie: await dienst.reserveer(valideer(AanvraagSchema, invoer)) };
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
