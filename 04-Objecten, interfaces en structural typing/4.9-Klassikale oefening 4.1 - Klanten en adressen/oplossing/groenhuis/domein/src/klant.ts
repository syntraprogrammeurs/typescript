// 4.9 Klassikale oefening 4.1 — Klanten en adressen
//
// De situatie. Een webwinkel levert aan klanten. Een klant heeft een naam, een e-mailadres,
// misschien een telefoonnummer, een leveradres, en soms een apart factuuradres. Een Belgisch adres
// heeft een straat, een huisnummer, soms een bus, een postcode, een gemeente en een land.
//
// Wat je maakt. Een bestand src/klant.ts met:
//
// 1. Een interface Adres en een interface Klant. Welke velden zijn optioneel? Welke readonly?
// 2. adresregels(adres): geeft de regels van het adres terug, zoals op een omslag, met bus 3
//    achter het huisnummer als er een bus is.
// 3. adresVoorFactuur(klant): het factuuradres, of het leveradres als er geen factuuradres is.
// 4. Twee klanten: een particulier met een bus en zonder factuuradres, en een bedrijf met een
//    telefoonnummer en een apart factuuradres. Toon voor elk het lever- en het factuuradres.
//
// Opbouw van dit bestand:
// export interface Adres — de vorm van een object met 6 leden:
//     straat: string
//     huisnummer: string
//     bus?: string
//     postcode: string
//     gemeente: string
//     land: string
// export interface Klant — de vorm van een object met 7 leden:
//     readonly id: string
//     voornaam: string
//     achternaam: string
//     email: string
//     telefoon?: string
//     leveradres: Adres
//     factuuradres?: Adres
// export function adresregels(adres: Adres): string[]
// export function adresVoorFactuur(klant: Klant): Adres
// const sam: Klant = een object met de velden id, voornaam, achternaam, email, leveradres
// const bedrijf: Klant = een object met de velden id, voornaam, achternaam, email, telefoon,
//     leveradres, factuuradres
// for … of: een lus over [sam, bedrijf]

// Het Groenhuis — klanten en hun adressen
// Hoofdstuk 4, klassikale oefening 4.1

export interface Adres {
  straat: string;
  huisnummer: string;
  bus?: string;
  postcode: string;
  gemeente: string;
  land: string;
}

export interface Klant {
  readonly id: string;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon?: string;
  leveradres: Adres;
  factuuradres?: Adres;
}

export function adresregels(adres: Adres): string[] {
  let straat = `${adres.straat} ${adres.huisnummer}`;
  if (adres.bus !== undefined) {
    straat += ` bus ${adres.bus}`;
  }
  return [straat, `${adres.postcode} ${adres.gemeente}`, adres.land];
}

export function adresVoorFactuur(klant: Klant): Adres {
  if (klant.factuuradres !== undefined) {
    return klant.factuuradres;
  }
  return klant.leveradres;
}

const sam: Klant = {
  id: "k1",
  voornaam: "Sam",
  achternaam: "Peeters",
  email: "sam.peeters@example.com",
  leveradres: { straat: "Veldstraat", huisnummer: "12", bus: "3", postcode: "9000", gemeente: "Gent", land: "België" },
};

const bedrijf: Klant = {
  id: "k2",
  voornaam: "Lien",
  achternaam: "Maes",
  email: "lien@tuinen-maes.example",
  telefoon: "+32 9 123 45 67",
  leveradres: { straat: "Kouter", huisnummer: "1", postcode: "9000", gemeente: "Gent", land: "België" },
  factuuradres: { straat: "Industrieweg", huisnummer: "88", postcode: "9032", gemeente: "Wondelgem", land: "België" },
};

for (const klant of [sam, bedrijf]) {
  console.log(`${klant.voornaam} ${klant.achternaam}`);
  console.log(`  Levering: ${adresregels(klant.leveradres).join(", ")}`);
  console.log(`  Factuur:  ${adresregels(adresVoorFactuur(klant)).join(", ")}`);
}
