# 4.3 Optionele en `readonly`-velden

Niet elk product heeft een beschrijving. Een veld dat er niet hoeft te zijn, krijgt een
vraagteken, net als een optionele parameter. En de `id` van een product mag nooit
veranderen: die krijgt **`readonly`**.

```ts domein/src/proef.ts
interface Product {
  readonly id: string;
  naam: string;
  beschrijving?: string;
}

const aloe: Product = { id: "p04", naam: "Aloe vera" };
aloe.naam = "Aloë vera";
aloe.id = "p99";

console.log(aloe.beschrijving.length);
```

```text
src/proef.ts:9:6 - error TS2540: Cannot assign to 'id' because it is a read-only property.

9 aloe.id = "p99";
       ~~

src/proef.ts:11:13 - error TS18048: 'aloe.beschrijving' is possibly 'undefined'.

11 console.log(aloe.beschrijving.length);
               ~~~~~~~~~~~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:9
```

| Veld | Mag ontbreken | Mag wijzigen |
|---|---|---|
| `naam: string` | nee | ja |
| `beschrijving?: string` | ja | ja |
| `readonly id: string` | nee | **nee** |

> **LET OP**
>
> `readonly` bestaat alleen voor TypeScript. Na het wegvegen van de types is het een gewoon
> JavaScript-object, en kan iedereen de `id` wijzigen. `readonly` beschermt je tegen
> **je eigen fouten**, niet tegen kwaadwillige code. Wil je een object echt onveranderlijk
> maken, dan gebruik je `Object.freeze`. Dat zie je in hoofdstuk 9.

### Ontbreken is iets anders dan `undefined`

In `tsconfig.json` staat `exactOptionalPropertyTypes`. Daardoor maakt TypeScript een
verschil tussen een veld dat **ontbreekt** en een veld dat er staat met de waarde
`undefined`:

```ts domein/src/proef.ts
interface Product {
  naam: string;
  beschrijving?: string;
}

const zonder: Product = { naam: "Aloe vera" };
const leeg: Product = { naam: "Aloe vera", beschrijving: undefined };
```

```text
src/proef.ts:7:7 - error TS2375: Type '{ naam: string; beschrijving: undefined; }' is not assignable to type 'Product' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'beschrijving' are incompatible.
    Type 'undefined' is not assignable to type 'string'.

7 const leeg: Product = { naam: "Aloe vera", beschrijving: undefined };
        ~~~~

Found 1 error in src/proef.ts:7
```

> **WAAROM**
>
> Waarom zo streng? Omdat het verschil echt is. `"beschrijving" in product` geeft `false`
> als het veld ontbreekt en `true` als het `undefined` is. `JSON.stringify` laat een
> ontbrekend veld weg, maar bij de API die je in deel III bouwt, betekent "het veld niet
> meesturen" iets anders dan "het veld leegmaken". Wil je echt `undefined` toelaten, dan
> schrijf je het uitdrukkelijk: `beschrijving?: string | undefined`.
