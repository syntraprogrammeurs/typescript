// Op Wielen — de ingang van het pakket: alles wat een ander programma van Op Wielen mag gebruiken
// Wat hier niet staat, is intern: het mag veranderen zonder dat iemand anders het merkt.

// de vloot
export { Fiets } from "./vloot/fiets.ts";
export { Accessoire, Verhuuritem } from "./vloot/verhuuritem.ts";
export { kanVerhuurdWorden, omschrijving, toestandAlsTekst, uitrustingAlsTekst, vloot } from "./vloot/vloot.ts";
export type { FietsGegevens, Fietssoort, Fietstoestand, Prijskaart, Uitrusting } from "./vloot/vloot.ts";
export { aantalPerSoort, goedkoopsteEerst, metUitrusting, passend, prijsbereik, vanSoort } from "./vloot/zoeken.ts";
export { foutenInFiets, isFiets, laadVloot, RICHTPRIJS } from "./vloot/laden.ts";

// prijzen
export { alsEuro, huurprijs, som, waarborg } from "./prijzen/prijs.ts";
export { alleenAlsMinstens, groepskorting, korting, metRegels, studentenkorting, toeslag, weekendtoeslag } from "./prijzen/tarief.ts";
export type { Tariefregel } from "./prijzen/tarief.ts";

// reservaties
export { Periode } from "./reservaties/periode.ts";
export { Reservatie, Reservatieboek } from "./reservaties/reservaties.ts";
export type { Huurbaar } from "./reservaties/contracten.ts";
export { verwerk } from "./reservaties/aanvragen.ts";
export type { Aanvraag, Antwoord } from "./reservaties/aanvragen.ts";

// opslag
export { groepeerPer, Register } from "./opslag/register.ts";

// fouten
export { NietVrijFout, OnbekendItemFout, OngeldigePeriodeFout, ToestandFout, VerhuurFout } from "./fouten/fouten.ts";
