// 6.4 null, undefined, ?. en ?? — voorbeeld uit Het Groenhuis, deel I
//
// ?. (optional chaining) leest verder als de waarde er is, en geeft anders meteen undefined.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const olijf = het resultaat van producten.find((product) => product.slug === "olijfboom")
// const niets = het resultaat van producten.find((product) => product.slug === "bestaat-niet")
// console.log(…) toont: olijf?.afmetingen?.hoogteInCm
// console.log(…) toont: niets?.afmetingen?.hoogteInCm
// console.log(…) toont: olijf?.beschrijving?.length
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 6.6 Een pagina uit blokken (zie 06-Unions en narrowing/6.6-Discriminated unions - een pagina uit blokken/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";

const olijf = producten.find((product) => product.slug === "olijfboom");
const niets = producten.find((product) => product.slug === "bestaat-niet");

console.log(olijf?.afmetingen?.hoogteInCm);
console.log(niets?.afmetingen?.hoogteInCm);
console.log(olijf?.beschrijving?.length);

// Uitvoer van `node src/proef.ts`:
// 150
// undefined
// 65
