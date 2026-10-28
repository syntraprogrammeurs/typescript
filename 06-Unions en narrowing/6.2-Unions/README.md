# 6.2 Unions

Een **union** `A | B` is een waarde die van het type `A` **of** van het type `B` is. Je
mag er alleen mee doen wat bij **beide** kan:

```ts domein/src/proef.ts
function naarCent(waarde: number | string): number {
  return Math.round(waarde * 100);
}

function lengte(waarde: number | string): number {
  return waarde.length;
}
```

```text
src/proef.ts:2:21 - error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

2   return Math.round(waarde * 100);
                      ~~~~~~

src/proef.ts:6:17 - error TS2339: Property 'length' does not exist on type 'string | number'.
  Property 'length' does not exist on type 'number'.

6   return waarde.length;
                  ~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:2
```

TypeScript weigert, en terecht: `"24,99" * 100` en `(24.99).length` hebben geen zin.
Je moet eerst uitzoeken **welk** van de twee je hebt.
