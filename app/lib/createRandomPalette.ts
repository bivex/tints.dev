/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T07:06:43
 * Last Updated: 2025-12-19T07:07:23
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { nanoid } from "nanoid";
import chroma from "chroma-js";

import { DEFAULT_PALETTE_CONFIG, RANDOM_PALETTES, STYLE_PRESETS, PALETTE_ADJECTIVES, PALETTE_NOUNS } from "~/lib/constants";

// Функция для генерации случайного названия палитры
const generateRandomPaletteName = (): string => {
  const adjective = PALETTE_ADJECTIVES[Math.floor(Math.random() * PALETTE_ADJECTIVES.length)];
  const noun = PALETTE_NOUNS[Math.floor(Math.random() * PALETTE_NOUNS.length)];

  // Иногда добавляем дополнительное слово для разнообразия
  const addExtraWord = Math.random() > 0.7;
  if (addExtraWord) {
    const extraWords = ['Collection', 'Theme', 'Series', 'Set', 'Mix', 'Blend'];
    const extra = extraWords[Math.floor(Math.random() * extraWords.length)];
    return `${adjective} ${noun} ${extra}`;
  }

  return `${adjective} ${noun}`;
};
import { PremiumPaletteGenerator } from "~/lib/premiumPaletteUtils";
import { createSwatches } from "~/lib/createSwatches";
import { calculateStopFromColor } from "~/lib/helpers";
import type { PremiumOptions } from "~/types";

export function createRandomPalette(currentValues: string[] = []) {
  const randomsWithoutCurrentValues = RANDOM_PALETTES.filter((p) =>
    currentValues?.length
      ? !currentValues
          .map((v) => v.toUpperCase())
          .includes(p.value.toUpperCase())
      : true,
  );

  const defaults = {
    ...DEFAULT_PALETTE_CONFIG,
    id: nanoid(),
    name: generateRandomPaletteName(), // Случайное название вместо из RANDOM_PALETTES
    ...randomsWithoutCurrentValues[
      Math.floor(Math.random() * randomsWithoutCurrentValues.length)
    ],
    swatches: [],
  };

  const palette = {
    ...defaults,
    valueStop: calculateStopFromColor(defaults.value, defaults.colorMode),
    swatches: createSwatches({
      ...defaults,
      valueStop: calculateStopFromColor(defaults.value, defaults.colorMode),
    }),
  };

  return palette;
}

export function createPastelPalette(currentValues: string[] = []) {
  // Используем премиум генератор для создания качественной пастельной палитры
  const premiumData = PremiumPaletteGenerator.generatePremiumPalette({
    style: 'pastel',
    currentValues,
    qualityThreshold: 70, // Средний порог качества для pastel стиля
    accessibilityRequired: true, // Pastel должен быть accessible для лучшей читаемости
  });

  // Создаем полный конфиг палитры
  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'random',
    STYLE_PRESETS.pastel
  );

  // Добавляем случайное название
  paletteConfig.name = generateRandomPaletteName();

  // Заполняем swatches
  const finalPalette = {
    ...paletteConfig,
    valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    swatches: createSwatches({
      ...paletteConfig,
      valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    }),
  };

  return finalPalette;
}

export function createJuicyPalette(currentValues: string[] = []) {
  // Используем премиум генератор для создания качественной палитры
  const premiumData = PremiumPaletteGenerator.generatePremiumPalette({
    style: 'juicy',
    currentValues,
    qualityThreshold: 75, // Высокий порог качества для juicy стиля
    accessibilityRequired: false, // Juicy может быть не всегда accessible
  });

  // Создаем полный конфиг палитры
  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.juicy
  );

  // Добавляем случайное название
  paletteConfig.name = generateRandomPaletteName();

  // Заполняем swatches
  const finalPalette = {
    ...paletteConfig,
    valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    swatches: createSwatches({
      ...paletteConfig,
      valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    }),
  };

  return finalPalette;
}

