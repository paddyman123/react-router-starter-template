export type PartnerTier = "Contract" | "Contract Plus" | "Vital" | "Essence";

export type PartnerQuartzColour = {
  name: string;
  tier: PartnerTier;
  underlying?: string;
  supplier?: string;
  finish?: string;
  thicknesses?: string[];
  tags: string[];
};

export const partnerQuartz: PartnerQuartzColour[] = [
  { name: "Bianco Galaxy", tier: "Contract", tags: ["value", "subtle", "quartz"] },
  { name: "White Dove", tier: "Contract", underlying: "Carrara Cashmere", tags: ["value", "white", "subtle"] },
  { name: "White Shimmer", tier: "Contract", underlying: "Bianco Shimmer", tags: ["value", "white", "subtle"] },
  { name: "Super White", tier: "Contract", tags: ["value", "white", "clean"] },
  { name: "Snow White", tier: "Contract", tags: ["value", "white", "clean"] },
  { name: "Nordic Grey", tier: "Contract", tags: ["value", "grey", "contemporary"] },
  { name: "Calacatta Gold", tier: "Contract Plus", tags: ["popular", "gold-veining", "marble-inspired"] },
  { name: "Arctic White", tier: "Contract Plus", tags: ["popular", "white", "clean"] },
  { name: "Lydia Gold", tier: "Contract Plus", tags: ["popular", "gold-veining", "marble-inspired"] },
  { name: "Carrara", tier: "Contract Plus", underlying: "Carrara White", tags: ["popular", "soft-veining", "marble-inspired"] },
  { name: "Toran", tier: "Vital", underlying: "Statuario Toran", tags: ["marble-inspired", "veining", "statement"] },
  { name: "Statuario", tier: "Vital", underlying: "Bianco Frost", tags: ["marble-inspired", "white", "veining"] },
  { name: "Perla", tier: "Vital", underlying: "Perla Grey", thicknesses: ["20mm", "30mm"], tags: ["grey", "marble-inspired", "veining"] },
  { name: "Cold Spring", tier: "Vital", tags: ["marble-inspired", "veining"] },
  { name: "Four Seasons", tier: "Vital", tags: ["marble-inspired", "veining"] },
  { name: "Taj Mahal", tier: "Vital", supplier: "Cosy Stone", finish: "Silk", tags: ["warm", "natural-look", "premium"] },
  { name: "Calacatta Portugal", tier: "Vital", tags: ["marble-inspired", "veining"] },
  { name: "Tornado Oro", tier: "Vital", finish: "Polished", tags: ["gold-veining", "marble-inspired"] },
  { name: "Sorento Gold", tier: "Vital", underlying: "ONE R", tags: ["gold-veining", "marble-inspired"] },
  { name: "Perla Venata", tier: "Vital", thicknesses: ["20mm", "30mm"], tags: ["marble-inspired", "veining"] },
  { name: "Arabescato Verde", tier: "Vital", finish: "Polished", tags: ["green", "dramatic", "statement"] },
  { name: "Arabescato Oro", tier: "Vital", tags: ["gold-veining", "dramatic", "statement"] },
  { name: "Fog", tier: "Vital", underlying: "Cloudy Gris", tags: ["grey", "soft", "contemporary"] },
  { name: "London Grey", tier: "Vital", tags: ["grey", "contemporary"] },
  { name: "Himalaya", tier: "Essence", supplier: "Cosy Stone", finish: "Polished", tags: ["premium", "statement", "natural-look"] },
  { name: "Fantasy Verde", tier: "Essence", supplier: "Cosy Stone", finish: "Polished", tags: ["premium", "green", "dramatic"] },
  { name: "Pisa", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "marble-inspired"] },
  { name: "Royal Oro", tier: "Essence", supplier: "Cosy Stone", finish: "Polished", tags: ["premium", "gold-veining", "statement"] },
  { name: "Montebello", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "marble-inspired"] },
  { name: "Belgravia", tier: "Essence", underlying: "Ivy", tags: ["premium", "statement"] },
  { name: "Calacatta Vagli", tier: "Essence", tags: ["premium", "marble-inspired", "statement"] },
  { name: "Desert Gold", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "warm", "gold-veining"] },
  { name: "Imperial Black", tier: "Essence", tags: ["premium", "dark", "dramatic"] },
  { name: "Santorini", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "statement"] },
  { name: "Sandstorm", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "natural-look", "warm"] },
  { name: "Cristallo Imperial", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "dramatic", "statement"] },
  { name: "Viola", tier: "Essence", tags: ["premium", "dramatic", "statement"] },
  { name: "Borghini", tier: "Essence", supplier: "Cosy Stone", tags: ["premium", "printed-quartz", "statement"] },
];

export const edgeGuidance = [
  {
    id: "ogee",
    name: "Ogee",
    recommendation: "StoneMatch recommends 30mm Quartz, Granite or Marble for an Ogee edge.",
    suitableMaterials: ["Quartz", "Granite", "Marble"],
    recommendedThickness: "30mm",
    positioning: "Traditional decorative detail for classic and luxury kitchens.",
  },
  {
    id: "porcelain-build-up",
    name: "Mitred / Built-Up Porcelain",
    recommendation: "StoneMatch recommends 12mm porcelain where technically suitable to reduce weight when creating a mitred boxed edge.",
    suitableMaterials: ["Porcelain"],
    recommendedThickness: "12mm where suitable",
    positioning: "A premium fabrication method for clients who want porcelain with a thicker, more natural-stone appearance. Particularly effective for statement islands, waterfall ends and bespoke tables; expect a higher fabrication cost than a standard porcelain edge.",
  },
];
