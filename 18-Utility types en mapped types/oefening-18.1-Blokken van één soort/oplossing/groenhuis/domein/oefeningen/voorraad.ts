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
