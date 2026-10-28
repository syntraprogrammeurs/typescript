// 5.1 Het type van een lijst — voorbeeld uit Het Groenhuis, deel I
//
// Een lijst van teksten schrijf je als string[]. Er is een tweede schrijfwijze die hetzelfde
// betekent: Array<string>.
//
// Opbouw van dit bestand:
// const tags: string[] = een lijst van 2 elementen: ["makkelijk", "groot"]
// const prijzen: Array<number> = een lijst van 2 elementen: [2499, 1450]
// const gemengd = een lijst van 2 elementen: ["Aloe vera", 799]
// roept tags.push(…) aan: tags.push("buiten")
// roept tags.push(…) aan: tags.push(12)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const tags: string[] = ["makkelijk", "groot"];
const prijzen: Array<number> = [2499, 1450];
const gemengd = ["Aloe vera", 799];

tags.push("buiten");
tags.push(12);

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:6:11 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
//
// 6 tags.push(12);
//             ~~
//
//
// Found 1 error in src/proef.ts:6
