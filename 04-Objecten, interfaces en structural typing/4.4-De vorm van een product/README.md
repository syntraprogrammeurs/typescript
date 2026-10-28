# 4.4 De vorm van een product

Nu de echte vorm voor Het Groenhuis. Maak `src/inhoud.ts`:

```ts domein/src/inhoud.ts
// Het Groenhuis — de vorm van de inhoud van het CMS

export interface Afmetingen {
  hoogteInCm: number;
  potmaatInCm: number;
}

export interface Categorie {
  readonly id: string;
  naam: string;
  slug: string;
  bovenliggendeId?: string;
}

export interface Product {
  readonly id: string;
  naam: string;
  slug: string;
  beschrijving?: string;
  prijsInCent: number;
  btwPercentage: number;
  voorraad: number;
  categorieId: string;
  tags: string[];
  afmetingen?: Afmetingen;
}
```

| Veld | Waarom zo |
|---|---|
| `readonly id` | Een product houdt zijn `id` voor altijd. Bestellingen verwijzen ernaar |
| `slug` | Het stuk van de URL: `/producten/monstera-deliciosa`. Anders dan de naam: kleine letters, koppeltekens |
| `beschrijving?` | Niet elk product heeft er een |
| `prijsInCent`, `btwPercentage` | De prijs **zonder** btw, en het tarief. Planten en potten hebben een ander tarief |
| `categorieId` | Een **verwijzing** naar een categorie, geen kopie ervan. Zie hieronder |
| `tags: string[]` | Een lijst trefwoorden. Een lege lijst als er geen zijn, en niet *geen veld* |
| `afmetingen?: Afmetingen` | Een object **in** een object. Gereedschap heeft geen potmaat |

> **WAAROM**
>
> Waarom `categorieId: string` en niet `categorie: Categorie`, met de hele categorie erin?
> Omdat dezelfde categorie bij veel producten hoort. Wijzigt de naam van de categorie, dan
> wil je dat maar op één plaats doen. Een verwijzing via een `id` is precies hoe een
> databank het doet; dat zie je in deel IV terug.

> **CONTROLE**
>
> `npm run check` toont geen fouten. Het bestand bevat alleen types: Node voert er niets
> van uit. Wat zou `node src/inhoud.ts` tonen? Probeer het: niets, en zonder fout.
