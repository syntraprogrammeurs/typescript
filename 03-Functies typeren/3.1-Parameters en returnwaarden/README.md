# 3.1 Parameters en returnwaarden

In hoofdstuk 2 schreef je types bij de parameters en bij de returnwaarde. Het
returntype mag je weglaten: TypeScript leidt het af uit de `return`.

```ts domein/src/proef.ts
function metBtw(prijsInCent: number, btwPercentage: number) {
  return Math.round(prijsInCent * (1 + btwPercentage / 100));
}

const prijs = metBtw(2499, 6);
```

![Zonder returntype leidt TypeScript `number` af uit de `return`.](../img/03-returntype-afgeleid.png)

Waarom schrijf je het dan toch? Kijk wat er gebeurt als een functie op twee plaatsen
iets teruggeeft, en je er één verkeerd doet:

```ts domein/src/proef.ts
function verzendkosten(totaalInCent: number) {
  if (totaalInCent >= 5000) {
    return "gratis";
  }
  return 495;
}

const kost = verzendkosten(2649);
const totaal = 2649 + kost;
```

```text
src/proef.ts:9:16 - error TS2365: Operator '+' cannot be applied to types 'number' and 'string | number'.

9 const totaal = 2649 + kost;
                 ~~~~~~~~~~~

Found 1 error in src/proef.ts:9
```

De fout staat op de **laatste regel**, terwijl de oorzaak in de functie zit. TypeScript
leidde als returntype `string | number` af: een tekst óf een getal. Wie de functie
gebruikt, krijgt de fout. Met een returntype erbij:

```ts domein/src/proef.ts
function verzendkosten(totaalInCent: number): number {
  if (totaalInCent >= 5000) {
    return "gratis";
  }
  return 495;
}
```

```text
src/proef.ts:3:5 - error TS2322: Type 'string' is not assignable to type 'number'.

3     return "gratis";
      ~~~~~~

Found 1 error in src/proef.ts:3
```

Nu staat de fout **in** de functie, op de regel die fout is.

> **WAAROM**
>
> Een returntype is een belofte. Zonder belofte zegt TypeScript achteraf wat je functie
> blijkt te doen. Met belofte houdt TypeScript je eraan, en wijst het de regel aan die de
> belofte breekt. Schrijf het returntype bij elke functie met `export`: dat zijn de
> functies die anderen gebruiken.

> **BEGRIP — Union, in het kort**
>
> `string | number` lees je als: *een tekst of een getal*. Het streepje `|` betekent
> **of**. Zo'n type heet een **union**. Je leert ze in hoofdstuk 6 echt
> gebruiken. Voorlopig volstaat het dat je ze kunt lezen in een foutmelding.
