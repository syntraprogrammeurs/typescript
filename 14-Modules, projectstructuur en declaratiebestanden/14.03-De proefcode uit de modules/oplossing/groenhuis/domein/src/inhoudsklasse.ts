// Het Groenhuis — wat elke inhoud van het CMS gemeen heeft: een id, een slug en een status

import type { Publiceerbaar } from "./contracten.ts";
import { RegelFout } from "./fouten.ts";
import type { Inhoudsstatus } from "./inhoud.ts";
import type { Slug } from "./slug.ts";

export abstract class Inhoud implements Publiceerbaar {
  readonly id: string;
  #slug: Slug;
  #status: Inhoudsstatus;

  constructor(id: string, slug: Slug, status: Inhoudsstatus) {
    this.id = id;
    this.#slug = slug;
    this.#status = status;
  }

  /** Hoe een mens deze inhoud noemt: de naam van een product, de titel van een pagina. */
  abstract get weergavenaam(): string;

  /** Waarom dit nog niet gepubliceerd kan worden, of undefined als het kan. */
  protected abstract redenOmNietTePubliceren(): string | undefined;

  get slug(): Slug {
    return this.#slug;
  }

  get status(): Inhoudsstatus {
    return this.#status;
  }

  get isZichtbaar(): boolean {
    return this.#status === "gepubliceerd";
  }

  publiceer(): void {
    if (this.#status === "gearchiveerd") {
      throw new RegelFout(`${this.weergavenaam} is gearchiveerd en kan niet meer gepubliceerd worden`);
    }
    const reden = this.redenOmNietTePubliceren();
    if (reden !== undefined) {
      throw new RegelFout(`${this.weergavenaam} kan niet gepubliceerd worden: ${reden}`);
    }
    this.#status = "gepubliceerd";
  }

  archiveer(): void {
    this.#status = "gearchiveerd";
  }
}
