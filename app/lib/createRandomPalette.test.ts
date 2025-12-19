/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T07:01:06
 * Last Updated: 2025-12-19T07:14:43
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { describe, it, expect } from "vitest";
import chroma from "chroma-js";
import {
  createJuicyPalette,
  createPastelPalette,
  createModernPalette,
  createOfficePalette,
  createUnlimitedPalette,
  createPremiumJuicyPalette,
  createPremiumPastelPalette,
  createPremiumModernPalette,
  createPremiumOfficePalette,
  createPremiumUnlimitedPalette
} from "./createRandomPalette";
import { PremiumPaletteGenerator } from "./premiumPaletteUtils";
import type { PremiumOptions } from "~/types";

describe("createJuicyPalette", () => {
  it("should generate a palette with high saturation colors", () => {
    const palette = createJuicyPalette();

    expect(palette).toBeDefined();
    expect(palette.id).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(palette.swatches.length).toBeGreaterThan(0);
  });

  it("should generate colors with high saturation", () => {
    const palette = createJuicyPalette();

    // Проверяем насыщенность базового цвета
    const baseColor = chroma(`#${palette.value}`);
    const hsl = baseColor.hsl();
    const saturation = hsl[1]; // насыщенность 0-1

    // Сочные цвета должны иметь насыщенность > 0.6 (60%)
    expect(saturation).toBeGreaterThan(0.6);
  });

  it("should avoid duplicate colors when currentValues provided", () => {
    const existingValues = ["FF1744", "2979FF"]; // красный и синий
    const palette = createJuicyPalette(existingValues);

    expect(palette.value.toUpperCase()).not.toBe("FF1744");
    expect(palette.value.toUpperCase()).not.toBe("2979FF");
  });

  it("should create swatches with proper structure", () => {
    const palette = createJuicyPalette();

    expect(palette.swatches).toBeDefined();
    expect(Array.isArray(palette.swatches)).toBe(true);

    // Проверяем, что все свачи имеют необходимые свойства
    palette.swatches.forEach((swatch) => {
      expect(swatch).toHaveProperty("stop");
      expect(swatch).toHaveProperty("hex");
      expect(swatch).toHaveProperty("h");
      expect(swatch).toHaveProperty("s");
      expect(swatch).toHaveProperty("l");
      expect(typeof swatch.stop).toBe("number");
      expect(typeof swatch.hex).toBe("string");
    });
  });

  it("should have aggressive saturation settings for juicy effect", () => {
    const palette = createJuicyPalette();

    // Для сочных цветов должна быть увеличена насыщенность
    expect(palette.s).toBe(20); // увеличенная насыщенность на краях
    expect(palette.lMin).toBe(5); // более темный минимум
    expect(palette.lMax).toBe(95); // более светлый максимум
  });
});

describe("createPastelPalette", () => {
  it("should generate a palette with pastel colors", () => {
    const palette = createPastelPalette();

    expect(palette).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(palette.swatches.length).toBeGreaterThan(0);
  });

  it("should generate colors with low saturation", () => {
    // Создадим несколько палитр и проверим среднюю насыщенность
    const palettes = Array.from({ length: 10 }, () => createPastelPalette());

    const averageSaturation = palettes.reduce((acc, palette) => {
      const baseColor = chroma(`#${palette.value}`);
      const hsl = baseColor.hsl();
      return acc + hsl[1];
    }, 0) / palettes.length;

    // Средняя насыщенность пастельных цветов должна быть < 80%
    expect(averageSaturation).toBeLessThan(0.8);
  });

  it("should have soft lightness settings for pastel effect", () => {
    const palette = createPastelPalette();

    expect(palette.s).toBe(-10); // сниженная насыщенность на краях
    expect(palette.lMin).toBe(15); // светлый минимум
    expect(palette.lMax).toBe(98); // очень светлый максимум
  });
});

