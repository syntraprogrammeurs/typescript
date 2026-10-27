// 1.15 Klassikale oefening 1.2 — Een fout opsporen met de debugger
//
// De situatie. Een collega schreef een script dat telt hoeveel stuks er in voorraad zijn, en wat
// ze samen waard zijn. De voorraad staat als tekstregels, zoals ze uit een export van het
// kassasysteem komen: naam, aantal en prijs in cent, gescheiden door een puntkomma. Het script
// geeft een vreemd resultaat.
//
// domein/src/voorraad.js:
//     const regels = [
//       "Monstera deliciosa;3;2499",
//       "Sansevieria;12;1450",
//       "Terracotta pot 20 cm;40;895",
//     ];
//
//     let aantalStuks = 0;
//     let waardeInCent = 0;
//
//     for (const regel of regels) {
//       const [naam, aantal, prijs] = regel.split(";");
//       aantalStuks = aantalStuks + aantal;
//       waardeInCent = waardeInCent + aantal * prijs;
//     }
//
//     console.log(`Stuks in voorraad: ${aantalStuks}`);
//     console.log(`Waarde: ${(waardeInCent / 100).toFixed(2)} euro`);
//
//     Stuks in voorraad: 031240
//     Waarde: 606.97 euro
//
// Wat je doet.
//
// 1. Typ het script over in domein/src/voorraad.js en voer het uit met node src/voorraad.js.
// 2. De waarde klopt, het aantal stuks niet: 3 + 12 + 40 is 55. Zet een breakpoint op de regel met
//    aantalStuks = aantalStuks + aantal.
// 3. Start het script in een JavaScript Debug Terminal. Noteer bij elke ronde de waarde van aantal
//    en van aantalStuks. Let op de aanhalingstekens in het venster Variables.
// 4. Leg in één zin uit wat er misgaat, en waarom de waarde wél klopt.
// 5. Herstel het script.
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
