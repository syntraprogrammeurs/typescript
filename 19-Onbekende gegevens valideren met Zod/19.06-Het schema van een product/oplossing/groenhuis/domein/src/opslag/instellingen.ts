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

export async function laadInstellingen(pad: URL): Promise<Instellingen> {
  try {
    const gegevens = await leesJson(pad);
    controleerInstellingen(gegevens);
    return gegevens;
  } catch (fout) {
    const reden = fout instanceof Error ? fout.message : String(fout);
    console.log(`  niet gebruikt: ${reden}`);
    console.log("  de standaardwaarden gelden");
    return STANDAARD;
  }
}
