# 5. Arrays, tuples en arraymethodes

| Veld | Waarde |
|---|---|
| Wat je leert | Lijsten met types: aanmaken, uitlezen, omzetten met `map`, `filter`, `find`, `reduce` en `toSorted`, lijsten beschermen met `readonly`, en tuples |
| Je gebruikt uit hoofdstuk 4 | `Product`, `Categorie` en de catalogus in `catalogus.ts` |
| Wat je oplevert | `zoeken.ts`: de catalogus filteren, zoeken, sorteren en optellen |
| Waar je het later gebruikt | Elke lijst in het beheer is een `map` (deel II), elke zoekopdracht in de API een `filter` en daarna een `WHERE` (deel III en IV) |

Een catalogus is een lijst. Bijna alles wat een CMS doet, is iets met lijsten: tonen,
zoeken, sorteren, tellen. JavaScript heeft daar methodes voor die je misschien al
gebruikte. In dit hoofdstuk leer je ze met types, en zie je wat TypeScript er voor jou
bij nakijkt.

## In dit hoofdstuk

- [5.1 Het type van een lijst](5.1-Het%20type%20van%20een%20lijst/)
- [5.2 Een element uitlezen](5.2-Een%20element%20uitlezen/)
- [5.3 `map`: elk element omzetten](5.3-map%20-%20elk%20element%20omzetten/)
- [5.4 `filter`: elementen overhouden](5.4-filter%20-%20elementen%20overhouden/)
- [5.5 Filteren en zoeken](5.5-Filteren%20en%20zoeken/)
- [5.6 `reduce`: een lijst samenvatten](5.6-reduce%20-%20een%20lijst%20samenvatten/)
- [5.7 Sorteren](5.7-Sorteren/)
- [5.8 `readonly`-lijsten](5.8-readonly-lijsten/)
- [5.9 Tuples](5.9-Tuples/)
- [5.10 Kopiëren met spread](5.10-Kopiëren%20met%20spread/)
- [5.11 Klassikale oefening 5.1 — Herschrijven met `filter` en `reduce`](5.11-Klassikale%20oefening%205.1%20-%20Herschrijven%20met%20filter%20en%20reduce/)
- [5.12 Klassikale oefening 5.2 — De bestellijst voor de inkoper](5.12-Klassikale%20oefening%205.2%20-%20De%20bestellijst%20voor%20de%20inkoper/)
- [5.13 Veelgemaakte fouten](5.13-Veelgemaakte%20fouten/)
- [5.14 Voor wie klaar is](5.14-Voor%20wie%20klaar%20is/)
- [5.15 Wat je nu kunt](5.15-Wat%20je%20nu%20kunt/)
