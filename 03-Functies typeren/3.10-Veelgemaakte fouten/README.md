# 3.10 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `Type 'string' is not assignable to type 'number'` op een `return` | De functie belooft een getal | Kijk welke `return` iets anders teruggeeft |
| `A required parameter cannot follow an optional parameter` | Een `?`-parameter staat voor een verplichte | Zet de optionele achteraan |
| `'naam' is possibly 'undefined'` | Je gebruikt een optionele parameter zonder te controleren | Controleer op `undefined`, of geef hem een standaardwaarde |
| `A rest parameter must be last in a parameter list` | Er staat iets na `...lijst` | Zet de restparameter achteraan |
| `Expected 1 arguments, but got 2` bij een callback | De callback heeft meer parameters dan het type toelaat | Kijk het functietype na |
| `A function returning 'never' cannot have a reachable end point` | De functie kan toch gewoon eindigen | Zorg dat elke weg eindigt met `throw` |
| De volgorde van kortingen geeft een ander bedrag | Regels werken op het resultaat van de vorige | Kies de volgorde bewust, en zet ze in die volgorde |
| Een test met `"€ 24,99"` faalt, terwijl de tekst er hetzelfde uitziet | `Intl` gebruikt een vaste spatie | Vergelijk met `"€ 24,99"`, of test het getal en niet de tekst |
