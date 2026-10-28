// 6.7 Niets vergeten met never — Het Groenhuis, deel I
//
// Volgende maand wil de redactie een nieuw soort blok: een citaat van een klant. Je voegt het toe
// aan de union. Maar blokAlsTekst weet er niets van. Wat gebeurt er?
//
// Opbouw van dit bestand:
// export function onmogelijk(waarde: never): never — Wordt nooit uitgevoerd als elke mogelijkheid
//     afgehandeld is. Vergeet je er een, dan weigert TypeScript.

// Het Groenhuis — een vangnet voor een switch die alle mogelijkheden moet afhandelen

/** Wordt nooit uitgevoerd als elke mogelijkheid afgehandeld is. Vergeet je er een, dan weigert TypeScript. */
export function onmogelijk(waarde: never): never {
  throw new Error(`Onverwachte waarde: ${JSON.stringify(waarde)}`);
}
