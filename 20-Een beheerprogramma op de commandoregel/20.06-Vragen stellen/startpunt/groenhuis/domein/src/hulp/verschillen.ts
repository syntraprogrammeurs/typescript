// Het Groenhuis — wat er tussen twee versies van iets veranderd is, veld per veld

/** Per veld dat veranderd is: de oude en de nieuwe waarde, elk met het type van dat veld. */
export type Verschillen<T> = { [K in keyof T]?: { van: T[K]; naar: T[K] } };

export function verschillen<T extends object>(voor: T, na: T): Verschillen<T> {
  const uit: Verschillen<T> = {};
  // Object.keys geeft altijd string[]: wij weten dat het de sleutels van T zijn
  const sleutels = new Set([...Object.keys(voor), ...Object.keys(na)]) as Set<keyof T>;
  for (const sleutel of sleutels) {
    if (JSON.stringify(voor[sleutel]) !== JSON.stringify(na[sleutel])) {
      uit[sleutel] = { van: voor[sleutel], naar: na[sleutel] };
    }
  }
  return uit;
}
