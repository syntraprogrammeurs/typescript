// 8.1 Waarom een klasse — voorbeeld uit Het Groenhuis, deel I
//
// Alles mag, en TypeScript ziet geen fout: de types kloppen. Een voorraad van -5 is een number.
// Maar het is geen geldige voorraad. Types bewaken de vorm, niet de regels.
//
// Opbouw van dit bestand:
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// const aloe: Product = een object met de velden id, slug, status, naam, prijsInCent,
//     btwPercentage, voorraad, categorieId, tags
// aloe.voorraad krijgt de waarde de uitkomst van aloe.voorraad - 30
// aloe.prijsInCent krijgt de waarde het getal -100
// aloe.status krijgt de waarde de tekst "concept"
// console.log(…) toont: aloe.voorraad, aloe.prijsInCent, aloe.status
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na Oefening 7.2 De instellingen van de winkel (zie 07-Type guards, unknown, as en satisfies/7.10-Klassikale oefening 7.2 - De instellingen van de winkel/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import type { Product } from "./inhoud.ts";

const aloe: Product = {
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
};

aloe.voorraad = aloe.voorraad - 30;
aloe.prijsInCent = -100;
aloe.status = "concept";

console.log(aloe.voorraad, aloe.prijsInCent, aloe.status);

// Uitvoer van `node src/proef.ts`:
// -5 -100 concept
