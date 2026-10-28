# 7.11 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| Geen typefout, maar `undefined` of `NaN` bij het uitvoeren | Gegevens van buiten zonder controle, of via `as` of `any` | `unknown`, en een controle |
| `'gegevens' is of type 'unknown'` | Je gebruikt een `unknown` zonder controle | Maak het type eerst smaller |
| `Element implicitly has an 'any' type because expression of type 'string' can't be used to index type` | `waarde[veld]` op een object zonder index signature | Kijk het na als `OnbekendObject` |
| Een type predicate laat iets door dat niet klopt | De controle zelf is fout of onvolledig | Test je controles (hoofdstuk 15) |
| `Assertions require every name in the call target to be declared with an explicit type annotation` | Een assertion function als arrowfunctie in een `const` zonder type | Schrijf ze als `function` |
| `Conversion of type 'string' to type 'number' may be a mistake` | Een `as` die onmogelijk kan kloppen | Zet de waarde om, met `Number(…)`, en kijk het resultaat na |
| `ENOENT: no such file or directory` | Het pad klopt niet, of is relatief tegenover de verkeerde map | Gebruik `new URL(…, import.meta.url)` |
| `Unexpected token` bij `JSON.parse` | Het bestand is geen geldige JSON: een komma te veel, enkele aanhalingstekens | Open het in VS Code: de fout staat rood onderlijnd |
