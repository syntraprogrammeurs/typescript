// Het Groenhuis — tests voor CategorieService
// Hoofdstuk 17, klassikale oefening 17.2

import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import {
  Categorie,
  CategorieService,
  GeheugenRepository,
  NietGevondenFout,
  Product,
  type Repository,
} from "../src/index.ts";

const KAMERPLANTEN = new Categorie({ id: "c1", slug: "kamerplanten", status: "gepubliceerd", naam: "Kamerplanten" });
const CACTUSSEN = new Categorie({ id: "c3", slug: "cactussen", status: "gepubliceerd", naam: "Cactussen" }, KAMERPLANTEN);
const POTTEN = new Categorie({ id: "c2", slug: "potten", status: "concept", naam: "Potten" });

function product(id: string, slug: string, naam: string, categorieId: string): Product {
  return new Product({ id, slug, naam, categorieId, status: "gepubliceerd", prijsInCent: 1000, btwPercentage: 6, voorraad: 1, tags: [] });
}

const MONSTERA = product("p01", "monstera-deliciosa", "Monstera deliciosa", "c1");
const ECHEVERIA = product("p07", "echeveria", "Echeveria", "c3");

/** Een nep-opslag voor categorieën, die bijhoudt wat er verwijderd wordt. */
function nepCategorieen(lijst: Categorie[]) {
  return {
    alle: mock.fn(async () => lijst),
    zoek: mock.fn(async (id: string) => lijst.find((categorie) => categorie.id === id)),
    zoekEerste: mock.fn(async (voorwaarde: (categorie: Categorie) => boolean) => lijst.find(voorwaarde)),
    bewaar: mock.fn(async (_categorie: Categorie) => {}),
    verwijder: mock.fn(async (_id: string) => true),
  } satisfies Repository<Categorie>;
}

function maak() {
  const categorieen = nepCategorieen([KAMERPLANTEN, CACTUSSEN, POTTEN]);
  const service = new CategorieService(categorieen, new GeheugenRepository([MONSTERA, ECHEVERIA]));
  return { categorieen, service };
}

describe("CategorieService.verwijder", () => {
  it("verwijdert een lege categorie", async () => {
    const { categorieen, service } = maak();
    await service.verwijder("c2");
    assert.equal(categorieen.verwijder.mock.callCount(), 1);
    assert.deepEqual(categorieen.verwijder.mock.calls[0]?.arguments, ["c2"]);
  });

  it("weigert een categorie met een subcategorie", async () => {
    const { categorieen, service } = maak();
    await assert.rejects(service.verwijder("c1"), { name: "RegelFout", message: "Kamerplanten heeft nog 1 subcategorie: Cactussen" });
    assert.equal(categorieen.verwijder.mock.callCount(), 0);
  });

  it("weigert een categorie met producten", async () => {
    const { categorieen, service } = maak();
    await assert.rejects(service.verwijder("c3"), { name: "RegelFout", message: "Cactussen heeft nog 1 product: Echeveria" });
    assert.equal(categorieen.verwijder.mock.callCount(), 0);
  });

  it("geeft een NietGevondenFout voor een categorie die niet bestaat", async () => {
    const { categorieen, service } = maak();
    await assert.rejects(service.verwijder("c9"), NietGevondenFout);
    assert.equal(categorieen.verwijder.mock.callCount(), 0);
  });
});
