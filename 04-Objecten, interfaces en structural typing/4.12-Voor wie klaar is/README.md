# 4.12 Voor wie klaar is

1. Schrijf `interface Inhoud` twee keer, met telkens een ander veld. Ga daarna met de
   muis over een variabele van dat type. Dit heet **declaration merging**. Waarom is dat
   handig voor de types van een bibliotheek, en verwarrend in je eigen code?
2. Maak `type ProductMetCategorie = Product & { categorie: Categorie }`, en een functie die
   een product en de lijst categorieën krijgt en zo'n object teruggeeft. Wat doe je als de
   categorie niet bestaat?
3. Zoek op wat `Record<string, string>` is, en vergelijk het met de index signature van
   `metadata`. Je ziet het terug in hoofdstuk 18.
4. Zet een `/** … */`-commentaar boven elk veld van `Product` en ga met de muis over
   `product.slug` in `start.ts`. Wat toont VS Code?
