// Het Groenhuis — Pick, maar dan bij het uitvoeren: een object met alleen de gevraagde sleutels

export function kies<T extends object, K extends keyof T>(bron: T, sleutels: readonly K[]): Pick<T, K> {
  const uit = {} as Pick<T, K>;
  for (const sleutel of sleutels) {
    uit[sleutel] = bron[sleutel];
  }
  return uit;
}
