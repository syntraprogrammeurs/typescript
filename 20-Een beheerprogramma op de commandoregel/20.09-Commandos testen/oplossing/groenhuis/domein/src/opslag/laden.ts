// Het Groenhuis — gegevens uit een JSON-bestand laden, en pas vertrouwen na controle

import { readFile } from "node:fs/promises";
import { ValidatieFout } from "../fouten/fouten.ts";
import type { ProductGegevens } from "../inhoud/inhoud.ts";
import { Product } from "../inhoud/product.ts";
import { ProductSchema } from "../schemas/productschema.ts";
import { valideer } from "../schemas/valideer.ts";

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
  return lijst.map((element, plaats) => valideer(ProductSchema, element, `product ${plaats + 1}`));
}

/** Van een element uit een JSON-bestand terug naar een Product: eerst nakijken, dan de klasse maken. */
export function productUitJson(gegevens: unknown, plaats: number): Product {
  return new Product(valideer(ProductSchema, gegevens, `product ${plaats + 1}`));
}
