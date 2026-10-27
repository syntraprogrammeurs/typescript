# 1.9 Het eerste pakket

Het Groenhuis bestaat uit meerdere delen. Elk deel krijgt een eigen map met een eigen
`package.json`. Het eerste deel is `domein`.

```powershell
mkdir domein
cd domein
npm init -y
```

`npm init -y` maakt een bestand `package.json` met standaardwaarden:

```json
{
  "name": "domein",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

> **BEGRIP — package.json**
>
> **`package.json`** is de identiteitskaart van een JavaScript-project. Er staat in hoe
> het project heet, welke pakketten het nodig heeft, welke scripts je kunt uitvoeren en
> hoe Node de bestanden moet lezen.
>
> *Waarom het ertoe doet:* wie je project downloadt, typt `npm install` en heeft meteen
> dezelfde pakketten als jij. Zonder `package.json` weet niemand wat je project nodig
> heeft.

Pas het bestand aan tot dit:

```json domein/package.json
{
  "name": "domein",
  "version": "0.1.0",
  "private": true,
  "description": "De regels van het CMS van Het Groenhuis",
  "type": "module",
  "engines": {
    "node": ">=24"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

| Veld | Wat het zegt | Waarom deze waarde |
|---|---|---|
| `name` | De naam van het pakket | Kleine letters, geen spaties |
| `version` | De versie | `0.1.0`: er is nog niets af. `1.0.0` is voor de eerste versie die echt gebruikt wordt |
| `private` | Dit pakket mag **nooit** gepubliceerd worden | Wie per ongeluk `npm publish` typt, zet je code anders openbaar op npmjs.com |
| `description` | Eén zin over het pakket | Voor wie de repository opent |
| `type` | Hoe Node `.js`-bestanden leest | `module`: met `import` en `export`, zoals in de browser |
| `engines` | Welke Node-versie het project nodig heeft | Vanaf 24. npm waarschuwt wie een oudere versie heeft |
| `scripts` | Commando's met een naam | Vul je in de volgende paragraaf in |

De velden `main`, `keywords`, `author` en `license` zijn weg. Ze zijn bedoeld voor
pakketten die je publiceert, en dat doe je met dit pakket niet.

> **LET OP**
>
> Vergeet `"type": "module"` niet. Zonder die regel leest Node je bestanden in het oude
> formaat, **CommonJS**, met `require()` in plaats van `import`. Je krijgt dan bij de
> eerste `import` de melding `Cannot use import statement outside a module`. Sinds een
> recente versie zet `npm init` er zelf `"type": "commonjs"` in: die moet je dus
> uitdrukkelijk wijzigen.
