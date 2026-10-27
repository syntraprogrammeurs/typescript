// Het Groenhuis — tests voor het schema van een klant

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isKlant, klantUitJson, type Klant } from "../src/index.ts";

const SAM: Klant = {
  id: "k1", voornaam: "Sam", achternaam: "Peeters", email: "sam.peeters@example.com",
  leveradres: { straat: "Veldstraat", huisnummer: "12", bus: "3", postcode: "9000", gemeente: "Gent", land: "België" },
};

describe("KlantSchema", () => {
  it("aanvaardt een geldige klant", () => {
    assert.equal(isKlant(SAM), true);
    assert.deepEqual(klantUitJson(SAM, 0), SAM);
  });

  it("weigert een ongeldig e-mailadres", () => {
    assert.throws(() => klantUitJson({ ...SAM, email: "sam.peeters" }, 0), {
      name: "ValidatieFout",
      velden: { "klant 1.email": "is geen geldig e-mailadres" },
    });
  });

  it("zegt in welk adres en welk veld de fout zit", () => {
    const kapot = { ...SAM, leveradres: { ...SAM.leveradres, huisnummer: 12 } };
    assert.throws(() => klantUitJson(kapot, 4), (fout) => {
      assert.ok(fout instanceof Error);
      assert.match(fout.message, /^klant 5\.leveradres\.huisnummer: /);
      return true;
    });
  });

  it("aanvaardt geen null voor een adres dat er niet hoeft te zijn", () => {
    assert.equal(isKlant({ ...SAM, factuuradres: null }), false);
  });
});
