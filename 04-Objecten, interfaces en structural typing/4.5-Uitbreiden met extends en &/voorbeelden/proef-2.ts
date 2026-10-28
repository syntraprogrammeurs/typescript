// 4.5 Uitbreiden met extends en & — voorbeeld uit Het Groenhuis, deel I
//
// Met type doe je hetzelfde met een intersectie, het teken &.
//
// Opbouw van dit bestand:
// type Inhoud = een objecttype met de velden id, slug
// type Categorie = een intersectie (alles van): Inhoud & { naam: string }
// const kamerplanten: Categorie = een object met de velden id, slug, naam: { id: "c1", slug:
//     "kamerplanten", naam: "Kamerplanten" }
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit

type Inhoud = { readonly id: string; slug: string };
type Categorie = Inhoud & { naam: string };

const kamerplanten: Categorie = { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" };

// `npx tsc --noEmit` meldt niets: de types kloppen. Dit bestand voert niets uit.
