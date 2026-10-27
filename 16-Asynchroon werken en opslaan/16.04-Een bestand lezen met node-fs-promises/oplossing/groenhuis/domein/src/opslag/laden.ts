// Het Groenhuis — gegevens uit een JSON-bestand laden, en pas vertrouwen na controle

import { readFile } from "node:fs/promises";
import { ValidatieFout } from "../fouten/fouten.ts";
import { controleerProduct } from "./controle.ts";
import type { ProductGegevens } from "../inhoud/inhoud.ts";

export async function leesJson(pad: URL): Promise<unknown> {
  const tekst = await readFile(pad, "utf8");
  return JSON.parse(tekst);
}

export async function leesLijst(pad: URL): Promise<unknown[]> {
  const gegevens = await leesJson(pad);
  if (!Array.isArray(gegevens)) {
    throw new ValidatieFout({ bestand: `${pad.pathname} bevat geen lijst` });
  }
  return gegevens;
}

export async function laadProducten(pad: URL): Promise<ProductGegevens[]> {
  const lijst = await leesLijst(pad);
  return lijst.map((element, plaats) => {
    controleerProduct(element, `product ${plaats + 1}`);
    return element;
  });
}
