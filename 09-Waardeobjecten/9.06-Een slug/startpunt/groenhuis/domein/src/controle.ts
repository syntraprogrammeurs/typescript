// Het Groenhuis — gegevens van buiten nakijken voor je ze vertrouwt

import { STATUSSEN, type Inhoudsstatus, type ProductGegevens } from "./inhoud.ts";

/** Een object waarvan je de velden nog niet kent. */
export type OnbekendObject = { [sleutel: string]: unknown };

export function isObject(waarde: unknown): waarde is OnbekendObject {
  return typeof waarde === "object" && waarde !== null && !Array.isArray(waarde);
}

export function isTekstlijst(waarde: unknown): waarde is string[] {
  return Array.isArray(waarde) && waarde.every((element) => typeof element === "string");
}

export function isInhoudsstatus(waarde: unknown): waarde is Inhoudsstatus {
  return STATUSSEN.some((status) => status === waarde);
}

function isBedrag(waarde: unknown): waarde is number {
  return typeof waarde === "number" && Number.isInteger(waarde) && waarde >= 0;
}

/** Alles wat niet klopt aan een product, in gewone woorden. Een lege lijst: alles klopt. */
export function foutenInProduct(waarde: unknown): string[] {
  if (!isObject(waarde)) {
    return ["is geen object"];
  }
  const fouten: string[] = [];
  for (const veld of ["id", "slug", "naam", "categorieId"]) {
    if (typeof waarde[veld] !== "string") {
      fouten.push(`${veld} ontbreekt of is geen tekst`);
    }
  }
  if (!isInhoudsstatus(waarde.status)) {
    fouten.push(`status moet ${STATUSSEN.join(", ")} zijn`);
  }
  if (waarde.beschrijving !== undefined && typeof waarde.beschrijving !== "string") {
    fouten.push("beschrijving is geen tekst");
  }
  for (const veld of ["prijsInCent", "btwPercentage", "voorraad"]) {
    if (!isBedrag(waarde[veld])) {
      fouten.push(`${veld} ontbreekt of is geen geheel getal vanaf 0`);
    }
  }
  if (!isTekstlijst(waarde.tags)) {
    fouten.push("tags is geen lijst teksten");
  }
  if (waarde.afmetingen !== undefined) {
    const afmetingen = waarde.afmetingen;
    if (!isObject(afmetingen) || typeof afmetingen.hoogteInCm !== "number" || typeof afmetingen.potmaatInCm !== "number") {
      fouten.push("afmetingen moet een hoogteInCm en een potmaatInCm hebben");
    }
  }
  return fouten;
}

export function isProduct(waarde: unknown): waarde is ProductGegevens {
  return foutenInProduct(waarde).length === 0;
}

export function controleerProduct(waarde: unknown, waar: string): asserts waarde is ProductGegevens {
  const fouten = foutenInProduct(waarde);
  if (fouten.length > 0) {
    throw new Error(`${waar}: ${fouten.join("; ")}`);
  }
}
