// 8.10 this kwijtraken — voorbeeld uit Het Groenhuis, deel I
//
// Een methode doorgeven aan een andere functie gaat mis.
//
// Opbouw van dit bestand:
// class Teller — met 2 leden:
//     #aantal = 0
//     verhoog(): void
// const teller = een nieuw object: new Teller()
// roept teller.verhoog(…) aan: teller.verhoog()
// const knop = teller.verhoog
// roept knop(…) aan: knop()
//
// In de cursus heet dit bestand domein/src/proef.ts.
// Zet het bestand als src/proef.ts in groenhuis/domein, open daar een terminal en typ:
//     node src/proef.ts
// Let op: dit programma stopt met een fout. Dat is de bedoeling; de melding staat onderaan.

class Teller {
  #aantal = 0;

  verhoog(): void {
    this.#aantal++;
    console.log(`teller: ${this.#aantal}`);
  }
}

const teller = new Teller();
teller.verhoog();

const knop = teller.verhoog;
knop();

// Uitvoer van `node src/proef.ts`:
// teller: 1
// file:///C:/cursus/groenhuis/domein/src/proef.ts:5
//     this.#aantal++;
//         ^
//
// TypeError: Cannot read properties of undefined (reading '#aantal')
//     at verhoog (file:///C:/cursus/groenhuis/domein/src/proef.ts:5:9)
//     at file:///C:/cursus/groenhuis/domein/src/proef.ts:14:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
//     at async node:internal/modules/esm/loader:647:26
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5)
//
// Node.js v24.22.1
