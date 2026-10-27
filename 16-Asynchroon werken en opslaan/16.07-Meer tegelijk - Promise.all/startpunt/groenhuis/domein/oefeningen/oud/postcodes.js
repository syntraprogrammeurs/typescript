// De postcodes van de oude website van Het Groenhuis (2019).
// Niet aanpassen: de kassa in de winkel gebruikt dit bestand ook.

export const LEVERGEBIED = ["9000", "9030", "9031", "9032", "9040", "9050", "9051", "9052"];

const GEMEENTEN = {
  9000: "Gent",
  9030: "Mariakerke",
  9031: "Drongen",
  9032: "Wondelgem",
  9040: "Sint-Amandsberg",
  9050: "Gentbrugge",
  9051: "Sint-Denijs-Westrem",
  9052: "Zwijnaarde",
};

export function gemeenteVoor(postcode) {
  return GEMEENTEN[postcode];
}

export function leveringMogelijk(postcode) {
  return LEVERGEBIED.includes(postcode);
}

// in cent, of null als we er niet leveren
export function leverkost(postcode, express) {
  if (!leveringMogelijk(postcode)) {
    return null;
  }
  return express ? 795 : 495;
}
