// Het Groenhuis — het domein van het CMS

import {
  BestandRepository,
  GeheugenRepository,
  Geld,
  laadInstellingen,
  laadProducten,
  Pagina,
  PaginaService,
  probeer,
  Product,
  ProductService,
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

// hier, en alleen hier, wordt beslist welke opslag de service krijgt
const producten = new ProductService(opslag);

await producten.levering("monstera-deliciosa", 5);
await producten.nieuw("Bonsai Ficus", Geld.vanEuro("34,99"), "c1");

for (const regel of await producten.overzicht()) {
  console.log(`  ${regel}`);
}

const paginas = new PaginaService(new GeheugenRepository<Pagina>());
await paginas.nieuw("Over ons");
await paginas.voegBlokToe("over-ons", { soort: "tekst", tekst: "Het Groenhuis is een plantenwinkel in Gent." });
const overOns = await paginas.publiceer("over-ons");
console.log(`Pagina ${overOns.titel}: ${overOns.status}, ${overOns.blokken.length} blok`);

console.log();
const pogingen: (() => Promise<unknown>)[] = [
  () => producten.levering("orchidee", 3),
  () => producten.nieuw("Hangplant", Geld.vanEuro("gratis"), "c1"),
  () => producten.nieuw("Bonsai ficus", Geld.vanEuro("29,99"), "c1"),
  async () => {
    await producten.nieuw("Cactus", Geld.NUL, "c5");
    return producten.publiceer("cactus");
  },
  () => producten.levering("olijfboom", -5),
];
for (const poging of pogingen) {
  const resultaat = await probeer(poging);
  console.log(resultaat.ok ? "gelukt" : `${resultaat.fout.name}: ${resultaat.fout.message}`);
}
