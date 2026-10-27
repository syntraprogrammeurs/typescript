// Het Groenhuis — lijsten groeperen en dubbels weghalen, voor elk soort
// Hoofdstuk 12, klassikale oefening 12.1


export function groepeer<T, S>(lijst: readonly T[], sleutel: (item: T) => S): Map<S, T[]> {
  const groepen = new Map<S, T[]>();
  for (const item of lijst) {
    const s = sleutel(item);
    const groep = groepen.get(s);
    if (groep === undefined) {
      groepen.set(s, [item]);
    } else {
      groep.push(item);
    }
  }
  return groepen;
}

export function uniek<T>(lijst: readonly T[], sleutel: (item: T) => unknown = (item) => item): T[] {
  const gezien = new Set<unknown>();
  return lijst.filter((item) => {
    const s = sleutel(item);
    if (gezien.has(s)) {
      return false;
    }
    gezien.add(s);
    return true;
  });
}
