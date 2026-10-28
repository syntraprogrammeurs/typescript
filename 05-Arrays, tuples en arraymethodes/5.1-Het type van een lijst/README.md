# 5.1 Het type van een lijst

Een lijst van teksten schrijf je als `string[]`. Er is een tweede schrijfwijze die
hetzelfde betekent: `Array<string>`.

```ts domein/src/proef.ts
const tags: string[] = ["makkelijk", "groot"];
const prijzen: Array<number> = [2499, 1450];
const gemengd = ["Aloe vera", 799];

tags.push("buiten");
tags.push(12);
```

```text
src/proef.ts:6:11 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.

6 tags.push(12);
            ~~

Found 1 error in src/proef.ts:6
```

![Een lijst met een tekst en een getal krijgt het type `(string | number)[]`.](../img/05-gemengd.png)

| Schrijfwijze | Wanneer |
|---|---|
| `string[]` | De gewone schrijfwijze. Gebruik ze in deze cursus |
| `Array<string>` | Dezelfde betekenis. Je ziet ze in sommige bibliotheken. Hoofdstuk 12 legt de `<…>` uit |
| `(string \| number)[]` | Een lijst waarin elk element een tekst **of** een getal is. Let op de haakjes |

Een lege lijst heeft geen elementen om het type uit af te leiden. Geef het type dan
zelf:

```ts
const winkelmandje: Product[] = [];
```
