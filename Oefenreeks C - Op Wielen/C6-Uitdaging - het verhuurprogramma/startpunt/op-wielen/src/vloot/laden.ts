// Op Wielen — de vloot uit een JSON-bestand, elke fiets nagekeken met een schema

import { readFileSync } from "node:fs";
import { FietsSchema } from "../schemas/fietsschema.ts";
import { veldfouten } from "../schemas/valideer.ts";
import type { FietsGegevens, Fietssoort } from "./vloot.ts";

/** De gewone dagprijs per soort: om een vreemde prijs in het bestand op te merken. */
export const RICHTPRIJS = {
  stadsfiets: 1200,
  "e-bike": 3500,
  bakfiets: 4500,
  kinderfiets: 600,
} satisfies Record<Fietssoort, number>;

export function isFiets(waarde: unknown): waarde is FietsGegevens {
  return FietsSchema.safeParse(waarde).success;
}

/** De fietsen die in orde zijn, en alle fouten van de andere: het programma stopt niet bij de eerste. */
export function laadVloot(pad: URL): [fietsen: FietsGegevens[], fouten: string[]] {
  const gegevens: unknown = JSON.parse(readFileSync(pad, "utf8"));
  if (!Array.isArray(gegevens)) {
    return [[], ["het bestand bevat geen lijst"]];
  }
  const lijst: unknown[] = gegevens;
  const fietsen: FietsGegevens[] = [];
  const fouten: string[] = [];
  lijst.forEach((element, plaats) => {
    const resultaat = FietsSchema.safeParse(element);
    if (resultaat.success) {
      fietsen.push(resultaat.data);
    } else {
      for (const [veld, melding] of Object.entries(veldfouten(resultaat.error))) {
        fouten.push(`fiets ${plaats + 1}, ${veld}: ${melding}`);
      }
    }
  });
  return [fietsen, fouten];
}
