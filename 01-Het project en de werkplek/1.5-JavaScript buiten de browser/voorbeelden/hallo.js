// 1.5 JavaScript buiten de browser — voorbeeld uit Het Groenhuis, deel I
//
// Node uitproberen gaat het snelst met een los bestand. Maak een map C:\cursus\proef, open ze in
// VS Code en maak daarin een bestand hallo.js.
//
// Opbouw van dit bestand:
// console.log(…) toont: "Hallo vanuit Node"
// console.log(…) toont: typeof window
// console.log(…) toont: typeof process
// console.log(…) toont: process.version
//
// In de cursus heet dit bestand hallo.js.
// Zet het bestand als hallo.js in groenhuis, open daar een terminal en typ:
//     node hallo.js

console.log("Hallo vanuit Node");
console.log(typeof window);
console.log(typeof process);
console.log(process.version);

// Uitvoer van `node hallo.js`:
// Hallo vanuit Node
// undefined
// object
// v24.22.1
