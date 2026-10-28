// 7.2 unknown — voorbeeld uit Het Groenhuis, deel I
//
// Een tekst nakijken gaat zo.
//
// Opbouw van dit bestand:
// const gegevens: unknown = het resultaat van JSON.parse('"Aloe vera"')
// if (typeof gegevens === "string") …
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

const gegevens: unknown = JSON.parse('"Aloe vera"');

if (typeof gegevens === "string") {
  console.log(gegevens.toUpperCase());
}

// Uitvoer van `node src/proef.ts`:
// ALOE VERA
