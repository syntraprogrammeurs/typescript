// Het Groenhuis — tests voor ProductService

import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import {
  GeheugenRepository,
  NietGevondenFout,
  Product,
  ProductService,
  RegelFout,
  teller,
  type NieuwProduct,
  type ProductGegevens,
  type Repository,
} from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};
const ALOE: ProductGegevens = {
  id: "p05", slug: "aloe-vera", status: "concept", naam: "Aloe vera",
  prijsInCent: 899, btwPercentage: 6, voorraad: 25, categorieId: "c1", tags: [],
};
const BONSAI: NieuwProduct = { naam: "Bonsai Ficus", prijsInCent: 3499, btwPercentage: 6, categorieId: "c1", tags: [] };

describe("ProductService", () => {
  let opslag: GeheugenRepository<Product>;
  let producten: ProductService;

  beforeEach(() => {
    opslag = new GeheugenRepository([new Product(MONSTERA), new Product(ALOE)]);
    producten = new ProductService(opslag);
  });

  it("maakt een nieuw product als concept, en bewaart het", async () => {
    const bonsai = await producten.nieuw(BONSAI);
    assert.equal(bonsai.status, "concept");
    assert.equal((await opslag.zoek(bonsai.id))?.naam, "Bonsai Ficus");
  });

  it("geeft nieuwe producten het volgende id van de teller", async () => {
    const metTeller = new ProductService(opslag, teller("test-"));
    const bonsai = await metTeller.nieuw(BONSAI);
    const cactus = await metTeller.nieuw({ ...BONSAI, naam: "Cactus", prijsInCent: 650, categorieId: "c3" });
    assert.deepEqual([bonsai.id, cactus.id], ["test-1", "test-2"]);
  });

  it("weigert een tweede product met dezelfde slug", async () => {
    await assert.rejects(producten.nieuw({ ...BONSAI, naam: "Aloe Vera" }), {
      name: "RegelFout",
      message: "De slug aloe-vera is al in gebruik door Aloe vera",
    });
    assert.equal((await opslag.alle()).length, 2);
  });

  it("vult de voorraad aan bij een levering", async () => {
    const monstera = await producten.levering("monstera-deliciosa", 5);
    assert.equal(monstera.voorraad, 8);
  });

  it("geeft een NietGevondenFout voor een slug die niet bestaat", async () => {
    await assert.rejects(producten.levering("orchidee", 3), NietGevondenFout);
  });

  it("publiceert een product met een prijs", async () => {
    const aloe = await producten.publiceer("aloe-vera");
    assert.equal(aloe.status, "gepubliceerd");
  });

  it("weigert te publiceren wat gearchiveerd is", async () => {
    (await producten.metSlug("aloe-vera")).archiveer();
    await assert.rejects(producten.publiceer("aloe-vera"), RegelFout);
  });

  it("toont het overzicht op naam", async () => {
    const regels = await producten.overzicht();
    assert.equal(regels.length, 2);
    assert.match(regels[0] ?? "", /^Aloe vera/);
  });
});

/** Een nep-opslag: elke methode is een mock die onthoudt hoe ze opgeroepen werd. */
function nepOpslag(lijst: Product[]) {
  return {
    alle: mock.fn(async () => lijst),
    zoek: mock.fn(async (id: string) => lijst.find((product) => product.id === id)),
    zoekEerste: mock.fn(async (voorwaarde: (product: Product) => boolean) => lijst.find(voorwaarde)),
    bewaar: mock.fn(async (_product: Product) => {}),
    verwijder: mock.fn(async (_id: string) => false),
  } satisfies Repository<Product>;
}

describe("ProductService en de opslag", () => {
  it("bewaart het product één keer na een levering", async () => {
    const opslag = nepOpslag([new Product(MONSTERA)]);
    await new ProductService(opslag).levering("monstera-deliciosa", 5);

    assert.equal(opslag.bewaar.mock.callCount(), 1);
    const bewaard = opslag.bewaar.mock.calls[0]?.arguments[0];
    assert.equal(bewaard?.voorraad, 8);
  });

  it("bewaart niets als de levering niet mag", async () => {
    const opslag = nepOpslag([new Product(MONSTERA)]);
    await assert.rejects(new ProductService(opslag).levering("monstera-deliciosa", -5), RegelFout);
    assert.equal(opslag.bewaar.mock.callCount(), 0);
  });

  it("geeft een fout van de opslag gewoon door", async () => {
    const opslag = nepOpslag([new Product(MONSTERA)]);
    opslag.bewaar.mock.mockImplementation(async () => {
      throw new Error("De schijf is vol");
    });
    await assert.rejects(new ProductService(opslag).levering("monstera-deliciosa", 5), { message: "De schijf is vol" });
  });

  it("kijkt mee met een echte opslag", async () => {
    const opslag = new GeheugenRepository([new Product(MONSTERA)]);
    const bewaar = mock.method(opslag, "bewaar");
    await new ProductService(opslag).nieuw(BONSAI);

    assert.equal(bewaar.mock.callCount(), 1);
    assert.equal((await opslag.alle()).length, 2);
  });
});
