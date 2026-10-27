// Op Wielen — de vloot uit een JSON-bestand, met controle van elke fiets

import { readFileSync } from "node:fs";
import { alsEuro } from "./prijs.ts";
import { omschrijving, toestandAlsTekst, type FietsGegevens, type Fietssoort } from "./vloot.ts";

type OnbekendObject = { [sleutel: string]: unknown };

const SOORTEN = ["stadsfiets", "e-bike", "bakfiets", "kinderfiets"] as const;
const STATUSSEN = ["beschikbaar", "verhuurd", "in-herstel", "afgeschreven"] as const;

/** De gewone dagprijs per soort: om een vreemde prijs in het bestand op te merken. */
export const RICHTPRIJS = {
  stadsfiets: 1200,
  "e-bike": 3500,
  bakfiets: 4500,
  kinderfiets: 600,
} satisfies { [soort: string]: number };

function isObject(waarde: unknown): waarde is OnbekendObject {
  return typeof waarde === "object" && waarde !== null && !Array.isArray(waarde);
}

function isSoort(waarde: unknown): waarde is Fietssoort {
  return SOORTEN.some((soort) => soort === waarde);
}

function foutenInToestand(waarde: unknown): string[] {
  if (!isObject(waarde) || !STATUSSEN.some((status) => status === waarde.status)) {
    return [`toestand moet een status hebben: ${STATUSSEN.join(", ")}`];
  }
  const nodig: { [status: string]: string[] } = {
    verhuurd: ["klant", "terugOp"],
    "in-herstel": ["probleem"],
    afgeschreven: ["reden"],
  };
  return (nodig[String(waarde.status)] ?? [])
    .filter((veld) => typeof waarde[veld] !== "string")
    .map((veld) => `toestand ${String(waarde.status)} heeft een ${veld} nodig`);
}

export function foutenInFiets(waarde: unknown): string[] {
  if (!isObject(waarde)) {
    return ["is geen object"];
  }
  const fouten: string[] = [];
  for (const veld of ["id", "merk", "model"]) {
    if (typeof waarde[veld] !== "string") {
      fouten.push(`${veld} is geen tekst`);
    }
  }
  if (!isSoort(waarde.soort)) {
    fouten.push(`soort ${JSON.stringify(waarde.soort)} bestaat niet`);
  }
  if (waarde.framemaatInCm !== undefined && typeof waarde.framemaatInCm !== "number") {
    fouten.push("framemaatInCm is geen getal");
  }
  if (typeof waarde.dagprijsInCent !== "number" || !Number.isInteger(waarde.dagprijsInCent) || waarde.dagprijsInCent <= 0) {
    fouten.push("dagprijsInCent is geen positief geheel getal");
  }
  const uitrusting = waarde.uitrusting;
  if (!isObject(uitrusting) || ["slot", "mand", "kinderzitje"].some((stuk) => typeof uitrusting[stuk] !== "boolean")) {
    fouten.push("uitrusting moet slot, mand en kinderzitje hebben, elk true of false");
  }
  fouten.push(...foutenInToestand(waarde.toestand));
  return fouten;
}

export function isFiets(waarde: unknown): waarde is FietsGegevens {
  return foutenInFiets(waarde).length === 0;
}

export function laadVloot(pad: URL): [fietsen: FietsGegevens[], fouten: string[]] {
  const gegevens: unknown = JSON.parse(readFileSync(pad, "utf8"));
  if (!Array.isArray(gegevens)) {
    return [[], ["het bestand bevat geen lijst"]];
  }
  const lijst: unknown[] = gegevens;
  const fietsen = lijst.filter(isFiets);
  const fouten: string[] = [];
  lijst.forEach((element, plaats) => {
    for (const fout of foutenInFiets(element)) {
      fouten.push(`fiets ${plaats + 1}: ${fout}`);
    }
  });
  return [fietsen, fouten];
}

const [fietsen, fouten] = laadVloot(new URL("../data/vloot.json", import.meta.url));

for (const fiets of fietsen) {
  const afwijking = fiets.dagprijsInCent !== RICHTPRIJS[fiets.soort] ? ` (richtprijs ${alsEuro(RICHTPRIJS[fiets.soort])})` : "";
  console.log(`${fiets.id}  ${omschrijving(fiets).padEnd(36)} ${alsEuro(fiets.dagprijsInCent)}${afwijking}`);
  console.log(`    ${toestandAlsTekst(fiets.toestand)}`);
}
console.log();
console.log(`${fouten.length} fouten in het bestand:`);
for (const fout of fouten) {
  console.log(`  ${fout}`);
}
