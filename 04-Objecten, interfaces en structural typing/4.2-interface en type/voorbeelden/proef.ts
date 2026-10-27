// 4.2 interface en type — voorbeeld uit Het Groenhuis, deel I
//
// Dezelfde vorm op drie plaatsen schrijven is vragen om fouten. Je geeft ze een naam, op een van
// twee manieren.
//
// Opbouw van dit bestand:
// interface ProductA — de vorm van een object met 2 leden:
//     naam: string
//     prijsInCent: number
// type ProductB = een objecttype met de velden naam, prijsInCent
// const a: ProductA = een object met de velden naam, prijsInCent: { naam: "Aloe vera",
//     prijsInCent: 799 }
// const b: ProductB = a
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit

interface ProductA {
  naam: string;
  prijsInCent: number;
}

type ProductB = {
  naam: string;
  prijsInCent: number;
};

const a: ProductA = { naam: "Aloe vera", prijsInCent: 799 };
const b: ProductB = a;

// `npx tsc --noEmit` meldt niets: de types kloppen. Dit bestand voert niets uit.
