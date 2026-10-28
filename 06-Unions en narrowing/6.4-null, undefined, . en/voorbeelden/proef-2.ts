// 6.4 null, undefined, ?. en ?? — voorbeeld uit Het Groenhuis, deel I
//
// ?? (nullish coalescing) geeft een vervangwaarde als links undefined of null staat, en alleen
// dan.
//
// Opbouw van dit bestand:
// const voorraden: (number | undefined)[] = een lijst van 3 elementen: [12, 0, undefined]
// for … of: een lus over voorraden
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

const voorraden: (number | undefined)[] = [12, 0, undefined];

for (const voorraad of voorraden) {
  console.log(`met ??: ${voorraad ?? "onbekend"}   met ||: ${voorraad || "onbekend"}`);
}

// Uitvoer van `node src/proef.ts`:
// met ??: 12   met ||: 12
// met ??: 0   met ||: onbekend
// met ??: onbekend   met ||: onbekend