export function createModernPalette(currentValues: string[] = []) {
  // Используем премиум генератор для создания качественной современной палитры
  const premiumData = PremiumPaletteGenerator.generatePremiumPalette({
    style: 'modern',
    currentValues,
    qualityThreshold: 80, // Высокий порог качества для modern стиля
    accessibilityRequired: true, // Modern должен быть accessible для профессионального использования
  });

  // Создаем полный конфиг палитры
  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.modern
  );

  // Добавляем случайное название
  paletteConfig.name = generateRandomPaletteName();

  // Заполняем swatches
  const finalPalette = {
    ...paletteConfig,
    valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    swatches: createSwatches({
      ...paletteConfig,
      valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    }),
  };

  return finalPalette;
}

export function createOfficePalette(currentValues: string[] = []) {
  // Используем премиум генератор для создания качественной офисной палитры
  const premiumData = PremiumPaletteGenerator.generatePremiumPalette({
    style: 'office',
    currentValues,
    qualityThreshold: 85, // Очень высокий порог качества для office стиля
    accessibilityRequired: true, // Office должен быть полностью accessible
  });

  // Создаем полный конфиг палитры
  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.office
  );

  // Добавляем случайное название
  paletteConfig.name = generateRandomPaletteName();

  // Заполняем swatches
  const finalPalette = {
    ...paletteConfig,
    valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    swatches: createSwatches({
      ...paletteConfig,
      valueStop: calculateStopFromColor(paletteConfig.value, paletteConfig.colorMode),
    }),
  };

  return finalPalette;
}

export function createUnlimitedPalette(currentValues: string[] = []) {
  // Используем премиум генератор для создания полностью случайной палитры с гарантией качества
  const premiumData = PremiumPaletteGenerator.generatePremiumPalette({
    style: 'unlimited',
    currentValues,
    qualityThreshold: 60, // Более низкий порог для unlimited (полностью случайные)
    accessibilityRequired: false, // Unlimited может быть любым
  });

  // Создаем полный конфиг палитры
  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'unlimited',
    STYLE_PRESETS.unlimited
  );

  // Добавляем случайное название
  paletteConfig.name = generateRandomPaletteName();

  // Для unlimited добавляем дополнительную случайность в параметры
  const baseColor = chroma(`#${paletteConfig.value}`);
  const [baseHue, baseSat, baseLight] = baseColor.hsl();

  const enhancedConfig = {
    ...paletteConfig,
    // Добавляем случайные модификаторы для истинно unlimited поведения
    h: Math.floor(Math.random() * 60) - 30, // Случайное смещение hue -30 до +30
    s: Math.floor(Math.random() * 40) - 20, // Случайное смещение насыщенности -20 до +20
    lMin: Math.max(0, Math.floor(baseLight * 100 - 40)), // Темнее базового цвета
    lMax: Math.min(100, Math.floor(baseLight * 100 + 30)), // Светлее базового цвета
  };

  // Заполняем swatches
  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  return finalPalette;
}

// ===== ПРЕМИУМ ВЕРСИИ ГЕНЕРАТОРОВ =====

