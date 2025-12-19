export interface SwatchValue {
  hex: string;
  stop: number;
  h: number;
  hScale: number;
  s: number;
  sScale: number;
  l: number;
}

export type Mode = `hex` | `p-3` | `oklch` | `hsl`;

export type ColorMode = "linear" | "perceived";

export type StopSelection = "auto" | "manual";

export type GenerationMode = "curated" | "random" | "unlimited";

export type ColorScheme = "monochromatic" | "analogous" | "complementary" | "triadic" | "tetradic" | "split-complementary";

export type ColorTemperature = "warm" | "cool" | "neutral";

export type ContrastLevel = "low" | "medium" | "high" | "auto";

export type ColorRule =
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "tetradic"
  | "compound"
  | "custom";

export type ColorLibrary =
  | "material-design"
  | "ios"
  | "tailwind"
  | "ant-design"
  | "carbon"
  | "fluent"
  | "pantone"
  | "custom";

export type ExportFormat =
  | "css"
  | "scss"
  | "json"
  | "png"
  | "ase"
  | "gpl"
  | "hex"
  | "rgb"
  | "hsl"
  | "oklch";

export type GradientType =
  | "linear"
  | "radial"
  | "conic"
  | "mesh"
  | "diamond"
  | "ellipse";

export type MoodType =
  | "energetic"
  | "calm"
  | "professional"
  | "creative"
  | "warm"
  | "cool"
  | "luxurious"
  | "minimal"
  | "vibrant"
  | "muted";

export type SeasonType =
  | "spring"
  | "summer"
  | "autumn"
  | "winter"
  | "holiday";

export type AccessibilityStandard =
  | "wcag-aa"
  | "wcag-aaa"
  | "color-blind-friendly"
  | "high-contrast";

export interface PremiumOptions {
  colorRule?: ColorRule;
  colorLibrary?: ColorLibrary;
  mood?: MoodType;
  season?: SeasonType;
  accessibilityStandard?: AccessibilityStandard;
  exportFormats?: ExportFormat[];
  gradientType?: GradientType;
  brandColors?: string[];
  aiSuggestions?: boolean;
  advancedSliders?: boolean;
  colorAnalysis?: boolean;
  trendAnalysis?: boolean;
}

export interface PaletteConfig {
  id: string;
  name: string;
  value: string;
  valueStop: number;
  swatches: SwatchValue[];
  colorMode: ColorMode;
  h: number;
  s: number;
  lMin: number;
  lMax: number;
  mode: Mode;
  stopSelection: StopSelection;
  // Новые расширенные опции
  generationMode?: GenerationMode;
  colorScheme?: ColorScheme;
  temperature?: ColorTemperature;
  contrast?: ContrastLevel;
  accessibility?: boolean;
  description?: string;
  tags?: string[];
  // Премиум возможности
  premiumFeatures?: string[];
  qualityScore?: number; // Оценка качества палитры (0-100)
  colorHarmony?: ColorHarmonyType;
  gradientSupport?: boolean;
  // Adobe-like премиум опции
  premiumOptions?: PremiumOptions;
  brandColors?: string[];
  moodAnalysis?: {
    primary: MoodType;
    secondary: MoodType[];
    confidence: number;
  };
  accessibilityMetrics?: {
    wcagAA: boolean;
    wcagAAA: boolean;
    colorBlindSafe: boolean;
    contrastRatios: number[];
  };
  colorAnalysis?: {
    harmonyScore: number;
    saturationBalance: number;
    temperature: ColorTemperature;
    vibrancy: number;
  };
  trends?: {
    season: SeasonType;
    popularity: number;
    similarPalettes: string[];
  };
}

export type ColorHarmonyType = "monochromatic" | "analogous" | "complementary" | "triadic" | "tetradic" | "split-complementary" | "custom";

export type Version = "3" | "4";
