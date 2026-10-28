// 4.7 Structural typing — voorbeeld uit Het Groenhuis, deel I
//
// Er is één uitzondering. Schrijf je het object rechtstreeks op de plaats waar het gebruikt wordt,
// dan zijn extra velden wél een fout.
//
// Opbouw van dit bestand:
// interface Prijsetiket — de vorm van een object met 2 leden:
//     naam: string
//     prijsInCent: number
// function etiket(item: Prijsetiket): string
// roept etiket(…) aan: etiket({ naam: "Aloe vera", prijsInCnet: 799 })
// roept etiket(…) aan: etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" })
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     npx tsc --noEmit
// Let op: dit voorbeeld bevat opzettelijk een typefout. De melding van tsc staat onderaan.

interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

function etiket(item: Prijsetiket): string {
  return `${item.naam}: ${item.prijsInCent} cent`;
}

etiket({ naam: "Aloe vera", prijsInCnet: 799 });
etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" });

// Uitvoer van `npx tsc --noEmit`:
// src/proef.ts:10:29 - error TS2561: Object literal may only specify known properties, but 'prijsInCnet' does not exist in type 'Prijsetiket'. Did you mean to write 'prijsInCent'?
//
// 10 etiket({ naam: "Aloe vera", prijsInCnet: 799 });
//                                ~~~~~~~~~~~
//
// src/proef.ts:11:45 - error TS2353: Object literal may only specify known properties, and 'levertermijn' does not exist in type 'Prijsetiket'.
//
// 11 etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" });
//                                                ~~~~~~~~~~~~
//
//
// Found 2 errors in the same file, starting at: src/proef.ts:10
