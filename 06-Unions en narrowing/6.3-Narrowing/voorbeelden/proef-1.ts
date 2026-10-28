// 6.3 Narrowing — voorbeeld uit Het Groenhuis, deel I
//
// Binnen de if weet TypeScript dat waarde een string is. Na de if weet het dat het een number is:
// de string is er al met een return uit. Ga met de muis over waarde op beide plaatsen.
//
// Opbouw van dit bestand:
// function naarCent(waarde: number | string): number
// console.log(…) toont: naarCent("24,99"), naarCent(8.95)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function naarCent(waarde: number | string): number {
  if (typeof waarde === "string") {
    return Math.round(Number(waarde.replace(",", ".")) * 100);
  }
  return Math.round(waarde * 100);
}

console.log(naarCent("24,99"), naarCent(8.95));

// Uitvoer van `node src/proef.ts`:
// 2499 895
