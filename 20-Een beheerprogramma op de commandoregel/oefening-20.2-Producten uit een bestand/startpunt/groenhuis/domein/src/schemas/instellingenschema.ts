// Het Groenhuis — de instellingen van de winkel: hier is het schema de enige beschrijving, en het type volgt eruit
// Hoofdstuk 19, klassikale oefening 19.2

import { z } from "./zod.ts";

function cent(standaard: number) {
  return z.int("moet een geheel aantal cent zijn").nonnegative("kan niet negatief zijn").default(standaard);
}

export const InstellingenSchema = z.object({
  gratisVerzendingVanaf: cent(5000),
  verzendkost: cent(495),
  toeslagExpress: cent(300),
});

/** Wat het programma krijgt: elk veld is er, desnoods met de standaard. */
export type Instellingen = z.output<typeof InstellingenSchema>;

/** Wat er in het bestand mag staan: elk veld mag ontbreken. */
export type InstellingenInBestand = z.input<typeof InstellingenSchema>;
