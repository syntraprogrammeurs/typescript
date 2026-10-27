// Het Groenhuis — het domein van het CMS

import { levering, nieuwProduct, overzicht } from "./beheer.ts";
import { BestandProductRepository } from "./bestandrepository.ts";
import { probeer } from "./fouten.ts";
import { Geld } from "./geld.ts";
import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";
import { GeheugenRepository, type Repository } from "./repository.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const bron = new URL("../data/producten.json", import.meta.url);
const kies = process.env["OPSLAG"] ?? "geheugen";

const opslag: Repository<Product> =
  kies === "bestand"
    ? new BestandProductRepository(bron)
    : new GeheugenRepository(laadProducten(bron).map((gegevens) => new Product(gegevens)));

console.log(`Opslag: ${kies}, ${opslag.alle().length} producten`);

levering(opslag, "monstera-deliciosa", 5);
nieuwProduct(opslag, "Bonsai Ficus", Geld.vanEuro("34,99"), "c1");

for (const regel of overzicht(opslag)) {
  console.log(`  ${regel}`);
}

console.log();
const pogingen = [
  () => levering(opslag, "orchidee", 3),
  () => nieuwProduct(opslag, "Hangplant", Geld.vanEuro("gratis"), "c1"),
  () => nieuwProduct(opslag, "Cactus", Geld.NUL, "c5").publiceer(),
  () => levering(opslag, "olijfboom", -5),
];
for (const poging of pogingen) {
  const resultaat = probeer(poging);
  console.log(resultaat.ok ? "gelukt" : `${resultaat.fout.name}: ${resultaat.fout.message}`);
}
