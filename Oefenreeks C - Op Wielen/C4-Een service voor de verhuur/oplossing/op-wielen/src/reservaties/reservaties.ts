// Op Wielen — reservaties, en een boek dat dubbele reservaties weigert

import { BestandFout, NietVrijFout, OnbekendItemFout } from "../fouten/fouten.ts";
import { isObject } from "../hulp/onbekend.ts";
import type { Hydrateer } from "../opslag/bestandregister.ts";
import type { Register } from "../opslag/register.ts";
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
    if (!isObject(gegevens) || typeof gegevens.id !== "string" || typeof gegevens.item !== "string"
      || typeof gegevens.klant !== "string" || !isObject(gegevens.periode)
      || typeof gegevens.periode.van !== "string" || typeof gegevens.periode.tot !== "string") {
      throw new BestandFout(`Reservatie ${plaats + 1} heeft niet de vorm { id, item, klant, periode: { van, tot } }`);
    }
    const itemId = gegevens.item;
    const item = items.find((kandidaat) => kandidaat.id === itemId);
    if (item === undefined) {
      throw new OnbekendItemFout(itemId);
    }
    return new Reservatie(gegevens.id, item, gegevens.klant, Periode.van(gegevens.periode.van, gegevens.periode.tot));
  };
}
