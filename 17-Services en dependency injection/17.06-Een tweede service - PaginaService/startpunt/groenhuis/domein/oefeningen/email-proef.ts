// Het Groenhuis — de proef van email.ts
// Hoofdstuk 9, klassikale oefening 9.1

import { Email } from "../src/waarden/email.ts";

const sam = Email.van("  Sam.Peeters@Example.com ");
console.log(`${sam} (domein ${sam.domein})`);
console.log(sam.equals(Email.van("sam.peeters@example.com")));
console.log(JSON.stringify({ naam: "Sam", email: sam }));

for (const tekst of ["sam.peeters@", "sam peeters@example.com", "sam@example", "@example.com"]) {
  try {
    Email.van(tekst);
  } catch (fout) {
    console.log(fout instanceof Error ? fout.message : fout);
  }
}
