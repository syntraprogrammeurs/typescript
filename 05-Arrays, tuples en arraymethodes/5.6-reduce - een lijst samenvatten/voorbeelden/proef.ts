// 5.6 reduce: een lijst samenvatten — voorbeeld uit Het Groenhuis, deel I
//
// reduce loopt de lijst af en bouwt onderweg één waarde op: een totaal, een telling, een object.
// Je geeft een functie mee en een beginwaarde.
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// const stuks = het resultaat van producten.reduce((totaal, product) => totaal + product.voorraad,
//     0)
// console.log(…) toont: `Stuks in voorraad: ${stuks}`
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 4.8 De eerste catalogus (zie 04-Objecten, interfaces en structural typing/4.8-De eerste catalogus/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { producten } from "./catalogus.ts";

const stuks = producten.reduce((totaal, product) => totaal + product.voorraad, 0);
console.log(`Stuks in voorraad: ${stuks}`);

// Uitvoer van `node src/proef.ts`:
// Stuks in voorraad: 97
