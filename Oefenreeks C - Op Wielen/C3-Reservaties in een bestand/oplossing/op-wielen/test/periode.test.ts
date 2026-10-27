// Op Wielen — tests voor een huurperiode

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { OngeldigePeriodeFout, Periode } from "../src/index.ts";

describe("Periode", () => {
  it("telt de laatste dag mee", () => {
    assert.equal(Periode.van("2027-07-05", "2027-07-09").aantalDagen, 5);
    assert.equal(Periode.van("2027-07-05", "2027-07-05").aantalDagen, 1);
  });

  it("telt over het einde van een maand heen", () => {
    assert.equal(Periode.van("2027-06-28", "2027-07-04").aantalDagen, 7);
    assert.equal(Periode.van("2027-06-28", "2027-06-30").dagErna, "2027-07-01");
  });

  it("overlapt als er één dag gemeen is, en niet als twee periodes aansluiten", () => {
    const juli = Periode.van("2027-07-05", "2027-07-09");
    assert.equal(juli.overlaptMet(Periode.van("2027-07-09", "2027-07-12")), true);
    assert.equal(juli.overlaptMet(Periode.van("2027-07-10", "2027-07-12")), false);
    assert.equal(juli.overlaptMet(Periode.van("2027-07-06", "2027-07-07")), true);
  });

  it("is gelijk aan een periode met dezelfde dagen, maar niet hetzelfde object", () => {
    const a = Periode.van("2027-07-05", "2027-07-09");
    const b = Periode.van("2027-07-05", "2027-07-09");
    assert.equal(a.equals(b), true);
    assert.notEqual(a, b);
  });

  it("toont zich kort, en als JSON", () => {
    assert.equal(String(Periode.van("2027-07-05", "2027-07-09")), "05/07 – 09/07");
    assert.equal(String(Periode.van("2027-07-05", "2027-07-05")), "05/07");
    assert.equal(JSON.stringify(Periode.van("2027-07-05", "2027-07-09")), '{"van":"2027-07-05","tot":"2027-07-09"}');
  });

  it("weigert datums die niet bestaan", () => {
    for (const datum of ["2027-02-29", "5 juli", "2027-7-5", ""]) {
      assert.throws(() => Periode.van(datum, "2027-07-09"), OngeldigePeriodeFout);
    }
  });

  it("weigert een periode die eindigt voor ze begint", () => {
    assert.throws(() => Periode.van("2027-07-09", "2027-07-05"), OngeldigePeriodeFout);
  });

  it("verandert nooit meer", () => {
    assert.equal(Object.isFrozen(Periode.van("2027-07-05", "2027-07-09")), true);
  });
});
