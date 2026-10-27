# 1.1 Wat we het hele jaar bouwen

**Het Groenhuis** is een webwinkel voor planten, potten en tuingerief, met een eigen
CMS. Een CMS (*content management system*) is het programma waarmee het personeel de
inhoud van de winkel beheert: producten, prijzen, voorraad, foto's en de pagina's
zoals *Over ons* of *Verzorgingstips*.

Aan het einde van het jaar draaien er drie programma's, die samen één product vormen:

```text
  ┌───────────────────────┐        ┌───────────────────────┐
  │  winkel/   (Next.js)  │        │  beheer/  (React)     │
  │  de webwinkel voor    │        │  het CMS voor het     │
  │  de klanten           │        │  personeel            │
  └──────────┬────────────┘        └───────────┬───────────┘
             │        REST-API (JSON)           │
             └───────────────┬──────────────────┘
                   ┌─────────▼──────────┐
                   │  api/   (NestJS)   │
                   │  + Prisma          │
                   └─────────┬──────────┘
                   ┌─────────▼──────────┐
                   │  PostgreSQL        │
                   └────────────────────┘
        domein/  (TypeScript) — de regels die alle delen gebruiken
```

| Deel | Wat je bouwt | Wat je leert |
|---|---|---|
| I | `domein/`: de regels van het CMS, zonder scherm | TypeScript |
| II | `beheer/`: het CMS in de browser | React met TypeScript |
| III | `server/`: een eigen REST-API | Node, HTTP en Express |
| IV | de databank | PostgreSQL en SQL |
| V | aanmelden en rechten | wachtwoorden, cookies, rollen |
| VI | dezelfde server, met een ORM | Prisma |
| VII | `api/`: de definitieve API | NestJS |
| VIII | `winkel/`: de webwinkel | Next.js en Stripe |
| IX | alles online | deployment en CI |

Dit document is **deel I**. Je bouwt het hart van het CMS: wat een product is, wanneer
het gepubliceerd mag worden, wat een prijs is, hoe een pagina uit blokken bestaat. Er
is nog geen scherm. Aan het einde van deel I bedien je het CMS vanuit de terminal:

```text
PS C:\cursus\groenhuis\domein> npm run cms -- product lijst
```

> **BEGRIP — Domein**
>
> Het **domein** is het stuk van de werkelijkheid waarover je software gaat: hier een
> plantenwinkel met producten, categorieën en pagina's. De **domeincode** is de code die
> de regels van dat domein bevat, los van het scherm en los van de databank.
>
> *Waarom apart:* een scherm verandert vaak, een databank soms, de regels van de winkel
> zelden. Wie de regels apart houdt, kan het scherm en de databank vervangen zonder de
> regels opnieuw te schrijven. Dat is precies wat je dit jaar drie keer doet.
