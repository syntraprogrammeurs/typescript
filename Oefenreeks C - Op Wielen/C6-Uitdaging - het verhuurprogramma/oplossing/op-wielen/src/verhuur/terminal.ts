// Op Wielen — wat het verhuurprogramma van een terminal nodig heeft

import { createInterface, type Interface } from "node:readline";

/** Het programma schrijft en vraagt via dit contract: de echte terminal, of in een test een nep-terminal. */
export interface Terminal {
  schrijf(regel?: string): void;
  /** Een foutmelding gaat naar stderr. */
  fout(regel: string): void;
  vraag(vraag: string): Promise<string>;
}

/** De echte terminal: process.stdout, process.stderr en de regels die de gebruiker typt. */
export class NodeTerminal implements Terminal {
  #lezer: Interface | undefined;
  #regels: AsyncIterator<string> | undefined;

  schrijf(regel = ""): void {
    process.stdout.write(regel + "\n");
  }

  fout(regel: string): void {
    process.stderr.write(regel + "\n");
  }

  async vraag(vraag: string): Promise<string> {
    // pas bij de eerste vraag beginnen lezen: een programma dat niets vraagt, wacht ook niet op invoer
    if (this.#regels === undefined) {
      this.#lezer = createInterface({ input: process.stdin });
      this.#regels = this.#lezer[Symbol.asyncIterator]();
    }
    process.stdout.write(vraag);
    const volgende = await this.#regels.next();
    const antwoord = volgende.done === true ? "" : volgende.value.trim();
    if (!process.stdin.isTTY) {
      // de antwoorden komen uit een pipe: niemand ziet ze getypt worden, dus tonen we ze
      process.stdout.write(antwoord + "\n");
    }
    return antwoord;
  }

  /** Stopt met lezen. Zonder dit blijft Node wachten op invoer die nooit komt. */
  sluit(): void {
    this.#lezer?.close();
  }
}
