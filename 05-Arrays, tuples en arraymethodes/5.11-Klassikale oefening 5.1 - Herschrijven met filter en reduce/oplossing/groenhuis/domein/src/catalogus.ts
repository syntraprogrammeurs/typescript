// Het Groenhuis — voorbeeldgegevens om mee te werken
// Later komen deze uit een bestand (hoofdstuk 16) en daarna uit een databank (deel IV).

import type { Categorie, Pagina, Product } from "./inhoud.ts";

export const categorieen: readonly Categorie[] = [
  { id: "c1", slug: "kamerplanten", naam: "Kamerplanten" },
  { id: "c2", slug: "buitenplanten", naam: "Buitenplanten" },
  { id: "c3", slug: "potten", naam: "Potten" },
  { id: "c4", slug: "gereedschap", naam: "Gereedschap" },
  { id: "c5", slug: "vetplanten", naam: "Vetplanten", bovenliggendeId: "c1" },
];

export const producten: readonly Product[] = [
  {
    id: "p01",
    slug: "monstera-deliciosa",
    naam: "Monstera deliciosa",
    beschrijving: "Grote, gespleten bladeren. Houdt van licht, maar niet van volle zon.",
    prijsInCent: 2499,
    btwPercentage: 6,
    voorraad: 3,
    categorieId: "c1",
    tags: ["makkelijk", "groot"],
    afmetingen: { hoogteInCm: 60, potmaatInCm: 21 },
  },
  {
    id: "p02",
    slug: "sansevieria-trifasciata",
    naam: "Sansevieria trifasciata",
    prijsInCent: 1450,
    btwPercentage: 6,
    voorraad: 12,
    categorieId: "c1",
    tags: ["makkelijk", "luchtzuiverend"],
    afmetingen: { hoogteInCm: 45, potmaatInCm: 17 },
  },
  {
    id: "p03",
    slug: "calathea-orbifolia",
    naam: "Calathea orbifolia",
    prijsInCent: 2295,
    btwPercentage: 6,
    voorraad: 0,
    categorieId: "c1",
    tags: ["huisdiervriendelijk"],
    afmetingen: { hoogteInCm: 40, potmaatInCm: 17 },
  },
  {
    id: "p04",
    slug: "aloe-vera",
    naam: "Aloe vera",
    prijsInCent: 799,
    btwPercentage: 6,
    voorraad: 25,
    categorieId: "c5",
    tags: ["makkelijk"],
  },
  {
    id: "p05",
    slug: "olijfboom",
    naam: "Olijfboom",
    beschrijving: "Winterhard tot -10 °C. Zet hem in een grote pot, in de volle zon.",
    prijsInCent: 8999,
    btwPercentage: 6,
    voorraad: 2,
    categorieId: "c2",
    tags: ["buiten", "groot"],
    afmetingen: { hoogteInCm: 150, potmaatInCm: 40 },
  },
  {
    id: "p06",
    slug: "terracotta-pot-20",
    naam: "Terracotta pot 20 cm",
    prijsInCent: 895,
    btwPercentage: 21,
    voorraad: 40,
    categorieId: "c3",
    tags: ["terracotta"],
  },
  {
    id: "p07",
    slug: "plantenspuit",
    naam: "Plantenspuit",
    prijsInCent: 1299,
    btwPercentage: 21,
    voorraad: 15,
    categorieId: "c4",
    tags: [],
  },
  {
    id: "p08",
    slug: "snoeischaar",
    naam: "Snoeischaar",
    prijsInCent: 2450,
    btwPercentage: 21,
    voorraad: 0,
    categorieId: "c4",
    tags: ["rvs"],
  },
];

export const paginas: readonly Pagina[] = [
  {
    id: "g1",
    slug: "over-ons",
    titel: "Over ons",
    tekst: "Het Groenhuis is een plantenwinkel in Gent, sinds 1998.",
    metadata: { beschrijving: "Wie we zijn en waar je ons vindt" },
  },
  {
    id: "g2",
    slug: "verzending",
    titel: "Verzending",
    tekst: "Gratis verzending vanaf 50 euro. Express: morgen in huis.",
    metadata: { beschrijving: "Verzendkosten en levertermijnen", robots: "index" },
  },
];
