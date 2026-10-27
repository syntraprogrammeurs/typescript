// Het Groenhuis — de proef van categorie.ts
// Hoofdstuk 10, klassikale oefening 10.1

import { Categorie } from "../src/categorie.ts";

const planten = new Categorie({ id: "c1", slug: "kamerplanten", status: "concept", naam: "Kamerplanten" });
const vetplanten = new Categorie(
  { id: "c5", slug: "vetplanten", status: "concept", naam: "Vetplanten", bovenliggendeId: "c1" },
  planten,
);

for (const stap of [() => vetplanten.publiceer(), () => planten.publiceer(), () => vetplanten.publiceer()]) {
  try {
    stap();
  } catch (fout) {
    console.log(`Geweigerd: ${fout instanceof Error ? fout.message : fout}`);
  }
}
console.log(`${vetplanten.weergavenaam}: ${vetplanten.status}`);
vetplanten.archiveer();
console.log(`${vetplanten.weergavenaam}: ${vetplanten.status}`);
