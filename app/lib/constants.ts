/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T08:22:23
 * Last Updated: 2025-12-19T08:25:36
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import type { Mode, PaletteConfig, Version, ColorMode, GenerationMode, ColorScheme } from "~/types";

export const DEFAULT_STOP = 500;
export const DEFAULT_STOPS = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000,
];

export const MODES: Mode[] = [`oklch`, `hex`, `p-3`, `hsl`];
export const DEFAULT_MODE = MODES[0];

export const COLOR_MODES: ColorMode[] = ["perceived", "linear"];
export const DEFAULT_COLOR_MODE: ColorMode = COLOR_MODES[0];

export const GENERATION_MODES: GenerationMode[] = ["curated", "random", "unlimited"];
export const DEFAULT_GENERATION_MODE: GenerationMode = GENERATION_MODES[0];

export const COLOR_SCHEMES: ColorScheme[] = [
  "monochromatic",
  "analogous",
  "complementary",
  "triadic",
  "tetradic",
  "split-complementary"
];
export const DEFAULT_COLOR_SCHEME: ColorScheme = COLOR_SCHEMES[0];

export const COLOR_TEMPERATURES: ColorTemperature[] = ["warm", "cool", "neutral"];
export const DEFAULT_TEMPERATURE: ColorTemperature = COLOR_TEMPERATURES[2];

export const CONTRAST_LEVELS: ContrastLevel[] = ["auto", "low", "medium", "high"];
export const DEFAULT_CONTRAST: ContrastLevel = CONTRAST_LEVELS[0];

// Adobe-like премиум опции
export const COLOR_RULES: ColorRule[] = [
  "monochromatic",
  "analogous",
  "complementary",
  "split-complementary",
  "triadic",
  "tetradic",
  "compound",
  "custom"
];
export const DEFAULT_COLOR_RULE: ColorRule = COLOR_RULES[0];

export const COLOR_LIBRARIES: ColorLibrary[] = [
  "material-design",
  "ios",
  "tailwind",
  "ant-design",
  "carbon",
  "fluent",
  "pantone",
  "custom"
];
export const DEFAULT_COLOR_LIBRARY: ColorLibrary = COLOR_LIBRARIES[7];

export const MOOD_TYPES: MoodType[] = [
  "energetic",
  "calm",
  "professional",
  "creative",
  "warm",
  "cool",
  "luxurious",
  "minimal",
  "vibrant",
  "muted"
];
export const DEFAULT_MOOD: MoodType = MOOD_TYPES[0];

export const SEASON_TYPES: SeasonType[] = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "holiday"
];
export const DEFAULT_SEASON: SeasonType = SEASON_TYPES[0];

export const ACCESSIBILITY_STANDARDS: AccessibilityStandard[] = [
  "wcag-aa",
  "wcag-aaa",
  "color-blind-friendly",
  "high-contrast"
];
export const DEFAULT_ACCESSIBILITY_STANDARD: AccessibilityStandard = ACCESSIBILITY_STANDARDS[0];

export const EXPORT_FORMATS: ExportFormat[] = [
  "css",
  "scss",
  "json",
  "png",
  "ase",
  "gpl",
  "hex",
  "rgb",
  "hsl",
  "oklch"
];

export const GRADIENT_TYPES: GradientType[] = [
  "linear",
  "radial",
  "conic",
  "mesh",
  "diamond",
  "ellipse"
];
export const DEFAULT_GRADIENT_TYPE: GradientType = GRADIENT_TYPES[0];

// Названия для генерации палитр
export const PALETTE_ADJECTIVES = [
  'Vibrant', 'Soft', 'Bold', 'Gentle', 'Dynamic', 'Calm', 'Bright', 'Deep',
  'Warm', 'Cool', 'Fresh', 'Mature', 'Elegant', 'Playful', 'Serious', 'Cheerful',
  'Mysterious', 'Clear', 'Rich', 'Subtle', 'Intense', 'Delicate', 'Strong', 'Light',
  'Dark', 'Sunny', 'Cloudy', 'Ocean', 'Forest', 'Mountain', 'Desert', 'Urban',
  'Rural', 'Modern', 'Classic', 'Minimal', 'Luxurious', 'Simple', 'Complex', 'Pure'
];

