// Op Wielen — de vloot doorzoeken en samenvatten

import type { FietsGegevens, Fietssoort } from "./vloot.ts";

export function vanSoort(vloot: readonly FietsGegevens[], soort: Fietssoort): FietsGegevens[] {
  return vloot.filter((fiets) => fiets.soort === soort);
}

export function metUitrusting(vloot: readonly FietsGegevens[], stuk: "slot" | "mand" | "kinderzitje"): FietsGegevens[] {
  return vloot.filter((fiets) => fiets.uitrusting[stuk]);
}

export function passend(vloot: readonly FietsGegevens[], lengteInCm: number): FietsGegevens[] {
  // vuistregel: framemaat = 0,33 x de lengte, met 3 cm speling
  const ideaal = Math.round(lengteInCm * 0.33);
  return vloot
    .filter((fiets) => fiets.framemaatInCm !== undefined && Math.abs(fiets.framemaatInCm - ideaal) <= 3)
    .toSorted((a, b) => Math.abs((a.framemaatInCm ?? 0) - ideaal) - Math.abs((b.framemaatInCm ?? 0) - ideaal));
}

export function aantalPerSoort(vloot: readonly FietsGegevens[]): { [soort: string]: number } {
  return vloot.reduce<{ [soort: string]: number }>((telling, fiets) => {
    const huidig = telling[fiets.soort];
    telling[fiets.soort] = huidig === undefined ? 1 : huidig + 1;
    return telling;
  }, {});
}

export function goedkoopsteEerst(vloot: readonly FietsGegevens[]): FietsGegevens[] {
  return vloot.toSorted((a, b) => a.dagprijsInCent - b.dagprijsInCent || a.id.localeCompare(b.id));
}

export function prijsbereik(vloot: readonly FietsGegevens[]): [goedkoopste: number, duurste: number] | undefined {
  if (vloot.length === 0) {
    return undefined;
  }
  const prijzen = vloot.map((fiets) => fiets.dagprijsInCent);
  return [Math.min(...prijzen), Math.max(...prijzen)];
}