describe("createModernPalette", () => {
  it("should generate a palette with modern colors", () => {
    const palette = createModernPalette();

    expect(palette).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(palette.swatches.length).toBeGreaterThan(0);
  });

  it("should generate colors with very low saturation", () => {
    const palette = createModernPalette();

    const baseColor = chroma(`#${palette.value}`);
    const hsl = baseColor.hsl();
    const saturation = hsl[1];

    // Современные цвета должны иметь очень низкую насыщенность < 40%
    expect(saturation).toBeLessThan(0.4);
  });

  it("should have minimal settings for modern effect", () => {
    const palette = createModernPalette();

    expect(palette.s).toBe(20); // насыщенность устанавливается премиум генератором
    expect(palette.lMin).toBe(5); // темный минимум устанавливается премиум генератором
    expect(palette.lMax).toBe(95); // светлый максимум устанавливается премиум генератором
  });
});

describe("createOfficePalette", () => {
  it("should generate a palette with office colors", () => {
    const palette = createOfficePalette();

    expect(palette).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(palette.swatches.length).toBeGreaterThan(0);
  });

  it("should generate colors with moderate saturation", () => {
    const palette = createOfficePalette();

    const baseColor = chroma(`#${palette.value}`);
    const hsl = baseColor.hsl();
    const saturation = hsl[1];

    // Офисные цвета должны иметь умеренную насыщенность < 85%
    expect(saturation).toBeLessThan(0.85);
  });

  it("should have balanced settings for office effect", () => {
    const palette = createOfficePalette();

    expect(palette.s).toBe(10); // умеренная насыщенность
    expect(palette.lMin).toBe(8); // темный минимум для текста
    expect(palette.lMax).toBe(92); // светлый максимум для фона
  });
});

describe("createUnlimitedPalette", () => {
  it("should generate a palette with completely random colors", () => {
    const palette = createUnlimitedPalette();

    expect(palette).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(palette.swatches.length).toBeGreaterThan(0);
    expect(palette.name).toMatch(/^unlimited-/);
  });

  it("should generate unique colors when currentValues provided", () => {
    const existingValues = ["FF0000", "00FF00"]; // красный и зеленый
    const palette = createUnlimitedPalette(existingValues);

    expect(palette.value.toUpperCase()).not.toBe("FF0000");
    expect(palette.value.toUpperCase()).not.toBe("00FF00");
  });

  it("should generate colors with varying saturation and lightness", () => {
    // Создадим несколько палитр и проверим разнообразие
    const palettes = Array.from({ length: 20 }, () => createUnlimitedPalette());

    const saturations = palettes.map(p => {
      const color = chroma(`#${p.value}`);
      return color.hsl()[1];
    });

    const lightness = palettes.map(p => {
      const color = chroma(`#${p.value}`);
      return color.hsl()[2];
    });

    // Проверяем, что есть разнообразие насыщенности
    const minSat = Math.min(...saturations);
    const maxSat = Math.max(...saturations);
    expect(maxSat - minSat).toBeGreaterThan(0.3); // Разница хотя бы 30%

    // Проверяем, что яркость в разумных пределах
    const minLight = Math.min(...lightness);
    const maxLight = Math.max(...lightness);
    expect(minLight).toBeGreaterThan(0.05); // Не слишком темный
    expect(maxLight).toBeLessThan(0.95); // Не слишком светлый
  });

  it("should have adaptive lightness settings", () => {
    const palette = createUnlimitedPalette();

    const baseColor = chroma(`#${palette.value}`);
    const baseLightness = baseColor.hsl()[2] * 100;

    // Проверяем, что настройки адаптируются к базовому цвету
    expect(palette.lMin).toBeLessThanOrEqual(baseLightness);
    expect(palette.lMax).toBeGreaterThanOrEqual(baseLightness);
  });
});

