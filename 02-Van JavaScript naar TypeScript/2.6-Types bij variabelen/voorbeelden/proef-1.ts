// 2.6 Types bij variabelen — voorbeeld uit Het Groenhuis, deel I
//
// Maar meestal hoeft dat niet. TypeScript leidt af welk type een waarde heeft.
//
// Opbouw van dit bestand:
// let naam = de tekst "Monstera deliciosa"
// let prijsInCent = het getal 2499
// let opVoorraad = de waarde true
// prijsInCent krijgt de waarde de uitkomst van prijsInCent + 100
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit

let naam = "Monstera deliciosa";
let prijsInCent = 2499;
let opVoorraad = true;

prijsInCent = prijsInCent + 100;

// `npx tsc --noEmit` meldt niets: de types kloppen. Dit bestand voert niets uit.
