# 1.15 Klassikale oefening 1.2 — Een fout opsporen met de debugger

**De situatie.** Een collega schreef een script dat telt hoeveel stuks er in voorraad
zijn, en wat ze samen waard zijn. De voorraad staat als tekstregels, zoals ze uit een
export van het kassasysteem komen: naam, aantal en prijs in cent, gescheiden door een
puntkomma. Het script geeft een vreemd resultaat.

```js domein/src/voorraad.js
const regels = [
  "Monstera deliciosa;3;2499",
  "Sansevieria;12;1450",
  "Terracotta pot 20 cm;40;895",
];

let aantalStuks = 0;
let waardeInCent = 0;

for (const regel of regels) {
  const [naam, aantal, prijs] = regel.split(";");
  aantalStuks = aantalStuks + aantal;
  waardeInCent = waardeInCent + aantal * prijs;
}

console.log(`Stuks in voorraad: ${aantalStuks}`);
console.log(`Waarde: ${(waardeInCent / 100).toFixed(2)} euro`);
```

```text
Stuks in voorraad: 031240
Waarde: 606.97 euro
```

**Wat je doet.**

1. Typ het script over in `domein/src/voorraad.js` en voer het uit met
   `node src/voorraad.js`.
2. De waarde klopt, het aantal stuks niet: 3 + 12 + 40 is 55. Zet een breakpoint op de
   regel met `aantalStuks = aantalStuks + aantal`.
3. Start het script in een JavaScript Debug Terminal. Noteer bij elke ronde de waarde
   van `aantal` en van `aantalStuks`. Let op de aanhalingstekens in het venster
   **Variables**.
4. Leg in één zin uit wat er misgaat, en waarom de waarde wél klopt.
5. Herstel het script.

### Uitwerking van oefening 1.2

**Wat de debugger toont.**

| Ronde | `aantal` | `aantalStuks` na de regel |
|---|---|---|
| 1 | `"3"` | `"03"` |
| 2 | `"12"` | `"0312"` |
| 3 | `"40"` | `"031240"` |

`split` geeft **tekst** terug, ook als die tekst uit cijfers bestaat. `aantal` is dus
`"3"`, met aanhalingstekens. En `+` met een tekst erbij plakt aan elkaar in plaats van
op te tellen: `0 + "3"` is `"03"`.

**Waarom de waarde wél klopt.** `*` kent maar één betekenis: vermenigvuldigen. JavaScript
zet `"3"` en `"2499"` daarvoor stilzwijgend om naar getallen. Bij `+` kiest JavaScript
voor aan elkaar plakken zodra er één tekst bij is. Dezelfde gegevens, twee operatoren,
twee verschillende regels. Dat is geen fout van je collega maar een valkuil van de taal.

**De herstelde versie:**

```js domein/src/voorraad.js
// Het Groenhuis — hoeveel stuks staan er in voorraad, en wat zijn ze waard?
// Hoofdstuk 1, klassikale oefening 1.2 (de herstelde versie)

const regels = [
  "Monstera deliciosa;3;2499",
  "Sansevieria;12;1450",
  "Terracotta pot 20 cm;40;895",
];

let aantalStuks = 0;
let waardeInCent = 0;

for (const regel of regels) {
  const [naam, aantal, prijs] = regel.split(";");
  aantalStuks = aantalStuks + Number(aantal);
  waardeInCent = waardeInCent + Number(aantal) * Number(prijs);
}

console.log(`Stuks in voorraad: ${aantalStuks}`);
console.log(`Waarde: ${(waardeInCent / 100).toFixed(2)} euro`);
```

```text
Stuks in voorraad: 55
Waarde: 606.97 euro
```

**`Number(...)` overal, ook bij `*`.** Bij `*` werkte het toevallig. Schrijf je de
omzetting overal uitdrukkelijk, dan hoeft de lezer de regels van `+` en `*` niet te
kennen om te zien dat het klopt.

**Wat er nog mis kan gaan.** Staat er in de export `drie` in plaats van `3`, dan geeft
`Number("drie")` de waarde `NaN` (*not a number*), en is je totaal ook `NaN`. Het
script zegt niets, het rekent gewoon verkeerd verder. Hoe je zulke invoer controleert,
leer je in hoofdstuk 7 en 19.

> **WAAROM**
>
> Deze fout zou in TypeScript nooit uitgevoerd zijn. TypeScript weet dat `split` tekst
> teruggeeft, en weigert `aantalStuks` van een getal in een tekst te veranderen. Dat zie
> je in het volgende hoofdstuk, met dit eigen bestand.

---
