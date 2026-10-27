// Het Groenhuis — het beheerprogramma op de commandoregel
// Hier, en alleen hier, wordt beslist welke opslag en welke terminal het programma gebruikt.

import { BestandRepository, ProductService, productUitJson } from "../index.ts";
import { voerUit } from "./commandos.ts";
import { NodeTerminal } from "./terminal.ts";

const opslag = await BestandRepository.open(new URL("../../data/producten.json", import.meta.url), productUitJson);
process.exitCode = await voerUit(process.argv.slice(2), new NodeTerminal(), new ProductService(opslag));
