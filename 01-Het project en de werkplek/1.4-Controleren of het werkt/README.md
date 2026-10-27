# 1.4 Controleren of het werkt

Sluit elke terminal die openstond, en open een nieuwe. Een terminal die al openstond
voor de installatie, kent het nieuwe programma nog niet.

```powershell
node -v
npm -v
```

```text
v24.22.1
```

```text
11.19.1
```

> **CONTROLE**
>
> Je ziet twee versienummers. Het eerste begint met `v24`. Het tweede is de versie van
> npm, die met Node is meegekomen. Een iets ander nummer achter de eerste punt is geen
> probleem: Node brengt elke paar weken een kleine update uit.

> **LET OP**
>
> Op Windows krijg je bij `npm -v` soms deze melding:
>
> `npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.`
>
> PowerShell weigert standaard scripts uit te voeren, en `npm` is zo'n script. Typ één
> keer:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
> ```
>
> Bevestig met `J` (of `Y`). Dit geldt alleen voor jouw gebruiker, en alleen voor scripts
> die op je eigen computer staan of ondertekend zijn.
