// Het Groenhuis — het beheerprogramma op de commandoregel
// Hier, en alleen hier, wordt beslist welke opslag en welke terminal het programma gebruikt.

import { BestandRepository, ProductService, productUitJson } from "../index.ts";
import { voerUit } from "./commandos.ts";
import { NodeTerminal } from "./terminal.ts";

const opslag = await BestandRepository.open(new URL("../../data/producten.json", import.meta.url), productUitJson);
const terminal = new NodeTerminal();
try {
  process.exitCode = await voerUit(process.argv.slice(2), terminal, new ProductService(opslag));
} finally {
  terminal.sluit();
}
