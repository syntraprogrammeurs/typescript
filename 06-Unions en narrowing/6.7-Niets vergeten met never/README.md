# 6.7 Niets vergeten met `never`

Volgende maand wil de redactie een nieuw soort blok: een **citaat** van een klant. Je
voegt het toe aan de union. Maar `blokAlsTekst` weet er niets van. Wat gebeurt er?

```ts domein/src/proef.ts
interface Tekstblok {
  soort: "tekst";
  tekst: string;
}

interface Citaatblok {
  soort: "citaat";
  tekst: string;
  auteur: string;
}

type Blok = Tekstblok | Citaatblok;

function blokAlsTekst(blok: Blok): string {
  switch (blok.soort) {
    case "tekst":
      return blok.tekst;
  }
}
```

```text
src/proef.ts:14:36 - error TS2366: Function lacks ending return statement and return type does not include 'undefined'.

14 function blokAlsTekst(blok: Blok): string {
                                      ~~~~~~

Found 1 error in src/proef.ts:14
```

TypeScript merkt dat de functie geen `string` teruggeeft voor een citaat. Dat werkt hier,
omdat de functie een returntype heeft. Een functie die **niets** teruggeeft, een
`switch` die alleen iets toont of bewaart, zou stil voorbij het citaat lopen. Daarom
voeg je een vangnet toe. Maak `src/onmogelijk.ts`:

```ts domein/src/onmogelijk.ts
// Het Groenhuis — een vangnet voor een switch die alle mogelijkheden moet afhandelen

/** Wordt nooit uitgevoerd als elke mogelijkheid afgehandeld is. Vergeet je er een, dan weigert TypeScript. */
export function onmogelijk(waarde: never): never {
  throw new Error(`Onverwachte waarde: ${JSON.stringify(waarde)}`);
}
```

En gebruik het als laatste `case` van de `switch` in `blokken.ts`:

```ts domein/src/blokken.ts
    default:
      return onmogelijk(blok);
  }
}
```

Als alle soorten afgehandeld zijn, blijft er in `default` niets meer over: `blok` is daar
van het type **`never`**, en past in `onmogelijk`. Vergeet je een soort, dan is `blok` in
`default` dat vergeten type, en weigert TypeScript:

```ts domein/src/proef.ts
import { onmogelijk } from "./onmogelijk.ts";

type Blok = { soort: "tekst"; tekst: string } | { soort: "citaat"; tekst: string; auteur: string };

function toon(blok: Blok): void {
  switch (blok.soort) {
    case "tekst":
      console.log(blok.tekst);
      break;
    default:
      onmogelijk(blok);
  }
}
```

```text
src/proef.ts:11:18 - error TS2345: Argument of type '{ soort: "citaat"; tekst: string; auteur: string; }' is not assignable to parameter of type 'never'.

11       onmogelijk(blok);
                    ~~~~

Found 1 error in src/proef.ts:11
```

> **BEGRIP — never**
>
> **`never`** is het type zonder waarden. Een variabele van het type `never` kan niet
> bestaan. TypeScript gebruikt het voor wat **niet meer kan**: een union waarvan elke
> mogelijkheid al afgehandeld is.
>
> *Het vangnet:* geef je iets door aan een parameter van het type `never`, dan zegt
> TypeScript precies welk type er nog over is. Zo vind je elke `switch` die je moet
> aanvullen, in het hele project, op het moment dat je een soort toevoegt.
