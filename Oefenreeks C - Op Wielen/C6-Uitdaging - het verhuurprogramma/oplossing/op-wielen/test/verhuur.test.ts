// Op Wielen — tests voor het verhuurprogramma, zonder echte terminal en zonder bestand

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { aanbod, GeheugenRegister, Reservatieboek, VerhuurService, type Reservatie, type Verhuuritem } from "../src/index.ts";
import { EXITCODE, voerUit } from "../src/verhuur/commandos.ts";
import type { Terminal } from "../src/verhuur/terminal.ts";

/** Een terminal die onthoudt wat er geschreven werd, en antwoordt wat de test vooraf meegaf. */
class NepTerminal implements Terminal {
  readonly uit: string[] = [];
  readonly fouten: string[] = [];
  readonly #antwoorden: Iterator<string>;

  constructor(...antwoorden: string[]) {
    this.#antwoorden = antwoorden[Symbol.iterator]();
  }

  schrijf(regel = ""): void {
    this.uit.push(regel);
  }

  fout(regel: string): void {
    this.fouten.push(regel);
  }

  async vraag(vraag: string): Promise<string> {
    const volgende = this.#antwoorden.next();
    if (volgende.done === true) {
      throw new Error(`De test gaf geen antwoord op "${vraag}"`);
    }
    this.uit.push(vraag + volgende.value);
    return volgende.value;
  }
}

describe("het verhuurprogramma", () => {
  let dienst: VerhuurService;

  beforeEach(async () => {
    dienst = new VerhuurService(
      new GeheugenRegister<Verhuuritem>(aanbod()),
      new Reservatieboek(new GeheugenRegister<Reservatie>()),
      () => "2027-06-01",
    );
    await dienst.reserveer({ item: "f1", klant: "Sam Peeters", van: "2027-07-05", tot: "2027-07-09" });
  });

  it("toont de hulp zonder commando", async () => {
    const terminal = new NepTerminal();
    assert.equal(await voerUit([], terminal, dienst), EXITCODE.gelukt);
    assert.equal(terminal.uit[0], "Gebruik: npm run verhuur -- <commando> [opties]");
  });

  it("toont de reservaties van één klant", async () => {
    const terminal = new NepTerminal();
    assert.equal(await voerUit(["lijst", "--klant", "Sam Peeters"], terminal, dienst), EXITCODE.gelukt);
    assert.equal(terminal.uit.at(-1), "1 reservatie");
  });

  it("reserveert, en vraagt de klant als die ontbreekt", async () => {
    const terminal = new NepTerminal("Noor Claes");
    const code = await voerUit(["reserveer", "f4", "--van", "2027-07-08", "--tot", "2027-07-10"], terminal, dienst);
    assert.equal(code, EXITCODE.gelukt);
    assert.equal(terminal.uit[0], "Voor wie is de reservatie? Noor Claes");
    assert.equal((await dienst.reservaties("Noor Claes")).length, 1);
  });

  it("geeft 1 als het item niet vrij is", async () => {
    const terminal = new NepTerminal();
    const code = await voerUit(["reserveer", "f1", "--van", "2027-07-08", "--tot", "2027-07-10", "--klant", "Lien Maes"], terminal, dienst);
    assert.equal(code, EXITCODE.mislukt);
    assert.equal(terminal.fouten.length, 1);
  });

  it("geeft 1, en een melding per optie, bij een datum die geen datum is", async () => {
    const terminal = new NepTerminal();
    const code = await voerUit(["reserveer", "f2", "--van", "8 juli", "--tot", "10-07", "--klant", "Lien Maes"], terminal, dienst);
    assert.equal(code, EXITCODE.mislukt);
    assert.deepEqual(terminal.fouten.map((regel) => regel.split(" na:")[0]), ["Kijk --van", "Kijk --tot"]);
  });

  it("geeft 2 bij een onbekend commando of een onbekende optie", async () => {
    assert.equal(await voerUit(["huur", "f1"], new NepTerminal(), dienst), EXITCODE.verkeerdGebruik);
    assert.equal(await voerUit(["lijst", "--kleur", "rood"], new NepTerminal(), dienst), EXITCODE.verkeerdGebruik);
    assert.equal(await voerUit(["vrij", "--van", "2027-07-08"], new NepTerminal(), dienst), EXITCODE.verkeerdGebruik);
  });

  it("annuleert, en geeft 1 voor een reservatie die niet bestaat", async () => {
    assert.equal(await voerUit(["annuleer", "r1"], new NepTerminal(), dienst), EXITCODE.gelukt);
    assert.equal(await voerUit(["annuleer", "r1"], new NepTerminal(), dienst), EXITCODE.mislukt);
  });
});
