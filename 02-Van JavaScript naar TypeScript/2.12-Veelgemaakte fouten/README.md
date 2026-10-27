# 2.12 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `npm start` werkt, maar er staan rode kringels | Node kijkt niets na | `npm run check`, en los de fouten op |
| `error TS18003: No inputs were found in config file` | Er staat geen enkel `.ts`-bestand in `src` | Hernoem je bestanden naar `.ts`, of controleer `include` |
| `Cannot find name 'process'` | `types` staat niet op `["node"]`, of `@types/node` is niet geïnstalleerd | Kijk `tsconfig.json` en `devDependencies` na |
| `An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled` | De instelling ontbreekt in `tsconfig.json` | Zet ze erbij |
| `Cannot find module './prijs'` bij `npm start` | Je importeerde zonder extensie | Schrijf `./prijs.ts` |
| `Parameter 'x' implicitly has an 'any' type` | Een parameter zonder type | Schrijf het type erbij |
| `'tsc' is not recognized` | Je typte `tsc` zonder `npx`, of TypeScript is niet geïnstalleerd | `npx tsc`, of `npm install` in `domein` |
| VS Code toont een andere fout dan `npm run check` | VS Code gebruikt zijn eigen ingebouwde TypeScript | `npm run check` beslist |
| De kringel blijft staan nadat je de fout herstelde | VS Code heeft het nog niet gezien | Sla het bestand op. Helpt dat niet: `Ctrl` + `Shift` + `P` → **TypeScript: Restart TS Server** |
