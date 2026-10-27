// Het Groenhuis — tests voor de soorten blokken
// Hoofdstuk 18, klassikale oefening 18.1

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { blokkenVan, telBlokken, type Blok } from "../src/index.ts";

const BLOKKEN: Blok[] = [
  { soort: "tekst", tekst: "Welkom in Het Groenhuis." },
  { soort: "knop", label: "Naar de winkel", link: "/winkel" },
  { soort: "tekst", tekst: "Elke zaterdag open van 9 tot 18 uur." },
  { soort: "knop", label: "Contact", link: "/contact" },
];

describe("blokken van één soort", () => {
  it("geeft alleen de blokken van die soort, met hun eigen velden", () => {
    const knoppen = blokkenVan(BLOKKEN, "knop");
    assert.deepEqual(knoppen.map((knop) => knop.label), ["Naar de winkel", "Contact"]);
  });

  it("geeft een lege lijst voor een soort die niet voorkomt", () => {
    assert.deepEqual(blokkenVan(BLOKKEN, "afbeelding"), []);
  });

  it("telt elke soort, ook de soorten die niet voorkomen", () => {
    assert.deepEqual(telBlokken(BLOKKEN), { tekst: 2, afbeelding: 0, knop: 2, productlijst: 0 });
  });
});
