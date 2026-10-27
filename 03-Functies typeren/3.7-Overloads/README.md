# 3.7 Overloads

Soms gedraagt een functie zich anders naargelang wat je meegeeft. Een prijs die de
gebruiker intypt, is tekst (`"24,99"`); een prijs uit een rekening is een getal
(`24.99`). Een functie `naarCent` die beide aanneemt, kun je met **overloads**
beschrijven:

```ts domein/src/proef.ts
function naarCent(euro: number): number;
function naarCent(tekst: string): number;
function naarCent(waarde: number | string): number {
  const getal = typeof waarde === "string" ? Number(waarde.replace(",", ".")) : waarde;
  return Math.round(getal * 100);
}

console.log(naarCent(24.99));
console.log(naarCent("24,99"));
```

```text
2499
2499
```

De eerste twee regels zijn de **overloads**: de manieren waarop je de functie mag
aanroepen. De derde is de **implementatie**: die moet alle overloads aankunnen, en is
zelf niet aanroepbaar van buitenaf.

> **WAAROM**
>
> Overloads kom je tegen in de types van bibliotheken: `document.createElement("img")`
> geeft een `HTMLImageElement`, `createElement("a")` een `HTMLAnchorElement`. Dat is een
> overload per tagnaam. Zelf schrijf je ze zelden: meestal volstaat één signatuur met een
> union, zoals `naarCent(waarde: number | string): number`. Gebruik een overload pas als
> het **returntype** afhangt van wat je meegeeft.

---
