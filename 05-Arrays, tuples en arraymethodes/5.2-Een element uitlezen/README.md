# 5.2 Een element uitlezen

`producten[0]` geeft het eerste product. Maar wat als de lijst leeg is?

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const eerste = producten[0];
console.log(eerste.naam);

const laatste = producten.at(-1);
console.log(laatste.naam);
```

```text
src/proef.ts:4:13 - error TS18048: 'eerste' is possibly 'undefined'.

4 console.log(eerste.naam);
              ~~~~~~

src/proef.ts:7:13 - error TS18048: 'laatste' is possibly 'undefined'.

7 console.log(laatste.naam);
              ~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:4
```

Door `noUncheckedIndexedAccess` is het type van `producten[0]` niet `Product`, maar
`Product | undefined`. TypeScript weet niet hoe lang de lijst is, en doet niet alsof.

```ts domein/src/proef.ts
import { producten } from "./catalogus.ts";

const eerste = producten[0];
if (eerste !== undefined) {
  console.log(eerste.naam);
}

for (const product of producten) {
  console.log(product.slug);
}
```

```text
Monstera deliciosa
monstera-deliciosa
sansevieria-trifasciata
calathea-orbifolia
aloe-vera
olijfboom
terracotta-pot-20
plantenspuit
snoeischaar
```

In de `for … of` krijg je wél gewoon een `Product`: de lus komt nooit voorbij het einde.

> **LET OP**
>
> Je ziet in code op internet vaak `producten[0]!`, met een uitroepteken. Dat is de
> **non-null assertion**: je zegt tegen TypeScript *geloof me, het is er*. TypeScript
> gelooft je, en kijkt niets meer na. Is de lijst toch leeg, dan krijg je bij het uitvoeren
> `Cannot read properties of undefined`. Gebruik het uitroepteken niet. Controleer, of
> gebruik een `for … of`.