export const PALETTE_NOUNS = [
  'Harmony', 'Spectrum', 'Blend', 'Fusion', 'Essence', 'Aura', 'Glow', 'Shade',
  'Tone', 'Hue', 'Tint', 'Shade', 'Gradient', 'Palette', 'Collection', 'Series',
  'Theme', 'Mood', 'Atmosphere', 'Vibe', 'Energy', 'Spirit', 'Soul', 'Heart',
  'Dream', 'Vision', 'Journey', 'Path', 'Way', 'Flow', 'Stream', 'River',
  'Ocean', 'Sky', 'Sunset', 'Dawn', 'Twilight', 'Midnight', 'Noon', 'Eclipse'
];

export const DEFAULT_PALETTE_CONFIG: PaletteConfig = {
  id: ``,
  name: ``,
  value: ``,
  valueStop: DEFAULT_STOP,
  swatches: [],
  h: 0,
  s: 0,
  lMin: 0,
  lMax: 100,
  colorMode: DEFAULT_COLOR_MODE,
  mode: DEFAULT_MODE,
  stopSelection: "auto",
  generationMode: DEFAULT_GENERATION_MODE,
  colorScheme: DEFAULT_COLOR_SCHEME,
  temperature: DEFAULT_TEMPERATURE,
  contrast: DEFAULT_CONTRAST,
  accessibility: false,
  description: "",
  tags: [],
};

export const RANDOM_PALETTES = [
  { name: `blue`, value: `3B82F6` },
  { name: `red`, value: `EF4444` },
  { name: `green`, value: `22C55E` },
  { name: `purple`, value: `A855F7` },
  { name: `indigo`, value: `6366F1` },
  { name: `pink`, value: `EC4899` },
  { name: `orange`, value: `F97316` },
  { name: `teal`, value: `14B8A6` },
  { name: `cyan`, value: `06B6D4` },
  { name: `yellow`, value: `EAB308` },
  { name: `lime`, value: `84CC16` },
  { name: `emerald`, value: `10B981` },
  { name: `violet`, value: `8B5CF6` },
  { name: `fuchsia`, value: `D946EF` },
  { name: `rose`, value: `F43F5E` },
  { name: `amber`, value: `F59E0B` },
  { name: `sky`, value: `0EA5E9` },
  { name: `slate`, value: `64748B` },
  { name: `zinc`, value: `71717A` },
  { name: `stone`, value: `78716C` },
  { name: `gray`, value: `6B7280` },
  { name: `mint`, value: `34D399` },
  { name: `lavender`, value: `A78BFA` },
  { name: `coral`, value: `F87171` },
  { name: `peach`, value: `FB923C` },
  { name: `sage`, value: `86EFAC` },
  { name: `ocean`, value: `0EA5E9` },
  { name: `plum`, value: `C026D3` },
  { name: `ruby`, value: `DC2626` },
  { name: `gold`, value: `FBBF24` },
  { name: `jade`, value: `059669` },
  { name: `maroon`, value: `B91C1C` },
  { name: `navy`, value: `1E40AF` },
];

export const META = {
  origin: `https://tints.dev`,
  title: `Tailwind CSS 11-color Palette Generator and API`,
  description: `A fast and flexible, HSL-tweakable palette generator and API for Tailwind CSS`,
};

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const VERSIONS: Version[] = ["4", "3"];

export interface StylePreset {
  generationMode: GenerationMode;
  contrast: ContrastLevel;
  temperature: ColorTemperature;
  description: string;
  premiumFeatures?: string[];
}

// Расширенные коллекции палитр

