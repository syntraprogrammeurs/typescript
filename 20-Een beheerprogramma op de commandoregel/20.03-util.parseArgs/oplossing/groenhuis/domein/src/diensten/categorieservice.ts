// Het Groenhuis — de regels van het CMS voor categorieën
// Hoofdstuk 17, klassikale oefening 17.2

import { NietGevondenFout, RegelFout } from "../fouten/fouten.ts";
import type { Categorie } from "../inhoud/categorie.ts";
import type { Product } from "../inhoud/product.ts";
import type { Repository } from "../opslag/repository.ts";

function aantal(n: number, enkelvoud: string, meervoud: string): string {
  return `${n} ${n === 1 ? enkelvoud : meervoud}`;
}

export class CategorieService {
  readonly #categorieen: Repository<Categorie>;
  readonly #producten: Repository<Product>;

  constructor(categorieen: Repository<Categorie>, producten: Repository<Product>) {
    this.#categorieen = categorieen;
    this.#producten = producten;
  }

  /** Een categorie verwijderen kan alleen als er niets meer in zit: geen subcategorie, geen product. */
  async verwijder(id: string): Promise<void> {
    const categorie = await this.#categorieen.zoek(id);
    if (categorie === undefined) {
      throw new NietGevondenFout("categorie", id);
    }
    const kinderen = (await this.#categorieen.alle()).filter((kandidaat) => kandidaat.bovenliggende?.id === id);
    if (kinderen.length > 0) {
      throw new RegelFout(`${categorie.naam} heeft nog ${aantal(kinderen.length, "subcategorie", "subcategorieën")}: ${kinderen.map((kind) => kind.naam).join(", ")}`);
    }
    const erin = (await this.#producten.alle()).filter((product) => product.categorieId === id);
    if (erin.length > 0) {
      throw new RegelFout(`${categorie.naam} heeft nog ${aantal(erin.length, "product", "producten")}: ${erin.map((product) => product.naam).join(", ")}`);
    }
    await this.#categorieen.verwijder(id);
  }
}
