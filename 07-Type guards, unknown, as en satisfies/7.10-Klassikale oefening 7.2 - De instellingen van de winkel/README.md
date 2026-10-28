# 7.10 Klassikale oefening 7.2 — De instellingen van de winkel

**De situatie.** De grens voor gratis verzending, de verzendkosten en de toeslag voor
express staan nu als constanten in `verzending.ts`. De eigenaar wil ze zelf kunnen
wijzigen, in een bestand `data/instellingen.json`. Als dat bestand ontbreekt of fout is,
mag de winkel niet stilvallen: dan gelden de standaardwaarden.

**Wat je maakt.** Een bestand `src/instellingen.ts` met:

1. Een interface `Instellingen` met de drie bedragen.
2. Een constante `STANDAARD` met de huidige waarden. Gebruik `satisfies`.
3. Een assertion function `controleerInstellingen`: elk bedrag een geheel aantal cent,
   niet negatief.
4. `laadInstellingen(pad)`: leest en controleert het bestand. Gaat er iets mis, dan toont ze
   waarom en geeft ze de standaardwaarden.
5. Probeer het met een goed bestand, een bestand met `"verzendkost": "4,95"`, en een bestand
   dat niet bestaat.

### Uitwerking van oefening 7.2

```ts domein/src/instellingen.ts
// Het Groenhuis — de instellingen van de winkel, uit een bestand
// Hoofdstuk 7, klassikale oefening 7.2

import { isObject } from "./controle.ts";
import { leesJson } from "./laden.ts";

export interface Instellingen {
  gratisVerzendingVanaf: number;
  verzendkost: number;
  toeslagExpress: number;
}

export const STANDAARD = {
  gratisVerzendingVanaf: 5000,
  verzendkost: 495,
  toeslagExpress: 300,
} satisfies Instellingen;

const VELDEN = ["gratisVerzendingVanaf", "verzendkost", "toeslagExpress"] as const;

export function controleerInstellingen(waarde: unknown): asserts waarde is Instellingen {
  if (!isObject(waarde)) {
    throw new Error("de instellingen zijn geen object");
  }
  for (const veld of VELDEN) {
    const getal = waarde[veld];
    if (typeof getal !== "number" || !Number.isInteger(getal) || getal < 0) {
      throw new Error(`${veld} moet een geheel aantal cent zijn, niet ${JSON.stringify(getal)}`);
    }
  }
}

export function laadInstellingen(pad: URL): Instellingen {
  try {
    const gegevens = leesJson(pad);
    controleerInstellingen(gegevens);
    return gegevens;
  } catch (fout) {
    const reden = fout instanceof Error ? fout.message : String(fout);
    console.log(`  niet gebruikt: ${reden}`);
    console.log("  de standaardwaarden gelden");
    return STANDAARD;
  }
}
```

```text
instellingen.json:
  gratis verzending vanaf 60 euro
instellingen-kapot.json:
  niet gebruikt: verzendkost moet een geheel aantal cent zijn, niet "4,95"
  de standaardwaarden gelden
  gratis verzending vanaf 50 euro
bestaat-niet.json:
  niet gebruikt: ENOENT: no such file or directory, open 'C:\cursus\groenhuis\domein\data\bestaat-niet.json'
  de standaardwaarden gelden
  gratis verzending vanaf 50 euro
```

**`satisfies Instellingen` bij `STANDAARD`.** Vergeet je een veld of tik je een naam fout,
dan zegt TypeScript het meteen. Het verschil met `: Instellingen` is hier klein, want
`Instellingen` heeft vaste velden. Het grote verschil zag je in 7.7, bij een type met een
index signature.

**`VELDEN` met `as const`.** Daardoor is `veld` in de lus `"gratisVerzendingVanaf" |
"verzendkost" | "toeslagExpress"`, en geen willekeurige tekst. Zet er een tikfout in de lijst,
en TypeScript zegt niets: de lijst zelf heeft geen type om tegen na te kijken. In hoofdstuk
18 leid je zo'n lijst af uit de interface, zodat ze nooit uit elkaar lopen.

**`return gegevens` na `controleerInstellingen(gegevens)`.** De functie belooft
`Instellingen`, en `gegevens` was `unknown`. Na de assertion is het een `Instellingen`.
Geen `as` nodig.

**`catch (fout)`.** Wat er in een `catch` terechtkomt, is in TypeScript `unknown`: je kunt
in JavaScript alles gooien, ook een tekst of een getal. Daarom `fout instanceof Error`
voor je `fout.message` leest. Hoofdstuk 13 gaat daar verder op in.

**Twee soorten fouten, één behandeling.** Een kapot bestand (`"4,95"`) en een bestand dat
niet bestaat (`ENOENT`, *error: no entry*) komen allebei in dezelfde `catch` terecht. Voor
de eigenaar maakt het niet uit: de winkel draait door. Voor jou als ontwikkelaar wel: daarom
toont de functie de reden.

---
