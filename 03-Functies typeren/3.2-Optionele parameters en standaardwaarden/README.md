# 3.2 Optionele parameters en standaardwaarden

`alsEuro` toont nu `24,99 euro`. Een Engelse klant verwacht `€24.99`, een Franse
`24,99 €`. JavaScript kan dat zelf, met `Intl.NumberFormat`. Pas `alsEuro` in
`prijs.ts` aan:

```ts domein/src/prijs.ts
export function alsEuro(prijsInCent: number, taal = "nl-BE"): string {
  const opmaak = new Intl.NumberFormat(taal, { style: "currency", currency: "EUR" });
  return opmaak.format(prijsInCent / 100);
}
```

`taal = "nl-BE"` is een **standaardwaarde**. Geef je de parameter niet mee, dan krijgt
hij die waarde.

```ts domein/src/proef.ts
import { alsEuro } from "./prijs.ts";

console.log(alsEuro(2499));
console.log(alsEuro(2499, "en-GB"));
console.log(alsEuro(2499, "fr-FR"));
console.log(alsEuro(249900));
```

```text
€ 24,99
€24.99
24,99 €
€ 2.499,00
```

Twee dingen vallen op: TypeScript leidt het type van `taal` af uit de standaardwaarde,
dus je schrijft geen `: string`. En `249900` krijgt vanzelf een punt als scheiding van
de duizendtallen.

Een parameter die er niet hoeft te zijn, zónder standaardwaarde, krijgt een
**vraagteken**:

```ts domein/src/proef.ts
function begroeting(naam?: string): string {
  if (naam === undefined) {
    return "Welkom bij Het Groenhuis";
  }
  return `Welkom terug, ${naam}`;
}

console.log(begroeting());
console.log(begroeting("Sam"));
```

```text
Welkom bij Het Groenhuis
Welkom terug, Sam
```

![Een optionele parameter is binnen de functie `string | undefined`.](../img/03-optioneel.png)

> **BEGRIP — Optionele parameter**
>
> Een **optionele parameter** (`naam?: string`) mag je weglaten bij het aanroepen. Binnen
> de functie is hij dan `undefined`. Zijn type is daarom `string | undefined`: een tekst,
> of niets.
>
> *Regel:* optionele parameters en parameters met een standaardwaarde komen **na** de
> verplichte. `function f(a?: string, b: number)` geeft een fout.

Vergeet je te controleren of hij er is, dan zegt TypeScript het:

```ts domein/src/proef.ts
function begroeting(naam?: string): string {
  return `Welkom terug, ${naam.toUpperCase()}`;
}
```

```text
src/proef.ts:2:27 - error TS18048: 'naam' is possibly 'undefined'.

2   return `Welkom terug, ${naam.toUpperCase()}`;
                            ~~~~

Found 1 error in src/proef.ts:2
```

| Je schrijft | Weglaten mag | Binnen de functie |
|---|---|---|
| `taal: string` | nee | altijd een `string` |
| `taal = "nl-BE"` | ja | altijd een `string`: de waarde of `"nl-BE"` |
| `taal?: string` | ja | `string \| undefined`: jij moet controleren |

Kies een standaardwaarde als er een redelijke waarde bestaat. Kies `?` als *niets
meegegeven* iets anders betekent dan een gewone waarde.
