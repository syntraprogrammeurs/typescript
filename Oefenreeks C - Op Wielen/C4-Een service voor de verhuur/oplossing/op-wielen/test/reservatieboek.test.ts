// Op Wielen — tests voor het reservatieboek

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Accessoire, GeheugenRegister, NietVrijFout, Periode, Reservatieboek, type Reservatie } from "../src/index.ts";

const helm = new Accessoire("a1", "Helm", 300);
const kar = new Accessoire("a2", "Fietskar", 900);
const JULI = Periode.van("2027-07-05", "2027-07-09");

describe("Reservatieboek", () => {
  let boek: Reservatieboek;

  beforeEach(() => {
    boek = new Reservatieboek(new GeheugenRegister<Reservatie>());
  });

  it("geeft elke reservatie het volgende nummer", async () => {
    const eerste = await boek.reserveer(helm, "Sam Peeters", JULI);
    const tweede = await boek.reserveer(kar, "Sam Peeters", JULI);
    assert.deepEqual([eerste.id, tweede.id], ["r1", "r2"]);
  });

  it("weigert hetzelfde item in een periode die overlapt", async () => {
    await boek.reserveer(helm, "Sam Peeters", JULI);
    await assert.rejects(boek.reserveer(helm, "Lien Maes", Periode.van("2027-07-09", "2027-07-10")), NietVrijFout);
    assert.equal(await boek.isVrij(helm, Periode.van("2027-07-09", "2027-07-10")), false);
  });

  it("verhuurt een item opnieuw vanaf de dag erna", async () => {
    await boek.reserveer(helm, "Sam Peeters", JULI);
    assert.equal(await boek.isVrij(helm, Periode.van(JULI.dagErna, "2027-07-12")), true);
  });

  it("houdt elk item apart bij", async () => {
    await boek.reserveer(helm, "Sam Peeters", JULI);
    await boek.reserveer(kar, "Lien Maes", JULI);
    assert.equal((await boek.voor(helm)).length, 1);
    assert.equal((await boek.voor(kar))[0]?.klant, "Lien Maes");
  });

  it("telt de omzet van alle reservaties op", async () => {
    await boek.reserveer(helm, "Sam Peeters", JULI);
    await boek.reserveer(kar, "Sam Peeters", JULI);
    assert.equal(await boek.omzetInCent(), 5 * 300 + 5 * 900);
  });

  it("geeft na een annulering geen nummer twee keer", async () => {
    await boek.reserveer(helm, "Sam Peeters", JULI);
    const tweede = await boek.reserveer(kar, "Sam Peeters", JULI);
    await boek.annuleer("r1");
    const derde = await boek.reserveer(helm, "Lien Maes", JULI);
    assert.deepEqual([tweede.id, derde.id], ["r2", "r3"]);
  });
});
