// Het Groenhuis — functies voor lijsten van elk soort

import type { Inhoudsstatus } from "../inhoud/inhoud.ts";

export function eerste<T>(lijst: readonly T[]): T | undefined {
  return lijst[0];
}

/** Alles wat een status heeft en gepubliceerd is. Het type van de lijst blijft behouden. */
export function gepubliceerd<T extends { readonly status: Inhoudsstatus }>(lijst: readonly T[]): T[] {
  return lijst.filter((item) => item.status === "gepubliceerd");
}

export function sorteerOp<T>(lijst: readonly T[], sleutel: (item: T) => number | string): T[] {
  return lijst.toSorted((a, b) => {
    const x = sleutel(a);
    const y = sleutel(b);
    if (typeof x === "number" && typeof y === "number") {
      return x - y;
    }
    return String(x).localeCompare(String(y), "nl");
  });
}

export function waardeVan<T, K extends keyof T>(item: T, sleutel: K): T[K] {
  return item[sleutel];
}

/** Eén pagina uit een lange lijst: zoals een webwinkel twintig producten per keer toont. */
export interface Lijstpagina<T> {
  items: T[];
  pagina: number;
  perPagina: number;
  totaal: number;
  aantalPaginas: number;
}

export function pagineer<T>(lijst: readonly T[], pagina: number, perPagina = 10): Lijstpagina<T> {
  const aantalPaginas = Math.max(1, Math.ceil(lijst.length / perPagina));
  const geldig = Math.min(Math.max(1, pagina), aantalPaginas);
  const begin = (geldig - 1) * perPagina;
  return {
    items: lijst.slice(begin, begin + perPagina),
    pagina: geldig,
    perPagina,
    totaal: lijst.length,
    aantalPaginas,
  };
}
