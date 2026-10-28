# 7. Type guards, `unknown`, `as` en `satisfies`

| Veld | Waarde |
|---|---|
| Wat je leert | Gegevens die van buiten komen nakijken voor je ze vertrouwt, en de drie manieren om TypeScript iets te vertellen: een type guard, `as` en `satisfies` |
| Je gebruikt uit hoofdstuk 6 | Narrowing met `typeof`, `in` en `Array.isArray`, `as const`, de status van inhoud |
| Wat je oplevert | `controle.ts` en `laden.ts`: de producten komen uit een JSON-bestand, en een fout in dat bestand geeft een duidelijke melding |
| Waar je het later gebruikt | Bij elke request die de server binnenkrijgt (deel III), elke rij uit de databank (deel IV), elk antwoord van een API in de browser (deel II) |

TypeScript kijkt je **code** na. Maar een programma werkt met gegevens die niet in je
code staan: een bestand, een formulier, het antwoord van een server. Wat daarin staat,
weet TypeScript niet. Tot nu toe stonden alle gegevens in `catalogus.ts`, en kon
TypeScript elk product nakijken. In dit hoofdstuk komen ze uit een bestand, en moet je
zelf nakijken.

## In dit hoofdstuk

- [7.1 Het probleem met `JSON.parse`](7.1-Het%20probleem%20met%20JSON.parse/)
- [7.2 `unknown`](7.2-unknown/)
- [7.3 Type predicates](7.3-Type%20predicates/)
- [7.4 Assertion functions](7.4-Assertion%20functions/)
- [7.5 Type guards in `filter`](7.5-Type%20guards%20in%20filter/)
- [7.6 `as`: TypeScript iets wijsmaken](7.6-as%20-%20TypeScript%20iets%20wijsmaken/)
- [7.7 `satisfies`](7.7-satisfies/)
- [7.8 Producten uit een bestand](7.8-Producten%20uit%20een%20bestand/)
- [7.9 Klassikale oefening 7.1 — Klanten uit een bestand nakijken](7.9-Klassikale%20oefening%207.1%20-%20Klanten%20uit%20een%20bestand%20nakijken/)
- [7.10 Klassikale oefening 7.2 — De instellingen van de winkel](7.10-Klassikale%20oefening%207.2%20-%20De%20instellingen%20van%20de%20winkel/)
- [7.11 Veelgemaakte fouten](7.11-Veelgemaakte%20fouten/)
- [7.12 Voor wie klaar is](7.12-Voor%20wie%20klaar%20is/)
- [7.13 Wat je nu kunt](7.13-Wat%20je%20nu%20kunt/)
