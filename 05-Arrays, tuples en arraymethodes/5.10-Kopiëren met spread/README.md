# 5.10 Kopiëren met spread

Een object of een lijst wijzig je in dit project zo weinig mogelijk ter plaatse. Je
maakt een **kopie met de wijziging erin**, met de spread-operator `...`:

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const aloe = producten.find((product) => product.slug === "aloe-vera");
if (aloe !== undefined) {
  const verkocht = { ...aloe, voorraad: aloe.voorraad - 1 };
  const metTag = { ...aloe, tags: [...aloe.tags, "bloeiend"] };

  console.log(aloe.voorraad, verkocht.voorraad);
  console.log(aloe.tags, metTag.tags);
  console.log(aloe === verkocht);
}
```

```text
25 24
[ 'makkelijk' ] [ 'makkelijk', 'bloeiend' ]
false
```

| Schrijfwijze | Resultaat |
|---|---|
| `{ ...aloe, voorraad: 24 }` | Een nieuw object met alle velden van `aloe`, en een andere voorraad |
| `[...aloe.tags, "bloeiend"]` | Een nieuwe lijst met de oude tags en een nieuwe erachter |
| `const { naam, prijsInCent } = aloe` | Twee variabelen met de waarden van die velden |
| `const { id, ...rest } = aloe` | `id` apart, en `rest` met alle andere velden |

> **WAAROM**
>
> Waarom een kopie in plaats van `aloe.voorraad -= 1`? Omdat iets anders misschien nog
> naar het oude object kijkt: een lijst op het scherm, een berekening, een test. Een kopie
> maken verandert niets voor hen. In React (deel II) is het zelfs verplicht: React merkt
> een wijziging alleen op als het een **nieuw** object krijgt.

---
