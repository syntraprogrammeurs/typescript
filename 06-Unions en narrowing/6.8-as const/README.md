# 6.8 `as const`

Soms heb je de toegelaten waarden nodig **als lijst**, bijvoorbeeld om een keuzemenu te
vullen of om invoer te controleren. Een gewone lijst verliest de literal types:

```ts domein/src/proef.ts
const gewoon = ["concept", "gepubliceerd", "gearchiveerd"];
const vast = ["concept", "gepubliceerd", "gearchiveerd"] as const;

console.log(vast.includes("concept"));
```

```text
true
```

![Met `as const` wordt de lijst een `readonly`-tuple met de drie letterlijke teksten.](../img/06-as-const.png)

> **BEGRIP — as const**
>
> **`as const`** zegt: *deze waarde verandert nooit*. TypeScript maakt elke tekst en elk
> getal een literal type, en elke lijst en elk object `readonly`. `gewoon` is
> `string[]`; `vast` is `readonly ["concept", "gepubliceerd", "gearchiveerd"]`.
>
> *Waar je het gebruikt:* voor een vaste lijst waarden die je ook bij het uitvoeren nodig
> hebt. In hoofdstuk 7 controleer je er invoer mee, en in hoofdstuk 18 leid je er het type
> `Inhoudsstatus` uit af, zodat de lijst en het type nooit uit elkaar lopen.

---
