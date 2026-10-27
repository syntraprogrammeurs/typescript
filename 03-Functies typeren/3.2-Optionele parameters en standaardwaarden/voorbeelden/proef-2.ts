// 3.2 Optionele parameters en standaardwaarden — voorbeeld uit Het Groenhuis, deel I
//
// Een parameter die er niet hoeft te zijn, zónder standaardwaarde, krijgt een vraagteken.
//
// Opbouw van dit bestand:
// function begroeting(naam?: string): string
// console.log(…) toont: begroeting()
// console.log(…) toont: begroeting("Sam")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function begroeting(naam?: string): string {
  if (naam === undefined) {
    return "Welkom bij Het Groenhuis";
  }
  return `Welkom terug, ${naam}`;
}

console.log(begroeting());
console.log(begroeting("Sam"));

// Uitvoer van `node src/proef.ts`:
// Welkom bij Het Groenhuis
// Welkom terug, Sam
