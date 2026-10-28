// 5.3 map: elk element omzetten — voorbeeld uit Het Groenhuis, deel I
//
// map maakt een nieuwe lijst, even lang als de oude, met elk element omgezet.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// import alsEuro, metBtw uit "./prijs.ts"
// const namen = het resultaat van producten.map((product) => product.naam)
// const etiketten = het resultaat van producten.map((product) => ({ naam: product.naam, prijs:
//     alsEuro(metBtw(product.prijsInCent, product.btwPerce…
// console.log(…) toont: namen.slice(0, 3)
// console.log(…) toont: etiketten.slice(0, 2)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";
import { alsEuro, metBtw } from "./prijs.ts";

const namen = producten.map((product) => product.naam);

const etiketten = producten.map((product) => ({
  naam: product.naam,
  prijs: alsEuro(metBtw(product.prijsInCent, product.btwPercentage)),
}));

console.log(namen.slice(0, 3));
console.log(etiketten.slice(0, 2));

// Uitvoer van `node src/proef.ts`:
// [
//   'Monstera deliciosa',
//   'Sansevieria trifasciata',
//   'Calathea orbifolia'
// ]
// [
//   { naam: 'Monstera deliciosa', prijs: '€ 26,49' },
//   { naam: 'Sansevieria trifasciata', prijs: '€ 15,37' }
// ]
