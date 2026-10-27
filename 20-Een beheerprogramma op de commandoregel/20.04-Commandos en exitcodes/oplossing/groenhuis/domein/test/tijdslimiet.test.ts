// Het Groenhuis — tests voor metTijdslimiet

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { setTimeout as wacht } from "node:timers/promises";
import { metTijdslimiet } from "../src/index.ts";

describe("metTijdslimiet", () => {
  it("geeft de waarde als ze op tijd is", async () => {
    const waarde = await metTijdslimiet(wacht(10, "op tijd"), 500);
    assert.equal(waarde, "op tijd");
  });

  it("weigert als het te lang duurt", async () => {
    await assert.rejects(metTijdslimiet(wacht(500), 20), { message: "Geen antwoord binnen 20 ms" });
  });

  it("laat een fout van de belofte zelf door", async () => {
    await assert.rejects(metTijdslimiet(Promise.reject(new TypeError("kapot")), 500), TypeError);
  });
});
