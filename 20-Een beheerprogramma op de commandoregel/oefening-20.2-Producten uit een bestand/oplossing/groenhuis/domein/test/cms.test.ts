// Het Groenhuis — tests voor het beheerprogramma, zonder echte terminal

import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { EXITCODE, voerUit } from "../src/cms/commandos.ts";
import type { Terminal } from "../src/cms/terminal.ts";
import { GeheugenRepository, Product, ProductService, teller, type ProductGegevens } from "../src/index.ts";

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

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};
const ALOE: ProductGegevens = {
  id: "p04", slug: "aloe-vera", status: "concept", naam: "Aloe vera",
  prijsInCent: 899, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
};

describe("het beheerprogramma", () => {
  let opslag: GeheugenRepository<Product>;
  let producten: ProductService;

  beforeEach(() => {
    opslag = new GeheugenRepository([new Product(MONSTERA), new Product(ALOE)]);
    producten = new ProductService(opslag, teller("p"));
  });

  function cms(terminal: Terminal, ...argumenten: string[]) {
    return voerUit(argumenten, terminal, producten);
  }

  it("toont de lijst, en hoeveel producten er zijn", async () => {
    const terminal = new NepTerminal();
    assert.equal(await cms(terminal, "product", "lijst"), EXITCODE.gelukt);
    assert.equal(terminal.uit.length, 3);
    assert.match(terminal.uit[0] ?? "", /^aloe-vera\s+concept/);
    assert.equal(terminal.uit.at(-1), "2 producten");
  });

  it("toont alleen de producten met de gevraagde status", async () => {
    const terminal = new NepTerminal();
    await cms(terminal, "product", "lijst", "--status", "gepubliceerd");
    assert.equal(terminal.uit.length, 2);
    assert.match(terminal.uit[0] ?? "", /^monstera-deliciosa/);
  });

  it("maakt een product met alleen opties, zonder iets te vragen", async () => {
    const terminal = new NepTerminal();
    const code = await cms(terminal, "product", "nieuw", "--naam", "Bonsai Ficus", "--prijs", "34,99", "--btw", "6", "--categorie", "c1");
    assert.equal(code, EXITCODE.gelukt);
    const bonsai = await producten.metSlug("bonsai-ficus");
    assert.equal(bonsai.id, "p1");
    assert.equal(bonsai.prijs.inCent, 3499);
    assert.equal(bonsai.btwPercentage, 6);
  });

  it("vraagt wat ontbreekt", async () => {
    const terminal = new NepTerminal("Bonsai Ficus", "34,99");
    await cms(terminal, "product", "nieuw", "--categorie", "c1");
    assert.deepEqual(terminal.uit.slice(0, 2), ["Naam: Bonsai Ficus", "Prijs in euro: 34,99"]);
    assert.equal((await producten.metSlug("bonsai-ficus")).btwPercentage, 21);
  });

  it("weigert een prijs die geen bedrag is, en bewaart niets", async () => {
    const terminal = new NepTerminal();
    const code = await cms(terminal, "product", "nieuw", "--naam", "Gieter", "--prijs", "gratis", "--categorie", "c4");
    assert.equal(code, EXITCODE.mislukt);
    assert.deepEqual(terminal.fouten, ['Kijk prijs na: "gratis" is geen bedrag in euro, zoals 34,99.']);
    assert.equal((await opslag.alle()).length, 2);
  });

  it("publiceert een product", async () => {
    const terminal = new NepTerminal();
    assert.equal(await cms(terminal, "product", "publiceer", "aloe-vera"), EXITCODE.gelukt);
    assert.equal((await producten.metSlug("aloe-vera")).status, "gepubliceerd");
  });

  it("meldt een product dat niet bestaat met exitcode 1", async () => {
    const terminal = new NepTerminal();
    assert.equal(await cms(terminal, "product", "publiceer", "orchidee"), EXITCODE.mislukt);
    assert.match(terminal.fouten[0] ?? "", /orchidee/);
  });

  it("toont wat er wijzigde", async () => {
    const terminal = new NepTerminal();
    await cms(terminal, "product", "wijzig", "aloe-vera", "--prijs", "7,99", "--tag", "makkelijk");
    assert.deepEqual(terminal.uit, ["  prijsInCent: 899 → 799", '  tags: [] → ["makkelijk"]', "Aloe vera is gewijzigd."]);
  });

  it("geeft exitcode 2 bij een onbekend commando, een onbekende optie of een ontbrekende slug", async () => {
    for (const argumenten of [["product", "kopen"], ["product", "lijst", "--kleur", "rood"], ["product", "publiceer"]]) {
      const terminal = new NepTerminal();
      assert.equal(await cms(terminal, ...argumenten), EXITCODE.verkeerdGebruik, argumenten.join(" "));
      assert.ok(terminal.fouten.some((regel) => regel.startsWith("Gebruik:")), argumenten.join(" "));
    }
  });

  it("telt een levering bij de voorraad, en haalt er stuks af met een negatief aantal", async () => {
    const terminal = new NepTerminal();
    assert.equal(await cms(terminal, "product", "levering", "aloe-vera", "12"), EXITCODE.gelukt);
    assert.equal(await cms(terminal, "product", "levering", "aloe-vera", "--", "-7"), EXITCODE.gelukt);
    assert.deepEqual(terminal.uit, ["Aloe vera: +12, nu 37 stuks", "Aloe vera: -7, nu 30 stuks"]);
  });

  it("weigert een aantal dat geen geheel getal is", async () => {
    for (const aantal of ["twaalf", "2,5", "0"]) {
      const terminal = new NepTerminal();
      assert.equal(await cms(terminal, "product", "levering", "aloe-vera", aantal), EXITCODE.verkeerdGebruik, aantal);
    }
    assert.equal((await producten.metSlug("aloe-vera")).voorraad, 25);
  });

  it("weigert meer stuks weg te halen dan er zijn", async () => {
    const terminal = new NepTerminal();
    assert.equal(await cms(terminal, "product", "levering", "monstera-deliciosa", "--", "-5"), EXITCODE.mislukt);
    assert.equal((await producten.metSlug("monstera-deliciosa")).voorraad, 3);
  });

  describe("import", () => {
    let map: string;

    beforeEach(async () => {
      map = await mkdtemp(join(tmpdir(), "groenhuis-"));
    });

    afterEach(async () => {
      await rm(map, { recursive: true, force: true });
    });

    it("voegt elke goede regel toe, en meldt elke slechte met haar nummer", async () => {
      const bestand = join(map, "import.csv");
      await writeFile(bestand, "naam;prijs;btw;categorie\nBonsai Ficus;34,99;6;c1\n\nGieter;gratis;21;c4\nAloe vera;7,99;6;c5\n", "utf8");
      const terminal = new NepTerminal();
      assert.equal(await cms(terminal, "product", "import", bestand), EXITCODE.mislukt);
      assert.deepEqual(terminal.uit, [
        "regel 2: Bonsai Ficus toegevoegd",
        'regel 4: Kijk prijs na: "gratis" is geen bedrag in euro, zoals 34,99.',
        "regel 5: De slug aloe-vera is al in gebruik door Aloe vera",
        "1 van 3 producten toegevoegd.",
      ]);
    });

    it("geeft exitcode 2 als het bestand niet bestaat", async () => {
      const terminal = new NepTerminal();
      assert.equal(await cms(terminal, "product", "import", join(map, "weg.csv")), EXITCODE.verkeerdGebruik);
    });
  });
});
