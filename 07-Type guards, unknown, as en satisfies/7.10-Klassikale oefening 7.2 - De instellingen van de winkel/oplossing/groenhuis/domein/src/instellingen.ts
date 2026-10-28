// 7.10 Klassikale oefening 7.2 — De instellingen van de winkel
//
// De situatie. De grens voor gratis verzending, de verzendkosten en de toeslag voor express staan
// nu als constanten in verzending.ts. De eigenaar wil ze zelf kunnen wijzigen, in een bestand
// data/instellingen.json. Als dat bestand ontbreekt of fout is, mag de winkel niet stilvallen: dan
// gelden de standaardwaarden.
//
// Wat je maakt. Een bestand src/instellingen.ts met:
//
// 1. Een interface Instellingen met de drie bedragen.
// 2. Een constante STANDAARD met de huidige waarden. Gebruik satisfies.
// 3. Een assertion function controleerInstellingen: elk bedrag een geheel aantal cent, niet
//    negatief.
// 4. laadInstellingen(pad): leest en controleert het bestand. Gaat er iets mis, dan toont ze
//    waarom en geeft ze de standaardwaarden.
// 5. Probeer het met een goed bestand, een bestand met "verzendkost": "4,95", en een bestand dat
//    niet bestaat.
//
// Opbouw van dit bestand:
// import isObject uit "./controle.ts"
// import leesJson uit "./laden.ts"
// export interface Instellingen — de vorm van een object met 3 leden:
//     gratisVerzendingVanaf: number
//     verzendkost: number
//     toeslagExpress: number
// export const STANDAARD = een object met de velden gratisVerzendingVanaf, verzendkost,
//     toeslagExpress: { gratisVerzendingVanaf: 5000, verzendkost: 495, toeslagExpress: 300, } (met
//     Instellingen)
// const VELDEN = een lijst van 3 elementen: ["gratisVerzendingVanaf", "verzendkost",
//     "toeslagExpress"] (as const)
// export function controleerInstellingen(waarde: unknown): asserts waarde is Instellingen
// export function laadInstellingen(pad: URL): Instellingen
// for … of: een lus over ["instellingen.json", "instellingen-kapot.json", "bestaat-niet.json"]

// Het Groenhuis — de instellingen van de winkel, uit een bestand
// Hoofdstuk 7, klassikale oefening 7.2

import { isObject } from "./controle.ts";
import { leesJson } from "./laden.ts";

export interface Instellingen {
  gratisVerzendingVanaf: number;
  verzendkost: number;
  toeslagExpress: number;
}

export const STANDAARD = {
  gratisVerzendingVanaf: 5000,
  verzendkost: 495,
  toeslagExpress: 300,
} satisfies Instellingen;

const VELDEN = ["gratisVerzendingVanaf", "verzendkost", "toeslagExpress"] as const;

export function controleerInstellingen(waarde: unknown): asserts waarde is Instellingen {
  if (!isObject(waarde)) {
    throw new Error("de instellingen zijn geen object");
  }
  for (const veld of VELDEN) {
    const getal = waarde[veld];
    if (typeof getal !== "number" || !Number.isInteger(getal) || getal < 0) {
      throw new Error(`${veld} moet een geheel aantal cent zijn, niet ${JSON.stringify(getal)}`);
    }
  }
}

export function laadInstellingen(pad: URL): Instellingen {
  try {
    const gegevens = leesJson(pad);
    controleerInstellingen(gegevens);
    return gegevens;
  } catch (fout) {
    const reden = fout instanceof Error ? fout.message : String(fout);
    console.log(`  niet gebruikt: ${reden}`);
    console.log("  de standaardwaarden gelden");
    return STANDAARD;
  }
}

for (const bestand of ["instellingen.json", "instellingen-kapot.json", "bestaat-niet.json"]) {
  console.log(`${bestand}:`);
  const instellingen = laadInstellingen(new URL(`../data/${bestand}`, import.meta.url));
  console.log(`  gratis verzending vanaf ${instellingen.gratisVerzendingVanaf / 100} euro`);
}
