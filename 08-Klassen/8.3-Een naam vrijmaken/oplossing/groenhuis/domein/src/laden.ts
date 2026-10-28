// 8.3 Een naam vrijmaken — Het Groenhuis, deel I
//
// De klasse die je gaat schrijven, heet Product. Maar Product is al de naam van de interface in
// inhoud.ts. Die interface blijft nodig: ze beschrijft de gegevens van een product, zoals ze in
// een JSON-bestand staan. Geef ze daarom een duidelijkere naam: ProductGegevens.
//
// Opbouw van dit bestand:
// import readFileSync uit "node:fs"
// import controleerProduct uit "./controle.ts"
// import ProductGegevens uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// export function leesJson(pad: URL): unknown
// export function laadProducten(pad: URL): ProductGegevens[]

// Het Groenhuis — gegevens uit een JSON-bestand laden, en pas vertrouwen na controle

import { readFileSync } from "node:fs";
import { controleerProduct } from "./controle.ts";
import type { ProductGegevens } from "./inhoud.ts";

export function leesJson(pad: URL): unknown {
  return JSON.parse(readFileSync(pad, "utf8"));
}

export function laadProducten(pad: URL): ProductGegevens[] {
  const gegevens = leesJson(pad);
  if (!Array.isArray(gegevens)) {
    throw new Error(`${pad.pathname}: verwachtte een lijst producten`);
  }
  const lijst: unknown[] = gegevens;
  return lijst.map((element, plaats) => {
    controleerProduct(element, `product ${plaats + 1}`);
    return element;
  });
}
