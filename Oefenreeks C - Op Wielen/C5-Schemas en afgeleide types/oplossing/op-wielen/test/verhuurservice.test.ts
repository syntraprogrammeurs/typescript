// Op Wielen — tests voor de verhuurservice, met een opslag in het geheugen en een vaste dag

import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import {
  aanbod,
  GeheugenRegister,
  NietVrijFout,
  OnbekendeReservatieFout,
  OnbekendItemFout,
  OngeldigePeriodeFout,
  Periode,
  Reservatieboek,
  ToestandFout,
  VerhuurService,
  type Register,
  type Reservatie,
  type Verhuuritem,
} from "../src/index.ts";

const ZOMER = { klant: "Sam Peeters", van: "2027-07-05", tot: "2027-07-09" };

function nieuweDienst(vandaag = () => "2027-06-01", reservaties: Register<Reservatie> = new GeheugenRegister<Reservatie>()) {
  return new VerhuurService(new GeheugenRegister<Verhuuritem>(aanbod()), new Reservatieboek(reservaties), vandaag);
}

describe("VerhuurService", () => {
  let dienst: VerhuurService;

  beforeEach(() => {
    dienst = nieuweDienst();
  });

  it("reserveert een fiets die vrij is, met de juiste prijs", async () => {
    const reservatie = await dienst.reserveer({ item: "f1", ...ZOMER });
    assert.equal(reservatie.id, "r1");
    assert.equal(reservatie.prijsInCent, 5 * 1200);
  });

  it("weigert een item dat niet bestaat", async () => {
    await assert.rejects(dienst.reserveer({ item: "f9", ...ZOMER }), OnbekendItemFout);
  });

  it("weigert een afgeschreven fiets", async () => {
    await assert.rejects(dienst.reserveer({ item: "f5", ...ZOMER }), ToestandFout);
  });

  it("weigert dezelfde fiets in een periode die overlapt", async () => {
    await dienst.reserveer({ item: "f1", ...ZOMER });
    await assert.rejects(dienst.reserveer({ item: "f1", klant: "Lien Maes", van: "2027-07-09", tot: "2027-07-10" }), NietVrijFout);
  });

  it("toont alleen wat vrij is, en nooit een afgeschreven fiets", async () => {
    await dienst.reserveer({ item: "f1", ...ZOMER });
    const vrij = await dienst.vrij(Periode.van("2027-07-08", "2027-07-12"));
    assert.deepEqual(vrij.map((item) => item.id), ["f2", "f3", "f4", "f6", "a1", "a2"]);
  });

  it("toont alleen fietsen van de gevraagde soort", async () => {
    const vrij = await dienst.vrij(Periode.van("2027-07-08", "2027-07-12"), "e-bike");
    assert.deepEqual(vrij.map((item) => item.id), ["f3", "f6"]);
  });

  it("annuleert een reservatie, en weigert een reservatie die niet bestaat", async () => {
    await dienst.reserveer({ item: "f1", ...ZOMER });
    await dienst.annuleer("r1");
    assert.deepEqual(await dienst.reservaties(), []);
    await assert.rejects(dienst.annuleer("r1"), OnbekendeReservatieFout);
  });
});

describe("VerhuurService, meegekeken met mock.fn", () => {
  it("vraagt de dag, en weigert een reservatie die in het verleden begint", async () => {
    const vandaag = mock.fn(() => "2027-07-06");
    const dienst = nieuweDienst(vandaag);
    await assert.rejects(dienst.reserveer({ item: "f1", ...ZOMER }), OngeldigePeriodeFout);
    assert.equal(vandaag.mock.callCount(), 1);
  });

  it("bewaart alleen wat gelukt is", async () => {
    const lijst: Reservatie[] = [];
    const opslag = {
      alle: mock.fn(async () => lijst),
      zoek: mock.fn(async (id: string) => lijst.find((r) => r.id === id)),
      waar: mock.fn(async (voorwaarde: (r: Reservatie) => boolean) => lijst.filter(voorwaarde)),
      bewaar: mock.fn(async (...items: Reservatie[]) => {
        lijst.push(...items);
      }),
      verwijder: mock.fn(async (_id: string) => false),
    } satisfies Register<Reservatie>;
    const dienst = nieuweDienst(() => "2027-06-01", opslag);

    await dienst.reserveer({ item: "f1", ...ZOMER });
    await assert.rejects(dienst.reserveer({ item: "f1", ...ZOMER }), NietVrijFout);
    await assert.rejects(dienst.reserveer({ item: "f5", ...ZOMER }), ToestandFout);

    assert.equal(opslag.bewaar.mock.callCount(), 1);
    assert.equal(opslag.bewaar.mock.calls[0]?.arguments[0]?.id, "r1");
  });
});
