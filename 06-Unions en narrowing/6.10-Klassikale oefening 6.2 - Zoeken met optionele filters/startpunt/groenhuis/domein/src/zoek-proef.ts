// 6.10 Klassikale oefening 6.2 — Zoeken met optionele filters
//
// De situatie. In het beheer komt een zoekvak, met daarnaast een paar filters: een status, een
// maximale prijs, en een vinkje alleen op voorraad. Elke filter mag leeg blijven.
//
// Wat je maakt.
//
// 1. In zoeken.ts een interface Zoekfilter met vier optionele velden: tekst, status,
//    maxPrijsInCent en alleenOpVoorraad.
// 2. Een functie zoek(producten, filter) die alleen de ingevulde filters toepast. De tekst zoekt
//    in de naam en in de tags, zonder rekening te houden met hoofdletters of spaties ervoor en
//    erna.
// 3. Een bestand src/zoek-proef.ts dat zeven zoekvragen uitprobeert, waaronder een lege filter,
//    een lege tekst en een maximale prijs van 0.
// 4. Gebruik ?. en ?? waar ze passen.

