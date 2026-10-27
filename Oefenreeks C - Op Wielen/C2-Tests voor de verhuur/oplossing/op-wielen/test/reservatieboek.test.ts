// Op Wielen — tests voor het reservatieboek

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Accessoire, NietVrijFout, Periode, Reservatieboek } from "../src/index.ts";

const helm = new Accessoire("a1", "Helm", 300);
const kar = new Accessoire("a2", "Fietskar", 900);
const JULI = Periode.van("2027-07-05", "2027-07-09");

describe("Reservatieboek", () => {
  let boek: Reservatieboek;

  beforeEach(() => {
    boek = new Reservatieboek();
  });

  it("geeft elke reservatie het volgende nummer", () => {
    const eerste = boek.reserveer(helm, "Sam Peeters", JULI);
    const tweede = boek.reserveer(kar, "Sam Peeters", JULI);
    assert.deepEqual([eerste.id, tweede.id], ["r1", "r2"]);
  });

  it("weigert hetzelfde item in een periode die overlapt", () => {
    boek.reserveer(helm, "Sam Peeters", JULI);
    assert.throws(() => boek.reserveer(helm, "Lien Maes", Periode.van("2027-07-09", "2027-07-10")), NietVrijFout);
    assert.equal(boek.isVrij(helm, Periode.van("2027-07-09", "2027-07-10")), false);
  });

  it("verhuurt een item opnieuw vanaf de dag erna", () => {
    boek.reserveer(helm, "Sam Peeters", JULI);
    assert.equal(boek.isVrij(helm, Periode.van(JULI.dagErna, "2027-07-12")), true);
  });

  it("houdt elk item apart bij", () => {
    boek.reserveer(helm, "Sam Peeters", JULI);
    boek.reserveer(kar, "Lien Maes", JULI);
    assert.equal(boek.voor(helm).length, 1);
    assert.equal(boek.voor(kar)[0]?.klant, "Lien Maes");
  });

  it("telt de omzet van alle reservaties op", () => {
    boek.reserveer(helm, "Sam Peeters", JULI);
    boek.reserveer(kar, "Sam Peeters", JULI);
    assert.equal(boek.omzetInCent, 5 * 300 + 5 * 900);
  });
});
