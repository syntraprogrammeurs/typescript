// 6.7 Niets vergeten met never — voorbeeld uit Het Groenhuis, deel I
//
// Volgende maand wil de redactie een nieuw soort blok: een citaat van een klant. Je voegt het toe
// aan de union. Maar blokAlsTekst weet er niets van. Wat gebeurt er?
//
// Opbouw van dit bestand:
// interface Tekstblok — de vorm van een object met 2 leden:
//     soort: "tekst"
//     tekst: string
// interface Citaatblok — de vorm van een object met 3 leden:
//     soort: "citaat"
//     tekst: string
//     auteur: string
// type Blok = een union, de waarde is een van: Tekstblok | Citaatblok
// function blokAlsTekst(blok: Blok): string
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Tekstblok {
  soort: "tekst";
  tekst: string;
}

interface Citaatblok {
  soort: "citaat";
  tekst: string;
  auteur: string;
}

type Blok = Tekstblok | Citaatblok;

function blokAlsTekst(blok: Blok): string {
  switch (blok.soort) {
    case "tekst":
      return blok.tekst;
  }
}

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:14:36 - error TS2366: Function lacks ending return statement and return type does not include 'undefined'.
//
// 14 function blokAlsTekst(blok: Blok): string {
//                                       ~~~~~~
//
//
// Found 1 error in src/proef.ts:14
