# 2.11 Klassikale oefening 2.2 — Typefouten lezen en herstellen

**De situatie.** Een collega schreef `src/bestelling.ts`, maar `npm run check` slaagt
niet meer. Typ het bestand over, met de fouten erin:

```ts domein/src/bestelling.ts
import { alsEuro, BTW_PLANTEN, metBtw } from "./prijs.ts";

const prijsPerStuk = "1450";
const aantal = 3;

function subtotaal(prijs: number, stuks: number): number {
  const totaal = prijs * stuks;
}

const totaal = subtotaal(prijsPerStuk, aantal);
console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`);
console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`);
```

**Wat je doet.**

1. Voer `npm run check` uit. Hoeveel fouten zijn er?
2. Zeg voor elke fout in je eigen woorden wat er misgaat. Gebruik het nummer en de zin.
3. Herstel ze één voor één, en voer na elke herstelling opnieuw `npm run check` uit.
4. Voer het bestand uit met `node src/bestelling.ts`.

### Uitwerking van oefening 2.2

```text
src/bestelling.ts:6:51 - error TS2355: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.

6 function subtotaal(prijs: number, stuks: number): number {
                                                    ~~~~~~

src/bestelling.ts:10:26 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

10 const totaal = subtotaal(prijsPerStuk, aantal);
                            ~~~~~~~~~~~~

src/bestelling.ts:11:64 - error TS2554: Expected 2 arguments, but got 3.

11 console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN, 0))}`);
                                                                  ~

src/bestelling.ts:12:53 - error TS2552: Cannot find name 'aantl'. Did you mean 'aantal'?

12 console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantl)}`);
                                                       ~~~~~

  src/bestelling.ts:4:7 - 'aantal' is declared here.
    4 const aantal = 3;
            ~~~~~~

Found 4 errors in the same file, starting at: src/bestelling.ts:6
```

| Regel | Fout | In gewone woorden | Herstelling |
|---|---|---|---|
| 6 | `TS2355` | De functie belooft een getal terug te geven, maar heeft geen `return` | `return prijs * stuks;` |
| 10 | `TS2345` | `prijsPerStuk` is een tekst, de functie wil een getal | `const prijsPerStuk = 1450;` |
| 11 | `TS2554` | `metBtw` heeft twee parameters, er worden er drie meegegeven | De `0` weghalen |
| 12 | `TS2552` | `aantl` bestaat niet, en TypeScript raadt `aantal` | De tikfout herstellen |

De herstelde versie:

```ts domein/src/bestelling.ts
// Het Groenhuis — wat kost een bestelling van drie dezelfde planten?
// Hoofdstuk 2, klassikale oefening 2.2 (de herstelde versie)

import { alsEuro, BTW_PLANTEN, metBtw } from "./prijs.ts";

const prijsPerStuk = 1450;
const aantal = 3;

function subtotaal(prijs: number, stuks: number): number {
  return prijs * stuks;
}

const totaal = subtotaal(prijsPerStuk, aantal);
console.log(`Te betalen: ${alsEuro(metBtw(totaal, BTW_PLANTEN))}`);
console.log(`Gemiddeld per stuk: ${alsEuro(totaal / aantal)}`);
```

```text
Te betalen: 46,11 euro
Gemiddeld per stuk: 14,50 euro
```

**Wat Node zonder `tsc` gedaan zou hebben.** De ontbrekende `return` geeft `undefined`.
`metBtw(undefined, 6)` rekent met `NaN`, en `alsEuro` maakt daar `"NaN euro"` van. Op de
derde regel stopt Node met een `ReferenceError` voor `aantl`. Eén fout zou je dus
gezien hebben, en dan pas na het uitvoeren. TypeScript gaf alle vier, voor je iets
uitvoerde.

**De volgorde van herstellen.** Herstel van boven naar beneden, en kijk na elke
herstelling opnieuw. Eén fout veroorzaakt soms een tweede verderop. Als
`prijsPerStuk` een getal wordt, verdwijnt de fout op regel 10 vanzelf.

**Fout `TS2552` raadt.** *Did you mean 'aantal'?* TypeScript zoekt een naam die er bijna
op lijkt. In VS Code staat er een lampje bij: `Ctrl` + `.` past de suggestie toe.

---
