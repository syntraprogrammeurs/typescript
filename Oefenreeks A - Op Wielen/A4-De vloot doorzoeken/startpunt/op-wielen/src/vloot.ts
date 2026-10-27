// Op Wielen — de vorm van een fiets, en de vloot

export interface Uitrusting {
  slot: boolean;
  mand: boolean;
  kinderzitje: boolean;
}

export interface Fiets {
  readonly id: string;
  merk: string;
  model: string;
  soort: string;
  framemaatInCm?: number;
  dagprijsInCent: number;
  uitrusting: Uitrusting;
}

export interface Prijskaart {
  naam: string;
  dagprijsInCent: number;
}

export const vloot: readonly Fiets[] = [
  { id: "f1", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 53, dagprijsInCent: 1200,
    uitrusting: { slot: true, mand: true, kinderzitje: false } },
  { id: "f2", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 57, dagprijsInCent: 1200,
    uitrusting: { slot: true, mand: false, kinderzitje: false } },
  { id: "f3", merk: "Stromer", model: "ST3", soort: "e-bike", framemaatInCm: 55, dagprijsInCent: 3500,
    uitrusting: { slot: true, mand: false, kinderzitje: false } },
  { id: "f4", merk: "Riese & Müller", model: "Load 60", soort: "bakfiets", dagprijsInCent: 4500,
    uitrusting: { slot: true, mand: false, kinderzitje: true } },
  { id: "f5", merk: "Bike Fun", model: "Kids 20", soort: "kinderfiets", dagprijsInCent: 600,
    uitrusting: { slot: false, mand: false, kinderzitje: false } },
  { id: "f6", merk: "Stromer", model: "ST1", soort: "e-bike", framemaatInCm: 51, dagprijsInCent: 3000,
    uitrusting: { slot: true, mand: true, kinderzitje: false } },
];

export function omschrijving(fiets: Fiets): string {
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
