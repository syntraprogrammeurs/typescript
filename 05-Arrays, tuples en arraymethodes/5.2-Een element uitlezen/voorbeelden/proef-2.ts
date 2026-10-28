// 5.2 Een element uitlezen — voorbeeld uit Het Groenhuis, deel I
//
// Door noUncheckedIndexedAccess is het type van producten[0] niet Product, maar Product |
// undefined. TypeScript weet niet hoe lang de lijst is, en doet niet alsof.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const eerste = producten[0]
// if (eerste !== undefined) …
// for … of: een lus over producten
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";

const eerste = producten[0];
if (eerste !== undefined) {
  console.log(eerste.naam);
}

for (const product of producten) {
  console.log(product.slug);
}

// Uitvoer van `node src/proef.ts`:
// Monstera deliciosa
// monstera-deliciosa
// sansevieria-trifasciata
// calathea-orbifolia
// aloe-vera
// olijfboom
// terracotta-pot-20
// plantenspuit
// snoeischaar
