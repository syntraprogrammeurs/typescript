# 1.12 De repository op GitHub

Ga terug naar de map `groenhuis` en zet het project onder versiebeheer.

```powershell
cd C:\cursus\groenhuis
git init
git add .
git status
```

```text
Initialized empty Git repository in C:/cursus/groenhuis/.git/
```

```text
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   .gitattributes
	new file:   .gitignore
	new file:   README.md
	new file:   domein/package.json
	new file:   domein/src/start.js

warning: in the working copy of 'domein/package.json', CRLF will be replaced by LF the next time Git touches it
warning: in the working copy of 'domein/src/start.js', CRLF will be replaced by LF the next time Git touches it
```

> **CONTROLE**
>
> Vijf bestanden staan klaar voor de eerste commit. Staat er een map `node_modules`
> in de lijst, dan klopt je `.gitignore` niet. Staat er een bestand bij dat je niet kent,
> haal het dan weg uit de commit met `git rm --cached <bestand>` voor je verdergaat.

Maak de eerste commit:

```powershell
git commit -m "Zet het project Het Groenhuis op"
```

Maak op GitHub een nieuwe repository:

1. Klik rechtsboven op **+** en kies **New repository**.
2. Naam: `groenhuis`. Kies **Private**.
3. Vink **niets** aan bij *Add a README file*, *.gitignore* of *license*: die heb je al.
4. Klik **Create repository**.

GitHub toont nu een paar commando's. Gebruik die onder *…or push an existing repository
from the command line*. Ze zien er zo uit, met jouw gebruikersnaam:

```powershell
git remote add origin https://github.com/jouwnaam/groenhuis.git
git branch -M main
git push -u origin main
```

> **CONTROLE**
>
> Vernieuw de pagina op GitHub. Je ziet je vijf bestanden, en onder de lijst je README
> met de tabel van de mappen. Geef de docent toegang: **Settings** → **Collaborators** →
> **Add people**.

> **LET OP**
>
> Vraagt Git bij `git push` om een wachtwoord, typ dan **niet** het wachtwoord van je
> GitHub-account: GitHub aanvaardt dat niet meer. Op Windows opent normaal een venster
> om in te loggen via de browser. Verschijnt dat niet, installeer Git dan opnieuw met de
> standaardkeuzes; de *Git Credential Manager* zit erbij.
