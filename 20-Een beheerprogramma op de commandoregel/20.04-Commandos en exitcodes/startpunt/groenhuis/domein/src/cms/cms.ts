// Het Groenhuis — het beheerprogramma op de commandoregel
// Tweede versie: de argumenten gelezen met parseArgs

import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    naam: { type: "string" },
    prijs: { type: "string" },
    tag: { type: "string", multiple: true },
    help: { type: "boolean", short: "h" },
  },
  allowPositionals: true,
});

console.log(positionals);
console.log(values);
