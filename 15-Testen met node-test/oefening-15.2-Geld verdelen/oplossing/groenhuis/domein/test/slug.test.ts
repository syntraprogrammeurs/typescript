// Het Groenhuis — tests voor Slug

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Slug, ValidatieFout } from "../src/index.ts";

describe("Slug", () => {
  it("aanvaardt kleine letters, cijfers en losse koppeltekens", () => {
    assert.equal(Slug.van("monstera-deliciosa").toString(), "monstera-deliciosa");
    assert.equal(Slug.van("pot-24cm").toString(), "pot-24cm");
  });

  it("weigert hoofdletters, spaties en dubbele koppeltekens", () => {
    for (const tekst of ["Lente-actie", "lente actie", "lente--actie", "-lente", ""]) {
      assert.throws(() => Slug.van(tekst), ValidatieFout, `"${tekst}" had geweigerd moeten worden`);
    }
  });

  it("maakt een slug uit een naam", () => {
    assert.equal(Slug.uitNaam("Aloë vera & co").toString(), "aloe-vera-co");
    assert.equal(Slug.uitNaam("  Pot (24 cm)  ").toString(), "pot-24-cm");
  });

  it("vergelijkt op waarde", () => {
    assert.ok(Slug.van("aloe-vera").equals(Slug.uitNaam("Aloë Vera")));
  });
});
