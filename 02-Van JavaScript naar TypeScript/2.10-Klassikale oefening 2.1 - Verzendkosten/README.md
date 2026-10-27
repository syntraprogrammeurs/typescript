# 2.10 Klassikale oefening 2.1 — Verzendkosten

**De situatie.** Het Groenhuis verzendt gratis vanaf 50 euro. Daaronder kost verzenden
4,95 euro. Wie zijn bestelling morgen wil, kiest *express*: dat kost altijd 3 euro
extra, ook boven de 50 euro.

**Wat je maakt.**

1. Een bestand `src/verzending.ts` met drie constanten en een functie
   `verzendkosten(totaalInCent, express)`. Alle bedragen in cent.
2. Types bij beide parameters en bij de returnwaarde.
3. In `start.ts` een lus die de verzendkosten toont voor bestellingen van 26,49 euro,
   49,99 euro en precies 50 euro, met en zonder express.
4. Controleer met `npm run check` en `npm start`.
5. Schrijf daarna eens `verzendkosten(4999, "ja")`. Wat zegt TypeScript? Haal het weer
   weg.

### Uitwerking van oefening 2.1

```ts domein/src/verzending.ts
// Het Groenhuis — verzendkosten
// Hoofdstuk 2, klassikale oefening 2.1

export const GRATIS_VANAF = 5000; // vanaf 50 euro verzenden we gratis
export const VERZENDKOST = 495;
export const TOESLAG_EXPRESS = 300;

export function verzendkosten(totaalInCent: number, express: boolean): number {
  const basis = totaalInCent >= GRATIS_VANAF ? 0 : VERZENDKOST;
  return express ? basis + TOESLAG_EXPRESS : basis;
}
```

```ts domein/src/start.ts
for (const totaal of [2649, 4999, 5000]) {
  console.log(
    `Bestelling van ${alsEuro(totaal)}: verzending ${alsEuro(verzendkosten(totaal, false))},` +
      ` express ${alsEuro(verzendkosten(totaal, true))}`,
  );
}
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein
Node.js v24.22.1 op win32
Onderdelen dit jaar: domein, beheer, server, api, winkel
Monstera deliciosa: 24,99 euro excl. btw, 26,49 euro incl. btw
Met 20 % korting: 21,19 euro
Bestelling van 26,49 euro: verzending 4,95 euro, express 7,95 euro
Bestelling van 49,99 euro: verzending 4,95 euro, express 7,95 euro
Bestelling van 50,00 euro: verzending 0,00 euro, express 3,00 euro
```

**Constanten in hoofdletters.** `GRATIS_VANAF` is een regel van de winkel, geen
berekening. Staat ze bovenaan, met een naam, dan vindt de eigenaar ze terug als de
grens volgend jaar 60 euro wordt. In de functie zelf staat dan geen enkel los getal.

**`>=` en niet `>`.** "Vanaf 50 euro" betekent: 50 euro inbegrepen. Daarom test de lus
precies 5000 en 4999: de grens en het bedrag ernaast. Dat zijn de bedragen waar een fout
zich verstopt.

**Geen types bij de constanten.** `GRATIS_VANAF = 5000` is duidelijk genoeg: TypeScript
leidt `number` af. Bij de parameters van de functie móét je het type schrijven. Bij de
returnwaarde mag het weg, maar je schrijft het toch: het is een belofte aan wie de
functie gebruikt, en TypeScript houdt je eraan.

**Wat `verzendkosten(4999, "ja")` zegt.** `Argument of type 'string' is not assignable
to parameter of type 'boolean'`: dezelfde `TS2345` als in 2.7. In JavaScript zou `"ja"`
gewoon als *waar* gelden, en zou `"nee"` dat ook doen.

---
