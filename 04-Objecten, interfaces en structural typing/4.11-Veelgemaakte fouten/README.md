# 4.11 Veelgemaakte fouten

| Wat je ziet | Wat er aan de hand is | Oplossing |
|---|---|---|
| `Property 'x' does not exist on type` | Je gebruikt een veld dat niet in de vorm staat, of je tikte het verkeerd | Kijk de interface na |
| `Property 'x' is missing in type … but required in type` | Een verplicht veld ontbreekt | Vul het in, of maak het optioneel als het echt mag ontbreken |
| `Object literal may only specify known properties` | Een extra veld in een object literal, vaak een tikfout | Kijk de naam van het veld na |
| `Cannot assign to 'id' because it is a read-only property` | Je wijzigt een `readonly`-veld | Maak een nieuw object, of laat het veld met rust |
| `'x' is possibly 'undefined'` | Een optioneel veld of een sleutel uit een index signature | Controleer eerst of het er is |
| `Type 'undefined' is not assignable to type 'string'` bij een optioneel veld | `exactOptionalPropertyTypes`: laat het veld weg in plaats van `undefined` | Laat het weg, of schrijf `?: string \| undefined` |
| `'Product' is a type and must be imported using a type-only import` | Een interface met een gewone `import` | `import type { Product }` |
| `node` faalt met *does not provide an export named 'Product'* | Een gewone import van een type, zonder `tsc` uit te voeren | `import type`, en voer `npm run check` uit |
