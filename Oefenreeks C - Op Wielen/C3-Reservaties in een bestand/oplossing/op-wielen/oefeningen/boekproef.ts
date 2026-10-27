// Op Wielen — proef: reserveren, en een dubbele reservatie

import { Accessoire, alsEuro, Fiets, GeheugenRegister, Periode, Reservatieboek, vloot, type Reservatie } from "../src/index.ts";

const fiets = new Fiets(vloot[0]!);
const helm = new Accessoire("a1", "Helm", 300);
const tocht = { id: "x1", omschrijving: "Fietstocht met gids", prijsVoor: (periode: Periode) => 2500 * periode.aantalDagen };

const boek = new Reservatieboek(new GeheugenRegister<Reservatie>());
await boek.reserveer(fiets, "Sam Peeters", Periode.van("2026-11-02", "2026-11-04"));
await boek.reserveer(helm, "Sam Peeters", Periode.van("2026-11-02", "2026-11-04"));
await boek.reserveer(tocht, "Lien Maes", Periode.van("2026-11-07", "2026-11-07"));
try {
  await boek.reserveer(fiets, "Lien Maes", Periode.van("2026-11-04", "2026-11-06"));
} catch (fout) {
  console.log(fout instanceof Error ? fout.message : fout);
}
console.log(`Vrij van 05/11 tot 06/11: ${await boek.isVrij(fiets, Periode.van("2026-11-05", "2026-11-06"))}`);
console.log(`Reservaties voor ${fiets.omschrijving}: ${(await boek.voor(fiets)).map((r) => `${r.klant} ${r.periode}`).join(", ")}`);
console.log(`Omzet: ${alsEuro(await boek.omzetInCent())}`);
