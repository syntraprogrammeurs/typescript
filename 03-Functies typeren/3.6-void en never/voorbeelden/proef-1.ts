// 3.6 void en never — voorbeeld uit Het Groenhuis, deel I
//
// Een functie die niets teruggeeft, heeft als returntype void.
//
// Opbouw van dit bestand:
// function toonRegel(naam: string, prijsInCent: number): void
// roept toonRegel(…) aan: toonRegel("Monstera deliciosa", 2649)
// roept toonRegel(…) aan: toonRegel("Terracotta pot 20 cm", 895)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function toonRegel(naam: string, prijsInCent: number): void {
  console.log(`${naam.padEnd(22)}${(prijsInCent / 100).toFixed(2).padStart(8)}`);
}

toonRegel("Monstera deliciosa", 2649);
toonRegel("Terracotta pot 20 cm", 895);

// Uitvoer van `node src/proef.ts`:
// Monstera deliciosa       26.49
// Terracotta pot 20 cm      8.95
