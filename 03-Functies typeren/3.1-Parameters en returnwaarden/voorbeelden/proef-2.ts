// 3.1 Parameters en returnwaarden — voorbeeld uit Het Groenhuis, deel I
//
// Waarom schrijf je het dan toch? Kijk wat er gebeurt als een functie op twee plaatsen iets
// teruggeeft, en je er één verkeerd doet.
//
// Opbouw van dit bestand:
// function verzendkosten(totaalInCent: number) (returntype leidt TypeScript zelf af)
// const kost = het resultaat van verzendkosten(2649)
// const totaal = de uitkomst van 2649 + kost
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

function verzendkosten(totaalInCent: number) {
  if (totaalInCent >= 5000) {
    return "gratis";
  }
  return 495;
}

const kost = verzendkosten(2649);
const totaal = 2649 + kost;

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:9:16 - error TS2365: Operator '+' cannot be applied to types 'number' and 'string | number'.
//
// 9 const totaal = 2649 + kost;
//                  ~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:9
