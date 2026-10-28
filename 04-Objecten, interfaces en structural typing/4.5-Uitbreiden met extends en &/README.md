# 4.5 Uitbreiden met `extends` en `&`

Een product, een categorie en een pagina hebben iets gemeen: een `id` en een `slug`.
Dat schrijf je één keer, en de andere vormen **breiden het uit**:

```ts domein/src/proef.ts
interface Inhoud {
  readonly id: string;
  slug: string;
}

interface Categorie extends Inhoud {
  naam: string;
}

const kamerplanten: Categorie = { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" };
const zonderSlug: Categorie = { id: "c2", naam: "Buitenplanten" };
```

```text
src/proef.ts:11:7 - error TS2741: Property 'slug' is missing in type '{ id: string; naam: string; }' but required in type 'Categorie'.

11 const zonderSlug: Categorie = { id: "c2", naam: "Buitenplanten" };
         ~~~~~~~~~~

  src/proef.ts:3:3 - 'slug' is declared here.
    3   slug: string;
        ~~~~

Found 1 error in src/proef.ts:11
```

Met `type` doe je hetzelfde met een **intersectie**, het teken `&`:

```ts domein/src/proef.ts
type Inhoud = { readonly id: string; slug: string };
type Categorie = Inhoud & { naam: string };

const kamerplanten: Categorie = { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" };
```

> **BEGRIP — Intersectie**
>
> **`A & B`** is een type dat **alles** van `A` én alles van `B` heeft. Waar een union
> `A | B` zegt *een van beide*, zegt een intersectie *allebei tegelijk*.
>
> *Waar je het tegenkomt:* om iets toe te voegen aan een vorm die je niet zelf schreef,
> bijvoorbeeld een product mét zijn categorie erbij: `Product & { categorie: Categorie }`.
