# 6.10 Klassikale oefening 6.2 — Zoeken met optionele filters

**De situatie.** In het beheer komt een zoekvak, met daarnaast een paar filters: een
status, een maximale prijs, en een vinkje *alleen op voorraad*. Elke filter mag leeg
blijven.

**Wat je maakt.**

1. In `zoeken.ts` een interface `Zoekfilter` met vier **optionele** velden: `tekst`,
   `status`, `maxPrijsInCent` en `alleenOpVoorraad`.
2. Een functie `zoek(producten, filter)` die alleen de ingevulde filters toepast. De
   tekst zoekt in de naam en in de tags, zonder rekening te houden met hoofdletters of
   spaties ervoor en erna.
3. Een bestand `src/zoek-proef.ts` dat zeven zoekvragen uitprobeert, waaronder een lege
   filter, een lege tekst en een maximale prijs van `0`.
4. Gebruik `?.` en `??` waar ze passen.

### Uitwerking van oefening 6.2

```ts domein/src/zoeken.ts
export interface Zoekfilter {
  tekst?: string;
  status?: Inhoudsstatus;
  maxPrijsInCent?: number;
  alleenOpVoorraad?: boolean;
}

export function zoek(producten: readonly Product[], filter: Zoekfilter): Product[] {
  const tekst = filter.tekst?.trim().toLowerCase() ?? "";
  const alleenOpVoorraad = filter.alleenOpVoorraad ?? false;

  return producten.filter((product) => {
    if (tekst !== "" && !product.naam.toLowerCase().includes(tekst) && !product.tags.includes(tekst)) {
      return false;
    }
    if (filter.status !== undefined && product.status !== filter.status) {
      return false;
    }
    if (filter.maxPrijsInCent !== undefined && product.prijsInCent > filter.maxPrijsInCent) {
      return false;
    }
    if (alleenOpVoorraad && product.voorraad === 0) {
      return false;
    }
    return true;
  });
}
```

```ts domein/src/zoek-proef.ts
// Het Groenhuis — de zoekfunctie uitproberen
// Hoofdstuk 6, klassikale oefening 6.2

import { producten } from "./catalogus.ts";
import { zoek, type Zoekfilter } from "./zoeken.ts";

const vragen: Zoekfilter[] = [
  {},
  { tekst: "makkelijk" },
  { tekst: "  MONSTERA " },
  { maxPrijsInCent: 1000 },
  { maxPrijsInCent: 0 },
  { status: "gepubliceerd", alleenOpVoorraad: true, maxPrijsInCent: 2000 },
  { tekst: "" },
];

for (const vraag of vragen) {
  const namen = zoek(producten, vraag).map((product) => product.naam);
  console.log(JSON.stringify(vraag));
  console.log(`  ${namen.length} gevonden: ${namen.join(", ")}`);
}
```

```text
{}
  8 gevonden: Monstera deliciosa, Sansevieria trifasciata, Calathea orbifolia, Aloe vera, Olijfboom, Terracotta pot 20 cm, Plantenspuit, Snoeischaar
{"tekst":"makkelijk"}
  3 gevonden: Monstera deliciosa, Sansevieria trifasciata, Aloe vera
{"tekst":"  MONSTERA "}
  1 gevonden: Monstera deliciosa
{"maxPrijsInCent":1000}
  2 gevonden: Aloe vera, Terracotta pot 20 cm
{"maxPrijsInCent":0}
  0 gevonden: 
{"status":"gepubliceerd","alleenOpVoorraad":true,"maxPrijsInCent":2000}
  4 gevonden: Sansevieria trifasciata, Aloe vera, Terracotta pot 20 cm, Plantenspuit
{"tekst":""}
  8 gevonden: Monstera deliciosa, Sansevieria trifasciata, Calathea orbifolia, Aloe vera, Olijfboom, Terracotta pot 20 cm, Plantenspuit, Snoeischaar
```

**`filter.tekst?.trim().toLowerCase() ?? ""`.** Is er geen tekst, dan stopt `?.` meteen
en geeft `undefined`; `??` maakt daar een lege tekst van. Daarna hoeft de rest van de
functie maar één geval te kennen: een tekst, misschien leeg.

**`maxPrijsInCent !== undefined` en niet `if (filter.maxPrijsInCent)`.** De zoekvraag met
`maxPrijsInCent: 0` vindt niets, en dat is juist: niets kost nul euro. Met `if
(filter.maxPrijsInCent)` zou `0` als *niet ingevuld* gelden, en kreeg je alle acht
producten. Dat is de valkuil uit 6.3.

**`alleenOpVoorraad ?? false`.** Een vinkje dat niet meegegeven is, staat uit. Met `??`
zeg je dat één keer, bovenaan.

**`import { zoek, type Zoekfilter }`.** Een waarde en een type uit hetzelfde bestand,
in één regel. Het woord `type` vóór `Zoekfilter` zegt dat alleen die naam een type is.
Node veegt dan alleen dat stuk weg.

**`JSON.stringify(vraag)`** is een snelle manier om een object op één regel te tonen. Een
leeg object geeft `{}`: alle producten.

---
