// Het Groenhuis — lijsten groeperen en dubbels weghalen, voor elk soort
// Hoofdstuk 12, klassikale oefening 12.1

import { laadProducten } from "./laden.ts";
import { Product } from "./product.ts";

export function groepeer<T, S>(lijst: readonly T[], sleutel: (item: T) => S): Map<S, T[]> {
  const groepen = new Map<S, T[]>();
  for (const item of lijst) {
    const s = sleutel(item);
    const groep = groepen.get(s);
    if (groep === undefined) {
      groepen.set(s, [item]);
    } else {
      groep.push(item);
    }
  }
  return groepen;
}

export function uniek<T>(lijst: readonly T[], sleutel: (item: T) => unknown = (item) => item): T[] {
  const gezien = new Set<unknown>();
  return lijst.filter((item) => {
    const s = sleutel(item);
    if (gezien.has(s)) {
      return false;
    }
    gezien.add(s);
    return true;
  });
}

const producten = laadProducten(new URL("../data/producten.json", import.meta.url)).map((g) => new Product(g));

for (const [status, groep] of groepeer(producten, (product) => product.status)) {
  console.log(`${status}: ${groep.map((product) => product.naam).join(", ")}`);
}
const perBtw = groepeer(producten, (product) => product.btwPercentage);
console.log(`Tarieven: ${[...perBtw.keys()].join(" en ")} procent`);
const alleTags: string[] = [];
for (const product of producten) {
  alleTags.push(...product.tags);
}
console.log(`Alle tags: ${uniek(alleTags).join(", ")}`);
console.log(`Een product per categorie: ${uniek(producten, (product) => product.categorieId).map((p) => p.naam).join(", ")}`);
