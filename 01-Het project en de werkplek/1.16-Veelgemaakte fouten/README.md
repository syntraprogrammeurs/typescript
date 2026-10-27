# 1.16 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `'node' is not recognized` | De terminal stond al open voor de installatie | Sluit alle terminals, ook die in VS Code, en open een nieuwe. Helpt dat niet: herstart VS Code |
| `npm.ps1 cannot be loaded because running scripts is disabled` | PowerShell weigert scripts | `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `npm error enoent Could not read package.json` | Je terminal staat in een andere map dan `domein` | `cd C:\cursus\groenhuis\domein` |
| `Cannot use import statement outside a module` | `"type": "module"` ontbreekt in `package.json` | Zet het erin |
| `npm start` zegt `Missing script: "start"` | Het script staat er niet in, of `package.json` is ongeldige JSON | Kijk of er een komma te veel of te weinig staat |
| `ReferenceError: document is not defined` | Je gebruikt iets uit de browser in Node | In Node is er geen pagina |
| `npm install` is erg traag, of geeft `EPERM` | Je project staat in OneDrive | Verplaats het naar `C:\cursus` |
| `node_modules` staat in `git status` | `.gitignore` ontbreekt of staat in de verkeerde map | `.gitignore` hoort in `groenhuis`, naast `README.md` |
| GitHub weigert je wachtwoord | Wachtwoorden werken niet meer voor Git | Meld je aan via het venster van de Git Credential Manager |
