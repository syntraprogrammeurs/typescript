// 7.3 Type predicates — voorbeeld uit Het Groenhuis, deel I
//
// waarde is OnbekendObject betekent: als deze functie true teruggeeft, dan is waarde een
// OnbekendObject. TypeScript gebruikt dat zoals een typeof in een if.
//
// Opbouw van dit bestand:
// import isObject, isTekstlijst uit "./controle.ts"
// const gegevens: unknown = het resultaat van JSON.parse('{ "naam": "Aloe vera", "tags":
//     ["makkelijk"] }')
// if (isObject(gegevens) && isTekstlijst(gegevens.tags)) …
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Het importeert uit het project zoals het is na 7.3 Type predicates (zie 07-Type guards, unknown, as en satisfies/7.3-Type predicates/oplossing).
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts

import { isObject, isTekstlijst } from "./controle.ts";

const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera", "tags": ["makkelijk"] }');

if (isObject(gegevens) && isTekstlijst(gegevens.tags)) {
  console.log(gegevens.tags.join(", "));
}

// Uitvoer van `node src/proef.ts`:
// makkelijk
