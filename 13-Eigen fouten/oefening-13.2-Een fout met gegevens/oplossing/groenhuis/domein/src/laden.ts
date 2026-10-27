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