// Теплые цвета для уютных интерфейсов
export const WARM_PALETTES = [
  { name: `sunset-orange`, value: `FF5722`, temperature: "warm" as ColorTemperature },
  { name: `golden-amber`, value: `FF9800`, temperature: "warm" as ColorTemperature },
  { name: `peach`, value: `FFAB91`, temperature: "warm" as ColorTemperature },
  { name: `coral-pink`, value: `FF8A80`, temperature: "warm" as ColorTemperature },
  { name: `warm-red`, value: `F44336`, temperature: "warm" as ColorTemperature },
  { name: `terracotta`, value: `E65100`, temperature: "warm" as ColorTemperature },
  { name: `burnt-orange`, value: `BF360C`, temperature: "warm" as ColorTemperature },
  { name: `cinnamon`, value: `8D6E63`, temperature: "warm" as ColorTemperature },
];

// Холодные цвета для современных интерфейсов
export const COOL_PALETTES = [
  { name: `arctic-blue`, value: `00BCD4`, temperature: "cool" as ColorTemperature },
  { name: `deep-teal`, value: `00695C`, temperature: "cool" as ColorTemperature },
  { name: `ocean-blue`, value: `0277BD`, temperature: "cool" as ColorTemperature },
  { name: `slate-blue`, value: `455A64`, temperature: "cool" as ColorTemperature },
  { name: `midnight-blue`, value: `263238`, temperature: "cool" as ColorTemperature },
  { name: `frost-blue`, value: `B3E5FC`, temperature: "cool" as ColorTemperature },
  { name: `icy-cyan`, value: `4DD0E1`, temperature: "cool" as ColorTemperature },
  { name: `polar-blue`, value: `01579B`, temperature: "cool" as ColorTemperature },
];

// Палитры с высоким контрастом для accessibility
export const HIGH_CONTRAST_PALETTES = [
  { name: `pure-black`, value: `000000`, contrast: "high" as ContrastLevel },
  { name: `pure-white`, value: `FFFFFF`, contrast: "high" as ContrastLevel },
  { name: `vivid-red`, value: `FF0000`, contrast: "high" as ContrastLevel },
  { name: `electric-blue`, value: `0000FF`, contrast: "high" as ContrastLevel },
  { name: `bright-yellow`, value: `FFFF00`, contrast: "high" as ContrastLevel },
  { name: `neon-green`, value: `00FF00`, contrast: "high" as ContrastLevel },
  { name: `hot-pink`, value: `FF00FF`, contrast: "high" as ContrastLevel },
  { name: `deep-purple`, value: `800080`, contrast: "high" as ContrastLevel },
];

// Палитры для разных цветовых схем
export const SCHEME_PALETTES = {
  monochromatic: [
    { name: `mono-blue`, value: `2196F3` },
    { name: `mono-green`, value: `4CAF50` },
    { name: `mono-purple`, value: `9C27B0` },
  ],
  complementary: [
    { name: `comp-orange-blue`, value: `FF9800` }, // + blue complement
    { name: `comp-red-green`, value: `F44336` },   // + green complement
    { name: `comp-purple-yellow`, value: `9C27B0` }, // + yellow complement
  ],
  triadic: [
    { name: `triad-red`, value: `F44336` },
    { name: `triad-yellow`, value: `FFEB3B` },
    { name: `triad-blue`, value: `2196F3` },
  ],
};

// Палитры для разных сценариев использования
export const SCENARIO_PALETTES = {
  dashboard: [
    { name: `dashboard-blue`, value: `1976D2`, tags: ["dashboard", "professional"] },
    { name: `dashboard-green`, value: `388E3C`, tags: ["dashboard", "success"] },
    { name: `dashboard-orange`, value: `F57C00`, tags: ["dashboard", "warning"] },
  ],
  ecommerce: [
    { name: `ecommerce-red`, value: `D32F2F`, tags: ["ecommerce", "sale"] },
    { name: `ecommerce-gold`, value: `FBC02D`, tags: ["ecommerce", "premium"] },
    { name: `ecommerce-navy`, value: `1976D2`, tags: ["ecommerce", "trust"] },
  ],
  gaming: [
    { name: `gaming-neon`, value: `00E676`, tags: ["gaming", "bright"] },
    { name: `gaming-purple`, value: `AA00FF`, tags: ["gaming", "vibrant"] },
    { name: `gaming-cyan`, value: `00BCD4`, tags: ["gaming", "electric"] },
  ],
};

