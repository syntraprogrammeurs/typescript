# 2.1 Wat TypeScript is

> **BEGRIP — TypeScript**
>
> **TypeScript** is JavaScript met **types**. Een type zegt wat voor waarde iets is: een
> getal, een tekst, een lijst teksten, een product. Je schrijft het type bij een naam, en
> TypeScript kijkt na of je die naam overal correct gebruikt.
>
> *Waarom:* in JavaScript ontdek je een fout pas als die regel uitgevoerd wordt, en soms
> nooit. TypeScript vindt hem terwijl je typt.
>
> *Wanneer:* altijd, behalve in een script van tien regels dat je één keer gebruikt.

Drie dingen moet je van in het begin weten:

| Wat | Wat het betekent |
|---|---|
| TypeScript **is** JavaScript | Elke regel JavaScript is ook geldige TypeScript. Je leert geen nieuwe taal, je leert er iets bij |
| De types **verdwijnen** | Voor het programma draait, worden alle types weggehaald. Wat uitgevoerd wordt, is gewoon JavaScript |
| Nakijken en uitvoeren zijn **twee aparte stappen** | Het programma `tsc` kijkt na. Node voert uit. Node kijkt **niets** na |

Dat laatste is het belangrijkste punt van dit hoofdstuk. Je komt er in 2.5 op terug.

> **BEGRIP — Statische typecontrole**
>
> **Statisch** betekent: zonder het programma uit te voeren. TypeScript leest je code, en
> leidt af wat elke waarde kan zijn. JavaScript controleert pas **tijdens** het uitvoeren,
> en alleen de regel die op dat moment draait: dat heet **dynamisch**.
