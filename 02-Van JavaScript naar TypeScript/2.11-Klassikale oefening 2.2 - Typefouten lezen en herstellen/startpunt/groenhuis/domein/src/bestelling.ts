// 2.11 Klassikale oefening 2.2 — Typefouten lezen en herstellen
//
// De situatie. Een collega schreef src/bestelling.ts, maar npm run check slaagt niet meer. Typ het
// bestand over, met de fouten erin:
//
// domein/src/bestelling.ts:
//     import { alsEuro, BTW_PLANTEN, metBtw } from "./prijs.ts";
//
//     const prijsPerStuk = "1450";
//     const aantal = 3;
//
//     function subtotaal(prijs: number, stuks: number): number {
//       const totaal = prijs * stuks;
//     }
//
//     const totaal = subtotaal(prijsPerStuk, aantal);
//     console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`);
//     console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`);
//
// Wat je doet.
//
// 1. Voer npm run check uit. Hoeveel fouten zijn er?
// 2. Zeg voor elke fout in je eigen woorden wat er misgaat. Gebruik het nummer en de zin.
// 3. Herstel ze één voor één, en voer na elke herstelling opnieuw npm run check uit.
// 4. Voer het bestand uit met node src/bestelling.ts.

