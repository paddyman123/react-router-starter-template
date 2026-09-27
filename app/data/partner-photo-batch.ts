// Supplier-named slab and kitchen images supplied by StoneMatch. The kitchen
// images may include renders; do not describe them as verified installations.
export type PartnerPhotoBatch = { slab?: string; kitchens?: string[] };
const asset = (name: string) => `/quartz/partner-range/${name}.webp`;
const slab = (name: string, kitchens: string[] = []): PartnerPhotoBatch => ({
  slab: asset(`${name}-slab`),
  kitchens: kitchens.map((_, i) => asset(`${name}-kitchen-${i + 1}`)),
});
export const partnerPhotoBatch: Record<string, PartnerPhotoBatch> = {
  "White Dove": slab("white-dove"),
  "Bianco Shimmer": slab("bianco-shimmer", ["1"]),
  "Super White": slab("super-white", ["1"]),
  "Calacatta Gold": slab("calacatta-gold", ["1"]),
  "Carrara Shimmer": slab("carrara-shimmer", ["1"]),
  "Attico": slab("attico", ["1"]),
  "Arctic White": slab("arctic-white", ["1"]),
  "Lydia Gold": slab("lydia-gold", ["1"]),
  "Carrara White": slab("carrara-white", ["1"]),
  "Toran": slab("toran", ["1"]),
  "Statuario": slab("statuario", ["1"]),
  "Perla": slab("perla", ["1"]),
  "Cold Spring": slab("cold-spring", ["1"]),
  "Perla Venata": slab("perla-venata", ["1"]),
  "Fog": slab("fog", ["1"]),
  "London Grey": slab("london-grey", ["1"]),
  "Misterio Oro": slab("misterio-oro", ["1"]),
  "Denali": slab("denali"),
  "Pacific Blue": slab("pacific-blue", ["1"]),
  "Venetian River": slab("venetian-river", ["1"]),
  "Himalaya": slab("himalaya", ["1"]),
  "Fantasy Verde": slab("fantasy-verde", ["1"]),
  "Pisa": slab("pisa", ["1"]),
  "Royal Oro": slab("royal-oro", ["1"]),
  "Belgravia": slab("belgravia", ["1"]),
  "Ivy": slab("belgravia"),
  "Santorini": slab("santorini", ["1"]),
  "Sandstorm": slab("sandstorm", ["1"]),
  "Cristallo Imperial": slab("cristallo-imperial", ["1", "2"]),
  "Viola": slab("viola", ["1", "2", "3"]),
  "Imperial Black": { kitchens: [asset("imperial-black-kitchen-1")] },
};
