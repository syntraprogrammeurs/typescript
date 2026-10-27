// Het Groenhuis — een geschiedenis met ongedaan maken en opnieuw doen, voor elk soort waarde
// Hoofdstuk 12, klassikale oefening 12.2


export class Geschiedenis<T> {
  #vorige: T[] = [];
  #volgende: T[] = [];
  #huidig: T;
  readonly #maximum: number;

  constructor(begin: T, maximum = 50) {
    this.#huidig = begin;
    this.#maximum = maximum;
  }

  get huidig(): T {
    return this.#huidig;
  }

  get kanOngedaan(): boolean {
    return this.#vorige.length > 0;
  }

  get kanOpnieuw(): boolean {
    return this.#volgende.length > 0;
  }

  zet(waarde: T): void {
    this.#vorige = [...this.#vorige, this.#huidig].slice(-this.#maximum);
    this.#volgende = [];
    this.#huidig = waarde;
  }

  ongedaanMaken(): T {
    const vorige = this.#vorige.at(-1);
    if (vorige !== undefined) {
      this.#volgende = [this.#huidig, ...this.#volgende];
      this.#vorige = this.#vorige.slice(0, -1);
      this.#huidig = vorige;
    }
    return this.#huidig;
  }

  opnieuw(): T {
    const volgende = this.#volgende[0];
    if (volgende !== undefined) {
      this.#vorige = [...this.#vorige, this.#huidig];
      this.#volgende = this.#volgende.slice(1);
      this.#huidig = volgende;
    }
    return this.#huidig;
  }
}
