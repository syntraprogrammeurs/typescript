# 3.4 Functietypes

Een functie heeft zelf ook een type. Dat van `metBtw` is:

```ts
(prijsInCent: number, btwPercentage: number) => number
```

Lees het als: *een functie die twee getallen krijgt en een getal teruggeeft*. De pijl
`=>` staat hier niet voor een arrowfunctie, maar voor *geeft terug*. De namen van de
parameters zijn alleen uitleg: alleen de types en hun volgorde tellen.

Het Groenhuis heeft verschillende soorten korting: tien procent, een cadeaubon van tien
euro, korting pas vanaf een bepaald bedrag. Allemaal doen ze hetzelfde: **een bedrag
in, een kleiner bedrag uit**. Dat geef je een naam:

```ts
type Kortingsregel = (bedragInCent: number) => number;
```

> **BEGRIP — Type alias**
>
> Met **`type`** geef je een type een naam. `Kortingsregel` is daarna overal bruikbaar
> waar je anders `(bedragInCent: number) => number` zou schrijven.
>
> *Waarom:* een naam zegt wat iets **betekent**, niet alleen hoe het eruitziet. Twee
> functies met hetzelfde type kunnen iets heel anders doen; `Kortingsregel` zegt welke
> rol de functie speelt.

Een variabele van dat type:

```ts domein/src/proef.ts
type Kortingsregel = (bedragInCent: number) => number;

const tienProcent: Kortingsregel = (bedrag) => Math.round(bedrag * 0.9);
const tienEuro: Kortingsregel = (bedrag) => bedrag - 1000;
const kapot: Kortingsregel = (bedrag) => `${bedrag} min korting`;
```

```text
src/proef.ts:5:42 - error TS2322: Type 'string' is not assignable to type 'number'.

5 const kapot: Kortingsregel = (bedrag) => `${bedrag} min korting`;
                                           ~~~~~~~~~~~~~~~~~~~~~~~

  src/proef.ts:1:22 - The expected type comes from the return type of this signature.
    1 type Kortingsregel = (bedragInCent: number) => number;
                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Found 1 error in src/proef.ts:5
```

Bij `tienProcent` schreef je geen type bij `bedrag`, en toch weet TypeScript dat het
een `number` is:

![`bedrag` heeft geen type gekregen, maar TypeScript weet uit `Kortingsregel` dat het een `number` is.](../img/03-contextueel.png)

> **BEGRIP — Contextuele typering**
>
> Als TypeScript weet welk functietype op een plaats verwacht wordt, geeft het de
> parameters van je arrowfunctie vanzelf dat type. Dat heet **contextuele typering**.
>
> *Waarom het ertoe doet:* je schrijft de types één keer, in de naam `Kortingsregel`, en
> niet in elke functie opnieuw. Je ziet hetzelfde bij `addEventListener` en bij `map` en
> `filter`: daar schrijf je ook geen type bij de parameter van je arrowfunctie.
