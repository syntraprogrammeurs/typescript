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

