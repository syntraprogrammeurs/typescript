// Het Groenhuis — tests voor ProductService

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import {
  GeheugenRepository,
  Geld,
  NietGevondenFout,
  Product,
  ProductService,
  RegelFout,
  type ProductGegevens,
} from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};
const ALOE: ProductGegevens = {
  id: "p05", slug: "aloe-vera", status: "concept", naam: "Aloe vera",
  prijsInCent: 899, btwPercentage: 6, voorraad: 25, categorieId: "c1", tags: [],
};

describe("ProductService", () => {
  let opslag: GeheugenRepository<Product>;
  let producten: ProductService;

  beforeEach(() => {
    opslag = new GeheugenRepository([new Product(MONSTERA), new Product(ALOE)]);
    producten = new ProductService(opslag);
  });

  it("maakt een nieuw product als concept, en bewaart het", async () => {
    const bonsai = await producten.nieuw("Bonsai Ficus", Geld.vanEuro("34,99"), "c1");
    assert.equal(bonsai.status, "concept");
    assert.equal((await opslag.zoek(bonsai.id))?.naam, "Bonsai Ficus");
  });

  it("weigert een tweede product met dezelfde slug", async () => {
    await assert.rejects(producten.nieuw("Aloe Vera", Geld.vanEuro("7,50"), "c1"), {
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