// Расширенные премиум коллекции палитр

// Премиум сочные цвета - яркие и насыщенные с учетом цветовой гармонии
export const PREMIUM_JUICY_PALETTES = [
  // Классические яркие цвета
  { name: `vivid-red`, value: `FF1744`, tags: ["vibrant", "energy", "attention"] },
  { name: `electric-blue`, value: `2979FF`, tags: ["trust", "technology", "calm"] },
  { name: `neon-green`, value: `00E676`, tags: ["growth", "success", "nature"] },
  { name: `hot-pink`, value: `FF4081`, tags: ["creativity", "fun", "youth"] },
  { name: `bright-purple`, value: `AA00FF`, tags: ["luxury", "mystery", "creativity"] },
  { name: `flame-orange`, value: `FF6D00`, tags: ["enthusiasm", "warmth", "action"] },
  { name: `turquoise`, value: `00BCD4`, tags: ["communication", "healing", "balance"] },
  { name: `lime`, value: `C6FF00`, tags: ["freshness", "optimism", "youth"] },
  { name: `magenta`, value: `E91E63`, tags: ["passion", "energy", "love"] },
  { name: `cyan`, value: `00ACC1`, tags: ["clarity", "innovation", "coolness"] },
  { name: `vibrant-yellow`, value: `FFEB3B`, tags: ["happiness", "optimism", "caution"] },
  { name: `deep-pink`, value: `E91E63`, tags: ["romance", "femininity", "elegance"] },
  { name: `bright-teal`, value: `009688`, tags: ["growth", "harmony", "renewal"] },
  { name: `royal-blue`, value: `3F51B5`, tags: ["authority", "trust", "stability"] },
  { name: `sunset-orange`, value: `FF5722`, tags: ["adventure", "enthusiasm", "warmth"] },

  // Премиум градиентные цвета
  { name: `coral-reef`, value: `FF7F50`, tags: ["tropical", "warmth", "exotic"] },
  { name: `emerald-city`, value: `2E8B57`, tags: ["luxury", "nature", "wealth"] },
  { name: `sapphire-depth`, value: `006994`, tags: ["depth", "trust", "intelligence"] },
  { name: `ruby-glow`, value: `9B111E`, tags: ["passion", "luxury", "power"] },
  { name: `amber-sunrise`, value: `FFBF00`, tags: ["optimism", "energy", "success"] },
  { name: `jade-serenity`, value: `00A86B`, tags: ["peace", "balance", "growth"] },
  { name: `violet-dream`, value: `4B0082`, tags: ["spirituality", "creativity", "mystery"] },
  { name: `gold-rush`, value: `DAA520`, tags: ["wealth", "success", "prestige"] },
];

