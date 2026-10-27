// Het Groenhuis — de regels van het CMS voor pagina's

import type { Blok } from "../inhoud/blokken.ts";
import { Pagina } from "../inhoud/pagina.ts";
import type { Repository } from "../opslag/repository.ts";
import { Slug } from "../waarden/slug.ts";
import { controleerVrijeSlug, vindOpSlug } from "./slugs.ts";

export class PaginaService {
  readonly #opslag: Repository<Pagina>;

  constructor(opslag: Repository<Pagina>) {
    this.#opslag = opslag;
  }

  /** Een nieuwe, lege pagina. De slug komt uit de titel, en moet vrij zijn. */
  async nieuw(titel: string): Promise<Pagina> {
    const pagina = new Pagina(crypto.randomUUID(), Slug.uitNaam(titel), titel);
    await controleerVrijeSlug(this.#opslag, pagina.slug);
    await this.#opslag.bewaar(pagina);
    return pagina;
  }

  async metSlug(slug: string): Promise<Pagina> {
    return vindOpSlug(this.#opslag, "pagina", slug);
  }

  async voegBlokToe(slug: string, blok: Blok, plaats?: number): Promise<Pagina> {
    const pagina = await this.metSlug(slug);
    pagina.voegBlokToe(blok, plaats);
    await this.#opslag.bewaar(pagina);
    return pagina;
  }

  async publiceer(slug: string): Promise<Pagina> {
    const pagina = await this.metSlug(slug);
    pagina.publiceer();
    await this.#opslag.bewaar(pagina);
    return pagina;
  }
}
