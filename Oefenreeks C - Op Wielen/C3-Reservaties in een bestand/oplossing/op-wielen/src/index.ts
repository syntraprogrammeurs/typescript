// Op Wielen — de ingang van het pakket: alles wat een ander programma van Op Wielen mag gebruiken
// Wat hier niet staat, is intern: het mag veranderen zonder dat iemand anders het merkt.

// de vloot
export { Fiets } from "./vloot/fiets.ts";
export { Accessoire, Verhuuritem } from "./vloot/verhuuritem.ts";
export { aanbod } from "./vloot/aanbod.ts";
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
export { Reservatie, Reservatieboek, reservatieUitJson } from "./reservaties/reservaties.ts";
export type { Huurbaar } from "./reservaties/contracten.ts";
export { verwerk } from "./reservaties/aanvragen.ts";
export type { Aanvraag, Antwoord } from "./reservaties/aanvragen.ts";

// opslag
export { GeheugenRegister, groepeerPer } from "./opslag/register.ts";
export type { Register } from "./opslag/register.ts";
export { BestandRegister } from "./opslag/bestandregister.ts";
export type { Hydrateer } from "./opslag/bestandregister.ts";

// fouten
export { BestandFout, NietVrijFout, OnbekendItemFout, OngeldigePeriodeFout, ToestandFout, VerhuurFout } from "./fouten/fouten.ts";
