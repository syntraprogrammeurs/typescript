// Het Groenhuis — het domein van het CMS

import {
  BestandProductRepository,
  GeheugenRepository,
  Geld,
  laadProducten,
  levering,
  nieuwProduct,
  overzicht,
  probeer,
  Product,
  type Repository,
} from "./index.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const bron = new URL("../data/producten.json", import.meta.url);
const kies = process.env["OPSLAG"] ?? "geheugen";

const opslag: Repository<Product> =
  kies === "bestand"
    ? await BestandProductRepository.open(bron)
    : new GeheugenRepository((await laadProducten(bron)).map((gegevens) => new Product(gegevens)));

console.log(`Opslag: ${kies}, ${(await opslag.alle()).length} producten`);

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
