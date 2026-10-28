// 7.9 Klassikale oefening 7.1 — Klanten uit een bestand nakijken
//
// De situatie. Het Groenhuis neemt de klanten over uit een oud systeem. De export is een JSON-
// bestand, en niet alles erin is netjes: een telefoonnummer als getal, een huisnummer als getal,
// en een factuuradres dat null is in plaats van te ontbreken.
//
// Wat je maakt.
//
// 1. De export staat in data/klanten.json, in het startpunt van deze oefening in de map lessen.
//    Kopieer het bestand naar je project en kijk er eerst zelf naar: wat klopt er niet met de
//    interface Klant uit hoofdstuk 4?
// 2. Een bestand src/klantcontrole.ts met foutenInAdres, foutenInKlant en een type predicate
//    isKlant.
// 3. Toon de klanten die in orde zijn, en voor elke andere klant wat er niet klopt.
// 4. Importeer Klant uit klant.ts. Waarom moet dat met import type, en wat zou er gebeuren zonder?
//
// Opbouw van dit bestand:
// import isObject, type OnbekendObject uit "./controle.ts"
// import Klant uit "./klant.ts" (alleen types, verdwijnt bij het wegvegen)
// import leesJson uit "./laden.ts"
// function tekstvelden(waarde: OnbekendObject, velden: string[], waar: string): string[]
// export function foutenInAdres(waarde: unknown, waar: string): string[]
// export function foutenInKlant(waarde: unknown): string[]
// export function isKlant(waarde: unknown): waarde is Klant
// const gegevens = het resultaat van leesJson(new URL("../data/klanten.json", import.meta.url))
// const lijst: unknown[] = een keuze: Array.isArray(gegevens) ? gegevens : []
// const klanten = het resultaat van lijst.filter(isKlant)
// console.log(…) toont: `In orde: ${klanten.map((klant) => `${klant.voornaam}
//     ${klant.achternaam}`).joi…
// roept lijst.forEach(…) aan: lijst.forEach((element, plaats) => { const fouten =
//     foutenInKlant(element); if (fouten.length > 0) { console.…

// Het Groenhuis — klanten uit een bestand nakijken
// Hoofdstuk 7, klassikale oefening 7.1

import { isObject, type OnbekendObject } from "./controle.ts";
import type { Klant } from "./klant.ts";
import { leesJson } from "./laden.ts";

function tekstvelden(waarde: OnbekendObject, velden: string[], waar: string): string[] {
  return velden.filter((veld) => typeof waarde[veld] !== "string").map((veld) => `${waar}${veld} is geen tekst`);
}

export function foutenInAdres(waarde: unknown, waar: string): string[] {
  if (!isObject(waarde)) {
    return [`${waar} is geen object`];
  }
  const fouten = tekstvelden(waarde, ["straat", "huisnummer", "postcode", "gemeente", "land"], `${waar}.`);
  if (waarde.bus !== undefined && typeof waarde.bus !== "string") {
    fouten.push(`${waar}.bus is geen tekst`);
  }
  return fouten;
}

export function foutenInKlant(waarde: unknown): string[] {
  if (!isObject(waarde)) {
    return ["is geen object"];
  }
  const fouten = tekstvelden(waarde, ["id", "voornaam", "achternaam", "email"], "");
  if (waarde.telefoon !== undefined && typeof waarde.telefoon !== "string") {
    fouten.push("telefoon is geen tekst");
  }
  fouten.push(...foutenInAdres(waarde.leveradres, "leveradres"));
  if (waarde.factuuradres !== undefined) {
    fouten.push(...foutenInAdres(waarde.factuuradres, "factuuradres"));
  }
  return fouten;
}

export function isKlant(waarde: unknown): waarde is Klant {
  return foutenInKlant(waarde).length === 0;
}

const gegevens = leesJson(new URL("../data/klanten.json", import.meta.url));
const lijst: unknown[] = Array.isArray(gegevens) ? gegevens : [];

const klanten = lijst.filter(isKlant);
console.log(`In orde: ${klanten.map((klant) => `${klant.voornaam} ${klant.achternaam}`).join(", ")}`);

lijst.forEach((element, plaats) => {
  const fouten = foutenInKlant(element);
  if (fouten.length > 0) {
    console.log(`Klant ${plaats + 1}: ${fouten.join("; ")}`);
  }
});