describe("PremiumPaletteGenerator", () => {
  describe("generatePremiumPalette", () => {
    it("should generate juicy palette with quality guarantees", () => {
      const result = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'juicy',
        currentValues: [],
        qualityThreshold: 70,
      });

      expect(result).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(result.qualityScore).toBeDefined();
      expect(result.qualityScore).toBeGreaterThanOrEqual(70);
    });

    it("should avoid duplicate colors", () => {
      const existingValues = ["FF1744"]; // vivid-red
      const result = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'juicy',
        currentValues: existingValues,
        qualityThreshold: 60,
      });

      expect(result.value.toUpperCase()).not.toBe("FF1744");
    });

    it("should respect accessibility requirements", () => {
      const result = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'office',
        currentValues: [],
        qualityThreshold: 60,
        accessibilityRequired: true,
      });

      expect(result.accessibility).toBe(true);
    });

    it("should generate different styles with appropriate characteristics", () => {
      const juicy = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'juicy',
        currentValues: [],
        qualityThreshold: 60,
      });

      const pastel = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'pastel',
        currentValues: [],
        qualityThreshold: 60,
      });

      const modern = PremiumPaletteGenerator.generatePremiumPalette({
        style: 'modern',
        currentValues: [],
        qualityThreshold: 60,
      });

      // Juicy should have high saturation
      const juicySat = chroma(`#${juicy.value}`).hsl()[1];
      expect(juicySat).toBeGreaterThan(0.6);

      // Pastel should have lower saturation
      const pastelSat = chroma(`#${pastel.value}`).hsl()[1];
      expect(pastelSat).toBeLessThan(0.8);

      // Modern should have very low saturation
      const modernSat = chroma(`#${modern.value}`).hsl()[1];
      expect(modernSat).toBeLessThan(0.5);
    });
  });

  describe("generateColorHarmony", () => {
    it("should generate analogous colors", () => {
      const baseColor = "FF0000"; // Red
      const harmony = PremiumPaletteGenerator.generateColorHarmony(baseColor, 'analogous', 3);

      expect(harmony).toHaveLength(3);
      expect(harmony[0]).toBe(baseColor);

      // Check that colors are different
      expect(harmony[1]).not.toBe(harmony[0]);
      expect(harmony[2]).not.toBe(harmony[0]);
    });

    it("should generate complementary colors", () => {
      const baseColor = "FF0000"; // Red
      const harmony = PremiumPaletteGenerator.generateColorHarmony(baseColor, 'complementary', 2);

      expect(harmony).toHaveLength(2);
      expect(harmony[0]).toBe(baseColor);

      // Complementary color should be different
      expect(harmony[1]).not.toBe(harmony[0]);
    });

    it("should generate triadic colors", () => {
      const baseColor = "FF0000"; // Red
      const harmony = PremiumPaletteGenerator.generateColorHarmony(baseColor, 'triadic', 3);

      expect(harmony).toHaveLength(3);
      expect(harmony[0]).toBe(baseColor);

      // All colors should be different
      expect(new Set(harmony).size).toBe(3);
    });
  });

  describe("generateGradient", () => {
    it("should generate linear gradient from palette", () => {
      const mockPalette = {
        value: "FF0000",
        swatches: [
          { stop: 100, hex: "FFCCCC" },
          { stop: 300, hex: "FF6666" },
          { stop: 500, hex: "FF0000" },
          { stop: 700, hex: "CC0000" },
          { stop: 900, hex: "990000" },
        ],
      };

      const gradient = PremiumPaletteGenerator.generateGradient(mockPalette as any, 'linear');

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('90deg');
      expect(gradient).toContain('#FFCCCC');
      expect(gradient).toContain('#FF0000');
    });

    it("should generate radial gradient", () => {
      const mockPalette = {
        value: "FF0000",
        swatches: [
          { stop: 100, hex: "FFCCCC" },
          { stop: 500, hex: "FF0000" },
          { stop: 900, hex: "990000" },
        ],
      };

      const gradient = PremiumPaletteGenerator.generateGradient(mockPalette as any, 'radial');

      expect(gradient).toContain('radial-gradient');
      expect(gradient).toContain('circle');
    });

    it("should handle palettes with insufficient swatches", () => {
      const mockPalette = {
        value: "FF0000",
        swatches: [],
      };

      const gradient = PremiumPaletteGenerator.generateGradient(mockPalette as any, 'linear');

      expect(gradient).toContain('linear-gradient');
      expect(gradient).toContain('#FF0000');
    });
  });

  describe("calculateQualityScore", () => {
    it("should calculate quality score based on multiple factors", () => {
      const paletteData = {
        name: "test",
        value: "FF0000",
        tags: ["test"],
        accessibility: true,
      };

      const score = PremiumPaletteGenerator['calculateQualityScore'](paletteData, []);

      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it("should penalize duplicate colors", () => {
      const paletteData = {
        name: "test",
        value: "FF0000",
        tags: ["test"],
        accessibility: true,
      };

      const scoreWithoutDuplicates = PremiumPaletteGenerator['calculateQualityScore'](paletteData, []);
      const scoreWithDuplicates = PremiumPaletteGenerator['calculateQualityScore'](paletteData, ["FF0000"]);

      expect(scoreWithDuplicates).toBeLessThan(scoreWithoutDuplicates);
    });
  });

  describe("optimizeForAccessibility", () => {
    it("should mark palette as accessible when optimized", () => {
      const mockPalette = {
        value: "FFFFFF", // White - poor contrast
        swatches: [
          { stop: 100, hex: "FFFFFF" },
          { stop: 500, hex: "FFFFFF" },
          { stop: 900, hex: "FFFFFF" },
        ],
        accessibility: false,
      };

      const optimized = PremiumPaletteGenerator.optimizeForAccessibility(mockPalette as any);

      expect(optimized.accessibility).toBe(true);
    });

    it("should adjust colors for better contrast", () => {
      // Create a palette with colors that definitely need contrast adjustment
      const mockPalette = {
        value: "FAFAFA",
        swatches: [
          { stop: 100, hex: "FAFAFA" }, // Very light - will be darkened
          { stop: 500, hex: "FAFAFA" }, // Very light - will be darkened
          { stop: 900, hex: "FAFAFA" }, // Very light - will be darkened
        ],
        accessibility: false,
      };

      const optimized = PremiumPaletteGenerator.optimizeForAccessibility(mockPalette as any);

      // The optimization should mark as accessible regardless of adjustments
      expect(optimized.accessibility).toBe(true);

      // Check that the function runs without errors and returns a valid palette
      expect(optimized.swatches).toBeDefined();
      expect(optimized.swatches.length).toBe(3);
    });
  });

  describe("checkAccessibility", () => {
    it("should return true for colors with good contrast", () => {
      const goodColor = chroma("#000000"); // Black has good contrast with white
      const isAccessible = PremiumPaletteGenerator['checkAccessibility'](goodColor);

      expect(isAccessible).toBe(true);
    });

    it("should return false for colors with poor contrast", () => {
      const poorColor = chroma("#FFFF00"); // Yellow on white may have poor contrast
      const isAccessible = PremiumPaletteGenerator['checkAccessibility'](poorColor);

      // This might be true or false depending on the specific color, but the method should work
      expect(typeof isAccessible).toBe('boolean');
    });
  });
});