// Премиум версии с расширенным алгоритмом подбора цветов
export function createPremiumJuicyPalette(currentValues: string[] = [], premiumOptions?: PremiumOptions) {
  let premiumData: any;

  // Если есть премиум опции, используем их
  if (premiumOptions && Object.keys(premiumOptions).length > 0) {
    premiumData = PremiumPaletteGenerator.generateFromPremiumOptions(premiumOptions, currentValues);
  } else {
    premiumData = PremiumPaletteGenerator.generatePremiumPalette({
      style: 'juicy',
      currentValues,
      qualityThreshold: 85,
      accessibilityRequired: false,
    });
  }

  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.juicy
  );

  const enhancedConfig = {
    ...paletteConfig,
    name: generateRandomPaletteName(), // Случайное название
    premiumFeatures: ['premium-vibrant', 'harmony-optimized', 'gradient-ready', 'accessibility-optional'],
    qualityScore: premiumData.qualityScore,
    colorHarmony: premiumData.harmony || 'custom',
    premiumOptions,
  };

  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  // Добавляем анализ если включен
  if (premiumOptions?.colorAnalysis) {
    finalPalette.colorAnalysis = PremiumPaletteGenerator.analyzeColorProperties(finalPalette);
  }

  if (premiumOptions?.mood || premiumOptions?.season) {
    finalPalette.moodAnalysis = PremiumPaletteGenerator.analyzeMood(finalPalette);
  }

  if (premiumOptions?.accessibilityStandard) {
    finalPalette.accessibilityMetrics = PremiumPaletteGenerator.analyzeAccessibility(finalPalette);
  }

  return finalPalette;
}

export function createPremiumPastelPalette(currentValues: string[] = [], premiumOptions?: PremiumOptions) {
  let premiumData: any;

  if (premiumOptions && Object.keys(premiumOptions).length > 0) {
    premiumData = PremiumPaletteGenerator.generateFromPremiumOptions(premiumOptions, currentValues);
  } else {
    premiumData = PremiumPaletteGenerator.generatePremiumPalette({
      style: 'pastel',
      currentValues,
      qualityThreshold: 80,
      accessibilityRequired: true,
    });
  }

  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'random',
    STYLE_PRESETS.pastel
  );

  const enhancedConfig = {
    ...paletteConfig,
    name: generateRandomPaletteName(), // Случайное название
    premiumFeatures: ['premium-soft', 'emotion-design', 'calming-colors', 'accessible'],
    qualityScore: premiumData.qualityScore,
    colorHarmony: premiumData.harmony || 'analogous',
    premiumOptions,
  };

  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  if (premiumOptions?.colorAnalysis) {
    finalPalette.colorAnalysis = PremiumPaletteGenerator.analyzeColorProperties(finalPalette);
  }

  if (premiumOptions?.mood || premiumOptions?.season) {
    finalPalette.moodAnalysis = PremiumPaletteGenerator.analyzeMood(finalPalette);
  }

  if (premiumOptions?.accessibilityStandard) {
    finalPalette.accessibilityMetrics = PremiumPaletteGenerator.analyzeAccessibility(finalPalette);
  }

  return finalPalette;
}

export function createPremiumModernPalette(currentValues: string[] = [], premiumOptions?: PremiumOptions) {
  let premiumData: any;

  if (premiumOptions && Object.keys(premiumOptions).length > 0) {
    premiumData = PremiumPaletteGenerator.generateFromPremiumOptions(premiumOptions, currentValues);
  } else {
    premiumData = PremiumPaletteGenerator.generatePremiumPalette({
      style: 'modern',
      currentValues,
      qualityThreshold: 90,
      accessibilityRequired: true,
    });
  }

  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.modern
  );

  const enhancedConfig = {
    ...paletteConfig,
    name: generateRandomPaletteName(), // Случайное название
    premiumFeatures: ['premium-minimalist', 'dark-theme-excellence', 'sophisticated', 'accessible'],
    qualityScore: premiumData.qualityScore,
    colorHarmony: premiumData.harmony || 'monochromatic',
    premiumOptions,
  };

  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  if (premiumOptions?.colorAnalysis) {
    finalPalette.colorAnalysis = PremiumPaletteGenerator.analyzeColorProperties(finalPalette);
  }

  if (premiumOptions?.mood || premiumOptions?.season) {
    finalPalette.moodAnalysis = PremiumPaletteGenerator.analyzeMood(finalPalette);
  }

  if (premiumOptions?.accessibilityStandard) {
    finalPalette.accessibilityMetrics = PremiumPaletteGenerator.analyzeAccessibility(finalPalette);
  }

  return finalPalette;
}