// Премиум пастельные цвета - мягкие и гармоничные
export const PREMIUM_PASTEL_PALETTES = [
  // Классические пастельные тона
  { name: `rose-quartz`, value: `F7CAC9`, tags: ["gentle", "romance", "comfort"] },
  { name: `mint-green`, value: `B5EAD7`, tags: ["freshness", "calm", "healing"] },
  { name: `lavender`, value: `C7CEEA`, tags: ["relaxation", "spirituality", "gentle"] },
  { name: `peach`, value: `FFD1DC`, tags: ["warmth", "sweetness", "inviting"] },
  { name: `sky-blue`, value: `A8E6CF`, tags: ["serenity", "peace", "openness"] },
  { name: `butter-yellow`, value: `FFF8E3`, tags: ["optimism", "cheerfulness", "light"] },
  { name: `dusty-pink`, value: `F8CECC`, tags: ["tenderness", "care", "softness"] },
  { name: `sage-green`, value: `D5E8D4`, tags: ["wisdom", "balance", "nature"] },
  { name: `powder-blue`, value: `B8D8D8`, tags: ["calm", "reliability", "trust"] },
  { name: `lilac`, value: `E6E6FA`, tags: ["delicacy", "dreaminess", "grace"] },
  { name: `cream`, value: `FFFDD0`, tags: ["purity", "simplicity", "warmth"] },
  { name: `soft-mint`, value: `C1E1C5`, tags: ["refreshing", "gentle", "natural"] },
  { name: `pale-blush`, value: `FBB6C9`, tags: ["innocence", "tenderness", "sweet"] },
  { name: `seafoam`, value: `A7E9AF`, tags: ["serenity", "balance", "healing"] },
  { name: `vanilla`, value: `F3E5AB`, tags: ["comfort", "warmth", "nostalgia"] },

  // Премиум пастельные вариации
  { name: `champagne`, value: `F7E7CE`, tags: ["elegance", "celebration", "luxury"] },
  { name: `honeydew`, value: `F0FFF0`, tags: ["freshness", "purity", "gentle"] },
  { name: `alice-blue`, value: `F0F8FF`, tags: ["clarity", "peace", "light"] },
  { name: `misty-rose`, value: `FFE4E1`, tags: ["romance", "tenderness", "soft"] },
  { name: `seashell`, value: `FFF5EE`, tags: ["comfort", "warmth", "natural"] },
  { name: `cornsilk`, value: `FFF8DC`, tags: ["warmth", "gentle", "inviting"] },
  { name: `snow`, value: `FFFAFA`, tags: ["purity", "clean", "minimal"] },
  { name: `linen`, value: `FAF0E6`, tags: ["natural", "warmth", "texture"] },
];

// Премиум современные цвета - минималистичные и элегантные
export const PREMIUM_MODERN_PALETTES = [
  // Темные минималистичные тона
  { name: `charcoal`, value: `36454F`, tags: ["sophistication", "modern", "neutral"] },
  { name: `navy`, value: `1B2631`, tags: ["authority", "trust", "professional"] },
  { name: `forest`, value: `2E4F4F`, tags: ["nature", "calm", "depth"] },
  { name: `slate`, value: `708090`, tags: ["modern", "balanced", "reliable"] },
  { name: `graphite`, value: `2F4F4F`, tags: ["industrial", "strength", "modern"] },
  { name: `deep-teal`, value: `004D4D`, tags: ["depth", "trust", "sophisticated"] },
  { name: `midnight`, value: `191970`, tags: ["mystery", "elegance", "night"] },
  { name: `steel`, value: `43464B`, tags: ["industrial", "strength", "modern"] },
  { name: `obsidian`, value: `0F1419`, tags: ["luxury", "depth", "premium"] },
  { name: `gunmetal`, value: `2C3539`, tags: ["industrial", "durability", "modern"] },
  { name: `anthracite`, value: `282828`, tags: ["sophisticated", "neutral", "elegant"] },
  { name: `shadow`, value: `2F2F2F`, tags: ["depth", "mystery", "modern"] },
  { name: `carbon`, value: `1C1C1C`, tags: ["pure", "minimal", "luxury"] },
  { name: `onyx`, value: `353839`, tags: ["precious", "elegant", "rare"] },
  { name: `jet`, value: `343434`, tags: ["deep", "intense", "modern"] },

  // Премиум темные вариации
  { name: `ebony`, value: `0C0C0C`, tags: ["luxury", "depth", "exclusive"] },
  { name: `raven`, value: `202124`, tags: ["mystery", "intelligence", "modern"] },
  { name: `coal`, value: `1A1A1A`, tags: ["strength", "durability", "industrial"] },
  { name: `ink`, value: `161618`, tags: ["depth", "creativity", "modern"] },
  { name: `void`, value: `0A0A0A`, tags: ["infinite", "premium", "exclusive"] },
];

