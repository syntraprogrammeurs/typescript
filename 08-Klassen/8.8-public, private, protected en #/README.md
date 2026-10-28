# 8.8 `public`, `private`, `protected` en `#`

TypeScript kent naast de `#` ook drie woorden om te zeggen wie iets mag zien:

| Schrijfwijze | Wie mag het gebruiken | Na het wegvegen van de types |
|---|---|---|
| `public naam` (of niets) | iedereen | gewoon een veld |
| `protected naam` | de klasse en haar kinderen (hoofdstuk 10) | gewoon een veld: **iedereen** kan erbij |
| `private naam` | alleen de klasse | gewoon een veld: **iedereen** kan erbij |
| `#naam` | alleen de klasse | echt privé, ook in JavaScript |

```ts domein/src/proef.ts
class Kassa {
  private geheim = 1234;
  #echtGeheim = 5678;
}

const kassa = new Kassa();
console.log(kassa["geheim"]);
console.log(JSON.stringify(kassa));
console.log(Object.keys(kassa));
```

```text
1234
{"geheim":1234}
[ 'geheim' ]
```

`kassa["geheim"]` mag, met vierkante haken, ook al is het `private`. En `JSON.stringify` en
`Object.keys` zien het gewoon. `private` beschermt alleen tegen de rode kringel, niet tegen
code die er toch bij wil. `#echtGeheim` zien ze niet.

> **WAAROM**
>
> Waarom gebruikt deze cursus de `#` voor de velden van een domeinklasse? Omdat die velden de
> regels moeten bewaken, en een regel die je met `["…"]` kunt omzeilen, geen regel is. Je zult
> `private` toch vaak zien: het is ouder, en NestJS (deel VII) gebruikt het overal. Dat is daar
> geen probleem: daar is het een afspraak tussen collega's, geen bewaking van gegevens.

### Parameter properties

In code op internet zie je vaak dit:

```ts domein/src/proef.ts
class Categorie {
  constructor(
    readonly id: string,
    public naam: string,
  ) {}
}
```

```text
src/proef.ts:3:5 - error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.

3     readonly id: string,
      ~~~~~~~~~~~~~~~~~~~

src/proef.ts:4:5 - error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.

4     public naam: string,
      ~~~~~~~~~~~~~~~~~~~

Found 2 errors in the same file, starting at: src/proef.ts:3
```

Een woord als `readonly` of `public` vóór een parameter van de constructor maakt er meteen een
veld van. Dat heet een **parameter property**. Het bespaart regels, maar het is geen
JavaScript: TypeScript moet er zelf code voor schrijven (`this.id = id`). Node kan het daarom
niet uitvoeren, en `erasableSyntaxOnly` uit hoofdstuk 2 weigert het. In NestJS kom je het
overal tegen; daar laat het framework de code eerst vertalen.
