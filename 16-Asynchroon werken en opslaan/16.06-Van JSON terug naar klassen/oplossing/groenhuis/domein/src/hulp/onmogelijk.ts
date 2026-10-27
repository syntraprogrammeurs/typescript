// Het Groenhuis — een vangnet voor een switch die alle mogelijkheden moet afhandelen

/** Wordt nooit uitgevoerd als elke mogelijkheid afgehandeld is. Vergeet je er een, dan weigert TypeScript. */
export function onmogelijk(waarde: never): never {
  throw new Error(`Onverwachte waarde: ${JSON.stringify(waarde)}`);
}
