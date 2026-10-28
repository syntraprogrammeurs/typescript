# 5.7 Sorteren

Voeg aan `zoeken.ts` twee functies toe die sorteren, en de twee functies uit 5.6:

```ts domein/src/zoeken.ts
export function voorraadwaarde(producten: Product[]): number {
  return producten.reduce((totaal, product) => totaal + product.prijsInCent * product.voorraad, 0);
}

export function aantalPerCategorie(producten: Product[]): { [categorieId: string]: number } {
  return producten.reduce<{ [categorieId: string]: number }>((telling, product) => {
    const huidig = telling[product.categorieId];
    telling[product.categorieId] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(producten: Product[]): Product[] {
  // de klant vergelijkt prijzen met btw, en het btw-tarief verschilt per product
  const prijs = (product: Product) => metBtw(product.prijsInCent, product.btwPercentage);
  return producten.toSorted((a, b) => prijs(a) - prijs(b));
}

export function opNaam(producten: Product[]): Product[] {
  return producten.toSorted((a, b) => a.naam.localeCompare(b.naam, "nl"));
}
```

De functie die je aan `toSorted` geeft, vergelijkt twee elementen `a` en `b`:

| Geeft terug | Betekent |
|---|---|
| een negatief getal | `a` komt eerst |
| een positief getal | `b` komt eerst |
| `0` | gelijk, de volgorde blijft |

`prijs(a) - prijs(b)` is negatief als `a` goedkoper is: goedkoopste eerst. De functie
`prijs` rekent eerst de btw erbij. Sorteer je op `prijsInCent`, dan staat de plantenspuit
(12,99 euro, 21 procent btw) voor de sansevieria (14,50 euro, 6 procent btw), terwijl de
klant 15,72 euro betaalt voor de spuit en 15,37 euro voor de plant. Sorteer op wat de klant
ziet.
Voor teksten gebruik je `localeCompare`, met de taal erbij. Dat sorteert zoals een mens
het verwacht, met hoofdletters, accenten en `ij` op de juiste plaats.

> **LET OP**
>
> **`sort` wijzigt de lijst zelf.** `producten.sort(…)` sorteert de catalogus, en
> iedereen die de catalogus gebruikt, ziet de nieuwe volgorde. **`toSorted`** maakt een
> gesorteerde **kopie**, en laat het origineel ongemoeid. Hetzelfde geldt voor `reverse`
> tegenover `toReversed` en `splice` tegenover `toSpliced`. Kies altijd de `to…`-versie,
> tenzij je uitdrukkelijk de lijst zelf wilt veranderen.

Gebruik het in `start.ts`:

```ts domein/src/start.ts
console.log("Op voorraad, goedkoopste eerst:");
for (const product of goedkoopsteEerst(opVoorraad(producten))) {
  console.log(`  ${prijsregel(product)}`);
}
console.log();
console.log(`Waarde van de voorraad (excl. btw): ${alsEuro(voorraadwaarde(producten))}`);
console.log("Producten per categorie:", aantalPerCategorie(producten));
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
```
