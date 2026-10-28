# 5.13 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `'eerste' is possibly 'undefined'` na `lijst[0]` | De lijst kan korter zijn | Controleer, of gebruik `for … of` of `find` |
| `Cannot read properties of undefined` bij het uitvoeren | Je gebruikte `!`, en het element was er niet | Haal het `!` weg en controleer |
| `Property 'push' does not exist on type 'readonly string[]'` | De lijst is `readonly` | Maak een nieuwe lijst met spread |
| `The type 'readonly Product[]' is 'readonly' and cannot be assigned to the mutable type` | Een functie vraagt een gewone lijst | Maak de parameter `readonly` |
| De catalogus staat ineens in een andere volgorde | Je gebruikte `sort` in plaats van `toSorted` | Gebruik `toSorted` |
| `map` geeft een lijst `undefined` | De arrowfunctie heeft accolades zonder `return` | Haakjes rond het object, of een `return` |
| `Reduce of empty array with no initial value` | Geen beginwaarde | Geef altijd een beginwaarde mee |
| `Property 'toSorted' does not exist` | Een oude `target` of `lib` in `tsconfig.json` | `target` op `esnext`, zoals in hoofdstuk 2 |
| `Tuple type '[number, number]' of length '2' has no element at index '2'` | Je leest voorbij het einde van een tuple | Kijk de lengte van het tuple na |
