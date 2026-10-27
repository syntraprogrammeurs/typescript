// Het Groenhuis — tests voor Geld

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Geld } from "../src/index.ts";

describe("Geld", () => {
  it("leest een bedrag in euro, met een komma of een punt", () => {
    assert.equal(Geld.vanEuro("24,99").inCent, 2499);
    assert.equal(Geld.vanEuro("24.99").inCent, 2499);
    assert.equal(Geld.vanEuro("24").inCent, 2400);
  });

  it("telt op zonder het oorspronkelijke bedrag te wijzigen", () => {
    const prijs = Geld.vanEuro("10");
    const totaal = prijs.plus(Geld.vanEuro("2,50"));
    assert.equal(totaal.inCent, 1250);
    assert.equal(prijs.inCent, 1000);
  });

  it("rekent de btw erbij en rondt af op een cent", () => {
    assert.equal(Geld.vanCent(2499).metBtw(6).inCent, 2649);
  });

  it("toont een bedrag zoals in België", () => {
    // tussen € en het bedrag staat een vaste spatie: \u00a0
    assert.equal(String(Geld.vanEuro("1234,5")), "€\u00a01.234,50");
  });
});
