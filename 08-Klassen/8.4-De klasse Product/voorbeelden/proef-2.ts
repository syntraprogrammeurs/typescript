// 8.4 De klasse Product — voorbeeld uit Het Groenhuis, deel I
//
// Waarom niet gewoon this.beschrijving = gegevens.beschrijving? Door exactOptionalPropertyTypes
// uit hoofdstuk 4. gegevens.beschrijving kan undefined zijn, en undefined toekennen aan een veld
// met een ? mag niet: het veld moet dan ontbreken.
//
// Opbouw van dit bestand:
// interface Gegevens — de vorm van een object met 1 lid:
//     beschrijving?: string
// class Plant — met 2 leden:
//     beschrijving?: string
//     constructor(gegevens: Gegevens)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Gegevens {
  beschrijving?: string;
}

class Plant {
  beschrijving?: string;

  constructor(gegevens: Gegevens) {
    this.beschrijving = gegevens.beschrijving;
  }
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:9:5 - error TS2412: Type 'string | undefined' is not assignable to type 'string' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.
//   Type 'undefined' is not assignable to type 'string'.
//
// 9     this.beschrijving = gegevens.beschrijving;
//       ~~~~~~~~~~~~~~~~~
//
//
// Found 1 error in src/proef.ts:9
