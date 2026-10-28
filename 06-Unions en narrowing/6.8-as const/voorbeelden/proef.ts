// 6.8 as const — voorbeeld uit Het Groenhuis, deel I
//
// Soms heb je de toegelaten waarden nodig als lijst, bijvoorbeeld om een keuzemenu te vullen of om
// invoer te controleren. Een gewone lijst verliest de literal types.
//
// Opbouw van dit bestand:
// const gewoon = een lijst van 3 elementen: ["concept", "gepubliceerd", "gearchiveerd"]
// const vast = een lijst van 3 elementen: ["concept", "gepubliceerd", "gearchiveerd"] (as const)
// console.log(…) toont: vast.includes("concept")
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

const gewoon = ["concept", "gepubliceerd", "gearchiveerd"];
const vast = ["concept", "gepubliceerd", "gearchiveerd"] as const;

console.log(vast.includes("concept"));

// Uitvoer van `node src/proef.ts`:
// true
