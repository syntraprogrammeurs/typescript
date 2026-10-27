# 1.6 VS Code en de extensies

Je hebt VS Code al. Controleer of de terminal het commando `code` kent:

```powershell
code --version
```

Kent hij het niet, start dan de installer van VS Code opnieuw en zet het vinkje
**Add to PATH** aan. Op macOS open je VS Code, druk je `Cmd` + `Shift` + `P` en kies je
`Shell Command: Install 'code' command in PATH`.

> **WAAROM**
>
> Voor TypeScript heb je **geen** extensie nodig. VS Code is zelf in TypeScript
> geschreven, en de taalondersteuning zit ingebouwd: de rode kringels, het aanvullen en
> het venster dat het type toont als je met de muis over een naam gaat. Daarom is VS Code
> de standaard bij TypeScript-ontwikkelaars.

Twee extensies maken de foutmeldingen van TypeScript wel veel leesbaarder. Open het
venster **Extensions** met `Ctrl` + `Shift` + `X` en zoek op de **ID**.

| Extensie | ID | Wat ze doet |
|---|---|---|
| Error Lens | `usernamehw.errorlens` | Zet de foutmelding achter de regel zelf, in plaats van in een paneel onderaan |
| Pretty TypeScript Errors | `yoavbls.pretty-ts-errors` | Toont lange typefouten opgemaakt en in stukken, met de types als code |

![Error Lens in de Marketplace. De ID, `usernamehw.errorlens`, staat in het adres van de pagina.](../img/01-errorlens.png)

> **LET OP**
>
> Zoek altijd op de ID, niet op de naam. In de Marketplace staan extensies met bijna
> dezelfde naam, van een andere maker. Een extensie kan alles op je computer lezen wat VS
> Code kan lezen: installeer alleen wat je nodig hebt, van makers die je kunt nagaan.

> **SNELTOETS**
>
> | Toetsen | Wat het doet |
> |---|---|
> | `Ctrl` + `ò` (of `Ctrl` + `` ` ``) | De terminal openen en sluiten |
> | `Ctrl` + `Shift` + `P` | Het opdrachtenpalet: elke opdracht van VS Code, op naam |
> | `Ctrl` + `P` | Een bestand openen op naam |
> | `Ctrl` + `B` | De zijbalk tonen en verbergen |
