// 1.15 Klassikale oefening 1.2 — Een fout opsporen met de debugger — voorbeeld uit Het Groenhuis, deel I
//
// De situatie. Een collega schreef een script dat telt hoeveel stuks er in voorraad zijn, en wat
// ze samen waard zijn. De voorraad staat als tekstregels, zoals ze uit een export van het
// kassasysteem komen: naam, aantal en prijs in cent, gescheiden door een puntkomma. Het script
// geeft een vreemd resultaat.
//
// Opbouw van dit bestand:
// const regels = een lijst van 3 elementen: [ "Monstera deliciosa;3;2499", "Sansevieria;12;1450",
//     "Terracotta pot 20 cm;40;895", ]
// let aantalStuks = het getal 0
// let waardeInCent = het getal 0
// for … of: een lus over regels
// console.log(…) toont: `Stuks in voorraad: ${aantalStuks}`
// console.log(…) toont: `Waarde: ${(waardeInCent / 100).toFixed(2)} euro`
//
// In de cursus heet dit bestand domein/src/voorraad.js.
// Zet het bestand als src/voorraad.js in groenhuis/domein, open daar een terminal en typ:
//     node src/voorraad.js

const regels = [
  "Monstera deliciosa;3;2499",
  "Sansevieria;12;1450",
  "Terracotta pot 20 cm;40;895",
];

let aantalStuks = 0;
let waardeInCent = 0;

for (const regel of regels) {
  const [naam, aantal, prijs] = regel.split(";");
  aantalStuks = aantalStuks + aantal;
  waardeInCent = waardeInCent + aantal * prijs;
}

console.log(`Stuks in voorraad: ${aantalStuks}`);
console.log(`Waarde: ${(waardeInCent / 100).toFixed(2)} euro`);

// Uitvoer van `node src/voorraad.js`:
// Stuks in voorraad: 031240
// Waarde: 606.97 euro
