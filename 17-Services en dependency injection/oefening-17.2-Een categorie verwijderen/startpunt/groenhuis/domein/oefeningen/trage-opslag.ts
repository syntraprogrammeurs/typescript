// Het Groenhuis — een opslag die traag antwoordt, zoals een databank ver weg
// Hoofdstuk 16, klassikale oefening 16.2

import { setTimeout as wacht } from "node:timers/promises";
import { GeheugenRepository, laadProducten, metTijdslimiet, Product, type Repository } from "../src/index.ts";

/** Doet alles wat een andere repository doet, maar wacht eerst. */
export class TrageRepository<T> implements Repository<T> {
  readonly #binnen: Repository<T>;
  readonly #ms: number;

  constructor(binnen: Repository<T>, ms: number) {
    this.#binnen = binnen;
    this.#ms = ms;
  }

  async alle(): Promise<T[]> {
    await wacht(this.#ms);
    return this.#binnen.alle();
  }

  async zoek(id: string): Promise<T | undefined> {
    await wacht(this.#ms);
    return this.#binnen.zoek(id);
  }

  async zoekEerste(voorwaarde: (item: T) => boolean): Promise<T | undefined> {
    await wacht(this.#ms);
    return this.#binnen.zoekEerste(voorwaarde);
  }

  async bewaar(item: T): Promise<void> {
    await wacht(this.#ms);
    await this.#binnen.bewaar(item);
  }

  async verwijder(id: string): Promise<boolean> {
    await wacht(this.#ms);
    return this.#binnen.verwijder(id);
  }
}

const gegevens = await laadProducten(new URL("../data/producten.json", import.meta.url));
const opslag = new TrageRepository(new GeheugenRepository(gegevens.map((element) => new Product(element))), 100);

/** Hoe lang iets duurde, afgerond op 100 ms: de precieze tijd verschilt van computer tot computer. */
async function meet(naam: string, actie: () => Promise<unknown>): Promise<void> {
  const begin = performance.now();
  await actie();
  console.log(`${naam.padEnd(28)} ongeveer ${Math.round((performance.now() - begin) / 100) * 100} ms`);
}

const ids = ["p01", "p02", "p03"];
await meet("drie keer zoeken, na elkaar", async () => {
  for (const id of ids) {
    await opslag.zoek(id);
  }
});
await meet("drie keer zoeken, tegelijk", () => Promise.all(ids.map((id) => opslag.zoek(id))));

for (const ms of [500, 50]) {
  try {
    const alle = await metTijdslimiet(opslag.alle(), ms);
    console.log(`Binnen ${ms} ms: ${alle.length} producten`);
  } catch (fout) {
    console.log(`Binnen ${ms} ms: ${fout instanceof Error ? fout.message : fout}`);
  }
}
