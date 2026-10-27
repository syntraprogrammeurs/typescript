// Het Groenhuis — waar is mijn bestelling?
// Hoofdstuk 6, klassikale oefening 6.1

import { onmogelijk } from "./onmogelijk.ts";

export type Vervoerder = "bpost" | "PostNL" | "DPD";

export type Levering =
  | { status: "in-voorbereiding" }
  | { status: "verzonden"; vervoerder: Vervoerder; trackingcode: string }
  | { status: "geleverd"; geleverdOp: string; ontvangenDoor?: string }
  | { status: "geannuleerd"; reden: string };

export function leverinfo(levering: Levering): string {
  switch (levering.status) {
    case "in-voorbereiding":
      return "We maken je bestelling klaar.";
    case "verzonden":
      return `Onderweg met ${levering.vervoerder}, volg ze met code ${levering.trackingcode}.`;
    case "geleverd":
      return levering.ontvangenDoor === undefined
        ? `Geleverd op ${levering.geleverdOp}.`
        : `Geleverd op ${levering.geleverdOp}, ontvangen door ${levering.ontvangenDoor}.`;
    case "geannuleerd":
      return `Geannuleerd: ${levering.reden}.`;
    default:
      return onmogelijk(levering);
  }
}

export function kanGeannuleerdWorden(levering: Levering): boolean {
  return levering.status === "in-voorbereiding";
}

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
