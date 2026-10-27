// Het Groenhuis — de instellingen van de winkel, uit een bestand
// Hoofdstuk 7, klassikale oefening 7.2; sinds hoofdstuk 19 met een schema

import { InstellingenSchema, type Instellingen } from "../schemas/instellingenschema.ts";
import { veldfouten } from "../schemas/valideer.ts";
import { leesJson } from "./laden.ts";

export type { Instellingen };

/** Een leeg bestand geeft overal de standaard. */
export const STANDAARD: Instellingen = InstellingenSchema.parse({});

export async function laadInstellingen(pad: URL): Promise<Instellingen> {
  let gegevens: unknown;
  try {
    gegevens = await leesJson(pad);
  } catch (fout) {
    console.log(`  niet gebruikt: ${fout instanceof Error ? fout.message : String(fout)}`);
    console.log("  de standaardwaarden gelden");
    return STANDAARD;
  }
  const resultaat = InstellingenSchema.safeParse(gegevens);
  if (!resultaat.success) {
    for (const [veld, melding] of Object.entries(veldfouten(resultaat.error))) {
      console.log(`  niet gebruikt: ${veld} ${melding}`);
    }
    console.log("  de standaardwaarden gelden");
    return STANDAARD;
  }
  return resultaat.data;
}
