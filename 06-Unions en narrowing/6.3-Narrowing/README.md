# 6.3 Narrowing

```ts domein/src/proef.ts
function naarCent(waarde: number | string): number {
  if (typeof waarde === "string") {
    return Math.round(Number(waarde.replace(",", ".")) * 100);
  }
  return Math.round(waarde * 100);
}

console.log(naarCent("24,99"), naarCent(8.95));
```

```text
2499 895
```

Binnen de `if` weet TypeScript dat `waarde` een `string` is. Na de `if` weet het dat het
een `number` is: de `string` is er al met een `return` uit. Ga met de muis over `waarde`
op beide plaatsen:

![Na de `if` met `return` is `waarde` alleen nog een `number`.](../img/06-narrowing.png)

> **BEGRIP — Narrowing**
>
> **Narrowing** is het smaller maken van een type. TypeScript volgt je code zoals ze
> uitgevoerd wordt, en leidt uit elke controle af wat een waarde op die plaats nog kan zijn.
> Je hoeft niets te schrijven: een gewone `if` is genoeg.

De controles die TypeScript begrijpt:

| Controle | Maakt smaller | Voorbeeld |
|---|---|---|
| `typeof x === "string"` | Tot `string`, `number`, `boolean`, `object`, `function`, `undefined` | `naarCent` hierboven |
| `x === undefined`, `x !== null` | Haalt `undefined` of `null` weg, of houdt ze over | `if (product !== undefined)` |
| `x === "gepubliceerd"` | Tot die ene waarde | Een status vergelijken |
| `"veld" in x` | Tot de types die dat veld hebben | Twee vormen van een object |
| `x instanceof Date` | Tot die klasse | Hoofdstuk 8 en 13 |
| `if (x)` | Haalt `undefined`, `null`, `0`, `""` en `false` weg | Zie de waarschuwing hieronder |
| `Array.isArray(x)` | Tot een lijst | Gegevens van buiten, hoofdstuk 7 |

> **LET OP**
>
> `if (x)` is verleidelijk kort, maar het gooit meer weg dan `undefined`. Een voorraad van
> `0` en een lege zoektekst `""` zijn ook *onwaar*:
>
> ```ts domein/src/proef.ts
> function toonVoorraad(voorraad?: number): string {
>   if (voorraad) {
>     return `${voorraad} stuks`;
>   }
>   return "onbekend";
> }
>
> console.log(toonVoorraad(12));
> console.log(toonVoorraad(0));
> console.log(toonVoorraad());
> ```
>
> ```text
> 12 stuks
> onbekend
> onbekend
> ```
>
> Een voorraad van nul is niet *onbekend*. Vergelijk uitdrukkelijk: `if (voorraad !==
> undefined)`. Gebruik `if (x)` alleen bij iets dat geen `0` of `""` kan zijn, zoals een
> object.
