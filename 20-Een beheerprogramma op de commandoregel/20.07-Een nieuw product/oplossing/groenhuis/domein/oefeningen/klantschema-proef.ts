// Het Groenhuis — de proef van klantschema.ts
// Hoofdstuk 7, klassikale oefening 7.1; sinds hoofdstuk 19 met een schema

import { leesLijst } from "../src/opslag/laden.ts";
import { KlantSchema, veldfouten } from "../src/index.ts";

const lijst = await leesLijst(new URL("../data/klanten.json", import.meta.url));

lijst.forEach((element, plaats) => {
  const resultaat = KlantSchema.safeParse(element);
  if (resultaat.success) {
    console.log(`klant ${plaats + 1}: ${resultaat.data.voornaam} ${resultaat.data.achternaam} is in orde`);
    return;
  }
  for (const [veld, melding] of Object.entries(veldfouten(resultaat.error, `klant ${plaats + 1}`))) {
    console.log(`${veld}: ${melding}`);
  }
});
