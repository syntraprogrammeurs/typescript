// Het Groenhuis — de proef van ids.ts
// Hoofdstuk 17, klassikale oefening 17.1

import { GeheugenRepository, PaginaService, ProductService, teller, type Pagina, type Product } from "../src/index.ts";

const producten = new ProductService(new GeheugenRepository<Product>(), teller("p"));
const paginas = new PaginaService(new GeheugenRepository<Pagina>(), teller("pg"));

const bonsai = await producten.nieuw({ naam: "Bonsai Ficus", prijsInCent: 3499, categorieId: "c1" });
const cactus = await producten.nieuw({ naam: "Cactus", prijsInCent: 650, categorieId: "c3" });
const overOns = await paginas.nieuw("Over ons");
console.log(`Met een teller: ${bonsai.id}, ${cactus.id} en ${overOns.id}`);

const winkel = new ProductService(new GeheugenRepository<Product>());
const echt = await winkel.nieuw({ naam: "Bonsai Ficus", prijsInCent: 3499, categorieId: "c1" });
console.log(`Zonder teller: een id van ${echt.id.length} tekens, dat bij elke uitvoering anders is`);
