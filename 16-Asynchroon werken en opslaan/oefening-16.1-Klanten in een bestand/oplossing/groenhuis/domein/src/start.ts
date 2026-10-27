// Het Groenhuis — het domein van het CMS

import {
  BestandRepository,
  GeheugenRepository,
  Geld,
  laadInstellingen,
  laadProducten,
  levering,
  nieuwProduct,
  overzicht,
  probeer,
  Product,
  productUitJson,
  type Repository,
} from "./index.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const bron = new URL("../data/producten.json", import.meta.url);
const kies = process.env["OPSLAG"] ?? "geheugen";

async function maakOpslag(): Promise<Repository<Product>> {
  if (kies === "bestand") {
    return BestandRepository.open(bron, productUitJson);
  }
  const gegevens = await laadProducten(bron);
  return new GeheugenRepository(gegevens.map((element) => new Product(element)));
}

// twee bestanden tegelijk lezen: geen van beide hoeft op het andere te wachten
const [opslag, instellingen] = await Promise.all([
  maakOpslag(),
  laadInstellingen(new URL("../data/instellingen.json", import.meta.url)),
]);

console.log(`Opslag: ${kies}, ${(await opslag.alle()).length} producten`);
console.log(`Gratis verzending vanaf ${Geld.vanCent(instellingen.gratisVerzendingVanaf)}`);

await levering(opslag, "monstera-deliciosa", 5);
await nieuwProduct(opslag, "Bonsai Ficus", Geld.vanEuro("34,99"), "c1");

for (const regel of await overzicht(opslag)) {
  console.log(`  ${regel}`);
}

console.log();
const pogingen: (() => Promise<unknown>)[] = [
  () => levering(opslag, "orchidee", 3),
  () => nieuwProduct(opslag, "Hangplant", Geld.vanEuro("gratis"), "c1"),
  async () => (await nieuwProduct(opslag, "Cactus", Geld.NUL, "c5")).publiceer(),
  () => levering(opslag, "olijfboom", -5),
];
for (const poging of pogingen) {
  const resultaat = await probeer(poging);
  console.log(resultaat.ok ? "gelukt" : `${resultaat.fout.name}: ${resultaat.fout.message}`);
}
