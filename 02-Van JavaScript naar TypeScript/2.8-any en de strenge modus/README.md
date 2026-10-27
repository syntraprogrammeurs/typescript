# 2.8 `any` en de strenge modus

Een parameter zonder type:

```ts domein/src/proef.ts
function verhoog(bedrag) {
  return bedrag + 1;
}

console.log(verhoog("5"));
```

```text
src/proef.ts:1:18 - error TS7006: Parameter 'bedrag' implicitly has an 'any' type.

1 function verhoog(bedrag) {
                   ~~~~~~

Found 1 error in src/proef.ts:1
```

> **BEGRIP — any**
>
> **`any`** is het type dat alles toelaat. Een waarde van het type `any` mag overal in,
> en je mag er alles mee doen. TypeScript kijkt ze niet meer na.
>
> *Waarom TypeScript hier weigert:* zonder type zou `bedrag` stilzwijgend `any` worden
> (*implicitly*), en dan is `verhoog("5")` in orde voor TypeScript, terwijl het `"51"`
> oplevert. Onder `strict` mag dat niet. Je **moet** zeggen wat `bedrag` is.

Je kunt `any` ook zelf schrijven:

```ts domein/src/proef.ts
function verhoog(bedrag: any) {
  return bedrag + 1;
}

console.log(verhoog("5"));
console.log(verhoog(5));
```

```text
51
6
```

Geen fout, en een verkeerd antwoord.

> **LET OP**
>
> Schrijf **nooit** `any` om een rode kringel weg te krijgen. Je zet TypeScript dan uit,
> niet alleen op die plaats maar overal waar die waarde naartoe gaat. Een `any` besmet
> alles wat ermee in aanraking komt. Weet je echt niet wat iets is, dan gebruik je
> `unknown`. Dat leer je in hoofdstuk 7.