// Премиум офисные цвета - профессиональные и доверительные
export const PREMIUM_OFFICE_PALETTES = [
  // Корпоративные тона
  { name: `corporate-blue`, value: `1E3A8A`, tags: ["trust", "professional", "corporate"] },
  { name: `executive-gray`, value: `4B5563`, tags: ["authority", "neutral", "reliable"] },
  { name: `professional-navy`, value: `1E40AF`, tags: ["leadership", "trust", "formal"] },
  { name: `business-teal`, value: `0F766E`, tags: ["growth", "stability", "professional"] },
  { name: `boardroom-green`, value: `166534`, tags: ["success", "growth", "authority"] },
  { name: `suit-blue`, value: `1D4ED8`, tags: ["reliability", "trust", "corporate"] },
  { name: `presentation-slate`, value: `475569`, tags: ["presentation", "formal", "balanced"] },
  { name: `conference-gray`, value: `6B7280`, tags: ["neutral", "professional", "versatile"] },
  { name: `meeting-blue`, value: `2563EB`, tags: ["communication", "clarity", "corporate"] },
  { name: `report-green`, value: `15803D`, tags: ["success", "achievement", "formal"] },
  { name: `document-teal`, value: `0D9488`, tags: ["communication", "balance", "professional"] },
  { name: `corporate-slate`, value: `64748B`, tags: ["corporate", "trust", "modern"] },
  { name: `briefing-blue`, value: `1E3A8A`, tags: ["authority", "leadership", "formal"] },
  { name: `portfolio-gray`, value: `374151`, tags: ["sophisticated", "professional", "balanced"] },
  { name: `professional-indigo`, value: `3730A3`, tags: ["innovation", "trust", "corporate"] },

  // Премиум корпоративные вариации
  { name: `enterprise-blue`, value: `1E293B`, tags: ["enterprise", "trust", "scalable"] },
  { name: `boardroom-navy`, value: `1E293B`, tags: ["leadership", "authority", "formal"] },
  { name: `consulting-gray`, value: `525252`, tags: ["consulting", "expertise", "neutral"] },
  { name: `executive-slate`, value: `334155`, tags: ["executive", "sophisticated", "professional"] },
  { name: `corporate-indigo`, value: `312E81`, tags: ["corporate", "innovation", "trust"] },
];

// Премиум неограниченные цвета - полностью случайные с гарантией качества
export const PREMIUM_UNLIMITED_PALETTES = [
  // Автоматически генерируемые - этот массив используется как fallback
];

// Премиум палитры для разных библиотек
export const LIBRARY_PALETTES = {
  "material-design": [
    { name: "Material Blue", value: "2196F3", tags: ["material", "blue", "primary"] },
    { name: "Material Red", value: "F44336", tags: ["material", "red", "error"] },
    { name: "Material Green", value: "4CAF50", tags: ["material", "green", "success"] },
    { name: "Material Orange", value: "FF9800", tags: ["material", "orange", "warning"] },
    { name: "Material Purple", value: "9C27B0", tags: ["material", "purple", "secondary"] },
  ],
  "ios": [
    { name: "iOS Blue", value: "007AFF", tags: ["ios", "blue", "system"] },
    { name: "iOS Green", value: "34C759", tags: ["ios", "green", "success"] },
    { name: "iOS Orange", value: "FF9500", tags: ["ios", "orange", "warning"] },
    { name: "iOS Red", value: "FF3B30", tags: ["ios", "red", "destructive"] },
    { name: "iOS Purple", value: "AF52DE", tags: ["ios", "purple", "accent"] },
  ],
  "tailwind": [
    { name: "Tailwind Sky", value: "0EA5E9", tags: ["tailwind", "sky", "info"] },
    { name: "Tailwind Emerald", value: "10B981", tags: ["tailwind", "emerald", "success"] },
    { name: "Tailwind Amber", value: "F59E0B", tags: ["tailwind", "amber", "warning"] },
    { name: "Tailwind Rose", value: "F43F5E", tags: ["tailwind", "rose", "error"] },
    { name: "Tailwind Violet", value: "8B5CF6", tags: ["tailwind", "violet", "primary"] },
  ],
  "ant-design": [
    { name: "Ant Blue", value: "1890FF", tags: ["ant", "blue", "primary"] },
    { name: "Ant Green", value: "52C41A", tags: ["ant", "green", "success"] },
    { name: "Ant Gold", value: "FAAD14", tags: ["ant", "gold", "warning"] },
    { name: "Ant Red", value: "F5222D", tags: ["ant", "red", "error"] },
    { name: "Ant Purple", value: "722ED1", tags: ["ant", "purple", "secondary"] },
  ],
  "carbon": [
    { name: "Carbon Blue", value: "0F62FE", tags: ["carbon", "blue", "primary"] },
    { name: "Carbon Green", value: "198038", tags: ["carbon", "green", "success"] },
    { name: "Carbon Yellow", value: "F1C21B", tags: ["carbon", "yellow", "warning"] },
    { name: "Carbon Red", value: "DA1E28", tags: ["carbon", "red", "danger"] },
    { name: "Carbon Purple", value: "8A3FFC", tags: ["carbon", "purple", "accent"] },
  ],
  "fluent": [
    { name: "Fluent Blue", value: "0078D4", tags: ["fluent", "blue", "primary"] },
    { name: "Fluent Green", value: "107C10", tags: ["fluent", "green", "success"] },
    { name: "Fluent Yellow", value: "FF8C00", tags: ["fluent", "yellow", "warning"] },
    { name: "Fluent Red", value: "D13438", tags: ["fluent", "red", "error"] },
    { name: "Fluent Purple", value: "5C2D91", tags: ["fluent", "purple", "accent"] },
  ]
};

