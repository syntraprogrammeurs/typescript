# Over dit deel

## Waar je staat

Je kent HTML, Tailwind CSS en JavaScript: je hebt webpagina's gebouwd en ze met
JavaScript tot leven gebracht. Dat is de vertrekbasis. Wat je in dit deel leert, bouwt daarop voort: niets van wat je al kent,
wordt opnieuw uitgelegd, en alles wat nieuw is, wel.

Aan het einde van dit deel ken je **TypeScript**. Niet een handvol trucjes om rode kringels
weg te krijgen, maar de taal zelf: types, functies, objecten, unions, klassen, generics,
eigen fouten, modules, asynchrone code, utility types en validatie van gegevens die van
buiten komen. Je kunt een programma van enkele duizenden regels opdelen, testen en
onderhouden. En je weet bij elke regel waarom TypeScript ze aanvaardt of weigert.

## Wat je dit jaar bouwt

Het hele jaar bouw je aan één applicatie: **Het Groenhuis**, een webwinkel voor planten,
potten en tuingerief, met een eigen CMS. Aan het einde van het jaar zijn het drie
programma's die samen één product vormen: een webwinkel voor klanten, een beheerpaneel voor
het personeel, en een API met een databank daartussen.

Dit eerste deel bouwt het **hart**: het pakket `domein`. Daarin staan de regels van Het
Groenhuis, los van elk scherm en elke databank. Wat een product is. Wanneer een pagina
gepubliceerd mag worden. Hoe een prijs met btw berekend wordt. Wat er in een winkelmandje
mag. Alle latere delen gebruiken die regels: het beheer in React, de server in Express, de
API in NestJS en de winkel in Next.js. Wat je hier goed doet, hoef je later niet opnieuw te
schrijven.

| Na hoofdstuk | Wat er staat |
|---|---|
| 1 | Een werkplek met Node 24, VS Code en Git, en een leeg project `groenhuis` |
| 7 | De gegevens van Het Groenhuis als types: producten, pagina's, klanten, nagekeken bij het laden |
| 13 | Het domein als klassen: producten die hun eigen regels bewaken, geld als waardeobject, een repository, eigen fouten |
| 20 | Een volwaardig pakket: in mappen, getest, met opslag in bestanden, services, validatie met Zod en een beheerprogramma op de commandoregel |

## De hoofdstukken

| Nr. | Hoofdstuk | Daarna |
|---|---|---|
| 1 | Het project en de werkplek | |
| 2 | Van JavaScript naar TypeScript | |
| 3 | Functies typeren | |
| 4 | Objecten, interfaces en structural typing | |
| 5 | Arrays, tuples en arraymethodes | |
| 6 | Unions en narrowing | |
| 7 | Type guards, `unknown`, `as` en `satisfies` | **Oefenreeks A** |
| 8 | Klassen | |
| 9 | Waardeobjecten | |
| 10 | Overerving en abstracte klassen | |
| 11 | Interfaces als contract | |
| 12 | Generics | |
| 13 | Eigen fouten | **Oefenreeks B** |
| 14 | Modules, projectstructuur en declaratiebestanden | |
| 15 | Testen met `node:test` | |
| 16 | Asynchroon werken en opslaan | |
| 17 | Services en dependency injection | |
| 18 | Utility types en mapped types | |
| 19 | Onbekende gegevens valideren met Zod | |
| 20 | Een beheerprogramma op de commandoregel | **Oefenreeks C** |

## Hoe een hoofdstuk is opgebouwd

Elk hoofdstuk volgt dezelfde vorm.

| Onderdeel | Wat het doet |
|---|---|
| Openingstabel | Wat je leert, wat je gebruikt uit de vorige hoofdstukken, wat je oplevert, en waar je het later in het jaar nodig hebt |
| Theorie met voorbeelden | De uitleg, met code die je zelf meetypt en uitvoert |
| Kaders | Een begrip, een waarom, een waarschuwing, een controlepunt of een sneltoets |
| Twee klassikale oefeningen | Samen met de docent, met de uitwerking er meteen achter |
| Veelgemaakte fouten | Een tabel met wat je ziet, wat er aan de hand is en hoe je het oplost |
| Voor wie klaar is | Extra vragen en opdrachten, om verder te zoeken |
| Wat je nu kunt | De leerdoelen van het hoofdstuk, als lijst om jezelf te toetsen |
| Git-moment | Het commando waarmee je je werk van dit hoofdstuk vastlegt |

## De kaders en wat ze betekenen

> **BEGRIP — Begrip**
>
> Een **begrip** krijgt een eigen kader. Daarin staat wat het is, waarom het bestaat en
> wanneer je het gebruikt. Wat in zo'n kader staat, moet je kunnen uitleggen aan iemand
> anders. Dat is de test.

