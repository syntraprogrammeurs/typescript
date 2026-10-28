# 8.6 Methodes die de regels bewaken

```ts domein/src/product.ts
  publiceer(): void {
    if (this.#status === "gearchiveerd") {
      throw new Error(`${this.naam} is gearchiveerd en kan niet meer gepubliceerd worden`);
    }
    if (this.#prijsInCent === 0) {
      throw new Error(`${this.naam} heeft nog geen prijs`);
    }
    this.#status = "gepubliceerd";
  }

  archiveer(): void {
    this.#status = "gearchiveerd";
  }

  pasVoorraadAan(verschil: number): void {
    const nieuw = this.#voorraad + verschil;
    if (nieuw < 0) {
      throw new Error(`Niet genoeg ${this.naam}: ${this.#voorraad} in voorraad, ${-verschil} gevraagd`);
    }
    this.#voorraad = nieuw;
  }
}
```

| Methode | Regel |
|---|---|
| `publiceer()` | Een gearchiveerd product komt niet terug in de winkel. Een product zonder prijs gaat er niet in |
| `archiveer()` | Kan altijd |
| `pasVoorraadAan(verschil)` | De voorraad wordt nooit negatief. `+10` bij een levering, `-2` bij een verkoop |

```ts domein/src/proef.ts
import { Product } from "./product.ts";

const monstera = new Product({
  id: "p01", slug: "monstera-deliciosa", status: "concept", naam: "Monstera deliciosa",
  prijsInCent: 2499, btwPercentage: 6, voorraad: 3, categorieId: "c1", tags: [],
});

monstera.publiceer();
monstera.pasVoorraadAan(-2);
console.log(monstera.status, monstera.voorraad);

for (const actie of [() => monstera.pasVoorraadAan(-5), () => { monstera.archiveer(); monstera.publiceer(); }]) {
  try {
    actie();
  } catch (fout) {
    console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}
console.log(monstera.status, monstera.voorraad);
```

```text
gepubliceerd 1
Geweigerd: Niet genoeg Monstera deliciosa: 1 in voorraad, 5 gevraagd
Geweigerd: Monstera deliciosa is gearchiveerd en kan niet meer gepubliceerd worden
gearchiveerd 1
```

Typ je `monstera.` in VS Code, dan zie je wat een product kan. De velden met een `#`
staan er niet bij:

![Na `monstera.` toont VS Code de velden, getters en methodes van `Product`, maar geen `#`-velden.](../img/08-methodes.png)

Een fout gooien met `throw new Error(…)` is voorlopig de manier om *dit mag niet* te zeggen.
In hoofdstuk 13 maak je eigen soorten fouten, zodat wie de fout opvangt, weet wat er
misging.
