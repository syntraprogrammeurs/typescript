// Op Wielen — het vangnet voor een volledige switch

export function onmogelijk(waarde: never): never {
  throw new Error(`Onverwachte waarde: ${JSON.stringify(waarde)}`);
}
