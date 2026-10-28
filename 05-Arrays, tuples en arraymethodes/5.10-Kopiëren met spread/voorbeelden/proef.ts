// 5.10 Kopiëren met spread — voorbeeld uit Het Groenhuis, deel I
//
// Een object of een lijst wijzig je in dit project zo weinig mogelijk ter plaatse. Je maakt een
// kopie met de wijziging erin, met de spread-operator ....
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const aloe = het resultaat van producten.find((product) => product.slug === "aloe-vera")
// if (aloe !== undefined) …
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 5.9 Readonly-arrays en tuples (zie 05-Arrays, tuples en arraymethodes/5.9-Tuples/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";

const aloe = producten.find((product) => product.slug === "aloe-vera");
if (aloe !== undefined) {
  const verkocht = { ...aloe, voorraad: aloe.voorraad - 1 };
  const metTag = { ...aloe, tags: [...aloe.tags, "bloeiend"] };

  console.log(aloe.voorraad, verkocht.voorraad);
  console.log(aloe.tags, metTag.tags);
  console.log(aloe === verkocht);
}

// Uitvoer van `node src/proef.ts`:
// 25 24
// [ 'makkelijk' ] [ 'makkelijk', 'bloeiend' ]
// false
