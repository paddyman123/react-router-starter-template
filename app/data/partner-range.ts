export type PartnerTier = "Contract" | "Contract Plus" | "Vital" | "Essence";

export type PartnerQuartzColour = {
  name: string;
  tier: PartnerTier;
  underlying?: string;
  supplier?: string;
  finish?: string;
  thicknesses?: string[];
  tags: string[];
  description?: string;
  visual?: "clean"|"soft"|"gold"|"grey"|"green"|"warm"|"dark"|"dramatic";
  installedGallery?: boolean;
};

const visual=(tags:string[]):PartnerQuartzColour["visual"]=>tags.includes("dark")?"dark":tags.includes("green")?"green":tags.includes("gold-veining")?"gold":tags.includes("warm")?"warm":tags.includes("dramatic")?"dramatic":tags.includes("grey")?"grey":tags.includes("clean")?"clean":"soft";
const descriptions:Record<string,string>={
 "White Dove":"A soft, understated white quartz with gentle Carrara-inspired character. Easy to pair with both contemporary and traditional cabinetry.",
 "Calacatta Gold":"A bright marble-inspired quartz with confident warm veining. A popular choice when the worktop needs to feel luxurious without overpowering the kitchen.",
 "Arctic White":"A crisp, clean white quartz for minimal and contemporary schemes where a bright, uncomplicated surface is the priority.",
 "Lydia Gold":"Elegant warm veining across a light background, giving a premium Calacatta-inspired look with the everyday practicality of quartz.",
 "Statuario":"A bright Statuario-inspired quartz with visible movement, designed to bring marble character into a practical engineered surface.",
 "Taj Mahal":"A warmer, natural-looking quartz with a softer stone character. Particularly effective with timber, neutral cabinetry and layered luxury interiors.",
 "Sorento Gold":"A statement marble-inspired quartz with warm gold movement, well suited to islands, waterfalls and splashbacks where pattern can become part of the design.",
 "Arabescato Verde":"A dramatic green-veined polished quartz for customers who want the surface to become a defining feature of the room.",
 "Imperial Black":"A deep, dramatic quartz for bold contrast and sophisticated darker schemes.",
 "Borghini":"A high-impact printed quartz designed for statement projects where expressive marble-style movement is the priority."
};

const raw:Omit<PartnerQuartzColour,"visual"|"description"|"installedGallery">[]=[
 { name:"Bianco Galaxy",tier:"Contract",tags:["value","subtle","quartz"] },{ name:"White Dove",tier:"Contract",underlying:"Carrara Cashmere",tags:["value","white","subtle"] },{ name:"White Shimmer",tier:"Contract",underlying:"Bianco Shimmer",tags:["value","white","subtle"] },{ name:"Super White",tier:"Contract",tags:["value","white","clean"] },{ name:"Snow White",tier:"Contract",tags:["value","white","clean"] },{ name:"Nordic Grey",tier:"Contract",tags:["value","grey","contemporary"] },
 { name:"Calacatta Gold",tier:"Contract Plus",tags:["popular","gold-veining","marble-inspired"] },{ name:"Arctic White",tier:"Contract Plus",tags:["popular","white","clean"] },{ name:"Lydia Gold",tier:"Contract Plus",tags:["popular","gold-veining","marble-inspired"] },{ name:"Carrara",tier:"Contract Plus",underlying:"Carrara White",tags:["popular","soft-veining","marble-inspired"] },
 { name:"Toran",tier:"Vital",underlying:"Statuario Toran",tags:["marble-inspired","veining","statement"] },{ name:"Statuario",tier:"Vital",underlying:"Bianco Frost",tags:["marble-inspired","white","veining"] },{ name:"Perla",tier:"Vital",underlying:"Perla Grey",thicknesses:["20mm","30mm"],tags:["grey","marble-inspired","veining"] },{ name:"Cold Spring",tier:"Vital",tags:["marble-inspired","veining"] },{ name:"Four Seasons",tier:"Vital",tags:["marble-inspired","veining"] },{ name:"Taj Mahal",tier:"Vital",supplier:"Cosy Stone",finish:"Silk",tags:["warm","natural-look","premium"] },{ name:"Calacatta Portugal",tier:"Vital",tags:["marble-inspired","veining"] },{ name:"Tornado Oro",tier:"Vital",finish:"Polished",tags:["gold-veining","marble-inspired"] },{ name:"Sorento Gold",tier:"Vital",underlying:"ONE R",tags:["gold-veining","marble-inspired"] },{ name:"Perla Venata",tier:"Vital",thicknesses:["20mm","30mm"],tags:["marble-inspired","veining"] },{ name:"Arabescato Verde",tier:"Vital",finish:"Polished",tags:["green","dramatic","statement"] },{ name:"Arabescato Oro",tier:"Vital",tags:["gold-veining","dramatic","statement"] },{ name:"Fog",tier:"Vital",underlying:"Cloudy Gris",tags:["grey","soft","contemporary"] },{ name:"London Grey",tier:"Vital",tags:["grey","contemporary"] },
 { name:"Himalaya",tier:"Essence",supplier:"Cosy Stone",finish:"Polished",tags:["premium","statement","natural-look"] },{ name:"Fantasy Verde",tier:"Essence",supplier:"Cosy Stone",finish:"Polished",tags:["premium","green","dramatic"] },{ name:"Pisa",tier:"Essence",supplier:"Cosy Stone",tags:["premium","marble-inspired"] },{ name:"Royal Oro",tier:"Essence",supplier:"Cosy Stone",finish:"Polished",tags:["premium","gold-veining","statement"] },{ name:"Montebello",tier:"Essence",supplier:"Cosy Stone",tags:["premium","marble-inspired"] },{ name:"Belgravia",tier:"Essence",underlying:"Ivy",tags:["premium","statement"] },{ name:"Calacatta Vagli",tier:"Essence",tags:["premium","marble-inspired","statement"] },{ name:"Desert Gold",tier:"Essence",supplier:"Cosy Stone",tags:["premium","warm","gold-veining"] },{ name:"Imperial Black",tier:"Essence",tags:["premium","dark","dramatic"] },{ name:"Santorini",tier:"Essence",supplier:"Cosy Stone",tags:["premium","statement"] },{ name:"Sandstorm",tier:"Essence",supplier:"Cosy Stone",tags:["premium","natural-look","warm"] },{ name:"Cristallo Imperial",tier:"Essence",supplier:"Cosy Stone",tags:["premium","dramatic","statement"] },{ name:"Viola",tier:"Essence",tags:["premium","dramatic","statement"] },{ name:"Borghini",tier:"Essence",supplier:"Cosy Stone",tags:["premium","printed-quartz","statement"] }
];
const galleryColours=new Set(["White Dove","Calacatta Gold","Arctic White","Arabescato Verde","Sorento Gold"]);
export const partnerQuartz:PartnerQuartzColour[]=raw.map(c=>({...c,visual:visual(c.tags),description:descriptions[c.name],installedGallery:galleryColours.has(c.name)}));

