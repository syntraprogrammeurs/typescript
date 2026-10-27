// Op Wielen — wat kost een e-bike?

import { alsEuro, huurprijs, waarborg } from "./prijs.ts";

const eBike = 3500;

for (const dagen of [1, 3, 5, 6, 7, 10, 14]) {
  console.log(`${String(dagen).padStart(2)} dagen: ${alsEuro(huurprijs(dagen, eBike))}`);
}
console.log(`Waarborg e-bike: ${alsEuro(waarborg(eBike))}`);
console.log(`Waarborg kinderfiets: ${alsEuro(waarborg(600))}`);
