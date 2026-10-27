// 1.10 Je eerste script — Het Groenhuis, deel I
//
// Maak een map src in domein, met daarin start.js.
//
// Opbouw van dit bestand:
// const winkel = de tekst "Het Groenhuis"
// const onderdelen = een lijst van 5 elementen: ["domein", "beheer", "server", "api", "winkel"]
// console.log(…) toont: `${winkel} — het domein`
// console.log(…) toont: `Node.js ${process.version} op ${process.platform}`
// console.log(…) toont: `Onderdelen dit jaar: ${onderdelen.join(", ")}`

// Het Groenhuis — het domein van het CMS
// Hoofdstuk 1: het eerste bestand dat Node uitvoert

const winkel = "Het Groenhuis";
const onderdelen = ["domein", "beheer", "server", "api", "winkel"];

console.log(`${winkel} — het domein`);
console.log(`Node.js ${process.version} op ${process.platform}`);
console.log(`Onderdelen dit jaar: ${onderdelen.join(", ")}`);
