// 4.7 Structural typing — voorbeeld uit Het Groenhuis, deel I
//
// Dit is de belangrijkste paragraaf van het hoofdstuk.
//
// Opbouw van dit bestand:
// interface Prijsetiket — de vorm van een object met 2 leden:
//     naam: string
//     prijsInCent: number
// function etiket(item: Prijsetiket): string
// const verzending = een object met de velden naam, prijsInCent, levertermijn: { naam: "Express-
//     levering", prijsInCent: 300, levertermijn: "morgen" }
// console.log(…) toont: etiket(verzending)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

function etiket(item: Prijsetiket): string {
  return `${item.naam}: ${item.prijsInCent} cent`;
}

const verzending = { naam: "Express-levering", prijsInCent: 300, levertermijn: "morgen" };

console.log(etiket(verzending));

// Uitvoer van `node src/proef.ts`:
// Express-levering: 300 cent
