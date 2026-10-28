// 6.9 Klassikale oefening 6.1 — Waar is mijn bestelling?
//
// De situatie. Een klant wil weten waar haar bestelling is. Een levering is in voorbereiding,
// verzonden, geleverd of geannuleerd. Elke toestand heeft andere gegevens:
//
//     | Status | Gegevens |
//     |---|---|
//     | in voorbereiding | geen |
//     | verzonden | de vervoerder (bpost, PostNL of DPD) en een trackingcode |
//     | geleverd | de datum, en soms wie het pakje aannam |
//     | geannuleerd | de reden |
//
// Wat je maakt. Een bestand src/levering.ts met:
//
// 1. Een type Vervoerder en een discriminated union Levering. Schrijf de vier mogelijkheden
//    rechtstreeks in de union, zonder aparte interfaces.
// 2. leverinfo(levering): een zin voor de klant, met een switch en het vangnet uit 6.7.
// 3. kanGeannuleerdWorden(levering): alleen een bestelling in voorbereiding.
// 4. Vijf voorbeelden, waaronder twee geleverde: één mét en één zonder ontvanger.
// 5. Probeer daarna een verzonden levering zonder trackingcode, en een geleverde mét een
//    trackingcode. Wat zegt TypeScript?

