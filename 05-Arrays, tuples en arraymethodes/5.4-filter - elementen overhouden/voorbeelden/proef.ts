// 5.4 filter: elementen overhouden — voorbeeld uit Het Groenhuis, deel I
//
// filter maakt een nieuwe lijst met alleen de elementen waarvoor de functie true teruggeeft. Het
// type blijft hetzelfde: een lijst producten wordt een kortere lijst producten.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const uitverkocht = het resultaat van producten.filter((product) => product.voorraad === 0)
// console.log(…) toont: uitverkocht.map((product) => product.naam)
// const metPotmaat = het resultaat van producten .map((product) => product.afmetingen)
//     .filter((afmetingen) => afmetingen !== undefined) .map((afmet…
// console.log(…) toont: metPotmaat
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";

const uitverkocht = producten.filter((product) => product.voorraad === 0);
console.log(uitverkocht.map((product) => product.naam));

const metPotmaat = producten
  .map((product) => product.afmetingen)
  .filter((afmetingen) => afmetingen !== undefined)
  .map((afmetingen) => afmetingen.potmaatInCm);
console.log(metPotmaat);

// Uitvoer van `node src/proef.ts`:
// [ 'Calathea orbifolia', 'Snoeischaar' ]
// [ 21, 17, 17, 40 ]
