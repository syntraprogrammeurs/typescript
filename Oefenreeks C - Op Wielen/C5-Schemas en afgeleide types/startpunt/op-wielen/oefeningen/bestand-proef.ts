// Op Wielen — proef: reservaties in een bestand, op een kopie in een tijdelijke map

import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { aanbod, alsEuro, BestandRegister, Periode, Reservatieboek, reservatieUitJson } from "../src/index.ts";

const map = await mkdtemp(join(tmpdir(), "op-wielen-"));
const pad = pathToFileURL(join(map, "reservaties.json"));
await writeFile(pad, await readFile(new URL("../data/reservaties.json", import.meta.url), "utf8"), "utf8");

try {
  const items = aanbod();
  const reservaties = await BestandRegister.open(pad, reservatieUitJson(items));
  for (const r of await reservaties.alle()) {
    console.log(`${r.id}  ${r.klant.padEnd(12)} ${r.item.omschrijving.padEnd(30)} ${r.periode.toString().padEnd(14)} ${alsEuro(r.prijsInCent)}`);
  }

  const boek = new Reservatieboek(reservaties);
  const bakfiets = items.find((item) => item.id === "f4");
  if (bakfiets !== undefined) {
    const nieuw = await boek.reserveer(bakfiets, "Noor Claes", Periode.van("2027-07-12", "2027-07-14"));
    console.log(`Nieuw: ${nieuw.id}, ${nieuw.item.omschrijving}, ${nieuw.periode}`);
  }
  const bewaard: unknown = JSON.parse(await readFile(pad, "utf8"));
  console.log(JSON.stringify(Array.isArray(bewaard) ? bewaard.at(-1) : bewaard));
} finally {
  await rm(map, { recursive: true, force: true });
}
