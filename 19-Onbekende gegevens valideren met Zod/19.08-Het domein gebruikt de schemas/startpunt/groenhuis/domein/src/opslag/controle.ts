// Het Groenhuis — gegevens van buiten nakijken voor je ze vertrouwt
// Sinds hoofdstuk 19 kijkt een schema de producten na (schemas/productschema.ts).
// Wat hier overblijft, gebruikt alleen instellingen.ts nog.

/** Een object waarvan je de velden nog niet kent. */
export type OnbekendObject = { [sleutel: string]: unknown };

export function isObject(waarde: unknown): waarde is OnbekendObject {
  return typeof waarde === "object" && waarde !== null && !Array.isArray(waarde);
}
