// Het Groenhuis — niet eeuwig wachten op een antwoord
// Hoofdstuk 16, klassikale oefening 16.2

/** Geeft de waarde van de belofte, of een fout als ze er na ms milliseconden nog niet is. */
export async function metTijdslimiet<T>(belofte: Promise<T>, ms: number): Promise<T> {
  const { promise: limiet, reject } = Promise.withResolvers<never>();
  const klok = setTimeout(() => reject(new Error(`Geen antwoord binnen ${ms} ms`)), ms);
  try {
    return await Promise.race([belofte, limiet]);
  } finally {
    clearTimeout(klok);
  }
}
