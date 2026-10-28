// 8.8 public, private, protected en # — voorbeeld uit Het Groenhuis, deel I
//
// In code op internet zie je vaak dit.
//
// Opbouw van dit bestand:
// class Categorie — met 1 lid:
//     constructor(readonly id: string, public naam: string)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

class Categorie {
  constructor(
    readonly id: string,
    public naam: string,
  ) {}
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:5 - error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
//
// 3     readonly id: string,
//       ~~~~~~~~~~~~~~~~~~~
//
// src/proef.ts:4:5 - error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
//
// 4     public naam: string,
//       ~~~~~~~~~~~~~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:3
