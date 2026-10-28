// 7.9 Klassikale oefening 7.1 — Klanten uit een bestand nakijken
//
// De situatie. Het Groenhuis neemt de klanten over uit een oud systeem. De export is een JSON-
// bestand, en niet alles erin is netjes: een telefoonnummer als getal, een huisnummer als getal,
// en een factuuradres dat null is in plaats van te ontbreken.
//
// Wat je maakt.
//
// 1. De export staat in data/klanten.json, in het startpunt van deze oefening in de map lessen.
//    Kopieer het bestand naar je project en kijk er eerst zelf naar: wat klopt er niet met de
//    interface Klant uit hoofdstuk 4?
// 2. Een bestand src/klantcontrole.ts met foutenInAdres, foutenInKlant en een type predicate
//    isKlant.
// 3. Toon de klanten die in orde zijn, en voor elke andere klant wat er niet klopt.
// 4. Importeer Klant uit klant.ts. Waarom moet dat met import type, en wat zou er gebeuren zonder?