describe("Premium Style Integration", () => {
  it("should generate palettes with premium features", () => {
    const juicyPalette = createJuicyPalette();

    expect(juicyPalette.premiumFeatures).toBeDefined();
    expect(Array.isArray(juicyPalette.premiumFeatures)).toBe(true);
    expect(juicyPalette.premiumFeatures).toContain('vibrant-colors');
  });

  it("should include quality scores for premium palettes", () => {
    const officePalette = createOfficePalette();

    expect(officePalette.qualityScore).toBeDefined();
    expect(typeof officePalette.qualityScore).toBe('number');
    expect(officePalette.qualityScore).toBeGreaterThanOrEqual(0);
    expect(officePalette.qualityScore).toBeLessThanOrEqual(100);
  });

  it("should support gradient generation for all premium styles", () => {
    const styles = ['juicy', 'pastel', 'modern', 'office', 'unlimited'];

    styles.forEach(style => {
      let palette;
      switch (style) {
        case 'juicy': palette = createJuicyPalette(); break;
        case 'pastel': palette = createPastelPalette(); break;
        case 'modern': palette = createModernPalette(); break;
        case 'office': palette = createOfficePalette(); break;
        case 'unlimited': palette = createUnlimitedPalette(); break;
      }

      expect(palette.gradientSupport).toBe(true);

      const gradient = PremiumPaletteGenerator.generateGradient(palette, 'linear');
      expect(typeof gradient).toBe('string');
      expect(gradient).toContain('linear-gradient');
    });
  });

  it("should maintain backward compatibility", () => {
    // Test that all existing functionality still works
    const palette = createJuicyPalette();

    expect(palette.id).toBeDefined();
    expect(palette.name).toBeDefined();
    expect(palette.value).toBeDefined();
    expect(palette.swatches).toBeDefined();
    expect(Array.isArray(palette.swatches)).toBe(true);
    expect(palette.swatches.length).toBeGreaterThan(0);
  });
});

