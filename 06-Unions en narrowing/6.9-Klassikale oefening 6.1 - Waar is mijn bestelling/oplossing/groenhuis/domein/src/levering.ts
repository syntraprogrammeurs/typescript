// 6.9 Klassikale oefening 6.1 — Waar is mijn bestelling?
//
// De situatie. Een klant wil weten waar haar bestelling is. Een levering is in voorbereiding,
// verzonden, geleverd of geannuleerd. Elke toestand heeft andere gegevens:
//
//     | Status | Gegevens |
//     |---|---|
//     | in voorbereiding | geen |
//     | verzonden | de vervoerder (bpost, PostNL of DPD) en een trackingcode |
//     | geleverd | de datum, en soms wie het pakje aannam |
//     | geannuleerd | de reden |
//
// Wat je maakt. Een bestand src/levering.ts met:
//
// 1. Een type Vervoerder en een discriminated union Levering. Schrijf de vier mogelijkheden
//    rechtstreeks in de union, zonder aparte interfaces.
// 2. leverinfo(levering): een zin voor de klant, met een switch en het vangnet uit 6.7.
// 3. kanGeannuleerdWorden(levering): alleen een bestelling in voorbereiding.
// 4. Vijf voorbeelden, waaronder twee geleverde: één mét en één zonder ontvanger.
// 5. Probeer daarna een verzonden levering zonder trackingcode, en een geleverde mét een
//    trackingcode. Wat zegt TypeScript?
//
// Opbouw van dit bestand:
// import onmogelijk uit "./onmogelijk.ts"
// export type Vervoerder = een union, de waarde is een van: "bpost" | "PostNL" | "DPD"
// export type Levering = een union, de waarde is een van: { status: "in-voorbereiding" } | {
//     status: "verzonden"; vervoerder: Verv… | { status: "geleverd"; geleverdOp: strin… | {
//     status: "geannuleerd"; reden: string }
// export function leverinfo(levering: Levering): string
// export function kanGeannuleerdWorden(levering: Levering): boolean
// const leveringen: Levering[] = een lijst van 5 elementen, het eerste: { status: "in-
//     voorbereiding" }
// for … of: een lus over leveringen

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
