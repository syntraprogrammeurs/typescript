import {
  combineer,
  maximaal,
  pasToe,
  procentKorting,
  vanafBedrag,
  vasteKorting,
} from "./korting.ts";
import { alsEuro, BTW_PLANTEN, metBtw, som } from "./prijs.ts";
import { verzendkosten } from "./verzending.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

const monstera = metBtw(2499, BTW_PLANTEN);
// Berekening: 2499 * 1.09 = 2723.91 -> Math.round -> Waarde: 2724 (€27,24)

const sansevieria = metBtw(1450, BTW_PLANTEN);
// Berekening: 1450 * 1.09 = 1580.50 -> Math.round -> Waarde: 1581 (€15,81)

const pot = 895;
// Geen BTW-functie aangeroepen -> Waarde: 895 (€8,95)

const totaal = som(monstera, sansevieria, pot);
// Berekening: 2724 + 1581 + 895 -> Waarde: 5200 (€52,00)

console.log(
  `Mandje: ${alsEuro(monstera)} + ${alsEuro(sansevieria)} + ${alsEuro(pot)} = ${alsEuro(totaal)}`,
);
// Uitvoer: Mandje: € 27,24 + € 15,81 + € 8,95 = € 52,00

console.log(`Verzending: ${alsEuro(verzendkosten(totaal, false))}`);
// Input: 5200. Uitvoer (bijvoorbeeld bij gratis verzending vanaf €50): Verzending: € 0,00

const lenteactie = vanafBedrag(5000, procentKorting(10));
// Initialisatie: drempel is 5000, actie is 10% korting

const cadeaubon = vasteKorting(1000);
// Initialisatie: vaste aftrek van 1000 cent

console.log(`Met de lenteactie: ${alsEuro(pasToe(totaal, lenteactie))}`);
// Berekening: pasToe(5200, lenteactie)
// -> 5200 >= 5000 is true -> 5200 * 0.90 = 4680
// Uitvoer: Met de lenteactie: € 46,80

console.log(
  `Met de lenteactie en een bon van 10 euro: ${alsEuro(pasToe(totaal, lenteactie, cadeaubon))}`,
);
// Berekening: pasToe(5200, lenteactie, cadeaubon)
// -> Stap 1 (lenteactie): 5200 wordt 4680
// -> Stap 2 (cadeaubon) : 4680 - 1000 = 3680
// Uitvoer: Met de lenteactie en een bon van 10 euro: € 36,80

console.log(
  `Eerst de bon, dan de actie: ${alsEuro(pasToe(totaal, cadeaubon, lenteactie))}`,
);
// Berekening: pasToe(5200, cadeaubon, lenteactie)
// -> Stap 1 (cadeaubon) : 5200 - 1000 = 4200
// -> Stap 2 (lenteactie): 4200 >= 5000 is FALSE -> blijft 4200!
// Uitvoer: Eerst de bon, dan de actie: € 42,00

// Oefening 3.1: Black Friday
const blackFriday = maximaal(1500, procentKorting(25));
// Initialisatie: 25% korting, gecapped op maximaal 1500 cent aftrek

const kassa = combineer(blackFriday, cadeaubon);
// Initialisatie: achtereenvolgens blackFriday en daarna cadeaubon toepassen

for (const bedrag of [4000, 8000, totaal]) {
  // Deze lus draait exact 3 keer met de waarden: 4000, 8000 en 5200.

  // --- RONDE 1: bedrag = 4000 (€40,00) ---
  // blackFriday(4000) -> 25% korting is 1000. Dit is < 1500 max korting -> Resultaat: 3000
  // kassa(4000)       -> blackFriday(4000) is 3000 -> cadeaubon(3000) is 3000 - 1000 -> Resultaat: 2000

  // --- RONDE 2: bedrag = 8000 (€80,00) ---
  // blackFriday(8000) -> 25% korting is 2000. Dit is > 1500 max, dus gecapped op 1500 -> 8000 - 1500 -> Resultaat: 6500
  // kassa(8000)       -> blackFriday(8000) is 6500 -> cadeaubon(6500) is 6500 - 1000 -> Resultaat: 5500

  // --- RONDE 3: bedrag = 5200 (€52,00) ---
  // blackFriday(5200) -> 25% korting is 1300. Dit is < 1500 max korting -> 5200 - 1300 -> Resultaat: 3900
  // kassa(5200)       -> blackFriday(5200) is 3900 -> cadeaubon(3900) is 3900 - 1000 -> Resultaat: 2900

  console.log(blackFriday(bedrag));
  // Print puur het kale nummer in centen in de console (Ronde 1: 3000, Ronde 2: 6500, Ronde 3: 3900)

  console.log(
    `Black Friday op ${alsEuro(bedrag)}: ${alsEuro(blackFriday(bedrag))}, met bon: ${alsEuro(kassa(bedrag))}`,
  );
  // Print de volledige zin per ronde:
  // Ronde 1: Black Friday op € 40,00: € 30,00, met bon: € 20,00
  // Ronde 2: Black Friday op € 80,00: € 65,00, met bon: € 55,00
  // Ronde 3: Black Friday op € 52,00: € 39,00, met bon: € 29,00
}
