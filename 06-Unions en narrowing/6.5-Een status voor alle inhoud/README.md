# 6.5 Een status voor alle inhoud

Een product komt niet meteen in de winkel. De redacteur maakt het als **concept**, de
beheerder **publiceert** het, en wat niet meer verkocht wordt, wordt **gearchiveerd**:
uit de winkel, maar niet weg, want oude bestellingen verwijzen ernaar. Voeg de status toe
aan `inhoud.ts`:

```ts domein/src/inhoud.ts
/** Een product, categorie of pagina is eerst een concept, wordt dan gepubliceerd, en later gearchiveerd. */
export type Inhoudsstatus = "concept" | "gepubliceerd" | "gearchiveerd";

/** Wat alle inhoud van het CMS gemeen heeft. */
export interface Inhoud {
  readonly id: string;
  slug: string;
  status: Inhoudsstatus;
}
```

Voer `npm run check` uit:

```text
…
112     id: "g2",
    ~~~~~~~~~~~~~
... 
116     metadata: { beschrijving: "Verzendkosten en levertermijnen", robots: "index" },
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
117   },
    ~~~

  src/inhoud.ts:10:3 - 'status' is declared here.
    10   status: Inhoudsstatus;
         ~~~~~~

Found 15 errors in the same file, starting at: src/catalogus.ts:7
```

Dat is fout op fout, en dat is goed: TypeScript toont elke plaats die je moet
aanpassen. Geef in `catalogus.ts` elke categorie, elk product en elke pagina een status.
De calathea is gearchiveerd, de snoeischaar nog een concept, al de rest gepubliceerd.
Het volledige bestand staat in de map `lessen`.

Voeg aan `zoeken.ts` een functie toe die zegt of een klant iets mag zien:

```ts domein/src/zoeken.ts
export function isZichtbaar(inhoud: Inhoud): boolean {
  return inhoud.status === "gepubliceerd";
}

```

`isZichtbaar` krijgt een `Inhoud`. Toch kun je ze gebruiken op producten, categorieën én
pagina's: elk van hen **is** een `Inhoud`, door `extends`. En `producten.filter(isZichtbaar)`
geeft gewoon een lijst `Product` terug: `filter` houdt het type van de lijst.

```ts domein/src/start.ts
console.log("In de winkel en op voorraad, goedkoopste eerst:");
for (const product of goedkoopsteEerst(opVoorraad(producten.filter(isZichtbaar)))) {
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

In de winkel en op voorraad, goedkoopste eerst:
  Aloe vera                     € 8,47   25 op voorraad
  Terracotta pot 20 cm         € 10,83   40 op voorraad
  Sansevieria trifasciata      € 15,37   12 op voorraad
  Plantenspuit                 € 15,72   15 op voorraad
  Monstera deliciosa           € 26,49   3 op voorraad
  Olijfboom                    € 95,39   2 op voorraad

Waarde van de voorraad (excl. btw): € 1.181,55
Producten per categorie: { c1: 3, c5: 1, c2: 1, c3: 1, c4: 2 }
Prijzen van € 7,99 tot € 89,99 (excl. btw)
```

De calathea en de snoeischaar staan er niet meer bij. Die waren uitverkocht, en worden
dus ook al door `opVoorraad` weggefilterd. Zet de voorraad van de snoeischaar eens op 5,
en kijk of ze verschijnt. Ze verschijnt niet: ze is een concept.
