// Het Groenhuis — tests voor de repository in een JSON-bestand, telkens in een nieuwe tijdelijke map

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { pathToFileURL } from "node:url";
import { BestandRepository, Product, productUitJson, ValidatieFout, type ProductGegevens } from "../src/index.ts";

const MONSTERA: ProductGegevens = {
  id: "p01", slug: "monstera-deliciosa", status: "gepubliceerd", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
};
const ALOE: ProductGegevens = {
  id: "p05", slug: "aloe-vera", status: "concept", naam: "Aloe vera",
  prijsInCent: 899, btwPercentage: 6, voorraad: 25, categorieId: "c1", tags: [],
};

describe("BestandRepository", () => {
  let map: string;
  let pad: URL;

  beforeEach(async () => {
    map = await mkdtemp(join(tmpdir(), "groenhuis-"));
    pad = pathToFileURL(join(map, "producten.json"));
    await writeFile(pad, JSON.stringify([MONSTERA, ALOE]), "utf8");
  });

  afterEach(async () => {
    await rm(map, { recursive: true, force: true });
  });

  it("maakt van elk element in het bestand een Product", async () => {
    const opslag = await BestandRepository.open(pad, productUitJson);
    const product = await opslag.zoek("p01");
    assert.ok(product instanceof Product);
    assert.equal(product.prijs.inCent, 2499);
  });

  it("bewaart een wijziging in het bestand", async () => {
    const opslag = await BestandRepository.open(pad, productUitJson);
    const product = await opslag.zoek("p01");
    assert.ok(product !== undefined);
    product.pasVoorraadAan(2);
    await opslag.bewaar(product);

    const opnieuw = await BestandRepository.open(pad, productUitJson);
    assert.equal((await opnieuw.zoek("p01"))?.voorraad, 5);
  });

  it("schrijft dezelfde vorm terug als het bestand had", async () => {
    const opslag = await BestandRepository.open(pad, productUitJson);
    await opslag.verwijder("p05");
    const tekst = await readFile(pad, "utf8");
    assert.deepEqual(JSON.parse(tekst), [MONSTERA]);
  });

  it("weigert een bestand met een ongeldig product", async () => {
    await writeFile(pad, JSON.stringify([MONSTERA, { id: "p02" }]), "utf8");
    await assert.rejects(BestandRepository.open(pad, productUitJson), ValidatieFout);
  });

  it("weigert een bestand dat niet bestaat", async () => {
    const weg = pathToFileURL(join(map, "bestaat-niet.json"));
    await assert.rejects(BestandRepository.open(weg, productUitJson), { code: "ENOENT" });
  });
});
