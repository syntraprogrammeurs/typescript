// 7.8 Producten uit een bestand — Het Groenhuis, deel I
//
// Nu alles samen. De producten verhuizen van catalogus.ts naar een JSON-bestand
// data/producten.json, naast src. Het bestand staat in lessen/07-…/7.8-Producten uit een bestand;
// het begint zo.
//
// Opbouw van dit bestand:
// import readFileSync uit "node:fs"
// import controleerProduct uit "./controle.ts"
// import Product uit "./inhoud.ts" (alleen types, verdwijnt bij het wegvegen)
// export function leesJson(pad: URL): unknown
// export function laadProducten(pad: URL): Product[]

// Het Groenhuis — gegevens uit een JSON-bestand laden, en pas vertrouwen na controle

import { readFileSync } from "node:fs";
import { controleerProduct } from "./controle.ts";
import type { Product } from "./inhoud.ts";

export function leesJson(pad: URL): unknown {
  return JSON.parse(readFileSync(pad, "utf8"));
}

export function laadProducten(pad: URL): Product[] {
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
