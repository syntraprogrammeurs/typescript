// Het Groenhuis — tests voor Product

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Geld, Product, type ProductGegevens } from "../src/index.ts";

/** Een product zoals in producten.json. Elke test maakt er een eigen Product van. */
const MONSTERA: ProductGegevens = {
  id: "p01",
  slug: "monstera-deliciosa",
  status: "gepubliceerd",
  naam: "Monstera deliciosa",
  prijsInCent: 2499,
  btwPercentage: 6,
  voorraad: 3,
  categorieId: "c1",
  tags: ["groot", "makkelijk"],
};

describe("Product", () => {
  it("begint als concept zonder voorraad", () => {
    const aloe = Product.nieuw("Aloë vera", Geld.vanEuro("8,95"), "c2");
    assert.equal(aloe.status, "concept");
    assert.equal(aloe.voorraad, 0);
    assert.equal(aloe.slug.toString(), "aloe-vera");
    assert.equal(aloe.isTeKoop, false);
  });

  it("bewaart dezelfde gegevens als in producten.json", () => {
    assert.deepEqual(new Product(MONSTERA).toJSON(), MONSTERA);
  });

  it("is alleen te koop als het gepubliceerd is en er voorraad is", () => {
    assert.ok(new Product(MONSTERA).isTeKoop);
    assert.ok(!new Product({ ...MONSTERA, status: "concept" }).isTeKoop);
    assert.ok(!new Product({ ...MONSTERA, voorraad: 0 }).isTeKoop);
  });

  it("rekent de prijs met btw uit", () => {
    const monstera = new Product(MONSTERA);
    assert.ok(monstera.prijsInclBtw.equals(Geld.vanCent(2649)));
  });

  it("kopieert de tags, zodat de gegevens niet mee veranderen", () => {
    const monstera = new Product(MONSTERA);
    monstera.tags.push("nieuw");
    assert.deepEqual(MONSTERA.tags, ["groot", "makkelijk"]);
  });
});
