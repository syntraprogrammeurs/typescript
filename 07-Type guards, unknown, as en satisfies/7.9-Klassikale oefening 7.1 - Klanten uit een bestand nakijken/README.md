# 7.9 Klassikale oefening 7.1 — Klanten uit een bestand nakijken

**De situatie.** Het Groenhuis neemt de klanten over uit een oud systeem. De export is een
JSON-bestand, en niet alles erin is netjes: een telefoonnummer als getal, een huisnummer
als getal, en een factuuradres dat `null` is in plaats van te ontbreken.

**Wat je maakt.**

1. De export staat in `data/klanten.json`, in het startpunt van deze oefening in de map
   `lessen`. Kopieer het bestand naar je project en kijk er eerst zelf naar: wat klopt er
   niet met de interface `Klant` uit hoofdstuk 4?
2. Een bestand `src/klantcontrole.ts` met `foutenInAdres`, `foutenInKlant` en een type
   predicate `isKlant`.
3. Toon de klanten die in orde zijn, en voor elke andere klant wat er niet klopt.
4. Importeer `Klant` uit `klant.ts`. Waarom moet dat met `import type`, en wat zou er
   gebeuren zonder?

### Uitwerking van oefening 7.1

```ts domein/src/klantcontrole.ts
// Het Groenhuis — klanten uit een bestand nakijken
// Hoofdstuk 7, klassikale oefening 7.1

import { isObject, type OnbekendObject } from "./controle.ts";
import type { Klant } from "./klant.ts";
import { leesJson } from "./laden.ts";

function tekstvelden(waarde: OnbekendObject, velden: string[], waar: string): string[] {
  return velden.filter((veld) => typeof waarde[veld] !== "string").map((veld) => `${waar}${veld} is geen tekst`);
}

export function foutenInAdres(waarde: unknown, waar: string): string[] {
  if (!isObject(waarde)) {
    return [`${waar} is geen object`];
  }
  const fouten = tekstvelden(waarde, ["straat", "huisnummer", "postcode", "gemeente", "land"], `${waar}.`);
  if (waarde.bus !== undefined && typeof waarde.bus !== "string") {
    fouten.push(`${waar}.bus is geen tekst`);
  }
  return fouten;
}

export function foutenInKlant(waarde: unknown): string[] {
  if (!isObject(waarde)) {
    return ["is geen object"];
  }
  const fouten = tekstvelden(waarde, ["id", "voornaam", "achternaam", "email"], "");
  if (waarde.telefoon !== undefined && typeof waarde.telefoon !== "string") {
    fouten.push("telefoon is geen tekst");
  }
  fouten.push(...foutenInAdres(waarde.leveradres, "leveradres"));
  if (waarde.factuuradres !== undefined) {
    fouten.push(...foutenInAdres(waarde.factuuradres, "factuuradres"));
  }
  return fouten;
}

export function isKlant(waarde: unknown): waarde is Klant {
  return foutenInKlant(waarde).length === 0;
}

const gegevens = leesJson(new URL("../data/klanten.json", import.meta.url));
const lijst: unknown[] = Array.isArray(gegevens) ? gegevens : [];

const klanten = lijst.filter(isKlant);
console.log(`In orde: ${klanten.map((klant) => `${klant.voornaam} ${klant.achternaam}`).join(", ")}`);

lijst.forEach((element, plaats) => {
  const fouten = foutenInKlant(element);
  if (fouten.length > 0) {
    console.log(`Klant ${plaats + 1}: ${fouten.join("; ")}`);
  }
});
```

```text
In orde: Sam Peeters
Klant 2: telefoon is geen tekst; leveradres.huisnummer is geen tekst
Klant 3: factuuradres is geen object
```

**`tekstvelden` voor de velden van hetzelfde soort.** Vier tekstvelden van een klant en
vijf van een adres: één functie die een lijst namen nakijkt, in plaats van negen `if`'s.

**`foutenInAdres` krijgt een `waar` mee.** Zo zegt de melding `leveradres.huisnummer` en
niet gewoon `huisnummer`. Een klant heeft twee adressen: de melding moet zeggen welk.

**Klant 3: `null` is geen ontbrekend veld.** In JSON bestaat `undefined` niet. Een export
schrijft *geen waarde* daarom vaak als `null`. De interface zegt `factuuradres?: Adres`:
het veld mag **ontbreken**, maar als het er is, moet het een adres zijn. `null` is dat
niet. Wil je `null` aanvaarden, dan beslis je dat bewust, en zet je het om naar een
ontbrekend veld voor het in je programma komt. Dat zie je in hoofdstuk 19 met Zod.

**`import type { Klant }` is hier verplicht om een tweede reden.** `klant.ts` toont
onderaan twee klanten met `console.log`. Een gewone `import` zou dat bestand uitvoeren, en
die regels mee tonen. Een `import type` verdwijnt volledig: `klant.ts` wordt niet eens
geladen. Code die bij het importeren iets doet, is een slechte gewoonte. In hoofdstuk 14
ruim je dat op.

**`lijst.filter(isKlant)`** geeft een `Klant[]`: de type predicate uit 7.5.

---
