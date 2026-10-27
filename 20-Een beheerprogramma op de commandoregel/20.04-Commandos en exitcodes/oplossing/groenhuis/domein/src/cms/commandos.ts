// Het Groenhuis — de commando's van het beheerprogramma: lezen wat gevraagd wordt, het doen, en zeggen hoe het afliep

import { parseArgs } from "node:util";
import {
  alsEuro,
  DomeinFout,
  meldingVoorKlant,
  STATUSSEN,
  type Inhoudsstatus,
  type ProductService,
} from "../index.ts";
import type { Terminal } from "./terminal.ts";

/** De afspraak van elk programma op de commandoregel: 0 is gelukt, elk ander getal is mislukt. */
export const EXITCODE = {
  gelukt: 0,
  mislukt: 1, // het commando klopte, maar het domein weigerde
  verkeerdGebruik: 2, // het commando zelf klopte niet
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
  status: { type: "string" },
  help: { type: "boolean", short: "h" },
} as const;

function lees(argumenten: string[]) {
  try {
    return parseArgs({ args: argumenten, options: OPTIES, allowPositionals: true });
  } catch (fout) {
    // parseArgs gooit een TypeError met een code, zoals ERR_PARSE_ARGS_UNKNOWN_OPTION
    if (fout instanceof TypeError && "code" in fout) {
      throw new GebruiksFout(fout.message);
    }
    throw fout;
  }
}

/** Wat elk commando krijgt: de opties, wat er na zijn naam kwam, en waarmee het werkt. */
interface Opdracht {
  opties: ReturnType<typeof lees>["values"];
  argumenten: string[];
  terminal: Terminal;
  producten: ProductService;
}

interface Commando {
  gebruik: string;
  uitleg: string;
  voerUit(opdracht: Opdracht): Promise<Exitcode>;
}

const COMMANDOS = {
  lijst: { gebruik: "lijst [--status <status>]", uitleg: "alle producten, of die met één status", voerUit: lijst },
} satisfies Record<string, Commando>;

/** Een type guard voor elk object: na heeft(COMMANDOS, naam) weet TypeScript dat naam een sleutel is. */
function heeft<T extends object>(object: T, sleutel: PropertyKey): sleutel is keyof T {
  return Object.hasOwn(object, sleutel);
}

function isStatus(waarde: string): waarde is Inhoudsstatus {
  return STATUSSEN.some((status) => status === waarde);
}

function toonGebruik(schrijf: (regel: string) => void): void {
  schrijf("Gebruik: npm run cms -- product <commando> [opties]");
  schrijf("");
  for (const { gebruik, uitleg } of Object.values(COMMANDOS)) {
    schrijf(`  ${gebruik.padEnd(40)}${uitleg}`);
  }
}

/** Voert één commando uit. Gooit alleen een fout die niemand verwacht: al de rest wordt een melding en een exitcode. */
export async function voerUit(argumenten: string[], terminal: Terminal, producten: ProductService): Promise<Exitcode> {
  try {
    const { values, positionals } = lees(argumenten);
    const [onderwerp, naam, ...rest] = positionals;
    if (values.help === true || onderwerp === undefined) {
      toonGebruik((regel) => terminal.schrijf(regel));
      return EXITCODE.gelukt;
    }
    if (onderwerp !== "product") {
      throw new GebruiksFout(`Onbekend onderwerp "${onderwerp}": het beheer kent voorlopig alleen "product"`);
    }
    if (naam === undefined || !heeft(COMMANDOS, naam)) {
      throw new GebruiksFout(naam === undefined ? "Welk commando?" : `Onbekend commando "${naam}"`);
    }
    return await COMMANDOS[naam].voerUit({ opties: values, argumenten: rest, terminal, producten });
  } catch (fout) {
    if (fout instanceof GebruiksFout) {
      terminal.fout(fout.message);
      terminal.fout("");
      toonGebruik((regel) => terminal.fout(regel));
      return EXITCODE.verkeerdGebruik;
    }
    if (fout instanceof DomeinFout) {
      for (const regel of meldingVoorKlant(fout)) {
        terminal.fout(regel);
      }
      return EXITCODE.mislukt;
    }
    throw fout;
  }
}

async function lijst({ opties, terminal, producten }: Opdracht): Promise<Exitcode> {
  const status = opties.status;
  if (status !== undefined && !isStatus(status)) {
    throw new GebruiksFout(`Onbekende status "${status}": kies uit ${STATUSSEN.join(", ")}`);
  }
  const lijst = (await producten.samenvattingen()).filter((product) => status === undefined || product.status === status);
  for (const product of lijst) {
    terminal.schrijf(
      `${product.slug.padEnd(26)}${product.status.padEnd(14)}${alsEuro(product.prijsInCent).padStart(10)}${String(product.voorraad).padStart(5)} stuks`,
    );
  }
  terminal.schrijf(lijst.length === 1 ? "1 product" : `${lijst.length} producten`);
  return EXITCODE.gelukt;
}
