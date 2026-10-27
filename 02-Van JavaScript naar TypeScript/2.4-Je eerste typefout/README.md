# 2.4 Je eerste typefout

Dit is de fout uit hoofdstuk 1, in het klein. Typ het in een nieuw bestand
`src/proef.ts`:

```ts domein/src/proef.ts
const aantalPotten = "40"; // zo komt het uit een formulier of een bestand
let totaal = 0;

totaal = totaal + aantalPotten;
```

Je hoeft niets uit te voeren. VS Code toont de fout terwijl je typt:

![De eerste typefout: een rode kringel onder `totaal`, met de uitleg als je er met de muis over gaat.](../img/02-eerste-typefout.png)

In de terminal vraag je hetzelfde aan `tsc`:

```powershell
npx tsc
```

```text
src/proef.ts:4:1 - error TS2322: Type 'string' is not assignable to type 'number'.

4 totaal = totaal + aantalPotten;
  ~~~~~~

Found 1 error in src/proef.ts:4
```

### Een typefout lezen

| Deel | Wat het zegt |
|---|---|
| `src/proef.ts:4:1` | Het bestand, de **regel** en de **kolom** waar het misgaat. In VS Code is dat een link: `Ctrl` + klik |
| `error TS2322` | Het **nummer** van de fout. Zoek je op `TS2322`, dan vind je uitleg en voorbeelden |
| `Type 'string' is not assignable to type 'number'.` | Wat er misgaat, in één zin |
| de regel code met `~~~~~~` | Waar precies: onder het stuk dat de fout veroorzaakt |

Lees de zin uit de melding letterlijk: *een waarde van het type `string` kan niet
toegekend worden aan iets van het type `number`*. `totaal` begon als getal. `totaal +
aantalPotten` is een tekst, want `+` met een tekst plakt aan elkaar. En een tekst
in `totaal` stoppen weigert TypeScript.

> **BEGRIP — Toekennen (assignable)**
>
> **Assignable** betekent: mag in die plaats terechtkomen. Een `number` mag in een
> variabele van het type `number`, een `string` niet. Bijna elke typefout gaat over
> toekennen: in een variabele, in een parameter van een functie, of als returnwaarde.

> **CONTROLE**
>
> Vervang `aantalPotten` in de laatste regel door `Number(aantalPotten)`. De kringel
> verdwijnt, en `npx tsc` toont niets meer. **Niets tonen is het goede antwoord:** `tsc`
> meldt alleen wat fout is. Verwijder `proef.ts` daarna weer.
