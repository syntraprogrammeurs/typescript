// Het Groenhuis — de proef van levering.ts
// Hoofdstuk 6, klassikale oefening 6.1

import { kanGeannuleerdWorden, leverinfo, type Levering } from "../src/levering.ts";

const leveringen: Levering[] = [
  { status: "in-voorbereiding" },
  { status: "verzonden", vervoerder: "bpost", trackingcode: "323299901234567" },
  { status: "geleverd", geleverdOp: "14 oktober 2026", ontvangenDoor: "de buren" },
  { status: "geleverd", geleverdOp: "15 oktober 2026" },
  { status: "geannuleerd", reden: "op vraag van de klant" },
];

for (const levering of leveringen) {
  const annuleren = kanGeannuleerdWorden(levering) ? "annuleren kan" : "";
  console.log(`${levering.status.padEnd(18)}${leverinfo(levering)} ${annuleren}`.trimEnd());
}
