# 1.8 De projectmap

Maak één map voor de hele cursus, rechtstreeks op je C-schijf:

```powershell
mkdir C:\cursus\groenhuis
cd C:\cursus\groenhuis
code .
```

> **LET OP**
>
> Zet je project **niet** in **Documenten** of op het **Bureaublad**. Op veel Windows-
> laptops staan die mappen in OneDrive. OneDrive probeert dan elk bestand in
> `node_modules` te synchroniseren: tienduizenden kleine bestanden. Dat maakt `npm
> install` traag en geeft af en toe vreemde fouten omdat een bestand op slot staat.
>
> Gebruik ook geen spaties en geen accenten in de naam van de map. Sommige hulpprogramma's
> kunnen daar nog altijd niet mee overweg.

Maak in `groenhuis` drie bestanden. Het eerste beschrijft het project voor wie de
repository opent:

```markdown README.md
# Het Groenhuis

Een webwinkel voor planten, potten en tuingerief, met een eigen CMS.
Gebouwd tijdens de jaarcursus Full Stack Developer.

| Map | Wat erin komt | Vanaf |
|---|---|---|
| `domein/` | de regels van het CMS, in TypeScript | deel I |
| `beheer/` | het beheerpaneel voor het personeel, in React | deel II |
| `server/` | een eigen REST-API met Express | deel III |
| `api/` | de definitieve API met NestJS en Prisma | deel VII |
| `winkel/` | de webwinkel voor de klanten, met Next.js | deel VIII |
```

Het tweede zegt welke bestanden Git moet negeren:

```text .gitignore
node_modules/
dist/
.env
*.log
.DS_Store
```

| Regel | Waarom negeren |
|---|---|
| `node_modules/` | De geïnstalleerde pakketten. `npm install` maakt ze opnieuw aan, en het zijn er duizenden |
| `dist/` | De gebouwde code. Die maak je opnieuw met één commando |
| `.env` | Wachtwoorden en sleutels. Die komen **nooit** in Git |
| `*.log` | Logbestanden |
| `.DS_Store` | Een bestand dat macOS in elke map zet |

Het derde zegt hoe Git met het einde van een regel omgaat:

```text .gitattributes
* text=auto eol=lf
```

> **BEGRIP — Regeleinde**
>
> Elke regel in een tekstbestand eindigt met een onzichtbaar teken. Windows gebruikt er
> twee (`CR` en `LF`, samen **CRLF**), macOS en Linux één (**LF**).
>
> *Waarom het ertoe doet:* werken twee mensen met een ander systeem aan hetzelfde
> bestand, dan lijkt elke regel gewijzigd, ook als er niets veranderd is. Met
> `* text=auto eol=lf` bewaart Git elk tekstbestand met **LF**, op elk systeem. Servers
> draaien op Linux, dus LF is de afspraak.
