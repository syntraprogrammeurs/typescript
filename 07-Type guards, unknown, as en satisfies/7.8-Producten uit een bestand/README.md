# 7.8 Producten uit een bestand

Nu alles samen. De producten verhuizen van `catalogus.ts` naar een JSON-bestand
`data/producten.json`, naast `src`. Het bestand staat in `lessen/07-…/7.8-Producten uit
een bestand`; het begint zo:

```json domein/data/producten.json
[
  {
    "id": "p01",
    "slug": "monstera-deliciosa",
    "status": "gepubliceerd",
    "naam": "Monstera deliciosa",
    "beschrijving": "Grote, gespleten bladeren. Houdt van licht, maar niet van volle zon.",
    "prijsInCent": 2499,
    "btwPercentage": 6,
    "voorraad": 3,
    "categorieId": "c1",
    "tags": [
      "makkelijk",
      "groot"
    ],
    "afmetingen": {
      "hoogteInCm": 60,
      "potmaatInCm": 21
    }
  },
```

Maak `src/laden.ts`:

```ts domein/src/laden.ts
// Het Groenhuis — gegevens uit een JSON-bestand laden, en pas vertrouwen na controle

import { readFileSync } from "node:fs";
import { controleerProduct } from "./controle.ts";
import type { Product } from "./inhoud.ts";

export function leesJson(pad: URL): unknown {
  return JSON.parse(readFileSync(pad, "utf8"));
}

export function laadProducten(pad: URL): Product[] {
  const gegevens = leesJson(pad);
  if (!Array.isArray(gegevens)) {
    throw new Error(`${pad.pathname}: verwachtte een lijst producten`);
  }
  const lijst: unknown[] = gegevens;
  return lijst.map((element, plaats) => {
    controleerProduct(element, `product ${plaats + 1}`);
    return element;
  });
}
```

Drie dingen om op te letten:

**`leesJson` geeft `unknown` terug.** `JSON.parse` geeft `any`, maar het returntype maakt
er meteen `unknown` van. Vanaf hier kijkt TypeScript weer alles na.

**`const lijst: unknown[] = gegevens`.** Na `Array.isArray(gegevens)` is `gegevens` een
`any[]`, geen `unknown[]`. Dat is een oude keuze in de types van JavaScript zelf. Met deze
regel maak je er weer `unknown[]` van, zodat elk element nagekeken moet worden.

**`new URL("../data/producten.json", import.meta.url)`.** `import.meta.url` is het adres
van het bestand waarin de code staat. Het pad naar de gegevens is dus relatief tegenover
`start.ts`, niet tegenover de map waarin je terminal staat. Zo werkt `npm start` ook als
je het vanuit een andere map start.

Pas `start.ts` aan:

```ts domein/src/start.ts
// Het Groenhuis — het domein van het CMS

import { paginaAlsTekst } from "./blokken.ts";
import { categorieen, paginas } from "./catalogus.ts";
import type { Product } from "./inhoud.ts";
import { laadProducten } from "./laden.ts";
import { alsEuro, metBtw } from "./prijs.ts";
import { aantalPerCategorie, goedkoopsteEerst, isZichtbaar, opVoorraad, prijsbereik, voorraadwaarde } from "./zoeken.ts";

console.log(`Het Groenhuis — het domein (Node.js ${process.version})`);

```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

In de winkel en op voorraad, goedkoopste eerst:
  Aloe vera                     € 8,47   25 op voorraad
  Terracotta pot 20 cm         € 10,83   40 op voorraad
  Sansevieria trifasciata      € 15,37   12 op voorraad
  Plantenspuit                 € 15,72   15 op voorraad
…
```

Hetzelfde resultaat als in hoofdstuk 6, maar nu uit een bestand. Maak in
`producten.json` van een prijs eens `"24,99"` en voer `npm start` opnieuw uit:

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
file:///C:/cursus/groenhuis/domein/src/controle.ts:65
    throw new Error(`${waar}: ${fouten.join("; ")}`);
          ^

Error: product 1: prijsInCent ontbreekt of is geen geheel getal vanaf 0
    at controleerProduct (file:///C:/cursus/groenhuis/domein/src/controle.ts:65:11)
    at file:///C:/cursus/groenhuis/domein/src/laden.ts:18:5
    at Array.map (<anonymous>)
    at laadProducten (file:///C:/cursus/groenhuis/domein/src/laden.ts:17:16)
    at file:///C:/cursus/groenhuis/domein/src/start.ts:12:19
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

Het programma stopt meteen, met de plaats en de reden. Zonder controle zou het verder
gerekend hebben met `"24,99" * 1.06`: `NaN`, in elke prijs die ervan afhangt.

> **CONTROLE**
>
> Zet de prijs terug op `2499`. `npm start` werkt weer.

---
