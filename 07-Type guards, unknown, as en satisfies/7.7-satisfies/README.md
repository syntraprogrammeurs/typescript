# 7.7 `satisfies`

Soms wil je dat TypeScript iets nakijkt tegen een type, maar zonder dat het type van je
waarde verandert. Een tabel met btw-tarieven per soort:

```ts domein/src/proef.ts
type Tarieven = { [soort: string]: number };

const metType: Tarieven = { planten: 6, potten: 21 };
const metSatisfies = { planten: 6, potten: 21 } satisfies Tarieven;

const a: number = metType.planten;
const b: number = metSatisfies.planten;
const c = metSatisfies.pottten;
const d = { planten: 6, potten: "21" } satisfies Tarieven;
```

```text
src/proef.ts:6:7 - error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.

6 const a: number = metType.planten;
        ~

src/proef.ts:8:24 - error TS2551: Property 'pottten' does not exist on type '{ planten: number; potten: number; }'. Did you mean 'potten'?

8 const c = metSatisfies.pottten;
                         ~~~~~~~

  src/proef.ts:4:36 - 'potten' is declared here.
    4 const metSatisfies = { planten: 6, potten: 21 } satisfies Tarieven;
                                         ~~~~~~~~~~

src/proef.ts:9:25 - error TS2322: Type 'string' is not assignable to type 'number'.

9 const d = { planten: 6, potten: "21" } satisfies Tarieven;
                          ~~~~~~

  src/proef.ts:1:19 - The expected type comes from this index signature.
    1 type Tarieven = { [soort: string]: number };
                        ~~~~~~~~~~~~~~~~~~~~~~~

Found 3 errors in the same file, starting at: src/proef.ts:6
```

| | `const x: Tarieven = …` | `const x = … satisfies Tarieven` |
|---|---|---|
| Kijkt na dat het bij `Tarieven` past | ja | ja |
| Het type van `x` | `Tarieven`: een sleutel kan ontbreken | de vorm zoals je ze schreef: `{ planten: number; potten: number }` |
| `x.planten` | `number \| undefined` | `number` |
| Tikfout `x.pottten` | geen fout, wel `undefined` | **fout** |

> **BEGRIP — satisfies**
>
> **`satisfies`** kijkt na dat een waarde bij een type past, en laat het type van de waarde
> zelf ongemoeid. Je krijgt de controle van een typeannotatie, en het precieze type van
> inference.
>
> *Wanneer:* bij vaste gegevens in je code die aan een vorm moeten voldoen: instellingen,
> tabellen, standaardwaarden. Je gebruikt het in oefening 7.2.
