# 1.14 Klassikale oefening 1.1 — De werkruimte voor iedereen gelijk

**De situatie.** In een team wil je niet dat de ene collega met tabs werkt en de andere
met spaties, of dat het ene bestand met CRLF eindigt en het andere met LF. Die
afspraken zet je in de repository zelf, zodat iedereen ze krijgt die het project
opent.

**Wat je maakt.** In `groenhuis` een map `.vscode` met twee bestanden.

1. `settings.json`: opmaken bij opslaan, inspringen met twee spaties, een verticale lijn
   op kolom 110, LF als regeleinde, een lege regel op het einde van elk bestand, geen
   spaties op het einde van een regel, en PowerShell als terminal op Windows.
2. `extensions.json`: VS Code raadt iedereen die het project opent de twee extensies uit
   paragraaf 1.6 aan.

Zoek de namen van de instellingen zelf op: open de instellingen met `Ctrl` + `,`, zoek
op een woord, klik op het tandwiel naast een instelling en kies **Copy Setting ID**.

### Uitwerking van oefening 1.1

```json .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.rulers": [110],
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

```json .vscode/extensions.json
{
  "recommendations": [
    "usernamehw.errorlens",
    "yoavbls.pretty-ts-errors"
  ]
}
```

**Werkruimte of gebruiker.** VS Code kent twee niveaus van instellingen. Je
**gebruikersinstellingen** gelden voor alles wat je opent, en zijn van jou alleen. De
**werkruimte-instellingen** staan in `.vscode/settings.json` van het project, en gelden
voor iedereen die dat project opent. Bij een verschil wint de werkruimte.

| Instelling | Waarom in de werkruimte |
|---|---|
| `editor.formatOnSave` | Iedereen levert opgemaakte code op |
| `editor.tabSize` | Twee spaties is de afspraak in JavaScript en TypeScript |
| `editor.rulers` | Een lijn op 110 tekens: wat erover loopt, splits je |
| `files.eol` | Past bij `.gitattributes`: VS Code maakt nieuwe bestanden meteen met LF |
| `files.insertFinalNewline` | Git meldt anders *No newline at end of file* bij elke wijziging |
| `files.trimTrailingWhitespace` | Spaties op het einde van een regel geven wijzigingen die niemand ziet |

**Wat `extensions.json` doet.** Opent iemand het project zonder die extensies, dan toont
VS Code rechtsonder de vraag of hij ze wil installeren. Het installeert niets zonder te
vragen.

**Wat er níét in hoort.** Je lettertype, je kleurenthema, de grootte van je letters: dat
is persoonlijk. Zet je dat in de werkruimte, dan dwing je het je collega's op.

---
