# 4.7 Structural typing

Dit is de belangrijkste paragraaf van het hoofdstuk.

```ts domein/src/proef.ts
interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

function etiket(item: Prijsetiket): string {
  return `${item.naam}: ${item.prijsInCent} cent`;
}

const verzending = { naam: "Express-levering", prijsInCent: 300, levertermijn: "morgen" };

console.log(etiket(verzending));
```

```text
Express-levering: 300 cent
```

`verzending` is nergens als `Prijsetiket` aangemaakt. Het heeft bovendien een veld dat
niet in `Prijsetiket` staat. Toch aanvaardt TypeScript het.

> **BEGRIP — Structural typing**
>
> TypeScript vergelijkt types op hun **vorm** (*structuur*), niet op hun **naam**. Een
> object past bij `Prijsetiket` als het **minstens** de velden van `Prijsetiket` heeft,
> met het juiste type. Extra velden mogen. Hoe het object heet of waar het vandaan komt,
> maakt niet uit.
>
> *Het tegendeel* heet **nominal typing**: in Java, C# en PHP past een object alleen bij
> een type als het uitdrukkelijk zo gemaakt is (`class X implements Prijsetiket`).
>
> *Waarom TypeScript het zo doet:* JavaScript werkt al zo. Een functie die `item.naam` en
> `item.prijsInCent` gebruikt, werkt met elk object dat die twee velden heeft. TypeScript
> beschrijft wat JavaScript doet, het verandert het niet.

Dat heeft gevolgen die je moet kennen. Twee types met dezelfde vorm zijn uitwisselbaar,
ook als ze iets totaal anders betekenen:

```ts domein/src/proef.ts
interface Product {
  id: string;
  prijsInCent: number;
}

interface Verzendoptie {
  id: string;
  prijsInCent: number;
}

function voegToeAanMandje(product: Product): void {
  console.log(`Product ${product.id} toegevoegd`);
}

const express: Verzendoptie = { id: "express", prijsInCent: 300 };
voegToeAanMandje(express);
```

```text
Product express toegevoegd
```

TypeScript ziet geen fout: een verzendoptie heeft dezelfde vorm als een product. Hoe je
dat toch tegenhoudt, leer je in hoofdstuk 9, met *branded types* en klassen.

### Excess property checks

Er is één uitzondering. Schrijf je het object **rechtstreeks** op de plaats waar het
gebruikt wordt, dan zijn extra velden wél een fout:

```ts domein/src/proef.ts
interface Prijsetiket {
  naam: string;
  prijsInCent: number;
}

function etiket(item: Prijsetiket): string {
  return `${item.naam}: ${item.prijsInCent} cent`;
}

etiket({ naam: "Aloe vera", prijsInCnet: 799 });
etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" });
```

```text
src/proef.ts:10:29 - error TS2561: Object literal may only specify known properties, but 'prijsInCnet' does not exist in type 'Prijsetiket'. Did you mean to write 'prijsInCent'?

10 etiket({ naam: "Aloe vera", prijsInCnet: 799 });
                               ~~~~~~~~~~~

src/proef.ts:11:45 - error TS2353: Object literal may only specify known properties, and 'levertermijn' does not exist in type 'Prijsetiket'.

11 etiket({ naam: "Express", prijsInCent: 300, levertermijn: "morgen" });
                                               ~~~~~~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:10
```

> **BEGRIP — Excess property check**
>
> Bij een **object literal**, een object dat je op die plaats tussen accolades schrijft,
> meldt TypeScript elk veld dat niet in het type staat. In die situatie is een extra veld
> bijna altijd een **tikfout**: `prijsInCnet` in plaats van `prijsInCent`.
>
> *Waarom niet altijd:* een object dat al in een variabele zat, wordt misschien ook
> elders gebruikt, met die extra velden. Dan zijn ze geen vergissing.
