# 8.13 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `Property 'x' has no initializer and is not definitely assigned in the constructor` | Een veld krijgt geen waarde | Geef het een waarde in de constructor, of een beginwaarde |
| `Cannot read properties of undefined (reading '#x')` | `this` is kwijt: een methode doorgegeven zonder object | Een arrowfunctie of `bind` |
| `Property '#x' is not accessible outside class` | Je gebruikt een `#`-veld van buiten | Via een getter of een methode |
| `Cannot assign to 'x' because it is a read-only property` | Een getter zonder setter | Via een methode, of voeg een setter toe |
| `This syntax is not allowed when 'erasableSyntaxOnly' is enabled` | Een parameter property | Noem het veld apart, en ken het toe in de constructor |
| Prijs en voorraad ontbreken na `JSON.stringify` | `#`-velden zie je niet in JSON | Schrijf een `toJSON` |
| `x.publiceer is not a function` na `JSON.parse` | JSON bevat alleen gegevens, geen methodes | Maak er een object van met `new` |
| `Type 'undefined' is not assignable` bij een optioneel veld in de constructor | `exactOptionalPropertyTypes` | Ken het alleen toe als het niet `undefined` is |
| `prijsInclBtw()` geeft *is not a function* | Een getter roep je op zonder haakjes | `product.prijsInclBtw` |
