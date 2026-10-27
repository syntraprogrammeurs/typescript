// Op Wielen — een fiets door haar toestanden

import { Fiets, toestandAlsTekst, vloot } from "./index.ts";

const fietsen = vloot.map((gegevens) => new Fiets(gegevens));
const eerste = fietsen[0];

if (eerste !== undefined) {
  const stappen: [string, () => void][] = [
    ["verhuren aan Sam", () => eerste.verhuur("Sam Peeters", "2 november")],
    ["nog eens verhuren", () => eerste.verhuur("Lien Maes", "3 november")],
    ["terugnemen", () => eerste.brengTerug()],
    ["band lek", () => eerste.stuurNaarHerstel("lekke band")],
    ["terugnemen", () => eerste.brengTerug()],
    ["hersteld", () => eerste.meldHersteld()],
  ];
  for (const [naam, actie] of stappen) {
    try {
      actie();
      console.log(`${naam.padEnd(20)} ${toestandAlsTekst(eerste.toestand)}`);
    } catch (fout) {
      console.log(`${naam.padEnd(20)} geweigerd: ${fout instanceof Error ? fout.message : fout}`);
    }
  }
}
console.log(`Beschikbaar: ${fietsen.filter((fiets) => fiets.isBeschikbaar).map((fiets) => fiets.id).join(", ")}`);
