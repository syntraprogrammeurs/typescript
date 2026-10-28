# 5.12 Klassikale oefening 5.2 — De bestellijst voor de inkoper

**De situatie.** Elke maandag bestelt de inkoper bij. Ze wil een lijst van alle
producten met minder dan vijf stuks in voorraad, met de categorie erbij, en hoeveel ze
moet bijbestellen om weer op vijf te komen. Wat uitverkocht is, staat bovenaan.

**Wat je maakt.** Een bestand `src/inkoop.ts` met:

1. Een tuple `Bestelregel`: naam, categorie, voorraad, bij te bestellen. Geef de plaatsen
   een naam.
2. Een functie `bestellijst(producten, categorieen, minimum)` die een lijst
   `Bestelregel` teruggeeft. Het minimum is standaard vijf. Gebruik `filter`,
   `toSorted` en `map`. Sorteer op voorraad, en bij gelijke voorraad op naam.
3. De naam van de categorie zoek je op met `find`. Wat toon je als de categorie niet
   bestaat?
4. Een tabel in de terminal, met kolommen die netjes onder elkaar staan.

### Uitwerking van oefening 5.2

```ts domein/src/inkoop.ts
// Het Groenhuis — welke producten moeten bijbesteld worden?
// Hoofdstuk 5, klassikale oefening 5.2

import { categorieen, producten } from "./catalogus.ts";
import type { Categorie, Product } from "./inhoud.ts";

export const MINIMALE_VOORRAAD = 5;

export type Bestelregel = [naam: string, categorie: string, voorraad: number, bijTeBestellen: number];

function categorienaam(lijst: readonly Categorie[], id: string): string {
  const categorie = lijst.find((kandidaat) => kandidaat.id === id);
  return categorie === undefined ? "(onbekend)" : categorie.naam;
}

export function bestellijst(
  alle: readonly Product[],
  lijst: readonly Categorie[],
  minimum = MINIMALE_VOORRAAD,
): Bestelregel[] {
  return alle
    .filter((product) => product.voorraad < minimum)
    .toSorted((a, b) => a.voorraad - b.voorraad || a.naam.localeCompare(b.naam, "nl"))
    .map((product) => [product.naam, categorienaam(lijst, product.categorieId), product.voorraad, minimum - product.voorraad]);
}

const regels = bestellijst(producten, categorieen);

console.log(`${"Product".padEnd(26)}${"Categorie".padEnd(16)}${"Voorraad".padStart(9)}${"Bestellen".padStart(11)}`);
for (const [naam, categorie, voorraad, bijTeBestellen] of regels) {
  console.log(`${naam.padEnd(26)}${categorie.padEnd(16)}${String(voorraad).padStart(9)}${String(bijTeBestellen).padStart(11)}`);
}
console.log(`${regels.length} producten onder de ${MINIMALE_VOORRAAD} stuks`);
```

```text
Product                   Categorie        Voorraad  Bestellen
Calathea orbifolia        Kamerplanten            0          5
Snoeischaar               Gereedschap             0          5
Olijfboom                 Buitenplanten           2          3
Monstera deliciosa        Kamerplanten            3          2
4 producten onder de 5 stuks
```

**De keten `filter` → `toSorted` → `map`.** Eerst kleiner maken, dan sorteren, dan
omzetten. In die volgorde sorteer je zo weinig mogelijk elementen, en werk je bij het
sorteren nog met volledige producten, waarin `voorraad` en `naam` een naam hebben.

**`a.voorraad - b.voorraad || a.naam.localeCompare(…)`.** Bij gelijke voorraad is het
verschil `0`, en `0 || x` geeft `x`. Zo sorteer je op een tweede kenmerk als het eerste
gelijk is.

**Het tuple in `map`.** De functie belooft `Bestelregel[]`. Daardoor leest TypeScript
de lijst `[product.naam, …]` in de `map` als een `Bestelregel`, en niet als een gewone
lijst `(string | number)[]`. Zet eens een vijfde element in de lijst: TypeScript weigert.

**Uitpakken in de `for … of`.** `const [naam, categorie, voorraad, bijTeBestellen]` haalt
de vier waarden uit elke regel. Elke variabele heeft het juiste type: `naam` is een
`string`, `voorraad` een `number`. Daarom moet `String(voorraad)` erbij voor `padStart`,
dat alleen op teksten bestaat.

**De categorie die niet bestaat.** `(onbekend)` in de tabel is beter dan een programma
dat stopt. Een product met een `categorieId` die niet bestaat, is een fout in de
gegevens, niet in de bestellijst. In deel IV zorgt de databank ervoor dat het niet kan.

---
