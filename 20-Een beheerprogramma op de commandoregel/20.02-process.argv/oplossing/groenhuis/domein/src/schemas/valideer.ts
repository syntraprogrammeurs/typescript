// Het Groenhuis — gegevens van buiten nakijken met een schema, en een fout van Zod omzetten in een ValidatieFout

import { ValidatieFout } from "../fouten/fouten.ts";
import { z } from "./zod.ts";

/** Per plaats in de gegevens wat er mis is: "prijsInCent", "afmetingen.hoogteInCm", "tags.2". */
export function veldfouten(fout: z.ZodError, waar?: string): { [veld: string]: string } {
  const velden: { [veld: string]: string } = {};
  for (const probleem of fout.issues) {
    const plaats = [...(waar === undefined ? [] : [waar]), ...probleem.path.map(String)].join(".") || "gegevens";
    const al = velden[plaats];
    velden[plaats] = al === undefined ? probleem.message : `${al}; ${probleem.message}`;
  }
  return velden;
}

/** Geeft de nagekeken gegevens terug, met het type van het schema. Kloppen ze niet, dan een ValidatieFout. */
export function valideer<S extends z.ZodType>(schema: S, waarde: unknown, waar?: string): z.output<S> {
  const resultaat = schema.safeParse(waarde);
  if (!resultaat.success) {
    throw new ValidatieFout(veldfouten(resultaat.error, waar));
  }
  return resultaat.data;
}