export function createPremiumOfficePalette(currentValues: string[] = [], premiumOptions?: PremiumOptions) {
  let premiumData: any;

  if (premiumOptions && Object.keys(premiumOptions).length > 0) {
    premiumData = PremiumPaletteGenerator.generateFromPremiumOptions(premiumOptions, currentValues);
  } else {
    premiumData = PremiumPaletteGenerator.generatePremiumPalette({
      style: 'office',
      currentValues,
      qualityThreshold: 95,
      accessibilityRequired: true,
    });
  }

  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'curated',
    STYLE_PRESETS.office
  );

  const enhancedConfig = {
    ...paletteConfig,
    name: generateRandomPaletteName(), // Случайное название
    premiumFeatures: ['premium-professional', 'trust-building', 'enterprise-grade', 'fully-accessible'],
    qualityScore: premiumData.qualityScore,
    colorHarmony: premiumData.harmony || 'complementary',
    premiumOptions,
  };

  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  if (premiumOptions?.colorAnalysis) {
    finalPalette.colorAnalysis = PremiumPaletteGenerator.analyzeColorProperties(finalPalette);
  }

  if (premiumOptions?.mood || premiumOptions?.season) {
    finalPalette.moodAnalysis = PremiumPaletteGenerator.analyzeMood(finalPalette);
  }

  if (premiumOptions?.accessibilityStandard) {
    finalPalette.accessibilityMetrics = PremiumPaletteGenerator.analyzeAccessibility(finalPalette);
  }

  return finalPalette;
}

export function createPremiumUnlimitedPalette(currentValues: string[] = [], premiumOptions?: PremiumOptions) {
  let premiumData: any;

  if (premiumOptions && Object.keys(premiumOptions).length > 0) {
    premiumData = PremiumPaletteGenerator.generateFromPremiumOptions(premiumOptions, currentValues);
  } else {
    premiumData = PremiumPaletteGenerator.generatePremiumPalette({
      style: 'unlimited',
      currentValues,
      qualityThreshold: 75,
      accessibilityRequired: Math.random() > 0.5,
    });
  }

  const paletteConfig = PremiumPaletteGenerator.createPaletteConfig(
    premiumData,
    'unlimited',
    STYLE_PRESETS.unlimited
  );

  // Добавляем уникальные премиум модификаторы
  const baseColor = chroma(`#${paletteConfig.value}`);
  const [baseHue, baseSat, baseLight] = baseColor.hsl();

  const enhancedConfig = {
    ...paletteConfig,
    name: generateRandomPaletteName(), // Случайное название
    premiumFeatures: ['premium-unlimited', 'unique-algorithm', 'quality-guaranteed', 'adaptive'],
    qualityScore: premiumData.qualityScore,
    colorHarmony: premiumData.harmony,
    premiumOptions,
    // Расширенные параметры для премиум unlimited
    h: Math.floor(Math.random() * 120) - 60,
    s: Math.floor(Math.random() * 60) - 30,
    lMin: Math.max(0, Math.floor(baseLight * 100 - 50)),
    lMax: Math.min(100, Math.floor(baseLight * 100 + 40)),
  };

  const finalPalette = {
    ...enhancedConfig,
    valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    swatches: createSwatches({
      ...enhancedConfig,
      valueStop: calculateStopFromColor(enhancedConfig.value, enhancedConfig.colorMode),
    }),
  };

  if (premiumOptions?.colorAnalysis) {
    finalPalette.colorAnalysis = PremiumPaletteGenerator.analyzeColorProperties(finalPalette);
  }

  if (premiumOptions?.mood || premiumOptions?.season) {
    finalPalette.moodAnalysis = PremiumPaletteGenerator.analyzeMood(finalPalette);
  }

  if (premiumOptions?.accessibilityStandard) {
    finalPalette.accessibilityMetrics = PremiumPaletteGenerator.analyzeAccessibility(finalPalette);
  }

  return finalPalette;
}