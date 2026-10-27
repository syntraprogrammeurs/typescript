// Het Groenhuis — de proef van geschiedenis.ts
// Hoofdstuk 12, klassikale oefening 12.2

import type { Blok } from "../src/inhoud/blokken.ts";
import { Geld } from "../src/waarden/geld.ts";
import { Geschiedenis } from "../src/hulp/geschiedenis.ts";

const prijs = new Geschiedenis(Geld.vanEuro("24,99"));
prijs.zet(Geld.vanEuro("22,99"));
prijs.zet(Geld.vanEuro("19,99"));
console.log(`Prijs: ${prijs.huidig}`);
console.log(`Ongedaan: ${prijs.ongedaanMaken()}, nog eens: ${prijs.ongedaanMaken()}, nog eens: ${prijs.ongedaanMaken()}`);
console.log(`Opnieuw: ${prijs.opnieuw()}, kan nog opnieuw: ${prijs.kanOpnieuw}`);
prijs.zet(Geld.vanEuro("21"));
console.log(`Na een nieuwe wijziging: ${prijs.huidig}, kan opnieuw: ${prijs.kanOpnieuw}`);

const blokken = new Geschiedenis<readonly Blok[]>([]);
blokken.zet([{ soort: "tekst", tekst: "Welkom" }]);
blokken.zet([...blokken.huidig, { soort: "knop", label: "Naar de winkel", link: "/" }]);
console.log(`${blokken.huidig.length} blokken, na ongedaan maken: ${blokken.ongedaanMaken().length}`);
