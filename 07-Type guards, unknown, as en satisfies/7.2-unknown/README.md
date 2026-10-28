# 7.2 `unknown`

Er is een type dat het tegenovergestelde doet van `any`:

```ts domein/src/proef.ts
const gegevens: unknown = JSON.parse('{ "naam": "Aloe vera" }');

console.log(gegevens.naam);
const tekst: string = gegevens;
```

```text
src/proef.ts:3:13 - error TS18046: 'gegevens' is of type 'unknown'.

3 console.log(gegevens.naam);
              ~~~~~~~~

src/proef.ts:4:7 - error TS2322: Type 'unknown' is not assignable to type 'string'.

4 const tekst: string = gegevens;
        ~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:3
```

| | `any` | `unknown` |
|---|---|---|
| Wat mag erin | alles | alles |
| Wat mag je ermee doen | **alles**, zonder controle | **niets**, tot je het type smaller maakt |
| Waar mag het naartoe | overal | alleen naar `unknown` en `any` |
| Wanneer | nooit, in je eigen code | voor alles wat van buiten komt |

> **BEGRIP — unknown**
>
> **`unknown`** zegt: *hier kan van alles in zitten, en ik weet nog niet wat*. Je mag er
> niets mee doen voor je met een controle hebt aangetoond wat het is. Dezelfde controles
> als in hoofdstuk 6: `typeof`, `Array.isArray`, `in`, en zo meer.
>
> *Waarom:* een fout in de gegevens komt dan niet midden in je programma naar boven, maar
> op de plaats waar je de gegevens binnenhaalt. Daar kun je een duidelijke melding geven.

Een tekst nakijken gaat zo:

```ts domein/src/proef.ts
const gegevens: unknown = JSON.parse('"Aloe vera"');

if (typeof gegevens === "string") {
  console.log(gegevens.toUpperCase());
}
```

```text
ALOE VERA
```

Maar een product heeft tien velden, met een object en een lijst erin. Daarvoor schrijf je
een eigen controle.