// Палитры по настроениям и сезонам
export const MOOD_PALETTES = {
  "energetic": [
    { name: "Electric Blue", value: "0066FF", tags: ["energetic", "blue", "vibrant"] },
    { name: "Neon Green", value: "39FF14", tags: ["energetic", "green", "bright"] },
    { name: "Hot Pink", value: "FF0080", tags: ["energetic", "pink", "dynamic"] },
    { name: "Sunset Orange", value: "FF4500", tags: ["energetic", "orange", "warm"] },
    { name: "Electric Purple", value: "BF00FF", tags: ["energetic", "purple", "bold"] },
  ],
  "calm": [
    { name: "Soft Blue", value: "B3D9FF", tags: ["calm", "blue", "soft"] },
    { name: "Sage Green", value: "A8DADC", tags: ["calm", "green", "natural"] },
    { name: "Lavender", value: "E6E6FA", tags: ["calm", "purple", "gentle"] },
    { name: "Mint", value: "98FB98", tags: ["calm", "green", "fresh"] },
    { name: "Powder Blue", value: "B0E0E6", tags: ["calm", "blue", "serene"] },
  ],
  "professional": [
    { name: "Navy Blue", value: "1E3A8A", tags: ["professional", "blue", "corporate"] },
    { name: "Charcoal", value: "36454F", tags: ["professional", "gray", "formal"] },
    { name: "Deep Teal", value: "006D5B", tags: ["professional", "teal", "trustworthy"] },
    { name: "Burgundy", value: "800020", tags: ["professional", "red", "elegant"] },
    { name: "Steel Blue", value: "4682B4", tags: ["professional", "blue", "reliable"] },
  ],
  "creative": [
    { name: "Magenta", value: "FF00FF", tags: ["creative", "purple", "artistic"] },
    { name: "Turquoise", value: "40E0D0", tags: ["creative", "blue", "inspiring"] },
    { name: "Coral", value: "FF7F50", tags: ["creative", "orange", "vibrant"] },
    { name: "Lime Green", value: "32CD32", tags: ["creative", "green", "fresh"] },
    { name: "Hot Orange", value: "FF6B35", tags: ["creative", "orange", "bold"] },
  ],
  "luxurious": [
    { name: "Gold", value: "FFD700", tags: ["luxurious", "yellow", "premium"] },
    { name: "Deep Purple", value: "4B0082", tags: ["luxurious", "purple", "rich"] },
    { name: "Crimson", value: "DC143C", tags: ["luxurious", "red", "elegant"] },
    { name: "Sapphire", value: "0F52BA", tags: ["luxurious", "blue", "royal"] },
    { name: "Emerald", value: "50C878", tags: ["luxurious", "green", "valuable"] },
  ]
};

