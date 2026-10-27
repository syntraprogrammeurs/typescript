# 1.11 De debugger

Met `console.log` zie je wat je programma toont. Met de **debugger** zie je wat het
**doet**: regel per regel, met de waarde van elke variabele op dat moment.

> **BEGRIP — Debugger en breakpoint**
>
> Een **debugger** voert je programma uit en laat het stoppen waar jij wilt. Een
> **breakpoint** is zo'n stopplaats: een rode stip voor een regel.
>
> *Waarom:* een fout zit bijna altijd in een waarde die anders is dan je denkt. In de
> debugger zie je die waarde, in plaats van ze te raden.

1. Open `start.js`. Klik links van het regelnummer van de laatste regel. Er verschijnt
   een rode stip.
2. Open het opdrachtenpalet (`Ctrl` + `Shift` + `P`) en kies
   **Debug: JavaScript Debug Terminal**. Er opent een nieuwe terminal.
3. Typ in die terminal, in de map `domein`, `npm start`.
4. Het programma stopt op je breakpoint. Links, in het venster **Variables**, zie je
   `winkel` en `onderdelen` met hun waarde.
5. Druk `F10` om één regel verder te gaan, of `F5` om door te lopen tot het einde.

> **SNELTOETS**
>
> | Toets | Wat het doet |
> |---|---|
> | `F9` | Een breakpoint zetten of weghalen op de regel waar je cursor staat |
> | `F10` | Eén regel verder (*step over*) |
> | `F11` | In de functie op deze regel stappen (*step into*) |
> | `F5` | Doorlopen tot het volgende breakpoint |
> | `Shift` + `F5` | Stoppen |

> **WAAROM**
>
> Waarom een **JavaScript Debug Terminal** en geen knop *Run*? Omdat zo'n terminal elk
> Node-programma dat erin start, aan de debugger koppelt: ook als het via `npm start`,
> `npm test` of een ander script loopt. Je hoeft niets in te stellen. Dat blijft zo
> wanneer je vanaf het volgende hoofdstuk TypeScript schrijft.
