// Het Groenhuis — het domein van het CMS

import { Geld } from "./geld.ts";
import type { Inhoud } from "./inhoudsklasse.ts";
import { laadProducten } from "./laden.ts";
import { Pagina } from "./pagina.ts";
import { Product } from "./product.ts";
import { Slug } from "./slug.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const producten = laadProducten(new URL("../data/producten.json", import.meta.url)).map(
  (gegevens) => new Product(gegevens),
);

const tips = new Pagina("g3", Slug.van("verzorgingstips"), "Verzorgingstips");
const actie = new Pagina("g4", Slug.van("lenteactie"), "Lenteactie");
tips.voegBlokToe({ soort: "tekst", tekst: "Geef liever te weinig dan te veel water." });
const nieuw = Product.nieuw("Bonsai Ficus", Geld.NUL, "c1");

const alles: Inhoud[] = [...producten, tips, actie, nieuw];

console.log();
console.log("Alles publiceren wat nog een concept is:");
for (const inhoud of alles.filter((item) => item.status === "concept")) {
  try {
    inhoud.publiceer();
    console.log(`  gepubliceerd: ${inhoud.weergavenaam}`);
  } catch (fout) {
    console.log(`  geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}

console.log();
for (const inhoud of alles) {
  const soort = inhoud instanceof Product ? `product, ${inhoud.prijsInclBtw}` : "pagina";
  console.log(`${inhoud.weergavenaam.padEnd(26)}${inhoud.status.padEnd(14)}${soort}`);
}
