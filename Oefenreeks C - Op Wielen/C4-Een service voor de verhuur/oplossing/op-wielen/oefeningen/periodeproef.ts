// Op Wielen — proef: een paar periodes

import { Periode } from "../src/index.ts";

const herfst = Periode.van("2026-10-31", "2026-11-08");
const weekend = Periode.van("2026-11-07", "2026-11-08");
const later = Periode.van("2026-11-09", "2026-11-11");

console.log(`${herfst}: ${herfst.aantalDagen} dagen, daarna vrij vanaf ${herfst.dagErna}`);
console.log(`Overlapt met ${weekend}: ${herfst.overlaptMet(weekend)}; met ${later}: ${herfst.overlaptMet(later)}`);
console.log(herfst.equals(Periode.van("2026-10-31", "2026-11-08")), JSON.stringify({ periode: weekend }));
for (const [van, tot] of [["2026-11-08", "2026-11-01"], ["2026-02-30", "2026-03-01"], ["8 november", "2026-11-10"]] as const) {
  try {
    Periode.van(van, tot);
  } catch (fout) {
    console.log(fout instanceof Error ? fout.message : fout);
  }
}
