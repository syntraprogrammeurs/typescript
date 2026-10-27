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
