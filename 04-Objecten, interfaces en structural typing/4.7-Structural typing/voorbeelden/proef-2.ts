// 4.7 Structural typing — voorbeeld uit Het Groenhuis, deel I
//
// Dat heeft gevolgen die je moet kennen. Twee types met dezelfde vorm zijn uitwisselbaar, ook als
// ze iets totaal anders betekenen.
//
// Opbouw van dit bestand:
// interface Product — de vorm van een object met 2 leden:
//     id: string
//     prijsInCent: number
// interface Verzendoptie — de vorm van een object met 2 leden:
//     id: string
//     prijsInCent: number
// function voegToeAanMandje(product: Product): void
// const express: Verzendoptie = een object met de velden id, prijsInCent: { id: "express",
//     prijsInCent: 300 }
// roept voegToeAanMandje(…) aan: voegToeAanMandje(express)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

interface Product {
  id: string;
  prijsInCent: number;
}

interface Verzendoptie {
  id: string;
  prijsInCent: number;
}

function voegToeAanMandje(product: Product): void {
  console.log(`Product ${product.id} toegevoegd`);
}

const express: Verzendoptie = { id: "express", prijsInCent: 300 };
voegToeAanMandje(express);

// Uitvoer van `node src/proef.ts`:
// Product express toegevoegd
