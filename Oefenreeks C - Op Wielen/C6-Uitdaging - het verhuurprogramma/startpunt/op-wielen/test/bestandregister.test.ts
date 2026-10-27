// Op Wielen — tests voor het register in een JSON-bestand, telkens in een nieuwe tijdelijke map

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { pathToFileURL } from "node:url";
import {
  aanbod,
  BestandFout,
  BestandRegister,
  OnbekendItemFout,
  OngeldigePeriodeFout,
  Periode,
  Reservatie,
  Reservatieboek,
  reservatieUitJson,
  ValidatieFout,
} from "../src/index.ts";

const R1 = { id: "r1", item: "f1", klant: "Sam Peeters", periode: { van: "2027-07-05", tot: "2027-07-09" } };

describe("BestandRegister met reservaties", () => {
  const items = aanbod();
  let map: string;
  let pad: URL;

  beforeEach(async () => {
    map = await mkdtemp(join(tmpdir(), "op-wielen-"));
    pad = pathToFileURL(join(map, "reservaties.json"));
    await writeFile(pad, JSON.stringify([R1]), "utf8");
  });

  afterEach(async () => {
    await rm(map, { recursive: true, force: true });
  });

  it("maakt van elk element een Reservatie, met een echte Periode en het item uit de vloot", async () => {
    const register = await BestandRegister.open(pad, reservatieUitJson(items));
    const [r1] = await register.alle();
    assert.ok(r1 instanceof Reservatie);
    assert.equal(r1.periode.aantalDagen, 5);
    assert.equal(r1.item, items[0]);
  });

  it("schrijft wat bewaard wordt naar het bestand, in de vorm van toJSON", async () => {
    const boek = new Reservatieboek(await BestandRegister.open(pad, reservatieUitJson(items)));
    await boek.reserveer(items[1]!, "Lien Maes", Periode.van("2027-07-05", "2027-07-06"));
    const bewaard: unknown = JSON.parse(await readFile(pad, "utf8"));
    assert.deepEqual(bewaard, [R1, { id: "r2", item: "f2", klant: "Lien Maes", periode: { van: "2027-07-05", tot: "2027-07-06" } }]);
  });

  it("vindt na het herladen dezelfde reservaties terug", async () => {
    const boek = new Reservatieboek(await BestandRegister.open(pad, reservatieUitJson(items)));
    await boek.reserveer(items[1]!, "Lien Maes", Periode.van("2027-07-05", "2027-07-06"));
    const opnieuw = await BestandRegister.open(pad, reservatieUitJson(items));
    assert.deepEqual((await opnieuw.alle()).map((r) => r.id), ["r1", "r2"]);
  });

  it("weigert een bestand zonder lijst", async () => {
    await writeFile(pad, "{}", "utf8");
    await assert.rejects(BestandRegister.open(pad, reservatieUitJson(items)), BestandFout);
  });

  it("weigert een reservatie zonder klant, en zegt waar", async () => {
    await writeFile(pad, JSON.stringify([R1, { ...R1, id: "r2", klant: undefined }]), "utf8");
    await assert.rejects(BestandRegister.open(pad, reservatieUitJson(items)), ValidatieFout);
    await assert.rejects(BestandRegister.open(pad, reservatieUitJson(items)), { message: /^reservatie 2\.klant: / });
  });

  it("weigert een reservatie voor een item dat niet bestaat", async () => {
    await writeFile(pad, JSON.stringify([{ ...R1, item: "f99" }]), "utf8");
    await assert.rejects(BestandRegister.open(pad, reservatieUitJson(items)), OnbekendItemFout);
  });

  it("weigert een reservatie met een periode die niet kan", async () => {
    await writeFile(pad, JSON.stringify([{ ...R1, periode: { van: "2027-07-09", tot: "2027-07-05" } }]), "utf8");
    await assert.rejects(BestandRegister.open(pad, reservatieUitJson(items)), OngeldigePeriodeFout);
  });
});
