# 2.2 TypeScript installeren

TypeScript is een npm-pakket. Je installeert het **in het project**, niet op je hele
computer.

```powershell
cd C:\cursus\groenhuis\domein
npm install -D typescript @types/node@24
```

Dit doet drie dingen. Je `package.json` krijgt er een stuk bij:

```json domein/package.json
  "devDependencies": {
    "@types/node": "^24.19.2",
    "typescript": "^7.0.2"
  }
```

Er komt een map `node_modules` met de pakketten zelf, en een bestand
`package-lock.json`.

| Wat | Wat het is | In Git? |
|---|---|---|
| `devDependencies` | De pakketten die je nodig hebt om te **ontwikkelen**, niet om het programma te laten draaien | ja, in `package.json` |
| `node_modules/` | De pakketten zelf, met alles wat zij op hun beurt nodig hebben | **nee**, staat in `.gitignore` |
| `package-lock.json` | De exacte versie van elk pakket in `node_modules` | **ja** |

> **BEGRIP — devDependencies en dependencies**
>
> **`dependencies`** zijn pakketten die je programma nodig heeft om te draaien, bij de
> klant of op de server. **`devDependencies`** heb je alleen nodig tijdens het
> ontwikkelen: de compiler, de testrunner, de linter. `-D` betekent: zet het bij de
> `devDependencies`.
>
> *Waarom TypeScript een devDependency is:* de types verdwijnen voor het programma draait.
> Op de server heeft niemand TypeScript nodig.

> **BEGRIP — @types/node**
>
> TypeScript kent de functies van de browser en van JavaScript zelf. Wat Node er
> bijbrengt, zoals `process` of `node:fs`, kent het niet. Het pakket **`@types/node`**
> beschrijft die. `@24` vraagt de versie die past bij Node 24.

> **BEGRIP — Het dakje in ^7.0.2**
>
> `^7.0.2` betekent: versie 7.0.2 **of nieuwer, zolang het eerste getal 7 blijft**. Een
> versienummer heeft drie delen: **major.minor.patch**. Een nieuwe patch herstelt fouten,
> een nieuwe minor voegt iets toe, een nieuwe major kan bestaande code breken. Het dakje
> laat de eerste twee door en houdt de derde tegen.
>
> *En waarom dan nog `package-lock.json`?* Omdat "7.0.2 of nieuwer" vandaag iets anders
> kan betekenen dan volgende maand. Het lock-bestand legt vast welke versie er **nu**
> staat. Wie je project downloadt en `npm install` typt, krijgt precies die versie.

Controleer de installatie:

```powershell
npx tsc -v
```

```text
Version 7.0.2
```

> **BEGRIP — npx**
>
> **`npx`** voert een programma uit dat in `node_modules` van het project staat. `tsc`
> staat niet op je computer, alleen in dit project. `npx tsc` vindt het daar.
>
> *Waarom niet overal installeren:* elk project kiest zijn eigen versie. Een project van
> vorig jaar blijft werken met TypeScript 5, ook als je nieuwe project 7 gebruikt.
