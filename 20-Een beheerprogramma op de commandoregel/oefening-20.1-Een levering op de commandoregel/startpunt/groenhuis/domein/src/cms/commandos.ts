// Het Groenhuis — de commando's van het beheerprogramma: lezen wat gevraagd wordt, het doen, en zeggen hoe het afliep

import { parseArgs } from "node:util";
import {
  alsEuro,
  DomeinFout,
  Geld,
  meldingVoorKlant,
  NietGevondenFout,
  STATUSSEN,
  ValidatieFout,
  verschillen,
  type Inhoudsstatus,
  type NieuwProduct,
  type ProductGegevens,
  type ProductService,
  type ProductWijziging,
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
  naam: { type: "string" },
  prijs: { type: "string" },
  btw: { type: "string" },
  categorie: { type: "string" },
  tag: { type: "string", multiple: true },
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
  nieuw: { gebruik: "nieuw [--naam] [--prijs] [--categorie]", uitleg: "een nieuw product; wat ontbreekt, wordt gevraagd", voerUit: nieuw },
  publiceer: { gebruik: "publiceer <slug>", uitleg: "een product zichtbaar maken in de winkel", voerUit: publiceer },
  wijzig: { gebruik: "wijzig <slug> [--naam] [--prijs] …", uitleg: "toont wat er veranderde", voerUit: wijzig },
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
      for (const regel of meldingVoorBeheer(fout)) {
        terminal.fout(regel);
      }
      return EXITCODE.mislukt;
    }
    throw fout;
  }
}

/** Welk veld van het domein bij welke optie hoort: wie --prijs typte, wil niet over prijsInCent lezen. */
const OPTIE_VOOR_VELD = {
  naam: "naam",
  prijsInCent: "prijs",
  btwPercentage: "btw",
  categorieId: "categorie",
  tags: "tag",
} satisfies Partial<Record<keyof ProductGegevens, keyof typeof OPTIES>>;

/** Zoals meldingVoorKlant, maar voor wie in de terminal werkt: met de optie of het commando dat helpt. */
function meldingVoorBeheer(fout: DomeinFout): string[] {
  if (fout instanceof NietGevondenFout) {
    return [`Er is geen ${fout.soort} "${fout.sleutel}". Alle slugs: npm run cms -- product lijst`];
  }
  if (!(fout instanceof ValidatieFout)) {
    return meldingVoorKlant(fout);
  }
  return Object.entries(fout.velden).map(([veld, melding]) => {
    const eerste = veld.split(".")[0] ?? veld;
    return `Kijk ${heeft(OPTIE_VOOR_VELD, eerste) ? OPTIE_VOOR_VELD[eerste] : veld} na: ${melding}.`;
  });
}

/** Een bedrag zoals de gebruiker het typt, "34,99", in cent. Dezelfde regel als Geld.vanEuro, met een fout over de prijs. */
function alsCent(tekst: string): number {
  try {
    return Geld.vanEuro(tekst).inCent;
  } catch (fout) {
    if (fout instanceof ValidatieFout) {
      throw new ValidatieFout({ prijsInCent: `"${tekst}" is geen bedrag in euro, zoals 34,99` });
    }
    throw fout;
  }
}

/** Tekst van de terminal (of uit een bestand) naar een NieuwProduct. Zod zet niets om: dat gebeurt hier, voor het schema. */
function nieuwProductUit(invoer: { naam: string; prijs: string; categorie: string; btw?: string | undefined; tags?: string[] | undefined }): NieuwProduct {
  return {
    naam: invoer.naam,
    prijsInCent: alsCent(invoer.prijs),
    categorieId: invoer.categorie,
    ...(invoer.btw === undefined || invoer.btw === "" ? {} : { btwPercentage: Number(invoer.btw) }),
    ...(invoer.tags === undefined ? {} : { tags: invoer.tags }),
  };
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

async function nieuw({ opties, terminal, producten }: Opdracht): Promise<Exitcode> {
  // wat niet als optie meekwam, vragen we; de btw en de tags zijn niet verplicht en worden niet gevraagd
  const naam = opties.naam ?? (await terminal.vraag("Naam: "));
  const prijs = opties.prijs ?? (await terminal.vraag("Prijs in euro: "));
  const categorie = opties.categorie ?? (await terminal.vraag("Categorie: "));
  const product = await producten.nieuw(nieuwProductUit({ naam, prijs, categorie, btw: opties.btw, tags: opties.tag }));
  terminal.schrijf(`Nieuw product: ${product.naam} (${product.slug}), ${alsEuro(product.prijs.inCent)}, btw ${product.btwPercentage} %, ${product.status}`);
  return EXITCODE.gelukt;
}

function slugUit(argumenten: string[]): string {
  const [slug] = argumenten;
  if (slug === undefined) {
    throw new GebruiksFout("Welk product? Geef de slug mee, zoals: product publiceer aloe-vera");
  }
  return slug;
}

async function publiceer({ argumenten, terminal, producten }: Opdracht): Promise<Exitcode> {
  const product = await producten.publiceer(slugUit(argumenten));
  terminal.schrijf(`${product.naam} is gepubliceerd.`);
  return EXITCODE.gelukt;
}

async function wijzig({ opties, argumenten, terminal, producten }: Opdracht): Promise<Exitcode> {
  const slug = slugUit(argumenten);
  const wijziging: ProductWijziging = {
    ...(opties.naam === undefined ? {} : { naam: opties.naam }),
    ...(opties.prijs === undefined ? {} : { prijsInCent: alsCent(opties.prijs) }),
    ...(opties.btw === undefined ? {} : { btwPercentage: Number(opties.btw) }),
    ...(opties.categorie === undefined ? {} : { categorieId: opties.categorie }),
    ...(opties.tag === undefined ? {} : { tags: opties.tag }),
  };
  if (Object.keys(wijziging).length === 0) {
    throw new GebruiksFout("Wat moet er wijzigen? Geef minstens één optie mee, zoals --prijs 32,99");
  }
  const voor = (await producten.metSlug(slug)).toJSON();
  const na = (await producten.wijzig(slug, wijziging)).toJSON();
  const gewijzigd = Object.entries(verschillen(voor, na));
  for (const [veld, verschil] of gewijzigd) {
    if (verschil !== undefined) {
      terminal.schrijf(`  ${veld}: ${JSON.stringify(verschil.van)} → ${JSON.stringify(verschil.naar)}`);
    }
  }
  terminal.schrijf(gewijzigd.length === 0 ? "Er is niets veranderd." : `${na.naam} is gewijzigd.`);
  return EXITCODE.gelukt;
}
