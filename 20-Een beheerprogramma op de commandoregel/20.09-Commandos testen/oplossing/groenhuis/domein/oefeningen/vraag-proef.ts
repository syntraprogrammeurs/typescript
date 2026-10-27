// Het Groenhuis — proef: drie vragen met rl.question, en de antwoorden uit een pipe

import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const naam = await rl.question("Naam: ");
const prijs = await rl.question("Prijs in euro: ");
const categorie = await rl.question("Categorie: ");
rl.close();
console.log({ naam, prijs, categorie });
