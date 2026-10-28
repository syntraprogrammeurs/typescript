// 5.8 readonly-lijsten — voorbeeld uit Het Groenhuis, deel I
//
// Dat sort de lijst zelf wijzigt, is precies de soort fout die je wilt laten tegenhouden. Een
// readonly-lijst kun je lezen, maar niet wijzigen.
//
// Opbouw van dit bestand:
// const tags: readonly string[] = een lijst van 2 elementen: ["makkelijk", "groot"]
// roept tags.push(…) aan: tags.push("buiten")
// roept tags.sort(…) aan: tags.sort()
// tags[0] krijgt de waarde de tekst "eenvoudig"
// const gesorteerd = het resultaat van tags.toSorted()
// console.log(…) toont: gesorteerd, tags.length, tags.includes("groot")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

const tags: readonly string[] = ["makkelijk", "groot"];

tags.push("buiten");
tags.sort();
tags[0] = "eenvoudig";

const gesorteerd = tags.toSorted();
console.log(gesorteerd, tags.length, tags.includes("groot"));

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:3:6 - error TS2339: Property 'push' does not exist on type 'readonly string[]'.
//
// 3 tags.push("buiten");
//        ~~~~
//
// src/proef.ts:4:6 - error TS2339: Property 'sort' does not exist on type 'readonly string[]'.
//
// 4 tags.sort();
//        ~~~~
//
// src/proef.ts:5:1 - error TS2542: Index signature in type 'readonly string[]' only permits reading.
//
// 5 tags[0] = "eenvoudig";
//   ~~~~~~~
//
//
// Found 3 errors in the same file, starting at: src/proef.ts:3
