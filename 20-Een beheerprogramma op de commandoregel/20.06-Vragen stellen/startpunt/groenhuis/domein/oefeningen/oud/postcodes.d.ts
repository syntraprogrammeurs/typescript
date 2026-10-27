// De types bij postcodes.js. Het JavaScript-bestand zelf blijft zoals het is.
// Hoofdstuk 14, klassikale oefening 14.2

/** De postcodes waar we leveren. */
export declare const LEVERGEBIED: readonly string[];

/** De gemeente bij een postcode uit het levergebied, of undefined. */
export declare function gemeenteVoor(postcode: string): string | undefined;

export declare function leveringMogelijk(postcode: string): boolean;

/** De leverkost in cent, of null als we er niet leveren. */
export declare function leverkost(postcode: string, express: boolean): number | null;
