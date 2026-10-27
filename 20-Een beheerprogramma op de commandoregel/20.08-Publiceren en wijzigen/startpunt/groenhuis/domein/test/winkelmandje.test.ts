// Het Groenhuis — tests voor het winkelmandje

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { NietGevondenFout, Product, RegelFout, ValidatieFout, VoorraadFout, Winkelmandje, type ProductGegevens } from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};

describe("Winkelmandje", () => {
  let mandje: Winkelmandje;
  let monstera: Product;

  // voor elke test een nieuw, leeg mandje en een nieuwe monstera met 3 stuks
  beforeEach(() => {
    mandje = new Winkelmandje();
    monstera = new Product(MONSTERA);
  });

  it("is leeg bij het begin", () => {
    assert.ok(mandje.isLeeg);
    assert.equal(mandje.aantalStuks, 0);
  });

  it("telt hetzelfde product samen", () => {
    mandje.voegToe(monstera);
    mandje.voegToe(monstera, 2);
    assert.equal(mandje.aantalStuks, 3);
    assert.equal(mandje.totaal.inCent, 3 * 2649);
  });

  it("weigert wat niet te koop is", () => {
    const concept = new Product({ ...MONSTERA, status: "concept" });
    assert.throws(() => mandje.voegToe(concept), RegelFout);
  });

  it("weigert meer dan er in voorraad is", () => {
    mandje.voegToe(monstera, 2);
    assert.throws(
      () => mandje.voegToe(monstera, 2),
      (fout) => fout instanceof VoorraadFout && fout.gevraagd === 4 && fout.beschikbaar === 3,
    );
  });

  describe("wijzigAantal", () => {
    it("zet het aantal van een product", () => {
      mandje.voegToe(monstera);
      mandje.wijzigAantal("p01", 3);
      assert.equal(mandje.aantalStuks, 3);
    });

    it("haalt het product weg bij 0", () => {
      mandje.voegToe(monstera);
      mandje.wijzigAantal("p01", 0);
      assert.ok(mandje.isLeeg);
    });

    it("weigert meer dan er in voorraad is", () => {
      mandje.voegToe(monstera);
      assert.throws(() => mandje.wijzigAantal("p01", 4), VoorraadFout);
      assert.equal(mandje.aantalStuks, 1);
    });

    it("weigert een product dat niet in het mandje ligt", () => {
      assert.throws(() => mandje.wijzigAantal("p99", 1), NietGevondenFout);
    });

    it("weigert een negatief of gebroken aantal", () => {
      mandje.voegToe(monstera);
      assert.throws(() => mandje.wijzigAantal("p01", -1), ValidatieFout);
      assert.throws(() => mandje.wijzigAantal("p01", 1.5), ValidatieFout);
    });
  });
});
