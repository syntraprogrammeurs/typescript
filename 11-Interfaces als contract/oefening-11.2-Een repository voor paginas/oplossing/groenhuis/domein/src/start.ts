// Het Groenhuis — het domein van het CMS

import { levering, nieuwProduct, overzicht } from "./beheer.ts";
import { BestandProductRepository } from "./bestandrepository.ts";
import { Geld } from "./geld.ts";
import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";
import { GeheugenProductRepository, type ProductRepository } from "./productrepository.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const bron = new URL("../data/producten.json", import.meta.url);
const kies = process.env["OPSLAG"] ?? "geheugen";

const opslag: ProductRepository =
  kies === "bestand"
    ? new BestandProductRepository(bron)
    : new GeheugenProductRepository(laadProducten(bron).map((gegevens) => new Product(gegevens)));

console.log(`Opslag: ${kies}, ${opslag.alle().length} producten`);

levering(opslag, "monstera-deliciosa", 5);
nieuwProduct(opslag, "Bonsai Ficus", Geld.vanEuro("34,99"), "c1");

for (const regel of overzicht(opslag)) {
  console.log(`  ${regel}`);
}
