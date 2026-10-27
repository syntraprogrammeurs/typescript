// Het Groenhuis — inhoud terugvinden op haar slug, en nakijken dat een slug nog vrij is
// Voor elk soort inhoud: producten, pagina's, categorieën.

import { NietGevondenFout, RegelFout } from "../fouten/fouten.ts";
import type { Inhoud } from "../inhoud/inhoudsklasse.ts";
import type { Repository } from "../opslag/repository.ts";
import type { Slug } from "../waarden/slug.ts";

export async function vindOpSlug<T extends Inhoud>(opslag: Repository<T>, soort: string, slug: string): Promise<T> {
  const gevonden = await opslag.zoekEerste((item) => item.slug.toString() === slug);
  if (gevonden === undefined) {
    throw new NietGevondenFout(soort, slug);
  }
  return gevonden;
}

export async function controleerVrijeSlug<T extends Inhoud>(opslag: Repository<T>, slug: Slug): Promise<void> {
  const bestaand = await opslag.zoekEerste((item) => item.slug.equals(slug));
  if (bestaand !== undefined) {
    throw new RegelFout(`De slug ${slug} is al in gebruik door ${bestaand.weergavenaam}`);
  }
}
