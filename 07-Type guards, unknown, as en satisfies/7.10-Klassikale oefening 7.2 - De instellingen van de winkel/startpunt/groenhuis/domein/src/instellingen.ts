// 7.10 Klassikale oefening 7.2 — De instellingen van de winkel
//
// De situatie. De grens voor gratis verzending, de verzendkosten en de toeslag voor express staan
// nu als constanten in verzending.ts. De eigenaar wil ze zelf kunnen wijzigen, in een bestand
// data/instellingen.json. Als dat bestand ontbreekt of fout is, mag de winkel niet stilvallen: dan
// gelden de standaardwaarden.
//
// Wat je maakt. Een bestand src/instellingen.ts met:
//
// 1. Een interface Instellingen met de drie bedragen.
// 2. Een constante STANDAARD met de huidige waarden. Gebruik satisfies.
// 3. Een assertion function controleerInstellingen: elk bedrag een geheel aantal cent, niet
//    negatief.
// 4. laadInstellingen(pad): leest en controleert het bestand. Gaat er iets mis, dan toont ze
//    waarom en geeft ze de standaardwaarden.
// 5. Probeer het met een goed bestand, een bestand met "verzendkost": "4,95", en een bestand dat
//    niet bestaat.

