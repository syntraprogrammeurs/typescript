# 4.1 Een objecttype

Een functie die een product toont, heeft een product nodig. Je kunt de vorm ervan
rechtstreeks bij de parameter schrijven:

```ts domein/src/proef.ts
function toon(product: { naam: string; prijsInCent: number }): string {
  return `${product.naam}: ${product.prijsInCent} cent (${product.voorraad} stuks)`;
}

toon({ naam: "Monstera deliciosa", prijsInCent: 2499 });
toon({ naam: "Aloe vera" });
```

```text
src/proef.ts:2:67 - error TS2339: Property 'voorraad' does not exist on type '{ naam: string; prijsInCent: number; }'.

2   return `${product.naam}: ${product.prijsInCent} cent (${product.voorraad} stuks)`;
                                                                    ~~~~~~~~

src/proef.ts:6:6 - error TS2741: Property 'prijsInCent' is missing in type '{ naam: string; }' but required in type '{ naam: string; prijsInCent: number; }'.

6 toon({ naam: "Aloe vera" });
       ~~~~~~~~~~~~~~~~~~~~~

  src/proef.ts:1:40 - 'prijsInCent' is declared here.
    1 function toon(product: { naam: string; prijsInCent: number }): string {
                                             ~~~~~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:2
```

Twee fouten, en ze zeggen allebei iets anders:

| Fout | Wat er misgaat |
|---|---|
| `TS2339: Property 'voorraad' does not exist` | Je leest een veld dat niet in de vorm staat |
| `TS2741: Property 'prijsInCent' is missing` | Je geeft een object mee waar een verplicht veld ontbreekt. De tweede melding eronder wijst aan waar dat veld gedeclareerd is |

Typ in VS Code `product.` binnen de functie, en je krijgt alleen de velden te zien die
in de vorm staan:

![Na `product.` stelt VS Code alleen de velden voor die in de vorm staan.](../img/04-aanvullen.png)
