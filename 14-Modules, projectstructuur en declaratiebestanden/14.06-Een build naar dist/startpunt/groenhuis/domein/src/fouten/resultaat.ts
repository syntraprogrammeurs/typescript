// Het Groenhuis — het resultaat van iets dat kan mislukken, zonder een fout te gooien

export type Resultaat<T, F = string> = { ok: true; waarde: T } | { ok: false; fout: F };

export function gelukt<T>(waarde: T): Resultaat<T, never> {
  return { ok: true, waarde };
}

export function mislukt<F>(fout: F): Resultaat<never, F> {
  return { ok: false, fout };
}
