// Op Wielen — reservaties, en een boek dat dubbele reservaties weigert

import { NietVrijFout, OnbekendItemFout } from "../fouten/fouten.ts";
import type { Hydrateer } from "../opslag/bestandregister.ts";
import type { Register } from "../opslag/register.ts";
import { ReservatieJsonSchema } from "../schemas/reservatieschema.ts";
import { valideer } from "../schemas/valideer.ts";
import type { Huurbaar } from "./contracten.ts";
import { Periode } from "./periode.ts";

export class Reservatie {
  readonly id: string;
  readonly item: Huurbaar;
  readonly klant: string;
  readonly periode: Periode;

  constructor(id: string, item: Huurbaar, klant: string, periode: Periode) {
    this.id = id;
    this.item = item;
    this.klant = klant;
    this.periode = periode;
  }

  get prijsInCent(): number {
    return this.item.prijsVoor(this.periode);
  }

  /** In een bestand staat alleen het nummer van het item: het item zelf staat in de vloot. */
  toJSON(): { id: string; item: string; klant: string; periode: { van: string; tot: string } } {
    return { id: this.id, item: this.item.id, klant: this.klant, periode: this.periode.toJSON() };
  }
}

export class Reservatieboek {
  readonly #reservaties: Register<Reservatie>;

  constructor(reservaties: Register<Reservatie>) {
    this.#reservaties = reservaties;
  }

  async isVrij(item: Huurbaar, periode: Periode): Promise<boolean> {
    return (await this.#botsing(item, periode)) === undefined;
  }

  async reserveer(item: Huurbaar, klant: string, periode: Periode): Promise<Reservatie> {
    const bezet = await this.#botsing(item, periode);
    if (bezet !== undefined) {
      throw new NietVrijFout(item.omschrijving, periode, bezet);
    }
    const reservatie = new Reservatie(await this.#volgendNummer(), item, klant, periode);
    await this.#reservaties.bewaar(reservatie);
    return reservatie;
  }

  /** Alle reservaties, de vroegste eerst. */
  async alle(): Promise<Reservatie[]> {
    const lijst = await this.#reservaties.alle();
    return lijst.toSorted((a, b) => a.periode.begin.localeCompare(b.periode.begin) || a.id.localeCompare(b.id));
  }

  async voor(item: Huurbaar): Promise<Reservatie[]> {
    return this.#reservaties.waar((r) => r.item.id === item.id);
  }

  async annuleer(id: string): Promise<boolean> {
    return this.#reservaties.verwijder(id);
  }

  async omzetInCent(): Promise<number> {
    return (await this.#reservaties.alle()).reduce((som, r) => som + r.prijsInCent, 0);
  }

  async #botsing(item: Huurbaar, periode: Periode): Promise<Reservatie | undefined> {
    const botsingen = await this.#reservaties.waar((r) => r.item.id === item.id && r.periode.overlaptMet(periode));
    return botsingen[0];
  }

  /** r1, r2, …: één meer dan het hoogste nummer dat er al is, ook na het herladen van een bestand. */
  async #volgendNummer(): Promise<string> {
    const nummers = (await this.#reservaties.alle()).map((r) => Number(r.id.slice(1)));
    return `r${Math.max(0, ...nummers.filter(Number.isInteger)) + 1}`;
  }
}

/** Maakt van een reservatie uit een bestand weer een Reservatie, met het echte item uit de vloot. */
export function reservatieUitJson(items: readonly Huurbaar[]): Hydrateer<Reservatie> {
  return (gegevens, plaats) => {
    const r = valideer(ReservatieJsonSchema, gegevens, `reservatie ${plaats + 1}`);
    const item = items.find((kandidaat) => kandidaat.id === r.item);
    if (item === undefined) {
      throw new OnbekendItemFout(r.item);
    }
    return new Reservatie(r.id, item, r.klant, Periode.van(r.periode.van, r.periode.tot));
  };
}
