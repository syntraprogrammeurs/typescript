// Het Groenhuis — de proef van ids.ts
// Hoofdstuk 17, klassikale oefening 17.1

import { GeheugenRepository, Geld, PaginaService, ProductService, teller, type Pagina, type Product } from "../src/index.ts";

const producten = new ProductService(new GeheugenRepository<Product>(), teller("p"));
const paginas = new PaginaService(new GeheugenRepository<Pagina>(), teller("pg"));

const bonsai = await producten.nieuw("Bonsai Ficus", Geld.vanEuro("34,99"), "c1");
const cactus = await producten.nieuw("Cactus", Geld.vanEuro("6,50"), "c3");
const overOns = await paginas.nieuw("Over ons");
console.log(`Met een teller: ${bonsai.id}, ${cactus.id} en ${overOns.id}`);

const winkel = new ProductService(new GeheugenRepository<Product>());
const echt = await winkel.nieuw("Bonsai Ficus", Geld.vanEuro("34,99"), "c1");
console.log(`Zonder teller: een id van ${echt.id.length} tekens, dat bij elke uitvoering anders is`);
