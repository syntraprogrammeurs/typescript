// Op Wielen — tests voor de toestanden van een fiets

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Fiets, ToestandFout, type FietsGegevens } from "../src/index.ts";

const GAZELLE: FietsGegevens = {
  id: "f1", merk: "Gazelle", model: "Esprit", soort: "stadsfiets", framemaatInCm: 53, dagprijsInCent: 1200,
  uitrusting: { slot: true, mand: true, kinderzitje: false },
  toestand: { status: "beschikbaar" },
};

describe("Fiets", () => {
  let fiets: Fiets;

  beforeEach(() => {
    fiets = new Fiets(GAZELLE);
  });

  it("is beschikbaar als ze zo in de gegevens staat", () => {
    assert.equal(fiets.isBeschikbaar, true);
    assert.equal(fiets.omschrijving, "Gazelle Esprit (stadsfiets)");
  });

  it("wordt verhuurd en komt terug", () => {
    fiets.verhuur("Sam Peeters", "9 juli");
    assert.deepEqual(fiets.toestand, { status: "verhuurd", klant: "Sam Peeters", terugOp: "9 juli" });
    fiets.brengTerug();
    assert.deepEqual(fiets.toestand, { status: "beschikbaar" });
  });

  it("weigert een verhuurde fiets opnieuw te verhuren, en blijft dan verhuurd", () => {
    fiets.verhuur("Sam Peeters", "9 juli");
    assert.throws(() => fiets.verhuur("Lien Maes", "10 juli"), ToestandFout);
    assert.equal(fiets.toestand.status, "verhuurd");
  });

  it("neemt geen fiets terug die in herstel is", () => {
    fiets.stuurNaarHerstel("lekke band");
    assert.throws(() => fiets.brengTerug(), ToestandFout);
  });

  it("is na herstel weer beschikbaar", () => {
    fiets.stuurNaarHerstel("lekke band");
    fiets.meldHersteld();
    assert.equal(fiets.isBeschikbaar, true);
  });

  it("stuurt een afgeschreven fiets niet meer naar herstel", () => {
    fiets.schrijfAf("frame gebarsten");
    assert.throws(() => fiets.stuurNaarHerstel("lekke band"), ToestandFout);
  });

  it("kan altijd afgeschreven worden, ook als ze verhuurd is", () => {
    fiets.verhuur("Sam Peeters", "9 juli");
    fiets.schrijfAf("gestolen");
    assert.deepEqual(fiets.toestand, { status: "afgeschreven", reden: "gestolen" });
  });

  it("deelt haar uitrusting niet met de gegevens waaruit ze gemaakt is", () => {
    fiets.uitrusting.mand = false;
    assert.equal(GAZELLE.uitrusting.mand, true);
  });
});
