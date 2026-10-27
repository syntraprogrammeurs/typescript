// Op Wielen — een reservatie zoals ze in het bestand staat, en een aanvraag zoals ze van buiten komt

import { z } from "./zod.ts";

const datum = () => z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "moet een datum zijn zoals 2027-07-05");

export const ReservatieJsonSchema = z.object({
  id: z.string().regex(/^r\d+$/, "moet een reservatienummer zijn, zoals r3"),
  item: z.string().min(1, "mag niet leeg zijn"),
  klant: z.string().trim().min(1, "mag niet leeg zijn"),
  periode: z.object({ van: datum(), tot: datum() }),
});

export const AanvraagSchema = z.object({
  item: z.string().trim().min(1, "zeg welke fiets of welk accessoire"),
  klant: z.string().trim().min(1, "zeg voor wie de reservatie is"),
  van: datum(),
  tot: datum(),
});

/** Een aanvraag zoals de verhuur ze krijgt. Het type volgt uit het schema: er is maar één beschrijving. */
export type Aanvraag = z.output<typeof AanvraagSchema>;
