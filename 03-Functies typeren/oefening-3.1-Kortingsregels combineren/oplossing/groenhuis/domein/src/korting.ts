// Het Groenhuis — kortingsregels

export type Kortingsregel = (bedragInCent: number) => number;

export function procentKorting(percentage: number): Kortingsregel {
  // Voorbeeld: percentage = 10
  return (bedrag) => Math.round(bedrag * (1 - percentage / 100));
  // Voorbeeld met bedrag = 5200:
  // 5200 * (1 - 10 / 100) -> 5200 * 0.90 = 4680
  // Resultaat: 4680 (nummer)
}

export function vasteKorting(kortingInCent: number): Kortingsregel {
  // Voorbeeld: kortingInCent = 1000 (is €10,00)
  return (bedrag) => Math.max(0, bedrag - kortingInCent);
  // Voorbeeld met bedrag = 4680:
  // Math.max(0, 4680 - 1000) -> Math.max(0, 3680) = 3680
  // Resultaat: 3680 (nummer)
}

export function vanafBedrag(
  drempelInCent: number, // Voorbeeld: 5000 (is €50,00)
  regel: Kortingsregel, // Voorbeeld: de 10% procentKorting-functie van hierboven
): Kortingsregel {
  return (bedrag) => (bedrag >= drempelInCent ? regel(bedrag) : bedrag);
  // Voorbeeld A met bedrag = 5200:
  // 5200 >= 5000 is TRUE -> voer regel(5200) uit -> Resultaat: 4680
  // Voorbeeld B met bedrag = 4200:
  // 4200 >= 5000 is FALSE -> sla regel over -> Resultaat: 4200
}

export function pasToe(
  bedragInCent: number, // Voorbeeld: 5200
  ...regels: Kortingsregel[] // Voorbeeld: [lenteactie, cadeaubon]
): number {
  let resultaat = bedragInCent; // Start: resultaat = 5200

  for (const regel of regels) {
    // Loop 1 (lenteactie): regel(5200) -> resultaat wordt 4680
    // Loop 2 (cadeaubon) : regel(4680) -> resultaat wordt 3680
    resultaat = regel(resultaat);
  }

  return resultaat; // Eindresultaat: 3680 (nummer)
}

export function maximaal(
  maxKortingInCent: number, // Voorbeeld: 1500 (is €15,00 maximum korting)
  regel: Kortingsregel, // Voorbeeld: procentKorting(25)
): Kortingsregel {
  return (bedrag) => Math.max(regel(bedrag), bedrag - maxKortingInCent);
  // Voorbeeld A met bedrag = 4000 (25% van 4000 = 1000 korting):
  // regel(4000) = 3000. Limietberekening = 4000 - 1500 = 2500.
  // Math.max(3000, 2500) -> Resultaat: 3000 (de korting van 1000 blijft behouden)

  // Voorbeeld B met bedrag = 8000 (25% van 8000 = 2000 korting):
  // regel(8000) = 6000. Limietberekening = 8000 - 1500 = 6500.
  // Math.max(6000, 6500) -> Resultaat: 6500 (de korting wordt afgekapt op exact 1500)
}

export function combineer(...regels: Kortingsregel[]): Kortingsregel {
  // Voorbeeld: regels = [blackFriday, cadeaubon]
  return (bedrag) => pasToe(bedrag, ...regels);
  // Voorbeeld met bedrag = 4000:
  // Roept pasToe(4000, blackFriday, cadeaubon) aan -> Resultaat: 2000
}
