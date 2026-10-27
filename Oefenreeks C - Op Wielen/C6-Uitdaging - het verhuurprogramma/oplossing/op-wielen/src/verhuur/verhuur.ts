// Op Wielen — het verhuurprogramma op de commandoregel
// Hier, en alleen hier, wordt beslist welke opslag, welke terminal en welke dag het programma gebruikt.

import { aanbod, BestandRegister, GeheugenRegister, Reservatieboek, reservatieUitJson, VerhuurService, type Verhuuritem } from "../index.ts";
import { voerUit } from "./commandos.ts";
import { NodeTerminal } from "./terminal.ts";

const items = aanbod();
const reservaties = await BestandRegister.open(new URL("../../data/reservaties.json", import.meta.url), reservatieUitJson(items));
const dienst = new VerhuurService(new GeheugenRegister<Verhuuritem>(items), new Reservatieboek(reservaties));
const terminal = new NodeTerminal();
try {
  process.exitCode = await voerUit(process.argv.slice(2), terminal, dienst);
} finally {
  terminal.sluit();
}
