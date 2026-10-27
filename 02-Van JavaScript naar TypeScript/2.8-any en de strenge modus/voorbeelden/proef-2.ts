// 2.8 any en de strenge modus — voorbeeld uit Het Groenhuis, deel I
//
// Je kunt any ook zelf schrijven.
//
// Opbouw van dit bestand:
// function verhoog(bedrag: any) (returntype leidt TypeScript zelf af)
// console.log(…) toont: verhoog("5")
// console.log(…) toont: verhoog(5)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

function verhoog(bedrag: any) {
  return bedrag + 1;
}

console.log(verhoog("5"));
console.log(verhoog(5));

// Uitvoer van `node src/proef.ts`:
// 51
// 6
