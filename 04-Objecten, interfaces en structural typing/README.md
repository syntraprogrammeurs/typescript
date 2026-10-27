# 4. Objecten, interfaces en structural typing

| Veld | Waarde |
|---|---|
| Wat je leert | De vorm van een object beschrijven met `interface` en `type`, optionele en `readonly`-velden, uitbreiden met `extends` en `&`, en hoe TypeScript twee vormen met elkaar vergelijkt |
| Je gebruikt uit hoofdstuk 3 | Functies met types, optionele parameters, `type` als naam voor een type |
| Wat je oplevert | `inhoud.ts` met de vorm van `Product`, `Categorie` en `Pagina`, en `catalogus.ts` met de eerste voorbeeldgegevens |
| Waar je het later gebruikt | Elke API-response, elke rij uit de databank, elke prop van een React-component is een object met een vorm |

Tot nu toe werkte je met losse getallen en teksten. Een product is meer dan dat: een
naam, een prijs, een voorraad, een categorie. In JavaScript is dat een object. In dit
hoofdstuk beschrijf je de **vorm** van die objecten, zodat TypeScript elk veld kent.

## In dit hoofdstuk

- [4.1 Een objecttype](4.1-Een%20objecttype/)
- [4.2 `interface` en `type`](4.2-interface%20en%20type/)
- [4.3 Optionele en `readonly`-velden](4.3-Optionele%20en%20readonly-velden/)
- [4.4 De vorm van een product](4.4-De%20vorm%20van%20een%20product/)
- [4.5 Uitbreiden met `extends` en `&`](4.5-Uitbreiden%20met%20extends%20en%20&/)
- [4.6 Een gemeenschappelijke basis en index signatures](4.6-Een%20gemeenschappelijke%20basis%20en%20index%20signatures/)
- [4.7 Structural typing](4.7-Structural%20typing/)
- [4.8 De eerste catalogus](4.8-De%20eerste%20catalogus/)
- [4.9 Klassikale oefening 4.1 — Klanten en adressen](4.9-Klassikale%20oefening%204.1%20-%20Klanten%20en%20adressen/)
- [4.10 Klassikale oefening 4.2 — Eén etiket voor alles met een naam en een prijs](4.10-Klassikale%20oefening%204.2%20-%20Eén%20etiket%20voor%20alles%20met%20een%20naam%20en%20een%20prijs/)
- [4.11 Veelgemaakte fouten](4.11-Veelgemaakte%20fouten/)
- [4.12 Voor wie klaar is](4.12-Voor%20wie%20klaar%20is/)
- [4.13 Wat je nu kunt](4.13-Wat%20je%20nu%20kunt/)
