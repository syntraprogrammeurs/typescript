// 3.1 Parameters en returnwaarden — voorbeeld uit Het Groenhuis, deel I
//
// In hoofdstuk 2 schreef je types bij de parameters en bij de returnwaarde. Het returntype mag je
// weglaten: TypeScript leidt het af uit de return.
//
// Opbouw van dit bestand:
// function metBtw(prijsInCent: number, btwPercentage: number) (returntype leidt TypeScript zelf
//     af)
// const prijs = het resultaat van metBtw(2499, 6)
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit

function metBtw(prijsInCent: number, btwPercentage: number) {
  return Math.round(prijsInCent * (1 + btwPercentage / 100));
}

const prijs = metBtw(2499, 6);

// `npx tsc --noEmit` meldt niets: de types kloppen. Dit bestand voert niets uit.
