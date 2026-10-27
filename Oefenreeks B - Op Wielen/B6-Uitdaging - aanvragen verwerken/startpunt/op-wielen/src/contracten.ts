// Op Wielen — wat je kunt reserveren, los van wat het is

import type { Periode } from "./periode.ts";

export interface Huurbaar {
  readonly id: string;
  readonly omschrijving: string;
  prijsVoor(periode: Periode): number;
}
