// Op Wielen — iets wat van buiten komt, nakijken voor je het gebruikt

export type OnbekendObject = { [sleutel: string]: unknown };

export function isObject(waarde: unknown): waarde is OnbekendObject {
  return typeof waarde === "object" && waarde !== null && !Array.isArray(waarde);
}
