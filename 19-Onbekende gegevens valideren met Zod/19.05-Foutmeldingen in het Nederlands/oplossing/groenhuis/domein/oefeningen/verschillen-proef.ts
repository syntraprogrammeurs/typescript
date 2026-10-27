// Het Groenhuis — de proef van verschillen.ts
// Hoofdstuk 18, klassikale oefening 18.2

import { GeheugenRepository, laadProducten, Product, ProductService, verschillen } from "../src/index.ts";

const gegevens = await laadProducten(new URL("../data/producten.json", import.meta.url));
const producten = new ProductService(new GeheugenRepository(gegevens.map((element) => new Product(element))));

const voor = (await producten.metSlug("monstera-deliciosa")).toJSON();
const gewijzigd = await producten.wijzig("monstera-deliciosa", { naam: "Monstera deliciosa", prijsInCent: 2299, tags: ["groot"] });
const na = gewijzigd.toJSON();

for (const [veld, verschil] of Object.entries(verschillen(voor, na))) {
  console.log(`${veld.padEnd(12)} ${JSON.stringify(verschil.van)} → ${JSON.stringify(verschil.naar)}`);
}
