// Het Groenhuis — een CSV-bestand regel per regel lezen, zonder het hele bestand in het geheugen te laden
// Hoofdstuk 20, klassikale oefening 20.2

import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export interface CsvRegel {
  /** Het nummer van de regel in het bestand. De kopregel is regel 1. */
  nummer: number;
  /** De waarden van deze regel, per kolom uit de kopregel. */
  waarden: { [kolom: string]: string };
}

/** Geeft elke regel na de kopregel, zodra ze gelezen is. Lege regels slaat het over. */
export async function* leesCsv(pad: string, scheiding = ";"): AsyncGenerator<CsvRegel> {
  const lezer = createInterface({ input: createReadStream(pad, "utf8"), crlfDelay: Infinity });
  let kop: string[] | undefined;
  let nummer = 0;
  for await (const regel of lezer) {
    nummer++;
    if (regel.trim() === "") {
      continue;
    }
    const velden = regel.split(scheiding).map((veld) => veld.trim());
    if (kop === undefined) {
      kop = velden;
      continue;
    }
    yield { nummer, waarden: Object.fromEntries(kop.map((kolom, plaats) => [kolom, velden[plaats] ?? ""])) };
  }
}
