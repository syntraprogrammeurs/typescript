// Op Wielen — een fiets, die zelf bewaakt welke toestand na welke mag komen

import { ToestandFout } from "../fouten/fouten.ts";
import { FietsSchema, FietsWijzigingSchema } from "../schemas/fietsschema.ts";
import { valideer } from "../schemas/valideer.ts";
import { Verhuuritem } from "./verhuuritem.ts";
import type { FietsGegevens, Fietssoort, Fietstoestand, FietsWijziging, NieuweFiets, Uitrusting } from "./vloot.ts";
import { toestandAlsTekst } from "./vloot.ts";

export class Fiets extends Verhuuritem {
  merk: string;
  model: string;
  soort: Fietssoort;
  framemaatInCm?: number;
  dagprijsInCent: number;
  uitrusting: Uitrusting;
  #toestand: Fietstoestand;

  constructor(gegevens: FietsGegevens) {
    super(gegevens.id);
    this.merk = gegevens.merk;
    this.model = gegevens.model;
    this.soort = gegevens.soort;
    if (gegevens.framemaatInCm !== undefined) {
      this.framemaatInCm = gegevens.framemaatInCm;
    }
    this.dagprijsInCent = gegevens.dagprijsInCent;
    this.uitrusting = { ...gegevens.uitrusting };
    this.#toestand = gegevens.toestand;
  }

  /** Een nieuwe fiets in de vloot: nagekeken met het schema, en altijd beschikbaar. */
  static nieuw(gegevens: NieuweFiets, id: string): Fiets {
    return new Fiets(valideer(FietsSchema, { ...gegevens, id, toestand: { status: "beschikbaar" } }));
  }

  /** Kijkt eerst alles na. Klopt er iets niet, dan wijzigt er niets. */
  wijzig(wijziging: FietsWijziging): void {
    const nagekeken = valideer(FietsWijzigingSchema, wijziging);
    if (nagekeken.dagprijsInCent !== undefined) {
      this.dagprijsInCent = nagekeken.dagprijsInCent;
    }
    if (nagekeken.uitrusting !== undefined) {
      this.uitrusting = { ...nagekeken.uitrusting };
    }
  }

  get toestand(): Fietstoestand {
    return this.#toestand;
  }

  get isBeschikbaar(): boolean {
    return this.#toestand.status === "beschikbaar";
  }

  override get omschrijving(): string {
    return `${this.merk} ${this.model} (${this.soort})`;
  }

  verhuur(klant: string, terugOp: string): void {
    this.#vereis("beschikbaar", "verhuren");
    this.#toestand = { status: "verhuurd", klant, terugOp };
  }

  brengTerug(): void {
    this.#vereis("verhuurd", "terugnemen");
    this.#toestand = { status: "beschikbaar" };
  }

  stuurNaarHerstel(probleem: string): void {
    if (this.#toestand.status === "afgeschreven") {
      throw new ToestandFout(`${this.id} is afgeschreven en gaat niet meer in herstel`);
    }
    this.#toestand = { status: "in-herstel", probleem };
  }

  meldHersteld(): void {
    this.#vereis("in-herstel", "hersteld melden");
    this.#toestand = { status: "beschikbaar" };
  }

  schrijfAf(reden: string): void {
    this.#toestand = { status: "afgeschreven", reden };
  }

  #vereis(status: "beschikbaar" | "verhuurd" | "in-herstel", actie: string): void {
    if (this.#toestand.status !== status) {
      throw new ToestandFout(`${this.id} kan niet ${actie}: ${toestandAlsTekst(this.#toestand)}`);
    }
  }
}
