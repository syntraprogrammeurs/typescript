// 6.3 Narrowing — voorbeeld uit Het Groenhuis, deel I
//
// Binnen de if weet TypeScript dat waarde een string is. Na de if weet het dat het een number is:
// de string is er al met een return uit. Ga met de muis over waarde op beide plaatsen.
//
// Opbouw van dit bestand:
// function toonVoorraad(voorraad?: number): string
// console.log(…) toont: toonVoorraad(12)
// console.log(…) toont: toonVoorraad(0)
// console.log(…) toont: toonVoorraad()
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function toonVoorraad(voorraad?: number): string {
  if (voorraad) {
    return `${voorraad} stuks`;
  }
  return "onbekend";
}

console.log(toonVoorraad(12));
console.log(toonVoorraad(0));
console.log(toonVoorraad());

// Uitvoer van `node src/proef.ts`:
// 12 stuks
// onbekend
// onbekend
