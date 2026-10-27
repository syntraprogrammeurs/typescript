// 2.10 Klassikale oefening 2.1 — Verzendkosten
//
// De situatie. Het Groenhuis verzendt gratis vanaf 50 euro. Daaronder kost verzenden 4,95 euro.
// Wie zijn bestelling morgen wil, kiest express: dat kost altijd 3 euro extra, ook boven de 50
// euro.
//
// Wat je maakt.
//
// 1. Een bestand src/verzending.ts met drie constanten en een functie verzendkosten(totaalInCent,
//    express). Alle bedragen in cent.
// 2. Types bij beide parameters en bij de returnwaarde.
// 3. In start.ts een lus die de verzendkosten toont voor bestellingen van 26,49 euro, 49,99 euro
//    en precies 50 euro, met en zonder express.
// 4. Controleer met npm run check en npm start.
// 5. Schrijf daarna eens verzendkosten(4999, "ja"). Wat zegt TypeScript? Haal het weer weg.
//
// Opbouw van dit bestand:
// export const GRATIS_VANAF = het getal 5000
// export const VERZENDKOST = het getal 495
// export const TOESLAG_EXPRESS = het getal 300
// export function verzendkosten(totaalInCent: number, express: boolean): number

// Het Groenhuis — verzendkosten
// Hoofdstuk 2, klassikale oefening 2.1

export const GRATIS_VANAF = 5000; // vanaf 50 euro verzenden we gratis
export const VERZENDKOST = 495;
export const TOESLAG_EXPRESS = 300;

export function verzendkosten(totaalInCent: number, express: boolean): number {
  const basis = totaalInCent >= GRATIS_VANAF ? 0 : VERZENDKOST;
  return express ? basis + TOESLAG_EXPRESS : basis;
}
