// Het Groenhuis — de publieke ingang van het domein
// Wat hier niet staat, is intern: het mag veranderen zonder dat iemand buiten het domein het merkt.

// De inhoud van het CMS
export { Inhoud } from "./inhoud/inhoudsklasse.ts";
export { Product } from "./inhoud/product.ts";
export { Pagina } from "./inhoud/pagina.ts";
export { Categorie } from "./inhoud/categorie.ts";
export { blokAlsTekst, type Blok } from "./inhoud/blokken.ts";
export { STATUSSEN } from "./inhoud/inhoud.ts";
export type { Afmetingen, CategorieGegevens, Inhoudsstatus, PaginaGegevens, ProductGegevens } from "./inhoud/inhoud.ts";
export type { Publiceerbaar, Verkoopbaar } from "./inhoud/contracten.ts";
export { zoek, type Zoekfilter } from "./inhoud/zoeken.ts";

// Waarden
export { Geld } from "./waarden/geld.ts";
export { Slug } from "./waarden/slug.ts";
export { Email } from "./waarden/email.ts";
export { kortingOp, percentage, type Percentage } from "./waarden/percentage.ts";
export { alsEuro, BTW_PLANTEN, BTW_STANDAARD } from "./waarden/prijs.ts";

// Fouten en resultaten
export { DomeinFout, NietGevondenFout, probeer, RegelFout, ValidatieFout, VoorraadFout } from "./fouten/fouten.ts";
export { gelukt, mislukt, type Resultaat } from "./fouten/resultaat.ts";
export { meldingVoorKlant } from "./fouten/meldingen.ts";

// Opslag
export { GeheugenRepository, type Repository } from "./opslag/repository.ts";
export { BestandRepository, type Hydrateer } from "./opslag/bestandrepository.ts";
export { laadProducten, productUitJson } from "./opslag/laden.ts";
export { laadInstellingen, type Instellingen } from "./opslag/instellingen.ts";
export { klantUitJson } from "./opslag/klantcontrole.ts";

// Diensten: de regels die meer dan één object raken, met de opslag die ze van buiten krijgen
export { ProductService } from "./diensten/productservice.ts";
export { PaginaService } from "./diensten/paginaservice.ts";
export { teller, willekeurigId, type MaakId } from "./diensten/ids.ts";

// De winkel
export { Winkelmandje } from "./winkel/winkelmandje.ts";
export { Cadeaubon } from "./winkel/cadeaubon.ts";
export { AfhalenInDeWinkel, Express, Koerier, Standaard, Verzendoptie } from "./winkel/verzendopties.ts";
export type { Adres, Klant } from "./winkel/klant.ts";

// Hulpmiddelen voor lijsten en geschiedenis
export { pagineer, type Lijstpagina } from "./hulp/lijsten.ts";
export { groepeer, uniek } from "./hulp/groeperen.ts";
export { Geschiedenis } from "./hulp/geschiedenis.ts";
export { metTijdslimiet } from "./hulp/tijdslimiet.ts";
