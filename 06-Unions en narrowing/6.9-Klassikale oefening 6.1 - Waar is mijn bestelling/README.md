# 6.9 Klassikale oefening 6.1 — Waar is mijn bestelling?

**De situatie.** Een klant wil weten waar haar bestelling is. Een levering is in
voorbereiding, verzonden, geleverd of geannuleerd. Elke toestand heeft andere gegevens:

| Status | Gegevens |
|---|---|
| in voorbereiding | geen |
| verzonden | de vervoerder (bpost, PostNL of DPD) en een trackingcode |
| geleverd | de datum, en soms wie het pakje aannam |
| geannuleerd | de reden |

**Wat je maakt.** Een bestand `src/levering.ts` met:

1. Een type `Vervoerder` en een discriminated union `Levering`. Schrijf de vier
   mogelijkheden rechtstreeks in de union, zonder aparte interfaces.
2. `leverinfo(levering)`: een zin voor de klant, met een `switch` en het vangnet uit 6.7.
3. `kanGeannuleerdWorden(levering)`: alleen een bestelling in voorbereiding.
4. Vijf voorbeelden, waaronder twee geleverde: één mét en één zonder ontvanger.
5. Probeer daarna een verzonden levering zonder trackingcode, en een geleverde mét een
   trackingcode. Wat zegt TypeScript?

### Uitwerking van oefening 6.1

```ts domein/src/levering.ts
// Het Groenhuis — waar is mijn bestelling?
// Hoofdstuk 6, klassikale oefening 6.1

import { onmogelijk } from "./onmogelijk.ts";

export type Vervoerder = "bpost" | "PostNL" | "DPD";

export type Levering =
  | { status: "in-voorbereiding" }
  | { status: "verzonden"; vervoerder: Vervoerder; trackingcode: string }
  | { status: "geleverd"; geleverdOp: string; ontvangenDoor?: string }
  | { status: "geannuleerd"; reden: string };

export function leverinfo(levering: Levering): string {
  switch (levering.status) {
    case "in-voorbereiding":
      return "We maken je bestelling klaar.";
    case "verzonden":
      return `Onderweg met ${levering.vervoerder}, volg ze met code ${levering.trackingcode}.`;
    case "geleverd":
      return levering.ontvangenDoor === undefined
        ? `Geleverd op ${levering.geleverdOp}.`
        : `Geleverd op ${levering.geleverdOp}, ontvangen door ${levering.ontvangenDoor}.`;
    case "geannuleerd":
      return `Geannuleerd: ${levering.reden}.`;
    default:
      return onmogelijk(levering);
  }
}

export function kanGeannuleerdWorden(levering: Levering): boolean {
  return levering.status === "in-voorbereiding";
}

```

```text
in-voorbereiding  We maken je bestelling klaar. annuleren kan
verzonden         Onderweg met bpost, volg ze met code 323299901234567.
geleverd          Geleverd op 14 oktober 2026, ontvangen door de buren.
geleverd          Geleverd op 15 oktober 2026.
geannuleerd       Geannuleerd: op vraag van de klant.
```

**De vormen staan rechtstreeks in de union.** Bij vier korte vormen is dat leesbaar. Bij
de blokken van een pagina, waar elke vorm een eigen functie en uitleg krijgt, zijn aparte
interfaces duidelijker. Beide zijn goed: kies wat leesbaarder is.

**De discriminant heet hier `status`.** De naam doet er niet toe, zolang alle vormen
hetzelfde veld hebben, met een literal type.

**Een verzonden levering zonder trackingcode** geeft `Property 'trackingcode' is
missing`. **Een geleverde mét trackingcode** geeft *Object literal may only specify known
properties*: TypeScript ziet aan `status: "geleverd"` welke vorm je bedoelt, en die heeft
geen trackingcode. Zo'n levering kan dus niet meer bestaan. In JavaScript zou ze gewoon
bestaan, en zou `leverinfo` ze als geleverd tonen.

**Wat `kanGeannuleerdWorden` niet doet.** Ze wijzigt de levering niet. Annuleren betekent
een nieuwe waarde maken: `{ status: "geannuleerd", reden: "…" }`. Je kunt een
`Levering` niet *half* annuleren, want een `status: "geannuleerd"` zonder `reden` bestaat
niet. Een **toestandsmachine** als deze bouw je in deel VII voor echte bestellingen.

---
