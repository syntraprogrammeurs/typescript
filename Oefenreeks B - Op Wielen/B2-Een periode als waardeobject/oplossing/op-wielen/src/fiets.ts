// Op Wielen — een fiets, die zelf bewaakt welke toestand na welke mag komen

import type { FietsGegevens, Fietssoort, Fietstoestand, Uitrusting } from "./vloot.ts";
import { toestandAlsTekst } from "./vloot.ts";

export class Fiets {
  readonly id: string;
  merk: string;
  model: string;
  soort: Fietssoort;
  framemaatInCm?: number;
  dagprijsInCent: number;
  uitrusting: Uitrusting;
  #toestand: Fietstoestand;

  constructor(gegevens: FietsGegevens) {
    this.id = gegevens.id;
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

  get toestand(): Fietstoestand {
    return this.#toestand;
  }

  get isBeschikbaar(): boolean {
    return this.#toestand.status === "beschikbaar";
  }

  get omschrijving(): string {
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
      throw new Error(`${this.id} is afgeschreven en gaat niet meer in herstel`);
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
      throw new Error(`${this.id} kan niet ${actie}: ${toestandAlsTekst(this.#toestand)}`);
    }
  }
}
