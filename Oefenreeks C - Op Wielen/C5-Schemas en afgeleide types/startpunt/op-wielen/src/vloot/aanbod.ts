// Op Wielen — alles wat te huur is: de fietsen van de vloot en de accessoires

import { Fiets } from "./fiets.ts";
import { Accessoire, type Verhuuritem } from "./verhuuritem.ts";
import { vloot } from "./vloot.ts";

/** Telkens nieuwe objecten: een fiets heeft een toestand die verandert. */
export function aanbod(): Verhuuritem[] {
  return [
    ...vloot.map((gegevens) => new Fiets(gegevens)),
    new Accessoire("a1", "Helm", 300),
    new Accessoire("a2", "Fietskar", 900),
  ];
}
