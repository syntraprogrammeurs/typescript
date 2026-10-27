# TypeScript — Lessen en oefeningen

Welkom! Deze repository bevat TypeScript-lessen en oefeningen die geleidelijk worden toegevoegd.

## Benodigdheden

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (bij voorkeur een recente LTS-versie, bijvoorbeeld Node.js 24)
- [Git](https://git-scm.com/) (optioneel, voor updates)

Controleer de installatie:

```bash
node -v
npm -v
```

## Repository downloaden

Kloon de repository met `git clone <REPOSITORY-URL>` of kies op GitHub **Code → Download ZIP**.

## Hoe de map is opgebouwd

Per hoofdstuk staat er een map, en daarin een map per paragraaf, met dezelfde nummering als in de cursus
(`4.4-De vorm van een product` hoort bij paragraaf 4.4). In elke paragraaf vind je:

| Bestand of map | Wat erin staat |
| --- | --- |
| `README.md` | De tekst van de paragraaf, met de echte uitvoer van elk voorbeeld |
| `voorbeelden/` | De proefcode uit de tekst, als bestanden. Bovenaan staat in commentaar waar het om gaat, hoe het bestand is opgebouwd en hoe je het uitvoert; onderaan staat wat het toont |
| `startpunt/` | Het project zoals het is **voor** je aan de paragraaf begint (alleen waar code van het project verandert) |
| `oplossing/` | Het project zoals het is **na** de paragraaf. De bestanden die in die paragraaf gemaakt of gewijzigd zijn, hebben bovenaan in commentaar de uitleg en de opbouw van de code; bij een klassikale oefening is dat de opgave, ook in het startpunt |

De `README.md` van een hoofdstuk geeft de inleiding en de lijst van paragrafen. Bij de oefenreeksen staat de
uitwerking van elke oefening in `UITWERKING.md`.

De oplossing van de ene paragraaf is het startpunt van de volgende. Mis je een les, kopieer dan het startpunt
van de paragraaf waar de klas staat naar je eigen werkmap.

## Een oefening starten

1. Open de oefening in VS Code.
2. Open een terminal in de **projectmap met `package.json`**. Bijvoorbeeld:

   `lessen/03-Functies typeren/3.8-Klassikale oefening 3.1 - Kortingsregels combineren/oplossing/groenhuis/domein/`

3. Installeer de dependencies:

   ```bash
   npm install
   ```

4. Start de oefening:

   ```bash
   npm start
   ```

Dit voert `node src/start.ts` uit. De uitvoer verschijnt in de terminal. Rechtstreeks TypeScript uitvoeren vereist een compatibele Node.js-versie; Node.js ondersteunt niet alle TypeScript-syntax zonder extra hulpmiddelen.

## TypeScript controleren

```bash
npm run check
```

Bij deze oefening voert dit `tsc` uit. Afhankelijk van `tsconfig.json` kan dit ook JavaScript-bestanden genereren. Alleen typecontrole uitvoeren zonder uitvoerbestanden:

```bash
npx tsc --noEmit
```

## Commando's

| Commando | Betekenis |
| --- | --- |
| `npm install` | Installeert dependencies van het oefenproject |
| `npm start` | Voert `src/start.ts` uit |
| `npm run check` | Voert de TypeScript-compiler uit |
| `npx tsc --noEmit` | Controleert types zonder uitvoerbestanden |

Niet alle oefeningen hebben noodzakelijk dezelfde scripts. Kijk bij twijfel in hun eigen `package.json`.

## Nieuwe oefeningen ophalen

Als je de repository met Git hebt gekloond, voer dan vanuit de hoofdmap `git pull` uit. Als je een ZIP downloadde, download je de bijgewerkte ZIP opnieuw. Let op eventuele lokale wijzigingen voordat je bijwerkt.

## Problemen oplossen

- **`npm` niet gevonden:** installeer Node.js en herstart de terminal.
- **`package.json` niet gevonden:** open de juiste projectmap.
- **Module ontbreekt:** voer `npm install` uit in die projectmap.
- **Fout bij `npm start`:** controleer `node -v`, de foutmelding en of `src/start.ts` bestaat.
- **Typefouten:** voer `npx tsc --noEmit` uit en lees de foutmeldingen.

Werk de oefeningen eerst zelf uit en gebruik de oplossingen om je werk te controleren. Veel succes!
