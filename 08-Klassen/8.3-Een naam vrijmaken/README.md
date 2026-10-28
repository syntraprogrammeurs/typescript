# 8.3 Een naam vrijmaken

De klasse die je gaat schrijven, heet `Product`. Maar `Product` is al de naam van de
interface in `inhoud.ts`. Die interface blijft nodig: ze beschrijft de **gegevens** van een
product, zoals ze in een JSON-bestand staan. Geef ze daarom een duidelijkere naam:
`ProductGegevens`.

Je doet dat niet met zoeken en vervangen, maar met VS Code:

1. Zet je cursor op `Product` in `export interface Product extends Inhoud`.
2. Druk `F2`, typ `ProductGegevens` en druk `Enter`.

VS Code wijzigt de naam in **elk** bestand dat ze gebruikt, en alleen daar:

| Bestand | Wat er gebeurt |
|---|---|
| `groenhuis/domein/src/catalogus.ts` | gewijzigd |
| `groenhuis/domein/src/controle.ts` | gewijzigd |
| `groenhuis/domein/src/inhoud.ts` | gewijzigd |
| `groenhuis/domein/src/inkoop.ts` | gewijzigd |
| `groenhuis/domein/src/laden.ts` | gewijzigd |
| `groenhuis/domein/src/start.ts` | gewijzigd |
| `groenhuis/domein/src/zoeken.ts` | gewijzigd |

> **SNELTOETS**
>
> `F2` (**Rename Symbol**) hernoemt een variabele, functie, interface of klasse overal waar
> ze gebruikt wordt. Het verschil met zoeken en vervangen: het wijzigt geen woord dat toevallig
> hetzelfde is, zoals `Product` in een commentaar of een `producten` in een tekst. Hernoem
> nooit met de hand.

> **CONTROLE**
>
> `npm run check` en `npm start` werken zoals voorheen. Een hernoeming verandert niets aan
> wat het programma doet.
