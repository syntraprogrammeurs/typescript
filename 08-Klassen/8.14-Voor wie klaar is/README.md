# 8.14 Voor wie klaar is

1. Schrijf een getter `prijsAlsTekst` die `alsEuro` gebruikt. Is dat iets voor de klasse
   `Product`, of hoort het ergens anders? Denk aan het scherm van deel II.
2. Voeg aan `Product` een methode `wijzigNaam(naam)` toe die ook de slug aanpast. Wat als er al
   bestellingen naar de oude slug verwijzen? Zoek op wat een *redirect* is.
3. Zoek op wat `Object.freeze` doet en probeer het op een `Product`. Wat gebeurt er met de
   `#`-velden?
4. Maak de `id` van `Product` een `#id` met een getter. Wat win je ermee tegenover `readonly id`?
