# 2.5 Node voert TypeScript uit, maar kijkt niets na

Je hebt nog twee JavaScript-bestanden: `start.js` en `voorraad.js`. Hernoem ze naar
`start.ts` en `voorraad.ts`. Klik in VS Code met de rechtermuisknop op het bestand en
kies **Rename**, of druk `F2`.

Pas in `package.json` de scripts aan:

```json domein/package.json
  "scripts": {
    "start": "node src/start.ts",
    "check": "tsc"
  },
```

```powershell
npm run check
npm start
```

```text

> domein@0.1.0 check
> tsc
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein
Node.js v24.22.1 op win32
Onderdelen dit jaar: domein, beheer, server, api, winkel
```

`npm run check` toont alleen de twee regels van npm: geen fouten. `npm start` voert
`start.ts` uit, een TypeScript-bestand, rechtstreeks met Node.

> **BEGRIP — Type stripping**
>
> Sinds versie 23.6 kan Node TypeScript-bestanden uitvoeren. Het doet dat door de types
> weg te vegen (**type stripping**) en de rest als JavaScript uit te voeren. Node vervangt
> elke type door spaties, zodat de regels en kolommen in een foutmelding blijven kloppen.
>
> *Wat Node níét doet:* nakijken. Het weet niet of de types kloppen, en het wil het ook
> niet weten. Dat is het werk van `tsc`.

Probeer het. Maak `src/proef.ts` opnieuw aan, met de fout erin, en voer het uit:

```ts domein/src/proef.ts
const aantalPotten = "40";
let totaal = 0;

totaal = totaal + aantalPotten;
console.log(`Totaal: ${totaal} potten`);
```

```powershell
npx tsc
node src/proef.ts
```

```text
src/proef.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'number'.

4 totaal = totaal + aantalPotten;
  ~~~~~~

Found 1 error in src/proef.ts:4
Totaal: 040 potten
```

`tsc` weigert, en Node voert het gewoon uit, met het verkeerde antwoord.

> **LET OP**
>
> **Groen in de terminal betekent niet dat je code klopt.** Een programma dat draait, kan
> vol typefouten zitten. Daarom draai je `npm run check` voor elke commit, en kijk je naar
> de rode kringels in VS Code. Wie alleen `npm start` gebruikt, gebruikt TypeScript niet.

> **SNELTOETS**
>
> `tsc` kan blijven meekijken terwijl je werkt:
>
> ```powershell
> npm run check -- --watch
> ```
>
> Alles na `--` geeft npm door aan het script. Elke keer dat je een bestand opslaat, kijkt
> `tsc` opnieuw na. Stoppen doe je met `Ctrl` + `C`.
