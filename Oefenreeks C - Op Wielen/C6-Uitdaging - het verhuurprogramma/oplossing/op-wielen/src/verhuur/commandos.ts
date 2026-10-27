// Op Wielen — de commando's van het verhuurprogramma: lezen wat gevraagd wordt, het doen, en zeggen hoe het afliep

import { parseArgs } from "node:util";
import {
  AanvraagSchema,
  alsEuro,
  FietssoortSchema,
  Periode,
  valideer,
  ValidatieFout,
  VerhuurFout,
  type VerhuurService,
} from "../index.ts";
import type { Terminal } from "./terminal.ts";

/** 0 is gelukt, 1: de verhuur weigerde, 2: het commando zelf klopte niet. */
export const EXITCODE = {
  gelukt: 0,
  mislukt: 1,
  verkeerdGebruik: 2,
} as const;

export type Exitcode = (typeof EXITCODE)[keyof typeof EXITCODE];

/** Het commando zelf klopt niet: een tikfout, een ontbrekend deel, een onbekende optie. */
export class GebruiksFout extends Error {
  constructor(melding: string) {
    super(melding);
    this.name = "GebruiksFout";
  }
}

const OPTIES = {
  klant: { type: "string" },
  van: { type: "string" },
  tot: { type: "string" },
  soort: { type: "string" },
  help: { type: "boolean", short: "h" },
} as const;

function lees(argumenten: string[]) {
  try {
    return parseArgs({ args: argumenten, options: OPTIES, allowPositionals: true });
  } catch (fout) {
    if (fout instanceof TypeError && "code" in fout) {
      throw new GebruiksFout(fout.message);
    }
    throw fout;
  }
}

interface Opdracht {
  opties: ReturnType<typeof lees>["values"];
  argumenten: string[];
  terminal: Terminal;
  dienst: VerhuurService;
}

interface Commando {
  gebruik: string;
  uitleg: string;
  voerUit(opdracht: Opdracht): Promise<void>;
}

const COMMANDOS = {
  lijst: { gebruik: "lijst [--klant <naam>]", uitleg: "alle reservaties, of die van één klant", voerUit: lijst },
  vrij: { gebruik: "vrij --van <datum> --tot <datum> [--soort <soort>]", uitleg: "wat in die periode te huur is", voerUit: vrij },
  reserveer: {
    gebruik: "reserveer <item> --van <datum> --tot <datum> [--klant <naam>]",
    uitleg: "een reservatie; zonder --klant wordt de naam gevraagd",
    voerUit: reserveer,
  },
  annuleer: { gebruik: "annuleer <reservatie>", uitleg: "een reservatie schrappen", voerUit: annuleer },
} satisfies Record<string, Commando>;

function heeft<T extends object>(object: T, sleutel: PropertyKey): sleutel is keyof T {
  return Object.hasOwn(object, sleutel);
}

function toonGebruik(schrijf: (regel: string) => void): void {
  schrijf("Gebruik: npm run verhuur -- <commando> [opties]");
  for (const { gebruik, uitleg } of Object.values(COMMANDOS)) {
    schrijf("");
    schrijf(`  ${gebruik}`);
    schrijf(`      ${uitleg}`);
  }
}

/** Voert één commando uit. Gooit alleen een fout die niemand verwacht: al de rest wordt een melding en een exitcode. */
export async function voerUit(argumenten: string[], terminal: Terminal, dienst: VerhuurService): Promise<Exitcode> {
  try {
    const { values, positionals } = lees(argumenten);
    const [naam, ...rest] = positionals;
    if (values.help === true || naam === undefined) {
      toonGebruik((regel) => terminal.schrijf(regel));
      return EXITCODE.gelukt;
    }
    if (!heeft(COMMANDOS, naam)) {
      throw new GebruiksFout(`Onbekend commando "${naam}"`);
    }
    await COMMANDOS[naam].voerUit({ opties: values, argumenten: rest, terminal, dienst });
    return EXITCODE.gelukt;
  } catch (fout) {
    if (fout instanceof GebruiksFout) {
      terminal.fout(fout.message);
      terminal.fout("");
      toonGebruik((regel) => terminal.fout(regel));
      return EXITCODE.verkeerdGebruik;
    }
    if (fout instanceof ValidatieFout) {
      for (const [veld, melding] of Object.entries(fout.velden)) {
        terminal.fout(`Kijk ${veld === "item" ? "het item" : `--${veld}`} na: ${melding}`);
      }
      return EXITCODE.mislukt;
    }
    if (fout instanceof VerhuurFout) {
      terminal.fout(fout.message);
      return EXITCODE.mislukt;
    }
    throw fout;
  }
}

function verplicht(waarde: string | undefined, optie: string): string {
  if (waarde === undefined) {
    throw new GebruiksFout(`De optie --${optie} ontbreekt`);
  }
  return waarde;
}

async function lijst({ opties, terminal, dienst }: Opdracht): Promise<void> {
  const reservaties = await dienst.reservaties(opties.klant);
  for (const r of reservaties) {
    terminal.schrijf(
      `${r.id.padEnd(5)}${r.periode.toString().padEnd(16)}${r.item.omschrijving.padEnd(36)}${r.klant.padEnd(14)}${alsEuro(r.prijsInCent).padStart(10)}`,
    );
  }
  terminal.schrijf(reservaties.length === 1 ? "1 reservatie" : `${reservaties.length} reservaties`);
}

async function vrij({ opties, terminal, dienst }: Opdracht): Promise<void> {
  const periode = Periode.van(verplicht(opties.van, "van"), verplicht(opties.tot, "tot"));
  const soort = opties.soort === undefined ? undefined : valideer(FietssoortSchema, opties.soort, "soort");
  const items = await dienst.vrij(periode, soort);
  terminal.schrijf(`Vrij van ${periode} (${periode.aantalDagen} dagen):`);
  for (const item of items) {
    terminal.schrijf(`  ${item.id.padEnd(5)}${item.omschrijving.padEnd(36)}${alsEuro(item.prijsVoor(periode)).padStart(10)}`);
  }
  if (items.length === 0) {
    terminal.schrijf("  niets");
  }
}

async function reserveer({ opties, argumenten, terminal, dienst }: Opdracht): Promise<void> {
  const [item] = argumenten;
  const klant = opties.klant ?? (await terminal.vraag("Voor wie is de reservatie? "));
  const reservatie = await dienst.reserveer(valideer(AanvraagSchema, { item, klant, van: opties.van, tot: opties.tot }));
  terminal.schrijf(`Gereserveerd: ${reservatie.id}, ${reservatie.item.omschrijving} voor ${reservatie.klant}, ${reservatie.periode}`);
  terminal.schrijf(`Prijs: ${alsEuro(reservatie.prijsInCent)}`);
}

async function annuleer({ argumenten, terminal, dienst }: Opdracht): Promise<void> {
  const [id] = argumenten;
  if (id === undefined) {
    throw new GebruiksFout("Welke reservatie? Bijvoorbeeld: annuleer r2");
  }
  await dienst.annuleer(id);
  terminal.schrijf(`Reservatie ${id} is geannuleerd.`);
}