> **WAAROM**
>
> Een **waarom**-kader legt uit waarom iets zo geregeld is. Je kunt zonder verder, maar je
> begrijpt de leerstof beter mét.

> **LET OP**
>
> Een **let op**-kader waarschuwt voor iets dat vaak fout gaat. Elk kader komt uit een echte
> fout die cursisten maken.

> **CONTROLE**
>
> Een **controle**-kader zegt hoe je zelf nagaat of het klopt. Wie zelf kan vaststellen dat
> iets werkt, hoeft niet te wachten op de docent.

> **SNELTOETS**
>
> Een **sneltoets**-kader geeft de toetsencombinatie die het werk in VS Code sneller maakt.

> **GIT-MOMENT — GIT-MOMENT**
>
> Een **git-moment** staat aan het einde van elk hoofdstuk, met de exacte commando's om je
> werk vast te leggen en naar GitHub te sturen.

## Alles in dit document is echt uitgevoerd

Elke uitvoer en elke foutmelding in dit document komt uit een programma dat echt gedraaid
heeft, met Node 24 en TypeScript 7. Typ je dezelfde code, dan krijg je dezelfde uitvoer.
Krijg je iets anders, dan is er een verschil tussen jouw code en die in het document, en
dat verschil vinden is precies de vaardigheid die je wilt oefenen.

Een paar dingen kunnen bij jou toch anders zijn:

| Wat | Waarom |
|---|---|
| Het pad `C:\cursus\…` | Zo heet de werkmap in dit document. Werk je elders, dan staat jouw pad er |
| De duur van tests (`duration_ms`) | Die hangt af van je computer, en verschilt bij elke uitvoering |
| Een foutmelding met andere woorden | Een nieuwere versie van Node 24, TypeScript 7 of Zod 4 kan een melding net iets anders formuleren |

## De map `lessen`

Naast dit document krijg je de map **`lessen`**. Daarin staat per hoofdstuk een map, en
daarin een map per paragraaf, met dezelfde nummering als in dit document. In zo'n map
vind je:

| Bestand of map | Wat erin staat |
|---|---|
| `README.md` | De tekst van de paragraaf, met de echte uitvoer |
| `voorbeelden` | De proefcode uit de tekst, als bestanden, met bovenaan in commentaar waar het om gaat, hoe de code is opgebouwd en hoe je ze uitvoert, en onderaan wat ze tonen |
| `startpunt` | Het project zoals het is **voor** de paragraaf of de oefening (alleen waar code verandert) |
| `oplossing` | Het project zoals het is **erna**. De bestanden die in de paragraaf veranderen, hebben bovenaan in commentaar de uitleg en de opbouw; bij een oefening de opgave |

Ben je een les gemist, of loopt je project vast, dan kopieer je het `startpunt` van de
volgende paragraaf en werk je van daar verder. Na het kopiëren typ je `npm install` in de
map van het project: de map `node_modules` zit niet in `lessen`.

> **LET OP**
>
> Gebruik `oplossing` om te **vergelijken**, niet om over te nemen. Wie de code kopieert in
> plaats van ze te typen, heeft na twintig hoofdstukken een werkend project en kent geen
> TypeScript.

## De oefenreeksen

Drie keer in dit deel werk je zelfstandig, in een tweede project: **Op Wielen**, een
fietsverhuur in Gent. Een fietsverhuur lijkt op een winkel, maar is het niet: een fiets komt
terug, een prijs hangt af van het aantal dagen, en een fiets kan op 3 november vrij zijn en
op 4 november niet. Je gebruikt dezelfde leerstof op een plaats waar ze er net anders
uitziet.

| Reeks | Na hoofdstuk | Wat je bouwt |
|---|---|---|
| A | 7 | De vloot als types, tarieven als functies, en een vloot die uit een bestand komt en nagekeken wordt |
| B | 13 | Fietsen en accessoires als klassen, een huurperiode als waardeobject, een reservatieboek en eigen fouten |
| C | 20 | Op Wielen als pakket: in mappen, getest, met opslag in bestanden, validatie en een programma op de commandoregel |

De uitwerkingen staan achteraan dit document, in *Uitwerkingen van de oefenreeksen*, en in
de map `lessen`.

## Wat je nodig hebt

| Wat | Versie | Hoofdstuk |
|---|---|---|
| Node.js | 24 LTS | 1 |
| Visual Studio Code | de laatste versie | 1 |
| Git en een account op GitHub | de laatste versie | 1 |
| TypeScript | 7, per project geïnstalleerd met npm | 2 |
| Zod | 4, in het pakket `domein` | 19 |

Meer niet. Er is in dit deel geen databank, geen server en geen browser nodig: alles draait
in de terminal. Dat is een bewuste keuze. Zonder scherm zie je de taal zelf, en niet het
framework eromheen. Het scherm komt in deel II.
