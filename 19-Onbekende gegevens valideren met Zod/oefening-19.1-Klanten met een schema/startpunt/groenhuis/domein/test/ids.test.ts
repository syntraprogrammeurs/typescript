// Het Groenhuis — tests voor de id's
// Hoofdstuk 17, klassikale oefening 17.1

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { teller, willekeurigId } from "../src/index.ts";

describe("teller", () => {
  it("telt op vanaf 1, met het voorvoegsel ervoor", () => {
    const volgende = teller("p");
    assert.deepEqual([volgende(), volgende(), volgende()], ["p1", "p2", "p3"]);
  });

  it("begint voor elke teller opnieuw", () => {
    const a = teller("a");
    const b = teller("b");
    a();
    assert.equal(b(), "b1");
  });
});

describe("willekeurigId", () => {
  it("geeft telkens een ander id van 36 tekens", () => {
    const een = willekeurigId();
    const twee = willekeurigId();
    assert.equal(een.length, 36);
    assert.notEqual(een, twee);
  });
});
