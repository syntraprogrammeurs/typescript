# 8. Klassen

| Veld | Waarde |
|---|---|
| Wat je leert | Gegevens en de regels die erover gaan samenbrengen in een klasse: velden, een constructor, methodes, getters en setters, `static`, en wie wat mag zien |
| Je gebruikt uit hoofdstuk 7 | `ProductGegevens` uit een JSON-bestand, nagekeken met `controleerProduct` |
| Wat je oplevert | `product.ts`: een klasse `Product` die zelf bewaakt dat haar prijs, voorraad en status kloppen |
| Waar je het later gebruikt | In elke service van deel I, in de foutklassen van hoofdstuk 13, en in NestJS (deel VII), waar alles een klasse is |

Tot nu toe was een product een object met velden, en stonden de regels in losse
functies: `isZichtbaar` in `zoeken.ts`, `metBtw` in `prijs.ts`, de controle in
`controle.ts`. Niets hield iemand tegen om ergens `product.voorraad = -5` te schrijven.
Een klasse brengt de gegevens en de regels samen, en laat alleen toe wat volgens de regels
mag.

## In dit hoofdstuk

- [8.1 Waarom een klasse](8.1-Waarom%20een%20klasse/)
- [8.2 Je eerste klasse](8.2-Je%20eerste%20klasse/)
- [8.3 Een naam vrijmaken](8.3-Een%20naam%20vrijmaken/)
- [8.4 De klasse `Product`](8.4-De%20klasse%20Product/)
- [8.5 Getters en setters](8.5-Getters%20en%20setters/)
- [8.6 Methodes die de regels bewaken](8.6-Methodes%20die%20de%20regels%20bewaken/)
- [8.7 `static`](8.7-static/)
- [8.8 `public`, `private`, `protected` en `#`](8.8-public,%20private,%20protected%20en%20#/)
- [8.9 Een klasse en JSON](8.9-Een%20klasse%20en%20JSON/)
- [8.10 `this` kwijtraken](8.10-this%20kwijtraken/)
- [8.11 Klassikale oefening 8.1 — Het winkelmandje](8.11-Klassikale%20oefening%208.1%20-%20Het%20winkelmandje/)
- [8.12 Klassikale oefening 8.2 — De klasse `Pagina`](8.12-Klassikale%20oefening%208.2%20-%20De%20klasse%20Pagina/)
- [8.13 Veelgemaakte fouten](8.13-Veelgemaakte%20fouten/)
- [8.14 Voor wie klaar is](8.14-Voor%20wie%20klaar%20is/)
- [8.15 Wat je nu kunt](8.15-Wat%20je%20nu%20kunt/)
