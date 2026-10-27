# 2.3 `tsconfig.json`

`tsc` moet weten welke bestanden het moet nakijken, en hoe streng. Dat staat in
**`tsconfig.json`**. TypeScript maakt er een aan met:

```powershell
npx tsc --init
```

```json domein/tsconfig.json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
```

Het bestand is JSON met commentaar: de regels met `//` zijn uitgeschakelde of
toegelichte instellingen. De belangrijkste:

| Instelling | Wat ze doet |
|---|---|
| `module`: `nodenext` | Modules zoals Node ze leest: met `import` en `export`, en `"type": "module"` uit `package.json` |
| `target`: `esnext` | Welke versie van JavaScript het resultaat mag gebruiken: de nieuwste |
| `types`: `[]` | Welke `@types`-pakketten mee mogen doen: geen. Die zet je zo meteen aan |
| `strict`: `true` | Alle strenge controles aan. Zonder deze regel laat TypeScript de helft van de fouten door |
| `noUncheckedIndexedAccess` | `lijst[5]` kan `undefined` zijn, en TypeScript doet alsof je dat weet. Hoofdstuk 5 |
| `exactOptionalPropertyTypes` | Een veld dat er niet hoeft te zijn, is iets anders dan een veld met de waarde `undefined`. Hoofdstuk 4 |
| `sourceMap`, `declaration`, `declarationMap` | Extra bestanden bij het bouwen. Je bouwt niets: weg ermee |
| `jsx`: `react-jsx` | Voor React. Komt in deel II terug, in `beheer` |
| `verbatimModuleSyntax`, `isolatedModules` | Elk bestand moet op zichzelf vertaald kunnen worden. Dat heeft Node nodig, zie 2.5 |
| `skipLibCheck` | Kijk de types van de pakketten in `node_modules` niet na, alleen je eigen code |

Vervang het bestand door deze versie:

```json domein/tsconfig.json
{
  // De instellingen van TypeScript voor het pakket domein. Uitleg: hoofdstuk 2.
  "compilerOptions": {
    // Welk JavaScript er uitkomt, en hoe modules werken: zoals in Node 24
    "module": "nodenext",
    "target": "esnext",
    "types": ["node"],

    // Streng nakijken
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Afspraken zodat Node de bestanden zelf kan uitvoeren
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",

    // tsc kijkt alleen na, Node voert uit
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Wat er veranderd is:

| Instelling | Waarom |
|---|---|
| `types`: `["node"]` | Zodat TypeScript `process` en de modules van Node kent |
| `erasableSyntaxOnly` | Alleen TypeScript toelaten waarvan de types gewoon weggeveegd kunnen worden. Zie 2.9 |
| `allowImportingTsExtensions` | Je schrijft `import … from "./prijs.ts"`, met `.ts`, zoals Node het verwacht |
| `noEmit` | `tsc` maakt geen JavaScript-bestanden. Het kijkt alleen na |
| `include`: `["src"]` | Alleen de map `src` nakijken |
| weg: `sourceMap`, `declaration`, `declarationMap`, `jsx` | Niet nodig zolang je niets bouwt |

> **WAAROM**
>
> Waarom zo streng, van bij het begin? Omdat je strengheid niet achteraf toevoegt. Een
> project dat een jaar zonder `strict` gegroeid is, toont bij het aanzetten honderden
> fouten tegelijk. Niemand lost die op, en dus blijft het uit. Begin je streng, dan los je
> elke fout op op het moment dat je hem maakt: één per keer.
