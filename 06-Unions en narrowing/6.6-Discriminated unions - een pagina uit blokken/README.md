# 6.6 Discriminated unions: een pagina uit blokken

Een pagina van het CMS is geen lange tekst. Ze bestaat uit **blokken**: een stuk tekst,
een afbeelding, een knop, een lijst producten. Elk soort blok heeft andere gegevens. Een
afbeelding heeft een `url` en een `alt`, een knop een `label` en een `link`.

Maak `src/blokken.ts`:

```ts domein/src/blokken.ts
// Het Groenhuis — de blokken waaruit een pagina van het CMS bestaat

import type { Pagina } from "./inhoud.ts";

export interface Tekstblok {
  soort: "tekst";
  tekst: string;
}

export interface Afbeeldingsblok {
  soort: "afbeelding";
  url: string;
  alt: string;
  bijschrift?: string;
}

export interface Knopblok {
  soort: "knop";
  label: string;
  link: string;
}

export interface Productlijstblok {
  soort: "productlijst";
  categorieId: string;
  maximum: number;
}

export type Blok = Tekstblok | Afbeeldingsblok | Knopblok | Productlijstblok;

```

Elk blok heeft een veld `soort`, met een **literal type**: `"tekst"`, `"afbeelding"`,
`"knop"`, `"productlijst"`. Dat veld zegt welk soort blok het is. `Blok` is de union van
alle vier.

> **BEGRIP — Discriminated union**
>
> Een **discriminated union** is een union van objecttypes die allemaal hetzelfde veld
> hebben, met telkens een ander literal type. Dat veld heet de **discriminant**: hier
> `soort`. Controleer je de discriminant, dan weet TypeScript welk van de types je hebt, en
> welke velden er dus zijn.
>
> *Waarom het zo krachtig is:* een afbeelding zonder `alt` of een knop met een `url` in
> plaats van een `link` kan niet meer bestaan. Elke soort heeft precies zijn eigen velden.

Een blok omzetten naar tekst:

```ts domein/src/blokken.ts
export function blokAlsTekst(blok: Blok): string {
  switch (blok.soort) {
    case "tekst":
      return blok.tekst;
    case "afbeelding":
      return blok.bijschrift === undefined ? `[afbeelding: ${blok.alt}]` : `[afbeelding: ${blok.alt}] ${blok.bijschrift}`;
    case "knop":
      return `[ ${blok.label} → ${blok.link} ]`;
    case "productlijst":
      return `[de eerste ${blok.maximum} producten uit categorie ${blok.categorieId}]`;
  }
}

export function paginaAlsTekst(pagina: Pagina): string {
  const regels = pagina.blokken.map(blokAlsTekst);
  return [pagina.titel.toUpperCase(), "", ...regels].join("\n");
}
```

In elke `case` kent TypeScript het juiste type. In `case "afbeelding"` bestaat
`blok.alt`, in `case "knop"` niet:

![In `case "afbeelding"` weet TypeScript dat `blok` een `Afbeeldingsblok` is.](../img/06-discriminant.png)

Pas `Pagina` aan in `inhoud.ts`: de `tekst` wordt een lijst blokken.

```ts domein/src/inhoud.ts
export interface Pagina extends Inhoud {
  titel: string;
  blokken: Blok[];
  metadata: { [sleutel: string]: string };
}
```

En geef de pagina's in `catalogus.ts` blokken:

```ts domein/src/catalogus.ts
export const paginas: readonly Pagina[] = [
  {
    id: "g1",
    slug: "over-ons",
    status: "gepubliceerd",
    titel: "Over ons",
    blokken: [
      { soort: "tekst", tekst: "Het Groenhuis is een plantenwinkel in Gent, sinds 1998." },
      { soort: "afbeelding", url: "/media/winkel.jpg", alt: "De winkel aan de Kouter", bijschrift: "Onze winkel in de lente" },
      { soort: "knop", label: "Bekijk de kamerplanten", link: "/categorie/kamerplanten" },
    ],
    metadata: { beschrijving: "Wie we zijn en waar je ons vindt" },
  },
  {
    id: "g2",
    slug: "verzending",
    status: "gepubliceerd",
    titel: "Verzending",
    blokken: [
      { soort: "tekst", tekst: "Gratis verzending vanaf 50 euro." },
      { soort: "tekst", tekst: "Express: morgen in huis, voor 3 euro extra." },
      { soort: "productlijst", categorieId: "c3", maximum: 3 },
    ],
    metadata: { beschrijving: "Verzendkosten en levertermijnen", robots: "index" },
  },
];
```

Toon ze in `start.ts`:

```ts domein/src/start.ts
console.log();
for (const pagina of paginas.filter(isZichtbaar)) {
  console.log(paginaAlsTekst(pagina));
  console.log();
}
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

In de winkel en op voorraad, goedkoopste eerst:
  Aloe vera                     € 8,47   25 op voorraad
  Terracotta pot 20 cm         € 10,83   40 op voorraad
  Sansevieria trifasciata      € 15,37   12 op voorraad
  Plantenspuit                 € 15,72   15 op voorraad
  Monstera deliciosa           € 26,49   3 op voorraad
  Olijfboom                    € 95,39   2 op voorraad

Waarde van de voorraad (excl. btw): € 1.181,55
Producten per categorie: { c1: 3, c5: 1, c2: 1, c3: 1, c4: 2 }
Prijzen van € 7,99 tot € 89,99 (excl. btw)

OVER ONS

Het Groenhuis is een plantenwinkel in Gent, sinds 1998.
[afbeelding: De winkel aan de Kouter] Onze winkel in de lente
[ Bekijk de kamerplanten → /categorie/kamerplanten ]

VERZENDING

Gratis verzending vanaf 50 euro.
Express: morgen in huis, voor 3 euro extra.
[de eerste 3 producten uit categorie c3]
```

> **CONTROLE**
>
> Maak in `catalogus.ts` van het knopblok `{ soort: "knop", label: "…", url: "…" }`. Wat
> zegt TypeScript? Het herkent aan `soort: "knop"` dat het een `Knopblok` moet zijn, en
> weet dat daar `link` hoort en geen `url`. Zet het terug.
