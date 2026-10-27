// Op Wielen — de regels van de verhuur op één plek: wat er gehuurd wordt, wanneer, en of het mag

import { OnbekendeReservatieFout, OnbekendItemFout, OngeldigePeriodeFout, ToestandFout } from "../fouten/fouten.ts";
import type { Register } from "../opslag/register.ts";
import type { Aanvraag } from "../reservaties/aanvragen.ts";
import { Periode } from "../reservaties/periode.ts";
import type { Reservatie, Reservatieboek } from "../reservaties/reservaties.ts";
import { Fiets } from "../vloot/fiets.ts";
import type { Verhuuritem } from "../vloot/verhuuritem.ts";
import type { Fietssoort } from "../vloot/vloot.ts";

/** Geeft de datum van vandaag, als "2027-07-05". Een test geeft een vaste dag mee. */
export type Vandaag = () => string;

export const echteDag: Vandaag = () => new Date().toISOString().slice(0, 10);

function isAfgeschreven(item: Verhuuritem): boolean {
  return item instanceof Fiets && item.toestand.status === "afgeschreven";
}

export class VerhuurService {
  readonly #items: Register<Verhuuritem>;
  readonly #boek: Reservatieboek;
  readonly #vandaag: Vandaag;

  constructor(items: Register<Verhuuritem>, boek: Reservatieboek, vandaag: Vandaag = echteDag) {
    this.#items = items;
    this.#boek = boek;
    this.#vandaag = vandaag;
  }

  async reserveer(aanvraag: Aanvraag): Promise<Reservatie> {
    const item = await this.#item(aanvraag.item);
    if (isAfgeschreven(item)) {
      throw new ToestandFout(`${item.omschrijving} is afgeschreven en kan niet gereserveerd worden`);
    }
    const periode = Periode.van(aanvraag.van, aanvraag.tot);
    const vandaag = this.#vandaag();
    if (periode.begin < vandaag) {
      throw new OngeldigePeriodeFout(`Een reservatie kan niet in het verleden beginnen: ${periode.begin} is voor ${vandaag}`);
    }
    return this.#boek.reserveer(item, aanvraag.klant, periode);
  }

  /** Wat in de periode te huur is, eventueel alleen fietsen van één soort. Afgeschreven fietsen nooit. */
  async vrij(periode: Periode, soort?: Fietssoort): Promise<Verhuuritem[]> {
    const kandidaten = await this.#items.waar(
      (item) => !isAfgeschreven(item) && (soort === undefined || (item instanceof Fiets && item.soort === soort)),
    );
    const vrij: Verhuuritem[] = [];
    for (const item of kandidaten) {
      if (await this.#boek.isVrij(item, periode)) {
        vrij.push(item);
      }
    }
    return vrij;
  }

  async reservaties(klant?: string): Promise<Reservatie[]> {
    const alle = await this.#boek.alle();
    return klant === undefined ? alle : alle.filter((r) => r.klant === klant);
  }

  async annuleer(id: string): Promise<void> {
    if (!(await this.#boek.annuleer(id))) {
      throw new OnbekendeReservatieFout(id);
    }
  }

  async #item(id: string): Promise<Verhuuritem> {
    const item = await this.#items.zoek(id);
    if (item === undefined) {
      throw new OnbekendItemFout(id);
    }
    return item;
  }
}
