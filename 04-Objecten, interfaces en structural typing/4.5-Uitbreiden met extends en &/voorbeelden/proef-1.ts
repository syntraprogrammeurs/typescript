// 4.5 Uitbreiden met extends en & — voorbeeld uit Het Groenhuis, deel I
//
// Een product, een categorie en een pagina hebben iets gemeen: een id en een slug. Dat schrijf je
// één keer, en de andere vormen breiden het uit.
//
// Opbouw van dit bestand:
// interface Inhoud — de vorm van een object met 2 leden:
//     readonly id: string
//     slug: string
// interface Categorie extends Inhoud — de vorm van een object met 1 lid:
//     naam: string
// const kamerplanten: Categorie = een object met de velden id, slug, naam: { id: "c1", slug:
//     "kamerplanten", naam: "Kamerplanten" }
// const zonderSlug: Categorie = een object met de velden id, naam: { id: "c2", naam:
//     "Buitenplanten" }
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Inhoud {
  readonly id: string;
  slug: string;
}

interface Categorie extends Inhoud {
  naam: string;
}

const kamerplanten: Categorie = { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" };
const zonderSlug: Categorie = { id: "c2", naam: "Buitenplanten" };

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:11:7 - error TS2741: Property 'slug' is missing in type '{ id: string; naam: string; }' but required in type 'Categorie'.
//
// 11 const zonderSlug: Categorie = { id: "c2", naam: "Buitenplanten" };
//          ~~~~~~~~~~
//
//   src/proef.ts:3:3 - 'slug' is declared here.
//     3   slug: string;
//         ~~~~
//
//
// Found 1 error in src/proef.ts:11
