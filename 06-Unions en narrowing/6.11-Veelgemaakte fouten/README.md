# 6.11 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `Type '"gepubliseerd"' is not assignable to type 'Inhoudsstatus'` | Een tikfout in een literal | Kies uit de voorgestelde waarden |
| `Property 'length' does not exist on type 'string \| number'` | Je gebruikt iets wat niet bij elk type van de union bestaat | Maak het type eerst smaller met een controle |
| Een voorraad van `0` wordt als *onbekend* getoond | `if (voorraad)` of `\|\|` | `!== undefined`, of `??` |
| `Property 'alt' does not exist on type 'Blok'` | Je leest een veld van één soort blok zonder de soort te controleren | Controleer eerst `blok.soort` |
| `Argument of type 'X' is not assignable to parameter of type 'never'` | Een soort van de union wordt niet afgehandeld in de `switch` | Voeg een `case` toe voor `X` |
| `Function lacks ending return statement` | Een `switch` zonder `default` handelt niet alles af | Voeg de ontbrekende `case` toe, of het vangnet |
| `Not all code paths return a value` | Een `case` zonder `return` | Kijk elke `case` na |
| `Object literal may only specify known properties` in een blok | Een veld van een andere soort | Kijk welke velden bij die `soort` horen |
