// 3.7 Overloads — voorbeeld uit Het Groenhuis, deel I
//
// Soms gedraagt een functie zich anders naargelang wat je meegeeft. Een prijs die de gebruiker
// intypt, is tekst ("24,99"); een prijs uit een rekening is een getal (24.99). Een functie
// naarCent die beide aanneemt, kun je met overloads beschrijven.
//
// Opbouw van dit bestand:
// function naarCent(euro: number): number
// function naarCent(tekst: string): number
// function naarCent(waarde: number | string): number
// console.log(…) toont: naarCent(24.99)
// console.log(…) toont: naarCent("24,99")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function naarCent(euro: number): number;
function naarCent(tekst: string): number;
function naarCent(waarde: number | string): number {
  const getal = typeof waarde === "string" ? Number(waarde.replace(",", ".")) : waarde;
  return Math.round(getal * 100);
}

console.log(naarCent(24.99));
console.log(naarCent("24,99"));

// Uitvoer van `node src/proef.ts`:
// 2499
// 2499
