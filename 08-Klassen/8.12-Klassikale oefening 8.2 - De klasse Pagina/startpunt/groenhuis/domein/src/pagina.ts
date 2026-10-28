// 8.12 Klassikale oefening 8.2 — De klasse Pagina
//
// De situatie. Een redacteur bouwt een pagina blok per blok op: een blok toevoegen, ergens
// tussenvoegen, verplaatsen, verwijderen. Een pagina zonder blokken mag niet gepubliceerd worden.
//
// Wat je maakt. Een klasse Pagina in src/pagina.ts, met de blokken uit hoofdstuk 6:
//
// 1. Een id, een slug en een titel, die de constructor krijgt. Een pagina begint als concept,
//    zonder blokken.
// 2. Een getter blokken, die de blokken toont zonder dat iemand ze van buiten kan wijzigen.
// 3. voegBlokToe(blok, plaats): standaard achteraan.
// 4. verwijderBlok(plaats) en verplaatsBlok(van, naar), die een plaats weigeren die niet bestaat.
//    Schrijf die controle één keer, in een private methode.
// 5. publiceer() en alsTekst().
// 6. Maak de pagina Verzorgingstips: probeer ze leeg te publiceren, voeg drie blokken toe, één
//    ervan vooraan, verplaats er een, en publiceer.

