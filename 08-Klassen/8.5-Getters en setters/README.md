# 8.5 Getters en setters

```ts domein/src/product.ts
  get prijsInCent(): number {
    return this.#prijsInCent;
  }

  set prijsInCent(nieuwePrijs: number) {
    if (!Number.isInteger(nieuwePrijs) || nieuwePrijs < 0) {
      throw new Error(`Ongeldige prijs voor ${this.naam}: ${nieuwePrijs}`);
    }
    this.#prijsInCent = nieuwePrijs;
  }

  get prijsInclBtw(): number {
    return metBtw(this.#prijsInCent, this.btwPercentage);
  }

  get voorraad(): number {
    return this.#voorraad;
  }

  get status(): Inhoudsstatus {
    return this.#status;
  }

  get isTeKoop(): boolean {
    return this.#status === "gepubliceerd" && this.#voorraad > 0;
  }
```

Een **getter** (`get`) ziet eruit als een veld, maar is een methode. Je roept ze op zonder
haakjes: `product.prijsInclBtw`, niet `product.prijsInclBtw()`.

| Getter | Waarom een getter |
|---|---|
| `prijsInCent` | Lezen mag. Wijzigen kan alleen via de setter, die nakijkt |
| `prijsInclBtw` | Berekend uit twee velden. Een veld zou kunnen afwijken van de prijs |
| `voorraad`, `status` | Lezen mag, wijzigen alleen via methodes |
| `isTeKoop` | Een regel van de winkel, op één plaats |

Een **setter** (`set`) wordt uitgevoerd als je een waarde toekent: `product.prijsInCent =
2599`. De setter van `prijsInCent` weigert een ongeldige prijs. Er is geen setter voor
`voorraad`: die wijzig je niet door een getal in te vullen, maar door stuks erbij te tellen
of eraf te halen.

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const aloe = new Product({
  id: "p04", slug: "aloe-vera", status: "gepubliceerd", naam: "Aloe vera",
  prijsInCent: 799, btwPercentage: 6, voorraad: 25, categorieId: "c5", tags: [],
});

aloe.prijsInCent = 899;
console.log(aloe.prijsInCent, aloe.prijsInclBtw, aloe.isTeKoop);

try {
  aloe.prijsInCent = -100;
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
console.log(aloe.prijsInCent);
```

```text
899 953 true
Ongeldige prijs voor Aloe vera: -100
899
```

> **BEGRIP — Encapsulatie**
>
> **Encapsulatie** (*inkapseling*) betekent: de gegevens van een object zitten binnenin, en van
> buiten kun je er alleen bij via de methodes die het object daarvoor aanbiedt. Die methodes
> bewaken de regels.
>
> *Het gevolg:* een `Product` dat bestaat, is altijd in orde. Wie een `Product` krijgt, hoeft
> de prijs en de voorraad niet meer na te kijken.
