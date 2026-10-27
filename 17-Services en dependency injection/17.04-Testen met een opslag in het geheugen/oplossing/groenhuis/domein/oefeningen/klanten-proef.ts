// Het Groenhuis — klanten in een JSON-bestand, met dezelfde BestandRepository als de producten
// Hoofdstuk 16, klassikale oefening 16.1

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { isKlant } from "../src/opslag/klantcontrole.ts";
import { leesLijst } from "../src/opslag/laden.ts";
import { BestandRepository, klantUitJson, ValidatieFout, type Klant } from "../src/index.ts";

const bron = new URL("../data/klanten.json", import.meta.url);

// 1. het bestand van hoofdstuk 7 heeft twee foute klanten
try {
  await BestandRepository.open(bron, klantUitJson);
} catch (fout) {
  if (!(fout instanceof ValidatieFout)) {
    throw fout;
  }
  console.log(`Geweigerd: ${fout.message}`);
}

// 2. een kopie met alleen de goede klanten, in een tijdelijke map
const map = await mkdtemp(join(tmpdir(), "klanten-"));
try {
  const pad = pathToFileURL(join(map, "klanten.json"));
  const goede = (await leesLijst(bron)).filter(isKlant);
  await writeFile(pad, JSON.stringify(goede, null, 2), "utf8");

  const klanten = await BestandRepository.open(pad, klantUitJson);
  const lien: Klant = {
    id: "k4", voornaam: "Lien", achternaam: "Maes", email: "lien.maes@example.com",
    leveradres: { straat: "Kouter", huisnummer: "12", postcode: "9000", gemeente: "Gent", land: "België" },
  };
  await klanten.bewaar(lien);

  // 3. een tweede repository op hetzelfde bestand ziet de nieuwe klant
  const opnieuw = await BestandRepository.open(pad, klantUitJson);
  for (const klant of await opnieuw.alle()) {
    console.log(`${klant.id}  ${klant.voornaam} ${klant.achternaam}, ${klant.leveradres.gemeente}`);
  }
} finally {
  await rm(map, { recursive: true, force: true });
}
