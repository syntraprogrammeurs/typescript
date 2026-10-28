# 4.10 Klassikale oefening 4.2 — Eén etiket voor alles met een naam en een prijs

**De situatie.** De winkel drukt prijsetiketten. Niet alleen voor producten: ook voor de
verzendopties en de cadeaubonnen aan de kassa.

**Wat je maakt.** Een bestand `src/etiket.ts` met:

1. Een interface `Prijsetiket` met alleen wat een etiket nodig heeft.
2. Een functie `etiket(item)` die `[ Naam — € 12,34 ]` teruggeeft.
3. Etiketten voor: de uitverkochte producten uit de catalogus (die komen op de lijst
   *binnenkort terug*), een express-levering die ook een levertermijn heeft, en een
   cadeaubon.
4. Probeer daarna `etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" })`
   rechtstreeks. Wat zegt TypeScript, en waarom wel hier en niet bij de variabele?

### Uitwerking van oefening 4.2

```ts domein/src/etiket.ts
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
```

```text
[ Calathea orbifolia — € 22,95 ]
[ Snoeischaar — € 24,50 ]
[ Express-levering — € 3,00 ]
[ Cadeaubon — € 25,00 ]
```

**De interface vraagt alleen wat de functie gebruikt.** `etiket` heeft een naam en een
prijs nodig, niets meer. Had je `item: Product` geschreven, dan kon je er geen
verzendoptie of bon aan geven. Dit is de belangrijkste les van structural typing:
**beschrijf wat je nodig hebt, niet wat je toevallig hebt**.

**Een `Product` past zonder dat het iets van `Prijsetiket` weet.** `inhoud.ts` importeert
`Prijsetiket` niet, en `Product` zegt nergens dat het een etiket kan zijn. Het heeft
gewoon een `naam` en een `prijsInCent`.

**De rechtstreekse aanroep met `levertermijn`** geeft `TS2353: Object literal may only
specify known properties`. Het object staat rechtstreeks tussen de haakjes, dus kijkt
TypeScript na of er een tikfout in zit. Via de variabele `express` is het geen object
literal meer, en zijn extra velden toegestaan.

**De prijs op het etiket is zonder btw.** Voor de producten klopt dat niet met wat de
klant betaalt. Wie het etiket goed wil maken, geeft niet het product mee maar een
object met de prijs inclusief btw. Daarvoor heb je `map` nodig, uit het volgende
hoofdstuk.

---