export const edgeGuidance=[
 {id:"porcelain-double-bevel",name:"Double Bevel",recommendation:"StoneMatch's standard recommendation for porcelain is a simple double bevel.",suitableMaterials:["Porcelain"],recommendedThickness:"Standard porcelain edge",positioning:"Porcelain has a plain exposed edge, so a simple, clean double bevel keeps the detail understated and lets the worktop surface speak for itself.",premium:false},
 {id:"20mm-bullnose",name:"Bullnose",recommendation:"A premium rounded edge option for 20mm Quartz, Granite or Marble.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"20mm",positioning:"A softer, more traditional premium finish when the customer wants more edge detail.",premium:true},
 {id:"20mm-sharknose",name:"Shark Nose",recommendation:"A premium contemporary edge that works particularly well with handleless kitchens.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"20mm",positioning:"Creates a slimmer visual line and complements clean, contemporary and handleless cabinetry.",premium:true},
 {id:"20mm-double-bevel",name:"Double Bevel",recommendation:"A clean StoneMatch-recommended finish for 20mm stone.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"20mm",positioning:"Simple and crisp, keeping attention on the material rather than the edge detail.",premium:false},
 {id:"20mm-double-pencil",name:"Double Pencil",recommendation:"A softer alternative to a Bullnose without the premium-edge cost.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"20mm",positioning:"A practical choice for customers who want a softened edge while keeping fabrication simpler than a Bullnose.",premium:false},
 {id:"30mm-double-bevel",name:"Double Bevel",recommendation:"StoneMatch's standard recommendation for 30mm Quartz, Granite or Marble.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"30mm",positioning:"With a 30mm worktop the material already has a substantial appearance, so the clean double bevel lets the thickness and the stone itself do the talking.",premium:false},
 {id:"ogee",name:"Ogee",recommendation:"StoneMatch recommends 30mm Quartz, Granite or Marble for an Ogee edge.",suitableMaterials:["Quartz","Granite","Marble"],recommendedThickness:"30mm",positioning:"A premium traditional decorative detail for classic and luxury kitchens.",premium:true},
 {id:"porcelain-build-up",name:"Mitred / Built-Up Porcelain",recommendation:"StoneMatch recommends 12mm porcelain where technically suitable to reduce weight when creating a mitred boxed edge.",suitableMaterials:["Porcelain"],recommendedThickness:"12mm where suitable",positioning:"A premium fabrication method for clients who want porcelain with a thicker, more natural-stone appearance. Particularly effective for statement islands, waterfall ends and bespoke tables; expect a higher fabrication cost than a standard porcelain edge.",premium:true}
];
