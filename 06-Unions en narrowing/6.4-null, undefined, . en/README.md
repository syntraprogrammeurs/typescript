# 6.4 `null`, `undefined`, `?.` en `??`

| Waarde | Betekent | Waar je het tegenkomt |
|---|---|---|
| `undefined` | Er is **niets ingevuld** | Een optioneel veld, een `find` zonder resultaat, een parameter die je wegliet |
| `null` | Er is **uitdrukkelijk niets** | Een API of databank die *geen waarde* bewaart, `document.querySelector` zonder resultaat |

In deze cursus gebruik je `undefined` in je eigen code, en `null` alleen waar een API of
databank het teruggeeft. Twee operatoren maken het werken ermee korter.

**`?.`** (optional chaining) leest verder als de waarde er is, en geeft anders meteen
`undefined`:

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const olijf = producten.find((product) => product.slug === "olijfboom");
const niets = producten.find((product) => product.slug === "bestaat-niet");

console.log(olijf?.afmetingen?.hoogteInCm);
console.log(niets?.afmetingen?.hoogteInCm);
console.log(olijf?.beschrijving?.length);
```

```text
150
undefined
65
```

**`??`** (nullish coalescing) geeft een vervangwaarde als links `undefined` of `null`
staat, **en alleen dan**:

```ts domein/src/proef.ts
const voorraden: (number | undefined)[] = [12, 0, undefined];

for (const voorraad of voorraden) {
  console.log(`met ??: ${voorraad ?? "onbekend"}   met ||: ${voorraad || "onbekend"}`);
}
```

```text
met ??: 12   met ||: 12
met ??: 0   met ||: onbekend
met ??: onbekend   met ||: onbekend
```

> **LET OP**
>
> **`||` en `??` zijn niet hetzelfde.** `||` vervangt alles wat onwaar is, ook `0` en `""`.
> `??` vervangt alleen `undefined` en `null`. Voor standaardwaarden is `??` bijna altijd wat
> je bedoelt.
