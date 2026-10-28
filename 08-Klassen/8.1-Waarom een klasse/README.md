# 8.1 Waarom een klasse

```ts domein/src/proef.ts
import type { Product } from "./inhoud.ts";

const aloe: Product = {
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
};

aloe.voorraad = aloe.voorraad - 30;
aloe.prijsInCent = -100;
aloe.status = "concept";

console.log(aloe.voorraad, aloe.prijsInCent, aloe.status);
```

```text
-5 -100 concept
```

Alles mag, en TypeScript ziet geen fout: de types kloppen. Een voorraad van `-5` is een
`number`. Maar het is geen geldige voorraad. **Types bewaken de vorm, niet de regels.**

| Probleem | Gevolg |
|---|---|
| Iedereen kan elk veld wijzigen | Een negatieve voorraad, een negatieve prijs |
| De regels staan op andere plaatsen dan de gegevens | Wie vergeet de controle op te roepen, omzeilt ze |
| Een status kan elke waarde krijgen | Een gearchiveerd product terug publiceren, zonder dat iemand het merkt |

Een klasse lost alle drie op: ze laat de gegevens alleen veranderen via **methodes**, en
die methodes kijken de regels na.
