# 8.2 Je eerste klasse

```ts domein/src/proef.ts
class Pot {
  materiaal: string;
  diameterInCm: number;

  constructor(materiaal: string, diameterInCm: number) {
    this.materiaal = materiaal;
    this.diameterInCm = diameterInCm;
  }

  omschrijving(): string {
    return `${this.materiaal} pot van ${this.diameterInCm} cm`;
  }

  pastRond(potmaatInCm: number): boolean {
    return this.diameterInCm >= potmaatInCm + 2;
  }
}

const terracotta = new Pot("terracotta", 20);
const keramiek = new Pot("keramieken", 14);

console.log(terracotta.omschrijving());
console.log(keramiek.omschrijving(), keramiek.pastRond(17));
console.log(terracotta instanceof Pot);
```

```text
terracotta pot van 20 cm
keramieken pot van 14 cm false
true
```

> **BEGRIP — Klasse en object**
>
> Een **klasse** is een bouwtekening: ze beschrijft welke gegevens (**velden**) en welk
> gedrag (**methodes**) iets van dat soort heeft. Een **object** of **instantie** is één
> exemplaar, gemaakt met **`new`**.
>
> *De vergelijking:* `Pot` is het begrip pot; `terracotta` is één bepaalde pot.

| Onderdeel | Wat het is |
|---|---|
| `materiaal: string;` | Een **veld**, met zijn type. In TypeScript moet je elk veld vooraf noemen |
| `constructor(…)` | Wordt uitgevoerd bij `new Pot(…)`. Hier geef je elk veld een waarde |
| `this` | Het object dat op dit moment gemaakt of gebruikt wordt |
| `omschrijving(): string` | Een **methode**: een functie die bij het object hoort, en zijn velden via `this` kent |
| `instanceof Pot` | Is dit object met `new Pot` gemaakt? |

Vergeet je een veld een waarde te geven in de constructor, dan zegt TypeScript het:

```ts domein/src/proef.ts
class Pot {
  materiaal: string;
  diameterInCm: number;

  constructor(materiaal: string) {
    this.materiaal = materiaal;
  }
}
```

```text
src/proef.ts:3:3 - error TS2564: Property 'diameterInCm' has no initializer and is not definitely assigned in the constructor.

3   diameterInCm: number;
    ~~~~~~~~~~~~

Found 1 error in src/proef.ts:3
```

> **WAAROM**
>
> Je kent klassen misschien al uit JavaScript. Het verschil in TypeScript: elk veld wordt
> **vooraf** genoemd, met zijn type, en TypeScript kijkt na dat de constructor het een waarde
> geeft. In JavaScript zou `this.diameterInCm` gewoon `undefined` blijven, en zou je het pas
> merken als een berekening `NaN` geeft.
