// Op Wielen — wat een fiets moet zijn, als schema: voor het bestand van de vloot en voor een nieuwe fiets

import { FIETSSOORTEN, type FietsGegevens, type Fietstoestand, type FietsWijziging, type Uitrusting } from "../vloot/vloot.ts";
import { z } from "./zod.ts";

const NIET_LEEG = "mag niet leeg zijn";

export const FietssoortSchema = z.enum(FIETSSOORTEN);

export const UitrustingSchema = z.object({
  slot: z.boolean(),
  mand: z.boolean(),
  kinderzitje: z.boolean(),
}) satisfies z.ZodType<Uitrusting>;

/** Per status andere velden: Zod kiest het juiste schema aan de hand van status. */
export const FietstoestandSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("beschikbaar") }),
  z.object({ status: z.literal("verhuurd"), klant: z.string().min(1, NIET_LEEG), terugOp: z.string().min(1, NIET_LEEG) }),
  z.object({ status: z.literal("in-herstel"), probleem: z.string().min(1, NIET_LEEG), klaarOp: z.string().exactOptional() }),
  z.object({ status: z.literal("afgeschreven"), reden: z.string().min(1, NIET_LEEG) }),
]) satisfies z.ZodType<Fietstoestand>;

export const FietsSchema = z.object({
  id: z.string().regex(/^f\d+$/, "moet een fietsnummer zijn, zoals f7"),
  merk: z.string().trim().min(1, NIET_LEEG),
  model: z.string().trim().min(1, NIET_LEEG),
  soort: FietssoortSchema,
  framemaatInCm: z.int("moet een geheel aantal cm zijn").positive("moet groter dan 0 zijn").exactOptional(),
  dagprijsInCent: z.int("moet een geheel aantal cent zijn").positive("moet groter dan 0 zijn"),
  uitrusting: UitrustingSchema,
  toestand: FietstoestandSchema,
}) satisfies z.ZodType<FietsGegevens>;

const veld = FietsSchema.shape;

export const FietsWijzigingSchema = z.object({
  dagprijsInCent: veld.dagprijsInCent.exactOptional(),
  uitrusting: veld.uitrusting.exactOptional(),
}) satisfies z.ZodType<FietsWijziging>;
