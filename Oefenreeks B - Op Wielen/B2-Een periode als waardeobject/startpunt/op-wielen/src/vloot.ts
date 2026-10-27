// Op Wielen — de vorm van een fiets, en de vloot

import { onmogelijk } from "./onmogelijk.ts";

export interface Uitrusting {
  slot: boolean;
  mand: boolean;
  kinderzitje: boolean;
}

export type Fietssoort = "stadsfiets" | "e-bike" | "bakfiets" | "kinderfiets";

export type Fietstoestand =
  | { status: "beschikbaar" }
  | { status: "verhuurd"; klant: string; terugOp: string }
  | { status: "in-herstel"; probleem: string; klaarOp?: string }
  | { status: "afgeschreven"; reden: string };

export interface FietsGegevens {
  readonly id: string;
  merk: string;
  model: string;
  soort: Fietssoort;
  framemaatInCm?: number;
  dagprijsInCent: number;
  uitrusting: Uitrusting;
  toestand: Fietstoestand;
}

export interface Prijskaart {
  naam: string;
  dagprijsInCent: number;
}

export const vloot: readonly FietsGegevens[] = [
  { id: "f1", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 53, dagprijsInCent: 1200,
    uitrusting: { slot: true, mand: true, kinderzitje: false },
    toestand: { status: "beschikbaar" } },
  { id: "f2", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 57, dagprijsInCent: 1200,
    uitrusting: { slot: true, mand: false, kinderzitje: false },
    toestand: { status: "verhuurd", klant: "Sam Peeters", terugOp: "28 oktober" } },
  { id: "f3", merk: "Stromer", model: "ST3", soort: "e-bike", framemaatInCm: 55, dagprijsInCent: 3500,
    uitrusting: { slot: true, mand: false, kinderzitje: false },
    toestand: { status: "in-herstel", probleem: "lekke band", klaarOp: "27 oktober" } },
  { id: "f4", merk: "Riese & Müller", model: "Load 60", soort: "bakfiets", dagprijsInCent: 4500,
    uitrusting: { slot: true, mand: false, kinderzitje: true },
    toestand: { status: "beschikbaar" } },
  { id: "f5", merk: "Bike Fun", model: "Kids 20", soort: "kinderfiets", dagprijsInCent: 600,
    uitrusting: { slot: false, mand: false, kinderzitje: false },
    toestand: { status: "afgeschreven", reden: "frame gebarsten" } },
  { id: "f6", merk: "Stromer", model: "ST1", soort: "e-bike", framemaatInCm: 51, dagprijsInCent: 3000,
    uitrusting: { slot: true, mand: true, kinderzitje: false },
    toestand: { status: "in-herstel", probleem: "accu laadt niet op" } },
];

export function omschrijving(fiets: FietsGegevens): string {
  const maat = fiets.framemaatInCm === undefined ? "" : `, frame ${fiets.framemaatInCm} cm`;
  return `${fiets.merk} ${fiets.model} (${fiets.soort}${maat})`;
}

export function uitrustingAlsTekst(uitrusting: Uitrusting): string {
  const delen: string[] = [];
  if (uitrusting.slot) {
    delen.push("slot");
  }
  if (uitrusting.mand) {
    delen.push("mand");
  }
  if (uitrusting.kinderzitje) {
    delen.push("kinderzitje");
  }
  return delen.length === 0 ? "geen uitrusting" : delen.join(", ");
}

export function toestandAlsTekst(toestand: Fietstoestand): string {
  switch (toestand.status) {
    case "beschikbaar":
      return "beschikbaar";
    case "verhuurd":
      return `verhuurd aan ${toestand.klant}, terug op ${toestand.terugOp}`;
    case "in-herstel":
      return `in herstel (${toestand.probleem})${toestand.klaarOp === undefined ? "" : `, klaar op ${toestand.klaarOp}`}`;
    case "afgeschreven":
      return `afgeschreven: ${toestand.reden}`;
    default:
      return onmogelijk(toestand);
  }
}

export function kanVerhuurdWorden(fiets: FietsGegevens): boolean {
  return fiets.toestand.status === "beschikbaar";
}
