# 2.13 Voor wie klaar is

1. Zet in `tsconfig.json` `strict` tijdelijk op `false` en voer `npm run check` uit op
   het bestand uit oefening 2.2, met de fouten erin. Welke fout verdwijnt? Zet `strict`
   terug.
2. Zoek in de documentatie van TypeScript op welke zeven instellingen `strict` allemaal
   aanzet. Je vindt ze op `https://www.typescriptlang.org/tsconfig/#strict`.
3. Zoek op wat `const` met een type als `"Monstera"` doet: schrijf
   `const naam = "Monstera";` en ga er met de muis over. Waarom is het type niet
   `string`? Hoofdstuk 6 legt het uit.
4. Vergelijk `Math.round(2.5)` en `Math.round(-2.5)` in de REPL. Wat betekent dat voor
   een korting die een bedrag negatief zou maken?
