// Op Wielen — de vloot doorzoeken en samenvatten

import type { Fiets } from "./vloot.ts";

export function vanSoort(vloot: readonly Fiets[], soort: string): Fiets[] {
  return vloot.filter((fiets) => fiets.soort === soort);
}

export function metUitrusting(vloot: readonly Fiets[], stuk: "slot" | "mand" | "kinderzitje"): Fiets[] {
  return vloot.filter((fiets) => fiets.uitrusting[stuk]);
}

export function passend(vloot: readonly Fiets[], lengteInCm: number): Fiets[] {
  // vuistregel: framemaat = 0,33 x de lengte, met 3 cm speling
  const ideaal = Math.round(lengteInCm * 0.33);
  return vloot
    .filter((fiets) => fiets.framemaatInCm !== undefined && Math.abs(fiets.framemaatInCm - ideaal) <= 3)
    .toSorted((a, b) => Math.abs((a.framemaatInCm ?? 0) - ideaal) - Math.abs((b.framemaatInCm ?? 0) - ideaal));
}

export function aantalPerSoort(vloot: readonly Fiets[]): { [soort: string]: number } {
  return vloot.reduce<{ [soort: string]: number }>((telling, fiets) => {
    const huidig = telling[fiets.soort];
    telling[fiets.soort] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(vloot: readonly Fiets[]): Fiets[] {
  return vloot.toSorted((a, b) => a.dagprijsInCent - b.dagprijsInCent || a.id.localeCompare(b.id));
}

export function prijsbereik(vloot: readonly Fiets[]): [goedkoopste: number, duurste: number] | undefined {
  if (vloot.length === 0) {
    return undefined;
  }
  const prijzen = vloot.map((fiets) => fiets.dagprijsInCent);
  return [Math.min(...prijzen), Math.max(...prijzen)];
}
