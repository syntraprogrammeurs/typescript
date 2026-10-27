// Op Wielen — proef: reserveren, en een dubbele reservatie

import { Fiets } from "./fiets.ts";
import { Periode } from "./periode.ts";
import { alsEuro } from "./prijs.ts";
import { Reservatieboek } from "./reservaties.ts";
import { Accessoire } from "./verhuuritem.ts";
import { vloot } from "./vloot.ts";

const fiets = new Fiets(vloot[0]!);
const helm = new Accessoire("a1", "Helm", 300);
const tocht = { id: "x1", omschrijving: "Fietstocht met gids", prijsVoor: (periode: Periode) => 2500 * periode.aantalDagen };

const boek = new Reservatieboek();
boek.reserveer(fiets, "Sam Peeters", Periode.van("2026-11-02", "2026-11-04"));
boek.reserveer(helm, "Sam Peeters", Periode.van("2026-11-02", "2026-11-04"));
boek.reserveer(tocht, "Lien Maes", Periode.van("2026-11-07", "2026-11-07"));
try {
  boek.reserveer(fiets, "Lien Maes", Periode.van("2026-11-04", "2026-11-06"));
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
console.log(`Vrij van 05/11 tot 06/11: ${boek.isVrij(fiets, Periode.van("2026-11-05", "2026-11-06"))}`);
console.log(`Reservaties voor ${fiets.omschrijving}: ${boek.voor(fiets).map((r) => `${r.klant} ${r.periode}`).join(", ")}`);
console.log(`Omzet: ${alsEuro(boek.omzetInCent)}`);
