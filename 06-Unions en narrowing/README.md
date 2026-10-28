# 6. Unions en narrowing

| Veld | Waarde |
|---|---|
| Wat je leert | Types die uit een vaste reeks waarden bestaan, types die *dit of dat* zijn, en hoe TypeScript uit je `if` en `switch` afleidt welk van de twee het is |
| Je gebruikt uit hoofdstuk 5 | `find` en `undefined`, `filter`, de catalogus en `zoeken.ts` |
| Wat je oplevert | Een status voor alle inhoud, een pagina die uit blokken bestaat, en een `switch` die TypeScript laat nakijken op volledigheid |
| Waar je het later gebruikt | In de pagina-editor van het beheer (deel II), in de statussen van een bestelling (deel VII) en bij het tonen van de pagina's in de winkel (deel VIII) |

Je kwam het teken `|` al een paar keer tegen: `string | number`, `Product | undefined`.
In dit hoofdstuk leer je er echt mee werken. Het is het stuk van TypeScript dat de
meeste fouten voorkomt, omdat het je dwingt aan elk geval te denken.

## In dit hoofdstuk

- [6.1 Literal types](6.1-Literal%20types/)
- [6.2 Unions](6.2-Unions/)
- [6.3 Narrowing](6.3-Narrowing/)
- [6.4 `null`, `undefined`, `?.` en `??`](6.4-null,%20undefined,%20.%20en/)
- [6.5 Een status voor alle inhoud](6.5-Een%20status%20voor%20alle%20inhoud/)
- [6.6 Discriminated unions: een pagina uit blokken](6.6-Discriminated%20unions%20-%20een%20pagina%20uit%20blokken/)
- [6.7 Niets vergeten met `never`](6.7-Niets%20vergeten%20met%20never/)
- [6.8 `as const`](6.8-as%20const/)
- [6.9 Klassikale oefening 6.1 — Waar is mijn bestelling?](6.9-Klassikale%20oefening%206.1%20-%20Waar%20is%20mijn%20bestelling/)
- [6.10 Klassikale oefening 6.2 — Zoeken met optionele filters](6.10-Klassikale%20oefening%206.2%20-%20Zoeken%20met%20optionele%20filters/)
- [6.11 Veelgemaakte fouten](6.11-Veelgemaakte%20fouten/)
- [6.12 Voor wie klaar is](6.12-Voor%20wie%20klaar%20is/)
- [6.13 Wat je nu kunt](6.13-Wat%20je%20nu%20kunt/)
