// Het Groenhuis — Zod, één keer ingesteld: met Nederlandse foutmeldingen
// Elk schema van het domein importeert z van hier, zodat die instelling altijd geldt.

import * as z from "zod";

z.config(z.locales.nl());

export { z };
