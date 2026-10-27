// Het Groenhuis — tests voor het schema van een product en voor valideer

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ProductSchema, ProductWijzigingSchema, valideer, ValidatieFout, type ProductGegevens } from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: ["groot"],
};

describe("ProductSchema", () => {
  it("aanvaardt een geldig product, en geeft een nieuw object terug", () => {
    const gegevens = valideer(ProductSchema, MONSTERA);
    assert.deepEqual(gegevens, MONSTERA);
    assert.notEqual(gegevens, MONSTERA);
  });

  it("laat velden weg die niet in het schema staan, en haalt spaties rond de naam weg", () => {
    const gegevens = valideer(ProductSchema, { ...MONSTERA, naam: "  Monstera deliciosa ", korting: 10 });
    assert.equal(gegevens.naam, "Monstera deliciosa");
    assert.equal("korting" in gegevens, false);
  });

  it("weigert een btw die de winkel niet kent", () => {
    assert.throws(() => valideer(ProductSchema, { ...MONSTERA, btwPercentage: 7 }), {
      name: "ValidatieFout",
      velden: { btwPercentage: "moet 6 of 21 zijn" },
    });
  });

  it("zegt waar een fout in een genest veld zit", () => {
    const kapot = { ...MONSTERA, afmetingen: { hoogteInCm: 0, potmaatInCm: "24" }, tags: ["groot", 3] };
    assert.throws(() => valideer(ProductSchema, kapot, "product 2"), (fout) => {
      assert.ok(fout instanceof ValidatieFout);
      assert.deepEqual(Object.keys(fout.velden), ["product 2.tags.1", "product 2.afmetingen.hoogteInCm", "product 2.afmetingen.potmaatInCm"]);
      return true;
    });
  });
});

describe("ProductWijzigingSchema", () => {
  it("aanvaardt een lege wijziging", () => {
    assert.deepEqual(valideer(ProductWijzigingSchema, {}), {});
  });

  it("weigert een veld dat er wel staat, maar undefined is", () => {
    assert.throws(() => valideer(ProductWijzigingSchema, { naam: undefined }), ValidatieFout);
  });
});
