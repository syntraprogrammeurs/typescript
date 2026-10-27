// Het Groenhuis — wat het beheerprogramma van een terminal nodig heeft

/** Het programma schrijft via dit contract: naar de echte terminal, of in een test naar een lijst. */
export interface Terminal {
  /** Een gewone regel uitvoer. */
  schrijf(regel?: string): void;
  /** Een foutmelding: ze gaat naar stderr, zodat ze ook te zien is als de uitvoer naar een bestand gaat. */
  fout(regel: string): void;
}

/** De echte terminal: process.stdout en process.stderr. */
export class NodeTerminal implements Terminal {
  schrijf(regel = ""): void {
    process.stdout.write(regel + "\n");
  }

  fout(regel: string): void {
    process.stderr.write(regel + "\n");
  }
}
