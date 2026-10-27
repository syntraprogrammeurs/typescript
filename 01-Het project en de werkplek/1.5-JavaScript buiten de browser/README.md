# 1.5 JavaScript buiten de browser

Node uitproberen gaat het snelst met een los bestand. Maak een map `C:\cursus\proef`,
open ze in VS Code en maak daarin een bestand `hallo.js`.

```js hallo.js
console.log("Hallo vanuit Node");
console.log(typeof window);
console.log(typeof process);
console.log(process.version);
```

Voer het uit in de terminal, in die map:

```powershell
node hallo.js
```

```text
Hallo vanuit Node
undefined
object
v24.22.1
```

Twee regels vallen op.

| Regel | Wat het zegt |
|---|---|
| `typeof window` is `undefined` | In Node is er **geen** venster, geen pagina en geen `document` |
| `typeof process` is `object` | In Node is er wel `process`: informatie over het programma dat nu draait |

Probeer maar eens de pagina aan te spreken, zoals je in de browser zou doen:

```js pagina.js
const titel = document.querySelector("h1");
console.log(titel);
```

```text
file:///C:/cursus/proef/pagina.js:1
const titel = document.querySelector("h1");
              ^

ReferenceError: document is not defined
    at file:///C:/cursus/proef/pagina.js:1:15
    at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
    at async node:internal/modules/esm/loader:647:26
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)

Node.js v24.22.1
```

> **BEGRIP — ReferenceError**
>
> Een **ReferenceError** betekent dat je een naam gebruikt die op dat moment niet
> bestaat. Hier is dat `document`: die naam bestaat alleen in de browser.
>
> *Hoe je de melding leest:* de eerste regel zegt **waar** het misging (het bestand en
> de regel), de regel met `ReferenceError` zegt **wat** er misging. De regels met `at`
> eronder zijn de weg die Node aflegde tot aan de fout. Die heb je pas nodig bij grotere
> programma's.

Wat Node wél heeft en de browser niet, ontdek je de komende weken: bestanden lezen en
schrijven, de opdrachtregel uitlezen, een server starten.

| In de browser | In Node |
|---|---|
| `window`, `document`, de DOM | bestaat niet |
| `localStorage` | bestaat niet, je schrijft naar bestanden |
| `fetch` | bestaat, net als in de browser |
| `console.log` toont in de DevTools | `console.log` toont in de terminal |
| bestaat niet | `process`, `node:fs`, `node:path`, `node:http` |
