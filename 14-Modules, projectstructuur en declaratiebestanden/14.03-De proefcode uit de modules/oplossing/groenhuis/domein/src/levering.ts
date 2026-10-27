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
