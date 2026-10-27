// Het Groenhuis — een e-mailadres: geldig, zonder hoofdletters en spaties
// Hoofdstuk 9, klassikale oefening 9.1

import { ValidatieFout } from "./fouten.ts";

export class Email {
  readonly #adres: string;

  private constructor(adres: string) {
    this.#adres = adres;
    Object.freeze(this);
  }

  static van(tekst: string): Email {
    const adres = tekst.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(adres)) {
      throw new ValidatieFout({ email: `"${tekst}" is geen geldig e-mailadres` });
    }
    return new Email(adres);
  }

  get domein(): string {
    return this.#adres.slice(this.#adres.indexOf("@") + 1);
  }

  equals(ander: Email): boolean {
    return this.#adres === ander.#adres;
  }

  toString(): string {
    return this.#adres;
  }

  toJSON(): string {
    return this.#adres;
  }
}

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
