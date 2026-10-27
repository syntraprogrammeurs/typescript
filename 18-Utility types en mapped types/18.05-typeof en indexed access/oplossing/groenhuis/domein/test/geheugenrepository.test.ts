// Het Groenhuis — tests voor de repository in het geheugen

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { GeheugenRepository, Product, type ProductGegevens } from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};
const ALOE: ProductGegevens = {
  id: "p05", slug: "aloe-vera", status: "concept", naam: "Aloe vera",
  prijsInCent: 899, btwPercentage: 6, voorraad: 25, categorieId: "c1", tags: [],
};

describe("GeheugenRepository", () => {
  let opslag: GeheugenRepository<Product>;

  beforeEach(() => {
    opslag = new GeheugenRepository([new Product(MONSTERA), new Product(ALOE)]);
  });

  it("vindt een product op zijn id", async () => {
    const product = await opslag.zoek("p01");
    assert.equal(product?.naam, "Monstera deliciosa");
  });

  it("geeft undefined voor een id dat niet bestaat", async () => {
    assert.equal(await opslag.zoek("p99"), undefined);
  });

  it("vindt het eerste product dat aan een voorwaarde voldoet", async () => {
    const product = await opslag.zoekEerste((kandidaat) => kandidaat.status === "concept");
    assert.equal(product?.id, "p05");
  });

  it("vervangt een product met hetzelfde id", async () => {
    await opslag.bewaar(new Product({ ...MONSTERA, voorraad: 10 }));
    const alle = await opslag.alle();
    assert.equal(alle.length, 2);
    assert.equal((await opslag.zoek("p01"))?.voorraad, 10);
  });

  it("zegt of er iets verwijderd werd", async () => {
    assert.equal(await opslag.verwijder("p01"), true);
    assert.equal(await opslag.verwijder("p01"), false);
    assert.equal((await opslag.alle()).length, 1);
  });
});
