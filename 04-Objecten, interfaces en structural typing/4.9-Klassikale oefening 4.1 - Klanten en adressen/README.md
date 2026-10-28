# 4.9 Klassikale oefening 4.1 — Klanten en adressen

**De situatie.** Een webwinkel levert aan klanten. Een klant heeft een naam, een
e-mailadres, misschien een telefoonnummer, een leveradres, en soms een apart
factuuradres. Een Belgisch adres heeft een straat, een huisnummer, soms een bus, een
postcode, een gemeente en een land.

**Wat je maakt.** Een bestand `src/klant.ts` met:

1. Een interface `Adres` en een interface `Klant`. Welke velden zijn optioneel? Welke
   `readonly`?
2. `adresregels(adres)`: geeft de regels van het adres terug, zoals op een omslag, met
   `bus 3` achter het huisnummer als er een bus is.
3. `adresVoorFactuur(klant)`: het factuuradres, of het leveradres als er geen factuuradres
   is.
4. Twee klanten: een particulier met een bus en zonder factuuradres, en een bedrijf met
   een telefoonnummer en een apart factuuradres. Toon voor elk het lever- en het
   factuuradres.

### Uitwerking van oefening 4.1

```ts domein/src/klant.ts
// Het Groenhuis — klanten en hun adressen
// Hoofdstuk 4, klassikale oefening 4.1

export interface Adres {
  straat: string;
  huisnummer: string;
  bus?: string;
  postcode: string;
  gemeente: string;
  land: string;
}

export interface Klant {
  readonly id: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon?: string;
  leveradres: Adres;
  factuuradres?: Adres;
}

export function adresregels(adres: Adres): string[] {
  let straat = `${adres.straat} ${adres.huisnummer}`;
  if (adres.bus !== undefined) {
    straat += ` bus ${adres.bus}`;
  }
  return [straat, `${adres.postcode} ${adres.gemeente}`, adres.land];
}

export function adresVoorFactuur(klant: Klant): Adres {
  if (klant.factuuradres !== undefined) {
    return klant.factuuradres;
  }
  return klant.leveradres;
}
```

```text
Sam Peeters
  Levering: Veldstraat 12 bus 3, 9000 Gent, België
  Factuur:  Veldstraat 12 bus 3, 9000 Gent, België
Lien Maes
  Levering: Kouter 1, 9000 Gent, België
  Factuur:  Industrieweg 88, 9032 Wondelgem, België
```

**Waarom `huisnummer` een `string` is.** Een huisnummer is geen getal: `12A` bestaat, en
je rekent er nooit mee. Hetzelfde geldt voor een postcode (`1000`, maar in Nederland
`1012 AB`) en een telefoonnummer. **Gebruik `number` alleen voor iets waarmee je rekent.**

**`Adres` is een eigen interface.** Het komt twee keer voor in `Klant`. Later heeft een
bestelling ook een leveradres. Eén interface, drie plaatsen.

**`readonly` alleen op `id`.** Een klant mag verhuizen en een ander e-mailadres krijgen.
Alleen de `id` blijft.

**`adresVoorFactuur` geeft een `Adres` terug, geen `Adres | undefined`.** Binnen de
`if` weet TypeScript dat `factuuradres` er is: de controle `!== undefined` maakt het
type smaller. Daarbuiten valt de functie terug op het leveradres, dat altijd bestaat.
Zo hoeft wie de functie gebruikt, nooit zelf te controleren. Hoe dat *smaller maken*
werkt, is het onderwerp van hoofdstuk 6.

---
