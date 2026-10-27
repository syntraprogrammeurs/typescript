// Op Wielen — tests voor het schema van een fiets, en voor een nieuwe of gewijzigde fiets

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Fiets, FietsSchema, ValidatieFout, type FietsGegevens, type NieuweFiets } from "../src/index.ts";

const GAZELLE: FietsGegevens = {
  id: "f1", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 53, dagprijsInCent: 1200,
  uitrusting: { slot: true, mand: true, kinderzitje: false },
  toestand: { status: "beschikbaar" },
};

const CUBE: NieuweFiets = {
  merk: "Cube", model: "Kathmandu", soort: "e-bike", framemaatInCm: 54, dagprijsInCent: 3200,
  uitrusting: { slot: true, mand: false, kinderzitje: false },
};

/** De plaatsen waar het schema iets afkeurt. */
function plaatsen(waarde: unknown): string[] {
  const resultaat = FietsSchema.safeParse(waarde);
  return resultaat.success ? [] : resultaat.error.issues.map((probleem) => probleem.path.join("."));
}

describe("FietsSchema", () => {
  it("aanvaardt een geldige fiets", () => {
    assert.deepEqual(plaatsen(GAZELLE), []);
  });

  it("aanvaardt een bakfiets zonder framemaat", () => {
    const { framemaatInCm: _, ...zonderMaat } = GAZELLE;
    assert.deepEqual(plaatsen({ ...zonderMaat, soort: "bakfiets" }), []);
  });

  it("weigert een verhuurde fiets zonder klant", () => {
    assert.deepEqual(plaatsen({ ...GAZELLE, toestand: { status: "verhuurd", terugOp: "9 juli" } }), ["toestand.klant"]);
  });

  it("weigert een soort die Op Wielen niet verhuurt", () => {
    assert.deepEqual(plaatsen({ ...GAZELLE, soort: "plooifiets" }), ["soort"]);
  });

  it("geeft alle fouten tegelijk", () => {
    assert.deepEqual(plaatsen({ ...GAZELLE, dagprijsInCent: "12", uitrusting: { slot: true } }), [
      "dagprijsInCent",
      "uitrusting.mand",
      "uitrusting.kinderzitje",
    ]);
  });
});

describe("Fiets.nieuw en wijzig", () => {
  let fiets: Fiets;

  beforeEach(() => {
    fiets = new Fiets(GAZELLE);
  });

  it("maakt een nieuwe fiets, die beschikbaar is", () => {
    const nieuw = Fiets.nieuw(CUBE, "f10");
    assert.equal(nieuw.id, "f10");
    assert.equal(nieuw.isBeschikbaar, true);
  });

  it("weigert een nieuwe fiets met een prijs die niet kan", () => {
    assert.throws(() => Fiets.nieuw({ ...CUBE, dagprijsInCent: -100 }, "f10"), ValidatieFout);
  });

  it("weigert een nummer dat geen fietsnummer is", () => {
    assert.throws(() => Fiets.nieuw(CUBE, "fiets 10"), ValidatieFout);
  });

  it("wijzigt alleen wat meegegeven wordt", () => {
    fiets.wijzig({ dagprijsInCent: 1400 });
    assert.equal(fiets.dagprijsInCent, 1400);
    assert.equal(fiets.uitrusting.mand, true);
  });

  it("wijzigt niets als iets niet klopt", () => {
    assert.throws(() => fiets.wijzig({ dagprijsInCent: 0 }), ValidatieFout);
    assert.equal(fiets.dagprijsInCent, 1200);
  });
});
