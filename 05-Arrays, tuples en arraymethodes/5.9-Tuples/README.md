# 5.9 Tuples

Een **tuple** is een lijst met een vast aantal elementen, elk met een eigen type. De
laagste en de hoogste prijs uit de catalogus zijn zo'n paar:

```ts domein/src/zoeken.ts
export function prijsbereik(producten: readonly Product[]): [laagste: number, hoogste: number] | undefined {
  if (producten.length === 0) {
    return undefined;
  }
  const prijzen = producten.map((product) => product.prijsInCent);
  return [Math.min(...prijzen), Math.max(...prijzen)];
}
```

`[laagste: number, hoogste: number]` is een tuple van twee getallen. De namen
`laagste` en `hoogste` zijn uitleg: VS Code toont ze, maar ze bestaan niet bij het
uitvoeren. Je leest een tuple uit door het **uit te pakken** (*destructuring*):

```ts domein/src/start.ts
const bereik = prijsbereik(producten);
if (bereik !== undefined) {
  const [laagste, hoogste] = bereik;
  console.log(`Prijzen van ${alsEuro(laagste)} tot ${alsEuro(hoogste)} (excl. btw)`);
}
```

```text

> domein@0.1.0 start
> node src/start.ts

Het Groenhuis — het domein (Node.js v24.22.1)
8 producten, 5 categorieën, 2 pagina's

Op voorraad, goedkoopste eerst:
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

> **BEGRIP — Tuple**
>
> Een **tuple** is een lijst waarvan TypeScript de **lengte** en het **type per plaats**
> kent: `[string, number]` is altijd precies twee elementen, eerst een tekst, dan een getal.
>
> *Wanneer:* als een functie twee of drie waarden samen teruggeeft die bij elkaar horen, en
> een object met namen te zwaar is. `useState` in React geeft zo'n tuple terug (deel II), en
> `Object.entries` een lijst tuples.
>
> *Wanneer niet:* vanaf drie of vier waarden is een object duidelijker. `bereik[0]` zegt
> minder dan `bereik.laagste`.

```ts domein/src/proef.ts
const bereik: [laagste: number, hoogste: number] = [799, 8999];

const [laagste, hoogste] = bereik;
const derde = bereik[2];
const fout: [number, number] = [799, "8999"];
```

```text
src/proef.ts:4:22 - error TS2493: Tuple type '[laagste: number, hoogste: number]' of length '2' has no element at index '2'.

4 const derde = bereik[2];
                       ~

src/proef.ts:5:38 - error TS2322: Type 'string' is not assignable to type 'number'.

5 const fout: [number, number] = [799, "8999"];
                                       ~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:4
```
