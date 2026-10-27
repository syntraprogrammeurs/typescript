# 4.2 `interface` en `type`

Dezelfde vorm op drie plaatsen schrijven is vragen om fouten. Je geeft ze een naam, op
een van twee manieren:

```ts domein/src/proef.ts
interface ProductA {
  naam: string;
  prijsInCent: number;
}

type ProductB = {
  naam: string;
  prijsInCent: number;
};

const a: ProductA = { naam: "Aloe vera", prijsInCent: 799 };
const b: ProductB = a;
```

Beide werken, en beide zijn hier gelijkwaardig. Zelfs `const b: ProductB = a` mag: de
vormen zijn dezelfde, en dat is voor TypeScript genoeg. Waarom, zie je in 4.7.

| | `interface` | `type` |
|---|---|---|
| Beschrijft een object | ja | ja |
| Beschrijft een union, een functie, een tuple | nee | ja |
| Uitbreiden | `interface B extends A` | `type B = A & { … }` |
| Twee keer dezelfde naam | worden samengevoegd | fout |

> **BEGRIP — Interface**
>
> Een **interface** is een benoemde beschrijving van de vorm van een object: welke velden
> het heeft, en welk type elk veld heeft.
>
> *Afspraak in deze cursus:* een `interface` voor de vorm van een object, een `type` voor
> de rest: unions, functietypes, tuples. Zo zie je aan het eerste woord al wat voor iets
> het is. Veel teams volgen die afspraak; anderen gebruiken overal `type`. Belangrijk is
> dat een project één afspraak volgt.
