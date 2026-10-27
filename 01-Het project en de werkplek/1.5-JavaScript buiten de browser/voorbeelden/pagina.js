// 1.5 JavaScript buiten de browser — voorbeeld uit Het Groenhuis, deel I
//
// Probeer maar eens de pagina aan te spreken, zoals je in de browser zou doen.
//
// Opbouw van dit bestand:
// const titel = het resultaat van document.querySelector("h1")
// console.log(…) toont: titel
//
// In de cursus heet dit bestand pagina.js.
// Zet het bestand als pagina.js in groenhuis, open daar een terminal en typ:
//     node pagina.js
// Let op: dit programma stopt met een fout. Dat is de bedoeling; de melding staat onderaan.

const titel = document.querySelector("h1");
console.log(titel);

// Uitvoer van `node pagina.js`:
// file:///C:/cursus/proef/pagina.js:1
// const titel = document.querySelector("h1");
//               ^
//
// ReferenceError: document is not defined
//     at file:///C:/cursus/proef/pagina.js:1:15
//     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
//     at async node:internal/modules/esm/loader:647:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
//
// Node.js v24.22.1
