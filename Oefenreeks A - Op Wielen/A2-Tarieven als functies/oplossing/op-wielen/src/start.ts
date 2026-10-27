// Op Wielen — tarieven

import { alsEuro, huurprijs, som, waarborg } from "./prijs.ts";
import { groepskorting, metRegels, studentenkorting, weekendtoeslag } from "./tarief.ts";

const eBike = 3500;
const stadsfiets = 1200;

const weekend = huurprijs(2, eBike, true);
console.log(`E-bike, een weekend, verzekerd: ${alsEuro(weekend)}`);
console.log(`  met weekendtoeslag: ${alsEuro(metRegels(weekend, weekendtoeslag))}`);
console.log(`  met weekendtoeslag en studentenkorting: ${alsEuro(metRegels(weekend, weekendtoeslag, studentenkorting))}`);

const groep = som(huurprijs(3, stadsfiets), huurprijs(3, stadsfiets), huurprijs(3, eBike), huurprijs(3, eBike));
console.log(`Vier fietsen, drie dagen: ${alsEuro(groep)}, met groepskorting ${alsEuro(metRegels(groep, groepskorting))}`);
console.log(`Waarborg samen: ${alsEuro(som(waarborg(stadsfiets), waarborg(stadsfiets), waarborg(eBike), waarborg(eBike)))}`);
console.log(`In het Frans: ${alsEuro(groep, "fr-BE")}`);
