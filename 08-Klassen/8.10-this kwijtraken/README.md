# 8.10 `this` kwijtraken

Een methode doorgeven aan een andere functie gaat mis:

```ts domein/src/proef.ts
class Teller {
  #aantal = 0;

  verhoog(): void {
    this.#aantal++;
    console.log(`teller: ${this.#aantal}`);
  }
}

const teller = new Teller();
teller.verhoog();

const knop = teller.verhoog;
knop();
```

```text
teller: 1
file:///C:/cursus/groenhuis/domein/src/proef.ts:5
    this.#aantal++;
        ^

TypeError: Cannot read properties of undefined (reading '#aantal')
    at verhoog (file:///C:/cursus/groenhuis/domein/src/proef.ts:5:9)
    at file:///C:/cursus/groenhuis/domein/src/proef.ts:14:1
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

`this` is **het object vóór het puntje** op het moment van de aanroep. Bij `teller.verhoog()`
is dat `teller`. Bij `knop()` staat er geen puntje, en is `this` `undefined`.

| Oplossing | Schrijfwijze |
|---|---|
| Een arrowfunctie rond de aanroep | `const knop = () => teller.verhoog();` |
| `bind` | `const knop = teller.verhoog.bind(teller);` |

Je kwam dit al tegen zonder het te merken: in `start.ts` staat `filter((product) =>
product.isTeKoop)`, met een arrowfunctie. In React (deel II) en bij event listeners in de
browser is dit een van de meest gemaakte fouten.

---
