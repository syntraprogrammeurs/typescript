// 4.10 Klassikale oefening 4.2 — Eén etiket voor alles met een naam en een prijs
//
// De situatie. De winkel drukt prijsetiketten. Niet alleen voor producten: ook voor de
// verzendopties en de cadeaubonnen aan de kassa.
//
// Wat je maakt. Een bestand src/etiket.ts met:
//
// 1. Een interface Prijsetiket met alleen wat een etiket nodig heeft.
// 2. Een functie etiket(item) die [ Naam — € 12,34 ] teruggeeft.
// 3. Etiketten voor: de uitverkochte producten uit de catalogus (die komen op de lijst binnenkort
//    terug), een express-levering die ook een levertermijn heeft, en een cadeaubon.
// 4. Probeer daarna etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" })
//    rechtstreeks. Wat zegt TypeScript, en waarom wel hier en niet bij de variabele?
//
// Opbouw van dit bestand:
// import producten uit "./catalogus.ts"
// import alsEuro uit "./prijs.ts"
// export interface Prijsetiket — de vorm van een object met 2 leden:
//     naam: string
//     prijsInCent: number
// export function etiket(item: Prijsetiket): string
// const express = een object met de velden naam, prijsInCent, levertermijn: { naam: "Express-
//     levering", prijsInCent: 300, levertermijn: "morgen" }
// const cadeaubon: Prijsetiket = een object met de velden naam, prijsInCent: { naam: "Cadeaubon",
//     prijsInCent: 2500 }
// for … of: een lus over producten
// console.log(…) toont: etiket(express)
// console.log(…) toont: etiket(cadeaubon)

// Het Groenhuis — een etiket voor alles wat een naam en een prijs heeft
// Hoofdstuk 4, klassikale oefening 4.2

import { producten } from "./catalogus.ts";
import { alsEuro } from "./prijs.ts";

export interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

export function etiket(item: Prijsetiket): string {
  return `[ ${item.naam} — ${alsEuro(item.prijsInCent)} ]`;
}

const express = { naam: "Express-levering", prijsInCent: 300, levertermijn: "morgen" };
const cadeaubon: Prijsetiket = { naam: "Cadeaubon", prijsInCent: 2500 };

for (const product of producten) {
  if (product.voorraad === 0) {
    console.log(etiket(product));
  }
}
console.log(etiket(express));
console.log(etiket(cadeaubon));
