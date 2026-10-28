// 8.2 Je eerste klasse — voorbeeld uit Het Groenhuis, deel I
//
// Een klasse is een bouwtekening: ze beschrijft welke gegevens (velden) en welk gedrag (methodes)
// iets van dat soort heeft. Een object of instantie is één exemplaar, gemaakt met new.
//
// Opbouw van dit bestand:
// class Pot — met 5 leden:
//     materiaal: string
//     diameterInCm: number
//     constructor(materiaal: string, diameterInCm: number)
//     omschrijving(): string
//     pastRond(potmaatInCm: number): boolean
// const terracotta = een nieuw object: new Pot("terracotta", 20)
// const keramiek = een nieuw object: new Pot("keramieken", 14)
// console.log(…) toont: terracotta.omschrijving()
// console.log(…) toont: keramiek.omschrijving(), keramiek.pastRond(17)
// console.log(…) toont: terracotta instanceof Pot
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

class Pot {
  materiaal: string;
  diameterInCm: number;

  constructor(materiaal: string, diameterInCm: number) {
    this.materiaal = materiaal;
    this.diameterInCm = diameterInCm;
  }

  omschrijving(): string {
    return `${this.materiaal} pot van ${this.diameterInCm} cm`;
  }

  pastRond(potmaatInCm: number): boolean {
    return this.diameterInCm >= potmaatInCm + 2;
  }
}

const terracotta = new Pot("terracotta", 20);
const keramiek = new Pot("keramieken", 14);

console.log(terracotta.omschrijving());
console.log(keramiek.omschrijving(), keramiek.pastRond(17));
console.log(terracotta instanceof Pot);

// Uitvoer van `node src/proef.ts`:
// terracotta pot van 20 cm
// keramieken pot van 14 cm false
// true
