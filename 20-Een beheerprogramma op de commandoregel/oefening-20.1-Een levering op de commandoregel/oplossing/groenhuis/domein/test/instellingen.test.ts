// Het Groenhuis — tests voor de instellingen en hun schema

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InstellingenSchema } from "../src/index.ts";

describe("InstellingenSchema", () => {
  it("vult wat ontbreekt aan met de standaard", () => {
    assert.deepEqual(InstellingenSchema.parse({ verzendkost: 595 }), {
      gratisVerzendingVanaf: 5000,
      verzendkost: 595,
      toeslagExpress: 300,
    });
  });

  it("geeft een leeg object de standaard voor elk veld", () => {
    assert.deepEqual(InstellingenSchema.parse({}), { gratisVerzendingVanaf: 5000, verzendkost: 495, toeslagExpress: 300 });
  });

  it("weigert een bedrag als tekst", () => {
    const resultaat = InstellingenSchema.safeParse({ verzendkost: "4,95" });
    assert.equal(resultaat.success, false);
    assert.deepEqual(resultaat.error?.issues.map((probleem) => probleem.path), [["verzendkost"]]);
  });
});
