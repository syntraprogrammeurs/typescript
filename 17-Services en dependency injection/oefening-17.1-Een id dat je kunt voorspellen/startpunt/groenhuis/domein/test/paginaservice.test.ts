// Het Groenhuis — tests voor PaginaService

import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import { GeheugenRepository, NietGevondenFout, Pagina, PaginaService, RegelFout, type Blok } from "../src/index.ts";

const TEKST: Blok = { soort: "tekst", tekst: "Het Groenhuis is een plantenwinkel in Gent." };

describe("PaginaService", () => {
  let opslag: GeheugenRepository<Pagina>;
  let paginas: PaginaService;

  beforeEach(() => {
    opslag = new GeheugenRepository<Pagina>();
    paginas = new PaginaService(opslag);
  });

  it("maakt een lege pagina, met een slug uit de titel", async () => {
    const pagina = await paginas.nieuw("Over ons");
    assert.equal(pagina.slug.toString(), "over-ons");
    assert.equal(pagina.status, "concept");
    assert.equal((await opslag.alle()).length, 1);
  });

  it("weigert een tweede pagina met dezelfde slug", async () => {
    await paginas.nieuw("Over ons");
    await assert.rejects(paginas.nieuw("Over ons!"), RegelFout);
  });

  it("voegt een blok toe, en bewaart de pagina", async () => {
    await paginas.nieuw("Over ons");
    const bewaar = mock.method(opslag, "bewaar");
    await paginas.voegBlokToe("over-ons", TEKST);

    assert.equal(bewaar.mock.callCount(), 1);
    assert.equal((await paginas.metSlug("over-ons")).blokken.length, 1);
  });

  it("publiceert een pagina pas als ze een blok heeft", async () => {
    await paginas.nieuw("Over ons");
    await assert.rejects(paginas.publiceer("over-ons"), { name: "RegelFout", message: /geen blokken/ });
    await paginas.voegBlokToe("over-ons", TEKST);
    assert.equal((await paginas.publiceer("over-ons")).status, "gepubliceerd");
  });

  it("geeft een NietGevondenFout voor een slug die niet bestaat", async () => {
    await assert.rejects(paginas.voegBlokToe("contact", TEKST), NietGevondenFout);
  });
});
