# 3.6 `void` en `never`

Een functie die niets teruggeeft, heeft als returntype **`void`**:

```ts domein/src/proef.ts
function toonRegel(naam: string, prijsInCent: number): void {
  console.log(`${naam.padEnd(22)}${(prijsInCent / 100).toFixed(2).padStart(8)}`);
}

toonRegel("Monstera deliciosa", 2649);
toonRegel("Terracotta pot 20 cm", 895);
```

```text
Monstera deliciosa       26.49
Terracotta pot 20 cm      8.95
```

Een functie die **nooit** terugkeert, omdat ze altijd een fout gooit, heeft als
returntype **`never`**:

```ts domein/src/proef.ts
function weiger(reden: string): never {
  throw new Error(`Geweigerd: ${reden}`);
}

function controleerPrijs(prijsInCent: number): number {
  if (prijsInCent < 0) {
    weiger("een prijs kan niet negatief zijn");
  }
  return prijsInCent;
}

function vergeten(prijsInCent: number): never {
  if (prijsInCent < 0) {
    throw new Error("negatief");
  }
}
```

```text
src/proef.ts:12:41 - error TS2534: A function returning 'never' cannot have a reachable end point.

12 function vergeten(prijsInCent: number): never {
                                           ~~~~~

Found 1 error in src/proef.ts:12
```

| Returntype | Betekent | Voorbeeld |
|---|---|---|
| `void` | De functie keert terug, maar zonder bruikbare waarde | `console.log`, een functie die iets toont of bewaart |
| `never` | De functie keert **nooit** terug | Een functie die altijd een fout gooit |

`vergeten` toont waarom TypeScript je aan `never` houdt: als de prijs niet negatief is,
loopt de functie gewoon af, en dan keert ze wél terug. Dat is een gebroken belofte.

> **LET OP**
>
> Een callback met het type `() => void` mag **toch** een waarde teruggeven: die waarde
> wordt gewoon genegeerd. Daarom mag je `lijst.forEach((x) => resultaat.push(x))` schrijven,
> ook al geeft `push` een getal terug. `void` als returntype van een **callback** betekent:
> *ik doe niets met wat je teruggeeft*. Bij een gewone functie met `: void` mag je
> daarentegen geen waarde teruggeven.
