// Het Groenhuis — wat een product moet zijn, als schema: voor een bestand, een formulier of een API

import { STATUSSEN, type NieuwProduct, type ProductGegevens, type ProductWijziging } from "../inhoud/inhoud.ts";
import { BTW_PLANTEN, BTW_STANDAARD } from "../waarden/prijs.ts";
import { z } from "./zod.ts";

const CENT = "moet een geheel aantal cent vanaf 0 zijn";

export const AfmetingenSchema = z.object({
  hoogteInCm: z.number().positive("moet groter dan 0 zijn"),
  potmaatInCm: z.number().positive("moet groter dan 0 zijn"),
});

/** Een product zoals het in een bestand staat. TypeScript kijkt na dat het een geldige ProductGegevens oplevert. */
export const ProductSchema = z.object({
  id: z.string().min(1, "mag niet leeg zijn"),
  slug: z.string(),
  status: z.enum(STATUSSEN),
  naam: z.string().trim().min(1, "mag niet leeg zijn"),
  beschrijving: z.string().exactOptional(),
  prijsInCent: z.int(CENT).nonnegative(CENT),
  btwPercentage: z.literal([BTW_PLANTEN, BTW_STANDAARD], `moet ${BTW_PLANTEN} of ${BTW_STANDAARD} zijn`),
  voorraad: z.int("moet een geheel aantal zijn").nonnegative("kan niet negatief zijn"),
  categorieId: z.string().min(1, "mag niet leeg zijn"),
  tags: z.array(z.string()),
  afmetingen: AfmetingenSchema.exactOptional(),
}) satisfies z.ZodType<ProductGegevens>;

const veld = ProductSchema.shape;

/** Een nieuw product: zonder wat het domein zelf invult, en met de btw en de tags optioneel. */
export const NieuwProductSchema = ProductSchema
  .omit({ id: true, slug: true, status: true, voorraad: true })
  .extend({
    btwPercentage: veld.btwPercentage.exactOptional(),
    tags: veld.tags.exactOptional(),
  }) satisfies z.ZodType<NieuwProduct>;

/** Een wijziging: elk veld mag, geen enkel veld moet. */
export const ProductWijzigingSchema = z.object({
  naam: veld.naam.exactOptional(),
  beschrijving: veld.beschrijving,
  prijsInCent: veld.prijsInCent.exactOptional(),
  btwPercentage: veld.btwPercentage.exactOptional(),
  categorieId: veld.categorieId.exactOptional(),
  tags: veld.tags.exactOptional(),
  afmetingen: veld.afmetingen,
}) satisfies z.ZodType<ProductWijziging>;
