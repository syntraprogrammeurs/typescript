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
    const aloe = Product.nieuw({ naam: "Aloë vera", prijsInCent: 895, btwPercentage: 6, categorieId: "c2" });
    assert.equal(aloe.status, "concept");
    assert.equal(aloe.voorraad, 0);
    assert.equal(aloe.slug.toString(), "aloe-vera");
    assert.equal(aloe.isTeKoop, false);
  });

  it("krijgt de standaard-btw en geen tags als je ze niet opgeeft", () => {
    const pot = Product.nieuw({ naam: "Terracotta pot", prijsInCent: 1250, categorieId: "c4" });
    assert.equal(pot.btwPercentage, Product.STANDAARD_BTW);
    assert.deepEqual(pot.tags, []);
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

describe("Product.wijzig", () => {
  it("wijzigt alleen de velden die in de wijziging staan", () => {
    const monstera = new Product(MONSTERA);
    monstera.wijzig({ prijsInCent: 2299, tags: ["groot"] });
    assert.equal(monstera.prijs.inCent, 2299);
    assert.deepEqual(monstera.tags, ["groot"]);
    assert.equal(monstera.naam, "Monstera deliciosa");
  });

  it("meldt elk ongeldig veld, en wijzigt dan niets", () => {
    const monstera = new Product(MONSTERA);
    assert.throws(() => monstera.wijzig({ naam: "  ", prijsInCent: -1, btwPercentage: 12 }), {
      name: "ValidatieFout",
      velden: {
        naam: "mag niet leeg zijn",
        prijsInCent: "moet een geheel aantal cent vanaf 0 zijn",
        btwPercentage: "moet 6 of 21 zijn",
      },
    });
    assert.deepEqual(monstera.toJSON(), MONSTERA);
  });
});
