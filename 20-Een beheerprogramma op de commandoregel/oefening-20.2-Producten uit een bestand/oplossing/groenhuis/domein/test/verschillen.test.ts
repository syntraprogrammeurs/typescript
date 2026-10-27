// Het Groenhuis — tests voor verschillen
// Hoofdstuk 18, klassikale oefening 18.2

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { verschillen } from "../src/index.ts";

interface Plant {
  naam: string;
  prijsInCent: number;
  tags: string[];
  beschrijving?: string;
}

const ALOE: Plant = { naam: "Aloe vera", prijsInCent: 899, tags: ["makkelijk"] };

describe("verschillen", () => {
  it("geeft per gewijzigd veld de oude en de nieuwe waarde", () => {
    const na: Plant = { ...ALOE, prijsInCent: 799, tags: ["makkelijk", "cadeau"] };
    assert.deepEqual(verschillen(ALOE, na), {
      prijsInCent: { van: 899, naar: 799 },
      tags: { van: ["makkelijk"], naar: ["makkelijk", "cadeau"] },
    });
  });

  it("ziet een veld dat erbij komt", () => {
    const na: Plant = { ...ALOE, beschrijving: "Sap voor de huid" };
    assert.deepEqual(verschillen(ALOE, na), { beschrijving: { van: undefined, naar: "Sap voor de huid" } });
  });

  it("geeft een leeg object als er niets veranderd is", () => {
    assert.deepEqual(verschillen(ALOE, { ...ALOE, tags: ["makkelijk"] }), {});
  });
});