export const SEASON_PALETTES = {
  "spring": [
    { name: "Spring Green", value: "98FB98", tags: ["spring", "green", "fresh"] },
    { name: "Cherry Blossom", value: "FFB7C5", tags: ["spring", "pink", "delicate"] },
    { name: "Daffodil Yellow", value: "FFFF8F", tags: ["spring", "yellow", "bright"] },
    { name: "Sky Blue", value: "87CEEB", tags: ["spring", "blue", "light"] },
    { name: "Lilac", value: "C8A2C8", tags: ["spring", "purple", "soft"] },
  ],
  "summer": [
    { name: "Ocean Blue", value: "0077BE", tags: ["summer", "blue", "cool"] },
    { name: "Sunshine Yellow", value: "FFD700", tags: ["summer", "yellow", "bright"] },
    { name: "Coral Reef", value: "FF7F50", tags: ["summer", "orange", "tropical"] },
    { name: "Mint Ice", value: "B2FF66", tags: ["summer", "green", "fresh"] },
    { name: "Hot Pink", value: "FF69B4", tags: ["summer", "pink", "vibrant"] },
  ],
  "autumn": [
    { name: "Burnt Orange", value: "CC5500", tags: ["autumn", "orange", "warm"] },
    { name: "Rust Red", value: "B7410E", tags: ["autumn", "red", "earthy"] },
    { name: "Golden Yellow", value: "DAA520", tags: ["autumn", "yellow", "rich"] },
    { name: "Deep Brown", value: "8B4513", tags: ["autumn", "brown", "natural"] },
    { name: "Crimson", value: "DC143C", tags: ["autumn", "red", "intense"] },
  ],
  "winter": [
    { name: "Ice Blue", value: "B0E0E6", tags: ["winter", "blue", "cool"] },
    { name: "Snow White", value: "FFFAFA", tags: ["winter", "white", "pure"] },
    { name: "Silver", value: "C0C0C0", tags: ["winter", "gray", "metallic"] },
    { name: "Deep Navy", value: "000080", tags: ["winter", "blue", "dark"] },
    { name: "Frost Blue", value: "E0FFFF", tags: ["winter", "blue", "light"] },
  ]
};

// Настройки генерации для разных стилей
export const STYLE_PRESETS = {
  juicy: {
    generationMode: "curated" as GenerationMode,
    contrast: "high" as ContrastLevel,
    temperature: "neutral" as ColorTemperature,
    description: "Яркие, насыщенные цвета для динамичных интерфейсов",
    premiumFeatures: ["vibrant-colors", "high-contrast", "color-harmony"],
  },
  pastel: {
    generationMode: "random" as GenerationMode,
    contrast: "low" as ContrastLevel,
    temperature: "neutral" as ColorTemperature,
    description: "Мягкие, спокойные цвета для уютных интерфейсов",
    premiumFeatures: ["soft-colors", "low-contrast", "emotional-design"],
  },
  modern: {
    generationMode: "curated" as GenerationMode,
    contrast: "high" as ContrastLevel,
    temperature: "cool" as ColorTemperature,
    description: "Минималистичные темные цвета для современного дизайна",
    premiumFeatures: ["minimalist", "dark-theme", "sophisticated"],
  },
  office: {
    generationMode: "curated" as GenerationMode,
    contrast: "medium" as ContrastLevel,
    temperature: "cool" as ColorTemperature,
    description: "Профессиональные цвета для корпоративных приложений",
    premiumFeatures: ["professional", "trust-building", "accessible"],
  },
  unlimited: {
    generationMode: "unlimited" as GenerationMode,
    contrast: "auto" as ContrastLevel,
    temperature: "neutral" as ColorTemperature,
    description: "Полностью случайные цвета без ограничений",
    premiumFeatures: ["random-generation", "quality-guaranteed", "unique-palettes"],
  },
};