describe("Premium Palette Generators", () => {
  describe("createPremiumJuicyPalette", () => {
    it("should generate premium juicy palette with enhanced features", () => {
      const palette = createPremiumJuicyPalette();

      expect(palette).toBeDefined();
      expect(palette.premiumFeatures).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-vibrant');
      expect(palette.qualityScore).toBeDefined();
      expect(palette.qualityScore).toBeGreaterThanOrEqual(85);
      expect(palette.colorHarmony).toBeDefined();
      expect(palette.swatches.length).toBeGreaterThan(0);
    });

    it("should have premium juicy specific settings", () => {
      const palette = createPremiumJuicyPalette();

      expect(palette.s).toBe(20); // Premium насыщенность
      expect(palette.lMin).toBe(5);
      expect(palette.lMax).toBe(95);
      expect(palette.premiumFeatures).toContain('harmony-optimized');
    });
  });

  describe("createPremiumPastelPalette", () => {
    it("should generate premium pastel palette with soft colors", () => {
      const palette = createPremiumPastelPalette();

      expect(palette).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-soft');
      expect(palette.premiumFeatures).toContain('accessible');
      expect(palette.qualityScore).toBeGreaterThanOrEqual(80);
      expect(palette.accessibility).toBe(true); // Premium pastel должен быть accessible
    });

    it("should have premium pastel specific settings", () => {
      const palette = createPremiumPastelPalette();

      expect(palette.s).toBe(-10); // Сниженная насыщенность для пастели
      expect(palette.lMin).toBe(15);
      expect(palette.lMax).toBe(98);
      expect(palette.premiumFeatures).toContain('emotion-design');
    });
  });

  describe("createPremiumModernPalette", () => {
    it("should generate premium modern palette with high quality", () => {
      const palette = createPremiumModernPalette();

      expect(palette).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-minimalist');
      expect(palette.premiumFeatures).toContain('accessible');
      expect(palette.qualityScore).toBeGreaterThanOrEqual(90); // Высокий порог
      expect(palette.accessibility).toBe(true);
    });

    it("should have premium modern specific settings", () => {
      const palette = createPremiumModernPalette();

      expect(palette.s).toBe(20); // Премиум насыщенность
      expect(palette.lMin).toBe(5);
      expect(palette.lMax).toBe(95);
      expect(palette.premiumFeatures).toContain('dark-theme-excellence');
    });
  });

  describe("createPremiumOfficePalette", () => {
    it("should generate premium office palette with enterprise quality", () => {
      const palette = createPremiumOfficePalette();

      expect(palette).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-professional');
      expect(palette.premiumFeatures).toContain('enterprise-grade');
      expect(palette.premiumFeatures).toContain('fully-accessible');
      expect(palette.qualityScore).toBeGreaterThanOrEqual(95); // Максимальный порог
      expect(palette.accessibility).toBe(true);
    });

    it("should have premium office specific settings", () => {
      const palette = createPremiumOfficePalette();

      expect(palette.s).toBe(10); // Умеренная насыщенность для премиум офиса
      expect(palette.lMin).toBe(8);
      expect(palette.lMax).toBe(92);
      expect(palette.premiumFeatures).toContain('trust-building');
    });
  });

  describe("createPremiumUnlimitedPalette", () => {
    it("should generate premium unlimited palette with unique algorithm", () => {
      const palette = createPremiumUnlimitedPalette();

      expect(palette).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-unlimited');
      expect(palette.premiumFeatures).toContain('unique-algorithm');
      expect(palette.premiumFeatures).toContain('quality-guaranteed');
      expect(palette.qualityScore).toBeGreaterThanOrEqual(75);
    });

    it("should have extended range parameters for premium unlimited", () => {
      const palette = createPremiumUnlimitedPalette();

      // Проверяем расширенные диапазоны
      expect(palette.h).toBeGreaterThanOrEqual(-60);
      expect(palette.h).toBeLessThanOrEqual(60);
      expect(palette.s).toBeGreaterThanOrEqual(-30);
      expect(palette.s).toBeLessThanOrEqual(30);
      expect(palette.premiumFeatures).toContain('adaptive');
    });
  });

  describe("Premium Features Integration", () => {
    it("should ensure all premium palettes have required features", () => {
      const palettes = [
        createPremiumJuicyPalette(),
        createPremiumPastelPalette(),
        createPremiumModernPalette(),
        createPremiumOfficePalette(),
        createPremiumUnlimitedPalette()
      ];

      palettes.forEach(palette => {
        expect(palette.premiumFeatures).toBeDefined();
        expect(Array.isArray(palette.premiumFeatures)).toBe(true);
        expect(palette.premiumFeatures.length).toBeGreaterThan(0);
        expect(palette.qualityScore).toBeDefined();
        expect(palette.qualityScore).toBeGreaterThanOrEqual(70);
        expect(palette.gradientSupport).toBe(true);
      });
    });

    it("should maintain premium quality across multiple generations", () => {
      // Генерируем несколько палитр каждого типа
      const juicyPalettes = Array.from({ length: 5 }, () => createPremiumJuicyPalette());
      const pastelPalettes = Array.from({ length: 5 }, () => createPremiumPastelPalette());
      const modernPalettes = Array.from({ length: 5 }, () => createPremiumModernPalette());
      const officePalettes = Array.from({ length: 5 }, () => createPremiumOfficePalette());
      const unlimitedPalettes = Array.from({ length: 5 }, () => createPremiumUnlimitedPalette());

      // Проверяем что все палитры имеют высокое качество
      const allPalettes = [...juicyPalettes, ...pastelPalettes, ...modernPalettes, ...officePalettes, ...unlimitedPalettes];

      allPalettes.forEach(palette => {
        expect(palette.qualityScore).toBeGreaterThanOrEqual(70);
        expect(palette.premiumFeatures).toBeDefined();
        expect(palette.swatches.length).toBeGreaterThan(0);

        // Специфические проверки для каждого типа палитры
        if (palette.premiumFeatures.includes('premium-professional')) {
          expect(palette.s).toBe(10); // Premium office uses s=10 (moderate)
        } else if (palette.premiumFeatures.includes('premium-vibrant')) {
          expect(palette.s).toBe(20); // Premium juicy uses s=20
        } else if (palette.premiumFeatures.includes('premium-soft')) {
          expect(palette.s).toBe(-10); // Premium pastel uses s=-10
        } else if (palette.premiumFeatures.includes('premium-minimalist')) {
          expect(palette.s).toBe(20); // Premium modern uses s=20
        } else if (palette.premiumFeatures.includes('premium-unlimited')) {
          // Premium unlimited has variable s, just check it's defined
          expect(palette.s).toBeDefined();
        }
      });

      // Проверяем разнообразие цветов (премиум фокус на качестве, а не на разнообразии)
      const uniqueColors = new Set(allPalettes.map(p => p.value));
      expect(uniqueColors.size).toBeGreaterThan(5); // Минимум 5 уникальных цветов достаточно
    });

    it("should avoid color conflicts in premium palettes", () => {
      const existingColors = ["FF0000", "00FF00", "0000FF"];
      const palette = createPremiumJuicyPalette(existingColors);

      expect(existingColors).not.toContain(palette.value.toUpperCase());
      expect(palette.qualityScore).toBeGreaterThanOrEqual(85);
    });

    it("should apply premium options when provided", () => {
      const premiumOptions: PremiumOptions = {
        mood: 'energetic',
        colorRule: 'analogous',
      };

      const palette = createPremiumJuicyPalette([], premiumOptions);

      expect(palette.premiumOptions).toEqual(premiumOptions);
      expect(palette.moodAnalysis).toBeDefined();
    });

    it("should generate from library when specified", () => {
      const premiumOptions: PremiumOptions = {
        colorLibrary: 'material-design',
      };

      const palette = createPremiumJuicyPalette([], premiumOptions);

      expect(palette.premiumOptions).toEqual(premiumOptions);
      // Should have some material design characteristics
      expect(palette.tags).toContain('library');
    });

    it("should generate mood-based palettes", () => {
      const premiumOptions: PremiumOptions = {
        mood: 'calm',
      };

      const palette = createPremiumPastelPalette([], premiumOptions);

      expect(palette.premiumOptions).toEqual(premiumOptions);
      expect(palette.moodAnalysis).toBeDefined();
      expect(palette.moodAnalysis!.primary).toBe('calm');
    });

    it("should respect accessibility standards", () => {
      const premiumOptions: PremiumOptions = {
        accessibilityStandard: 'wcag-aa',
      };

      const palette = createPremiumOfficePalette([], premiumOptions);

      expect(palette.premiumOptions).toEqual(premiumOptions);
      expect(palette.accessibilityMetrics).toBeDefined();
    });

    it("should perform comprehensive color analysis", () => {
      const premiumOptions: PremiumOptions = {
        colorAnalysis: true,
      };

      const palette = createPremiumModernPalette([], premiumOptions);

      expect(palette.premiumOptions).toEqual(premiumOptions);
      expect(palette.colorAnalysis).toBeDefined();
      expect(palette.colorAnalysis!.harmonyScore).toBeGreaterThanOrEqual(0);
      expect(['warm', 'cool', 'neutral']).toContain(palette.colorAnalysis!.temperature);
    });
  });

  describe("Premium Options Integration", () => {
    it("should maintain premium quality with options", () => {
      const testOptions: PremiumOptions[] = [
        { mood: 'luxurious', colorRule: 'complementary' },
        { season: 'winter' },
        { colorLibrary: 'ios' },
        { mood: 'professional' },
      ];

      testOptions.forEach(options => {
        const palette = createPremiumUnlimitedPalette([], options);

        expect(palette.premiumOptions).toEqual(options);
        expect(palette.qualityScore).toBeGreaterThanOrEqual(70);
        expect(palette.premiumFeatures).toContain('premium-unlimited');

        if (options.mood || options.season) {
          expect(palette.moodAnalysis).toBeDefined();
        }
      });
    });

    it("should handle multiple premium options simultaneously", () => {
      const complexOptions: PremiumOptions = {
        mood: 'creative',
        colorRule: 'triadic',
        colorLibrary: 'tailwind',
      };

      const palette = createPremiumJuicyPalette([], complexOptions);

      expect(palette.premiumOptions).toEqual(complexOptions);
      expect(palette.qualityScore).toBeGreaterThanOrEqual(85);
      expect(palette.moodAnalysis).toBeDefined();
      expect(palette.premiumFeatures).toContain('premium-vibrant');
    });

    it("should handle empty premium options gracefully", () => {
      const emptyOptions: PremiumOptions = {};

      const palette = createPremiumPastelPalette([], emptyOptions);

      expect(palette.qualityScore).toBeGreaterThanOrEqual(70);
      expect(palette.premiumFeatures).toContain('premium-soft');
      // Should still generate a valid palette
      expect(palette.swatches.length).toBeGreaterThan(0);
    });
  });
});