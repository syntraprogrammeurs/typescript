# 1.10 Je eerste script

Maak een map `src` in `domein`, met daarin `start.js`:

```js domein/src/start.js
// Het Groenhuis — het domein van het CMS
// Hoofdstuk 1: het eerste bestand dat Node uitvoert

const winkel = "Het Groenhuis";
const onderdelen = ["domein", "beheer", "server", "api", "winkel"];

console.log(`${winkel} — het domein`);
console.log(`Node.js ${process.version} op ${process.platform}`);
console.log(`Onderdelen dit jaar: ${onderdelen.join(", ")}`);
```

Vervang in `package.json` het script `test` door een script `start`:

```json domein/package.json
  "scripts": {
    "start": "node src/start.js"
  }
```

Voer het uit, in de map `domein`:

```powershell
npm start
```

```text

> domein@0.1.0 start
> node src/start.js

Het Groenhuis — het domein
Node.js v24.22.1 op win32
Onderdelen dit jaar: domein, beheer, server, api, winkel
```

![`npm start` in de terminal van VS Code.](../img/01-npm-start.png)

De twee regels met `>` komen van npm. Ze zeggen welk script het uitvoert, en met welk
commando. Daaronder staat wat je programma zelf toont.

> **BEGRIP — npm-script**
>
> Een **npm-script** is een commando met een naam, in `package.json`. `npm run <naam>`
> voert het uit. Voor `start` en `test` mag `run` weg: `npm start` en `npm test`.
>
> *Waarom:* een team spreekt af dat `npm start` het project start en `npm test` de tests
> uitvoert, ook als de commando's erachter lang en ingewikkeld worden. Niemand hoeft ze
> te onthouden.

> **CONTROLE**
>
> Staat er bij jou `darwin` of `linux` in plaats van `win32`? Dan werk je op macOS of
> Linux. `process.platform` zegt op welk systeem Node draait.

De mappenstructuur ziet er nu zo uit:

```text
groenhuis/
├── domein/
│   ├── src/
│   │   └── start.js
│   └── package.json
├── .gitattributes
├── .gitignore
└── README.md
```
