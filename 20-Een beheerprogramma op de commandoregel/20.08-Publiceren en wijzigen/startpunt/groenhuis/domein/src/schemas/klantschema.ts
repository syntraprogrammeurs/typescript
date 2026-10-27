// Het Groenhuis — klanten uit een bestand nakijken, met een schema
// Hoofdstuk 19, klassikale oefening 19.1: vervangt klantcontrole.ts uit hoofdstuk 7

import type { Adres, Klant } from "../winkel/klant.ts";
import { valideer } from "./valideer.ts";
import { z } from "./zod.ts";

const tekst = z.string().trim().min(1, "mag niet leeg zijn");

export const AdresSchema = z.object({
  straat: tekst,
  huisnummer: tekst,
  bus: tekst.exactOptional(),
  postcode: tekst,
  gemeente: tekst,
  land: tekst,
}) satisfies z.ZodType<Adres>;

export const KlantSchema = z.object({
  id: tekst,
  voornaam: tekst,
  achternaam: tekst,
  email: z.email("is geen geldig e-mailadres"),
  telefoon: tekst.exactOptional(),
  leveradres: AdresSchema,
  factuuradres: AdresSchema.exactOptional(),
}) satisfies z.ZodType<Klant>;

export function isKlant(waarde: unknown): waarde is Klant {
  return KlantSchema.safeParse(waarde).success;
}

/** Van een element uit een JSON-bestand naar een Klant, of een ValidatieFout met alles wat er mis is. */
export function klantUitJson(gegevens: unknown, plaats: number): Klant {
  return valideer(KlantSchema, gegevens, `klant ${plaats + 1}`);
}
