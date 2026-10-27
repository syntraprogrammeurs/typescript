// Het Groenhuis — tests voor Pagina
// Hoofdstuk 15, klassikale oefening 15.1

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Pagina, RegelFout, Slug, type Blok } from "../src/index.ts";

const FOTO: Blok = { soort: "afbeelding", url: "/img/winkel.jpg", alt: "De winkel aan de Vrijdagmarkt" };
const TEKST: Blok = { soort: "tekst", tekst: "Het Groenhuis is een plantenwinkel in Gent." };
const KNOP: Blok = { soort: "knop", label: "Naar de winkel", link: "/winkel" };

describe("Pagina", () => {
  let pagina: Pagina;

  beforeEach(() => {
    pagina = new Pagina("pg1", Slug.van("over-ons"), "Over ons");
  });

  it("begint als concept, zonder blokken", () => {
    assert.equal(pagina.status, "concept");
    assert.deepEqual(pagina.blokken, []);
  });

  it("kan niet gepubliceerd worden zonder blokken", () => {
    assert.throws(() => pagina.publiceer(), { name: "RegelFout", message: /geen blokken/ });
    assert.equal(pagina.status, "concept");
  });

  it("wordt gepubliceerd zodra er een blok is", () => {
    pagina.voegBlokToe(FOTO);
    pagina.publiceer();
    assert.ok(pagina.isZichtbaar);
  });

  it("kan niet meer gepubliceerd worden na archiveren", () => {
    pagina.voegBlokToe(FOTO);
    pagina.archiveer();
    assert.throws(() => pagina.publiceer(), RegelFout);
  });

  describe("blokken", () => {
    beforeEach(() => {
      pagina.voegBlokToe(FOTO);
      pagina.voegBlokToe(TEKST);
    });

    it("voegt achteraan toe, of op een plaats", () => {
      pagina.voegBlokToe(KNOP, 1);
      assert.deepEqual(pagina.blokken, [FOTO, KNOP, TEKST]);
    });

    it("verplaatst een blok", () => {
      pagina.verplaatsBlok(1, 0);
      assert.deepEqual(pagina.blokken, [TEKST, FOTO]);
    });

    it("verwijdert een blok", () => {
      pagina.verwijderBlok(0);
      assert.deepEqual(pagina.blokken, [TEKST]);
    });

    it("weigert een plaats die niet bestaat", () => {
      assert.throws(() => pagina.voegBlokToe(KNOP, 5), RegelFout);
      assert.throws(() => pagina.verwijderBlok(2), RegelFout);
      assert.throws(() => pagina.verplaatsBlok(0, -1), RegelFout);
      assert.deepEqual(pagina.blokken, [FOTO, TEKST]);
    });
  });
});
