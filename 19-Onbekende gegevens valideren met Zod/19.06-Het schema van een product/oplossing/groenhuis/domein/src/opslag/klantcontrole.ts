// Het Groenhuis — klanten uit een bestand nakijken
// Hoofdstuk 7, klassikale oefening 7.1

import { ValidatieFout } from "../fouten/fouten.ts";
import { isObject, type OnbekendObject } from "./controle.ts";
import type { Klant } from "../winkel/klant.ts";

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

/** Van een element uit een JSON-bestand naar een Klant, of een ValidatieFout met alles wat er mis is. */
export function klantUitJson(gegevens: unknown, plaats: number): Klant {
  if (!isKlant(gegevens)) {
    throw new ValidatieFout({ [`klant ${plaats + 1}`]: foutenInKlant(gegevens).join("; ") });
  }
  return gegevens;
}
