// Het Groenhuis — wat iets moet kunnen, los van wat het is

import type { Geld } from "../waarden/geld.ts";
import type { Inhoudsstatus } from "./inhoud.ts";

/** Alles wat gepubliceerd en gearchiveerd kan worden. */
export interface Publiceerbaar {
  readonly status: Inhoudsstatus;
  publiceer(): void;
  archiveer(): void;
}

/** Alles wat in een winkelmandje kan. */
export interface Verkoopbaar {
  readonly id: string;
  readonly weergavenaam: string;
  readonly prijsInclBtw: Geld;
  readonly isTeKoop: boolean;
  /** Hoeveel stuks er nog verkocht kunnen worden; undefined als er geen grens is. */
  readonly beschikbaar: number | undefined;
}
