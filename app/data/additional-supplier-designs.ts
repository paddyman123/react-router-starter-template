// Exact supplier names from StoneMatch's supplied image batch. Collection
// placement is not supplied, so these are kept separate from the four ranges.
const names: [string, string, boolean][] = [
  ["Carrara Gold", "carrara-gold", true],
  ["Misterio", "misterio", true],
  ["Tornado Gris", "tornado-gris", true],
  ["Calacatta Massa", "calacatta-massa", true],
  ["Athens", "athens", true],
  ["Loas", "loas", true],
  ["Cosmic Black", "cosmic-black", true],
  ["Everest", "everest", true],
  ["Lasa White", "lasa-white", true],
  ["Santana", "santana", true],
  ["Travertine", "travertine", true],
  ["San Marco", "san-marco", true],
  ["Macaubas", "macaubas", true],
  ["Calacatta Cascata", "calacatta-cascata", true],
  ["Dolomite Blanc", "dolomite-blanc", false],
  ["Rosa Nuvola", "rosa-nuvola", true],
  ["Macchia Vecchia", "macchia-vecchia", true],
];
export const additionalSupplierDesigns=names.map(([name,slug,hasSecond])=>({
  name,
  slab:`/quartz/partner-range/extra-${slug}-slab.webp`,
  second:hasSecond?`/quartz/partner-range/extra-${slug}-kitchen.webp`:undefined,
}));
