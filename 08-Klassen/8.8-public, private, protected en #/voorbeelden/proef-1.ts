// 8.8 public, private, protected en # — voorbeeld uit Het Groenhuis, deel I
//
// TypeScript kent naast de # ook drie woorden om te zeggen wie iets mag zien.
//
// Opbouw van dit bestand:
// class Kassa — met 2 leden:
//     private geheim = 1234
//     #echtGeheim = 5678
// const kassa = een nieuw object: new Kassa()
// console.log(…) toont: kassa["geheim"]
// console.log(…) toont: JSON.stringify(kassa)
// console.log(…) toont: Object.keys(kassa)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
//     node src/proef.ts

class Kassa {
  private geheim = 1234;
  #echtGeheim = 5678;
}

const kassa = new Kassa();
console.log(kassa["geheim"]);
console.log(JSON.stringify(kassa));
console.log(Object.keys(kassa));

// Uitvoer van `node src/proef.ts`:
// 1234
// {"geheim":1234}
// [ 'geheim' ]
