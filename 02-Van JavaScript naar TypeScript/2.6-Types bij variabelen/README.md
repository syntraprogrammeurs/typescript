# 2.6 Types bij variabelen

Een type schrijf je achter de naam, na een dubbelpunt:

```ts
let naam: string = "Monstera deliciosa";
let prijsInCent: number = 2499;
let opVoorraad: boolean = true;
```

Maar meestal hoeft dat niet. TypeScript **leidt af** welk type een waarde heeft:

```ts domein/src/proef.ts
let naam = "Monstera deliciosa";
let prijsInCent = 2499;
let opVoorraad = true;

prijsInCent = prijsInCent + 100;
```

Ga met de muis over `prijsInCent`:

![TypeScript leidt af dat `prijsInCent` een `number` is. Je ziet het als je er met de muis over gaat.](../img/02-inference.png)

> **BEGRIP — Inference**
>
> **Type inference** betekent dat TypeScript het type zelf afleidt uit de waarde. Je ziet
> het afgeleide type door met de muis over de naam te gaan.
>
> *Wanneer je het type tóch schrijft:*
> - bij de **parameters** van een functie: daar is geen waarde om uit af te leiden;
> - bij een variabele **zonder** beginwaarde;
> - bij een functie die je door anderen laat gebruiken: daar schrijf je ook het
>   **returntype**, als afspraak.

Een variabele zonder beginwaarde, zonder type:

```ts domein/src/proef.ts
let korting;
korting = 20;
korting = "twintig";

function verhoog(bedrag) {
  return bedrag + 1;
}
```

```text
src/proef.ts:5:18 - error TS7006: Parameter 'bedrag' implicitly has an 'any' type.

5 function verhoog(bedrag) {
                   ~~~~~~

Found 1 error in src/proef.ts:5
```

De variabele `korting` geeft geen fout: TypeScript volgt wat je erin stopt. De parameter
`bedrag` wel. Dat komt in 2.8 aan bod.

### De basistypes

| Type | Waarden | Let op |
|---|---|---|
| `string` | `"Monstera"`, `'pot'`, `` `${naam}` `` | Altijd met kleine letter. `String` met hoofdletter is iets anders |
| `number` | `2499`, `6`, `0.5`, `-3`, `NaN` | Er is maar één soort getal, met komma of zonder |
| `boolean` | `true`, `false` | |
| `bigint` | `9007199254740993n` | Voor gehele getallen groter dan wat `number` exact kan bewaren |
| `null` en `undefined` | `null`, `undefined` | Hoofdstuk 6 |

> **WAAROM**
>
> Waarom bewaart Het Groenhuis prijzen **in cent**, als geheel getal? Omdat `number` geen
> komma's exact kan bewaren:
>
> ```ts domein/src/proef.ts
> console.log(0.1 + 0.2);
> console.log(0.1 + 0.2 === 0.3);
> console.log(10 + 20);
> ```
>
> ```text
> 0.30000000000000004
> false
> 30
> ```
>
> Een computer bewaart kommagetallen in het tweetallige stelsel, en daarin is 0,1 een
> oneindig lang getal, zoals 1/3 in het tientallige. Met gehele centen gebeurt dat niet.
> Elke winkel, elke bank en elke betaaldienst rekent in de kleinste munteenheid. Stripe
> doet het ook, dat zie je in deel VIII.
