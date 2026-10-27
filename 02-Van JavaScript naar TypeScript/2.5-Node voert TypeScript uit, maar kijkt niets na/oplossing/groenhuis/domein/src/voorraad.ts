// 2.5 Node voert TypeScript uit, maar kijkt niets na — Het Groenhuis, deel I
//
// Je hebt nog twee JavaScript-bestanden: start.js en voorraad.js. Hernoem ze naar start.ts en
// voorraad.ts. Klik in VS Code met de rechtermuisknop op het bestand en kies Rename, of druk F2.
//
// Opbouw van dit bestand:
// const regels = een lijst van 3 elementen: [ "Monstera deliciosa;3;2499", "Sansevieria;12;1450",
//     "Terracotta pot 20 cm;40;895", ]
// let aantalStuks = het getal 0
// let waardeInCent = het getal 0
// for … of: een lus over regels
// console.log(…) toont: `Stuks in voorraad: ${aantalStuks}`
// console.log(…) toont: `Waarde: ${(waardeInCent / 100).toFixed(2)} euro`

// Het Groenhuis — hoeveel stuks staan er in voorraad, en wat zijn ze waard?
// Hoofdstuk 1, klassikale oefening 1.2 (de herstelde versie)

const regels = [
  "Monstera deliciosa;3;2499",
  "Sansevieria;12;1450",
  "Terracotta pot 20 cm;40;895",
];

let aantalStuks = 0;
let waardeInCent = 0;

for (const regel of regels) {
  const [naam, aantal, prijs] = regel.split(";");
  aantalStuks = aantalStuks + Number(aantal);
  waardeInCent = waardeInCent + Number(aantal) * Number(prijs);
}

console.log(`Stuks in voorraad: ${aantalStuks}`);
console.log(`Waarde: ${(waardeInCent / 100).toFixed(2)} euro`);
