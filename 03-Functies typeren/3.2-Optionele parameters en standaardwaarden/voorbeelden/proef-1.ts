// 3.2 Optionele parameters en standaardwaarden — voorbeeld uit Het Groenhuis, deel I
//
// taal = "nl-BE" is een standaardwaarde. Geef je de parameter niet mee, dan krijgt hij die waarde.
//
// Opbouw van dit bestand:
// import alsEuro uit "./prijs.ts"
// console.log(…) toont: alsEuro(2499)
// console.log(…) toont: alsEuro(2499, "en-GB")
// console.log(…) toont: alsEuro(2499, "fr-FR")
// console.log(…) toont: alsEuro(249900)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 3.2 Optionele parameters en standaardwaarden (zie 03-Functies typeren/3.2-Optionele parameters en standaardwaarden/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { alsEuro } from "./prijs.ts";

console.log(alsEuro(2499));
console.log(alsEuro(2499, "en-GB"));
console.log(alsEuro(2499, "fr-FR"));
console.log(alsEuro(249900));

// Uitvoer van `node src/proef.ts`:
// € 24,99
// €24.99
// 24,99 €
// € 2.499,00
