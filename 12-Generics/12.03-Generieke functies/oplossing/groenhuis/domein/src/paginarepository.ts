// Het Groenhuis — een repository voor pagina's
// Hoofdstuk 11, klassikale oefening 11.2

import { Pagina } from "./pagina.ts";
import { Slug } from "./slug.ts";

export interface PaginaRepository {
  alle(): Pagina[];
  zoek(id: string): Pagina | undefined;
  zoekOpSlug(slug: string): Pagina | undefined;
  bewaar(pagina: Pagina): void;
  verwijder(id: string): boolean;
  gepubliceerd(): Pagina[];
}

export class GeheugenPaginaRepository implements PaginaRepository {
  #paginas = new Map<string, Pagina>();

  alle(): Pagina[] {
    return [...this.#paginas.values()];
  }

  zoek(id: string): Pagina | undefined {
    return this.#paginas.get(id);
  }

  zoekOpSlug(slug: string): Pagina | undefined {
    return this.alle().find((pagina) => pagina.slug.toString() === slug);
  }

  bewaar(pagina: Pagina): void {
    this.#paginas.set(pagina.id, pagina);
  }

  verwijder(id: string): boolean {
    return this.#paginas.delete(id);
  }

  gepubliceerd(): Pagina[] {
    return this.alle().filter((pagina) => pagina.isZichtbaar);
  }
}

const opslag: PaginaRepository = new GeheugenPaginaRepository();
const tips = new Pagina("g3", Slug.van("verzorgingstips"), "Verzorgingstips");
tips.voegBlokToe({ soort: "tekst", tekst: "Geef liever te weinig dan te veel water." });
tips.publiceer();
opslag.bewaar(tips);
opslag.bewaar(new Pagina("g4", Slug.van("lenteactie"), "Lenteactie"));

console.log(opslag.alle().map((pagina) => `${pagina.titel} (${pagina.status})`));
console.log(opslag.gepubliceerd().map((pagina) => pagina.titel));
console.log(opslag.zoekOpSlug("lenteactie")?.titel, opslag.zoekOpSlug("bestaat-niet"));
console.log(opslag.verwijder("g4"), opslag.verwijder("g4"), opslag.alle().length);
