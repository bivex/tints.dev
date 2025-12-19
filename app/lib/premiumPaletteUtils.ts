/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T07:07:23
 * Last Updated: 2025-12-19T07:07:23
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import chroma from "chroma-js";
import type { ColorHarmonyType, PaletteConfig, GenerationMode, ContrastLevel, ColorTemperature, PremiumOptions, MoodType, SeasonType } from "~/types";
import { LIBRARY_PALETTES, MOOD_PALETTES, SEASON_PALETTES } from "~/lib/constants";
import {
  PREMIUM_JUICY_PALETTES,
  PREMIUM_PASTEL_PALETTES,
  PREMIUM_MODERN_PALETTES,
  PREMIUM_OFFICE_PALETTES
} from "~/lib/constants";

/**
 * Интерфейс для премиум палитры с расширенными метаданными
 */
interface PremiumPaletteData {
  name: string;
  value: string;
  tags: string[];
  harmony?: ColorHarmonyType;
  qualityScore?: number;
  accessibility?: boolean;
}

/**
 * Расширенные параметры генерации премиум палитр
 */
interface PremiumGenerationOptions {
  style: 'juicy' | 'pastel' | 'modern' | 'office' | 'unlimited';
  currentValues: string[];
  qualityThreshold?: number; // Минимальный порог качества (0-100)
  accessibilityRequired?: boolean;
  harmonyPreference?: ColorHarmonyType;
  temperatureBias?: ColorTemperature;
}

/**
 * Класс для работы с премиум палитрами
 */
export class PremiumPaletteGenerator {
  private static readonly QUALITY_WEIGHTS = {
    contrast: 0.3,
    saturation: 0.2,
    harmony: 0.2,
    accessibility: 0.15,
    uniqueness: 0.15,
  };

  /**
   * Генерирует премиум палитру с гарантией качества
   */
  static generatePremiumPalette(options: PremiumGenerationOptions): PremiumPaletteData {
    const { style, currentValues, qualityThreshold = 70, accessibilityRequired = false } = options;

    let candidates: PremiumPaletteData[] = [];
    let attempts = 0;
    const maxAttempts = 50;

    // Получаем базовую коллекцию для стиля
    const baseCollection = this.getBaseCollection(style);

    while (candidates.length === 0 && attempts < maxAttempts) {
      attempts++;

      if (style === 'unlimited') {
        // Для unlimited генерируем полностью случайные палитры
        candidates = [this.generateUnlimitedPalette(currentValues, accessibilityRequired)];
      } else {
        // Для других стилей используем курированные коллекции с улучшениями
        candidates = this.enhanceCuratedPalettes(baseCollection, currentValues, style);
      }

      // Фильтруем по качеству и требованиям
      candidates = candidates.filter(candidate => {
        const qualityScore = this.calculateQualityScore(candidate, currentValues);

        return qualityScore >= qualityThreshold &&
               (!accessibilityRequired || candidate.accessibility === true) &&
               !currentValues.includes(candidate.value.toUpperCase());
      });
    }

    if (candidates.length === 0) {
      // Fallback - возвращаем лучший доступный вариант
      const fallback = this.getFallbackPalette(style, currentValues);
      fallback.qualityScore = this.calculateQualityScore(fallback, currentValues);
      return fallback;
    }

    // Возвращаем лучший кандидат с рассчитанной оценкой качества
    const bestCandidate = candidates.sort((a, b) => (b.qualityScore || 0) - (a.qualityScore || 0))[0];
    bestCandidate.qualityScore = this.calculateQualityScore(bestCandidate, currentValues);
    return bestCandidate;
  }

  /**
   * Получает базовую коллекцию палитр для стиля
   */
  private static getBaseCollection(style: string): PremiumPaletteData[] {
    switch (style) {
      case 'juicy': return PREMIUM_JUICY_PALETTES;
      case 'pastel': return PREMIUM_PASTEL_PALETTES;
      case 'modern': return PREMIUM_MODERN_PALETTES;
      case 'office': return PREMIUM_OFFICE_PALETTES;
      default: return PREMIUM_JUICY_PALETTES;
    }
  }

  /**
   * Улучшает курированные палитры дополнительными вариантами
   */
  private static enhanceCuratedPalettes(
    baseCollection: PremiumPaletteData[],
    currentValues: string[],
    style: string
  ): PremiumPaletteData[] {
    const enhanced = [...baseCollection];

    // Добавляем вариации на основе цветовой теории
    const variations = this.generateHarmonyVariations(baseCollection, style);
    enhanced.push(...variations);

    // Добавляем адаптивные цвета
    const adaptive = this.generateAdaptiveColors(style, currentValues);
    enhanced.push(...adaptive);

    return enhanced.filter(palette =>
      !currentValues.includes(palette.value.toUpperCase())
    );
  }

  /**
   * Генерирует палитру на основе премиум опций
   */
  static generateFromPremiumOptions(options: PremiumOptions, currentValues: string[] = []): PremiumPaletteData {
    let basePalette: PremiumPaletteData | null = null;

    // Сначала пытаемся найти палитру по библиотеке
    if (options.colorLibrary && options.colorLibrary !== 'custom') {
      const libraryPalettes = LIBRARY_PALETTES[options.colorLibrary as keyof typeof LIBRARY_PALETTES];
      if (libraryPalettes) {
        const availablePalettes = libraryPalettes.filter(p =>
          !currentValues.includes(p.value.toUpperCase())
        );
        if (availablePalettes.length > 0) {
          basePalette = {
            name: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].name,
            value: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value,
            tags: ['library', options.colorLibrary],
            accessibility: this.checkAccessibility(chroma(`#${availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value}`)),
          };
        }
      }
    }

    // Затем по настроению
    if (!basePalette && options.mood) {
      const moodPalettes = MOOD_PALETTES[options.mood];
      if (moodPalettes) {
        const availablePalettes = moodPalettes.filter(p =>
          !currentValues.includes(p.value.toUpperCase())
        );
        if (availablePalettes.length > 0) {
          basePalette = {
            name: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].name,
            value: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value,
            tags: ['mood', options.mood],
            accessibility: this.checkAccessibility(chroma(`#${availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value}`)),
          };
        }
      }
    }

    // Затем по сезону
    if (!basePalette && options.season) {
      const seasonPalettes = SEASON_PALETTES[options.season];
      if (seasonPalettes) {
        const availablePalettes = seasonPalettes.filter(p =>
          !currentValues.includes(p.value.toUpperCase())
        );
        if (availablePalettes.length > 0) {
          basePalette = {
            name: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].name,
            value: availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value,
            tags: ['season', options.season],
            accessibility: this.checkAccessibility(chroma(`#${availablePalettes[Math.floor(Math.random() * availablePalettes.length)].value}`)),
          };
        }
      }
    }

    // Если ничего не найдено, используем стандартную генерацию
    if (!basePalette) {
      return this.generateUnlimitedPalette(currentValues, options.accessibilityStandard ? true : false);
    }

    // Применяем правила гармонии если указаны
    if (options.colorRule && options.colorRule !== 'custom') {
      basePalette.harmony = options.colorRule as ColorHarmonyType;
    }

    // Применяем требования доступности
    if (options.accessibilityStandard) {
      basePalette.accessibility = true;
    }

    // Вычисляем качество для премиум палитры
    basePalette.qualityScore = this.calculateQualityScore(basePalette, currentValues);

    return basePalette;
  }

  /**
   * Анализирует настроение палитры
   */
  static analyzeMood(palette: PaletteConfig): { primary: MoodType; secondary: MoodType[]; confidence: number } {
    if (!palette.swatches || palette.swatches.length === 0) {
      return { primary: 'neutral', secondary: [], confidence: 0 };
    }

    // Анализируем цвета на основе HSL значений
    const colors = palette.swatches.map(swatch => chroma(swatch.hex.startsWith('#') ? swatch.hex : `#${swatch.hex}`));
    const avgHue = colors.reduce((sum, color) => sum + color.hsl()[0], 0) / colors.length;
    const avgSat = colors.reduce((sum, color) => sum + color.hsl()[1], 0) / colors.length;
    const avgLight = colors.reduce((sum, color) => sum + color.hsl()[2], 0) / colors.length;

    // Определяем настроение на основе характеристик цвета
    let primaryMood: MoodType = 'calm';
    const secondaryMoods: MoodType[] = [];

    if (avgSat > 0.7) {
      primaryMood = 'energetic';
      secondaryMoods.push('creative', 'vibrant');
    } else if (avgSat < 0.3) {
      primaryMood = 'calm';
      secondaryMoods.push('minimal', 'professional');
    } else if (avgLight > 0.7) {
      primaryMood = 'calm';
      secondaryMoods.push('fresh', 'clean');
    } else if (avgLight < 0.3) {
      primaryMood = 'luxurious';
      secondaryMoods.push('professional', 'sophisticated');
    }

    // Корректируем по hue
    if (avgHue >= 0 && avgHue < 60) {
      secondaryMoods.push('warm', 'optimistic');
    } else if (avgHue >= 60 && avgHue < 180) {
      secondaryMoods.push('fresh', 'natural');
    } else if (avgHue >= 180 && avgHue < 300) {
      secondaryMoods.push('cool', 'trustworthy');
    } else {
      secondaryMoods.push('luxurious', 'creative');
    }

    return {
      primary: primaryMood,
      secondary: [...new Set(secondaryMoods)].slice(0, 2),
      confidence: Math.min(100, Math.round((avgSat + (1 - Math.abs(avgLight - 0.5))) * 50))
    };
  }

  /**
   * Анализирует доступность палитры
   */
  static analyzeAccessibility(palette: PaletteConfig): {
    wcagAA: boolean;
    wcagAAA: boolean;
    colorBlindSafe: boolean;
    contrastRatios: number[]
  } {
    if (!palette.swatches || palette.swatches.length < 2) {
      return { wcagAA: false, wcagAAA: false, colorBlindSafe: false, contrastRatios: [] };
    }

    const ratios: number[] = [];
    let wcagAA = true;
    let wcagAAA = true;
    let colorBlindSafe = true;

    // Проверяем контраст между всеми парами цветов
    for (let i = 0; i < palette.swatches.length; i++) {
      for (let j = i + 1; j < palette.swatches.length; j++) {
        const color1 = chroma(palette.swatches[i].hex.startsWith('#') ? palette.swatches[i].hex : `#${palette.swatches[i].hex}`);
        const color2 = chroma(palette.swatches[j].hex.startsWith('#') ? palette.swatches[j].hex : `#${palette.swatches[j].hex}`);

        const ratio = chroma.contrast(color1, color2);
        ratios.push(ratio);

        // WCAG AA требует 4.5:1 для нормального текста
        if (ratio < 4.5) wcagAA = false;

        // WCAG AAA требует 7:1 для нормального текста
        if (ratio < 7) wcagAAA = false;

        // Для дальтоников проверяем специфические комбинации
        if (this.checkColorBlindCombination(color1, color2)) {
          colorBlindSafe = false;
        }
      }
    }

    return { wcagAA, wcagAAA, colorBlindSafe, contrastRatios: ratios };
  }

  /**
   * Проверяет комбинацию цветов на безопасность для дальтоников
   */
  private static checkColorBlindCombination(color1: chroma.Chroma, color2: chroma.Chroma): boolean {
    // Простая проверка - если цвета слишком похожи в разных типах дальтонизма
    const deuteranopia1 = this.simulateColorBlindness(color1, 'deuteranopia');
    const deuteranopia2 = this.simulateColorBlindness(color2, 'deuteranopia');

    const protanopia1 = this.simulateColorBlindness(color1, 'protanopia');
    const protanopia2 = this.simulateColorBlindness(color2, 'protanopia');

    const tritanopia1 = this.simulateColorBlindness(color1, 'tritanopia');
    const tritanopia2 = this.simulateColorBlindness(color2, 'tritanopia');

    const deutanContrast = chroma.contrast(deuteranopia1, deuteranopia2);
    const protanContrast = chroma.contrast(protanopia1, protanopia2);
    const tritanContrast = chroma.contrast(tritanopia1, tritanopia2);

    return deutanContrast < 4.5 || protanContrast < 4.5 || tritanContrast < 4.5;
  }

  /**
   * Симулирует цветовую слепоту
   */
  private static simulateColorBlindness(color: chroma.Chroma, type: 'protanopia' | 'deuteranopia' | 'tritanopia'): chroma.Chroma {
    // Упрощенная симуляция - в реальном приложении нужно использовать более точные матрицы
    const [h, s, l] = color.hsl();

    switch (type) {
      case 'protanopia':
        return chroma.hsl(h * 0.8, s * 0.6, l);
      case 'deuteranopia':
        return chroma.hsl(h * 0.9, s * 0.7, l);
      case 'tritanopia':
        return chroma.hsl((h + 180) % 360, s * 0.5, l);
      default:
        return color;
    }
  }

  /**
   * Анализирует цветовые характеристики палитры
   */
  static analyzeColorProperties(palette: PaletteConfig): {
    harmonyScore: number;
    saturationBalance: number;
    temperature: ColorTemperature;
    vibrancy: number;
  } {
    if (!palette.swatches || palette.swatches.length === 0) {
      return { harmonyScore: 0, saturationBalance: 0, temperature: 'neutral', vibrancy: 0 };
    }

    const colors = palette.swatches.map(swatch => chroma(swatch.hex.startsWith('#') ? swatch.hex : `#${swatch.hex}`));
    const hues = colors.map(c => c.hsl()[0]);
    const sats = colors.map(c => c.hsl()[1]);
    const lights = colors.map(c => c.hsl()[2]);

    // Оценка гармонии - насколько цвета хорошо сочетаются
    let harmonyScore = 100;
    for (let i = 0; i < hues.length; i++) {
      for (let j = i + 1; j < hues.length; j++) {
        const hueDiff = Math.min(Math.abs(hues[i] - hues[j]), 360 - Math.abs(hues[i] - hues[j]));
        // Штраф за слишком близкие или слишком далекие тона
        if (hueDiff < 15) harmonyScore -= 10;
        else if (hueDiff > 150 && hueDiff < 210) harmonyScore += 5; // Бонус за комплементарные
      }
    }

    // Баланс насыщенности
    const avgSat = sats.reduce((a, b) => a + b, 0) / sats.length;
    const satVariance = sats.reduce((sum, sat) => sum + Math.pow(sat - avgSat, 2), 0) / sats.length;
    const saturationBalance = Math.max(0, 100 - satVariance * 1000);

    // Определение температуры
    const avgHue = hues.reduce((a, b) => a + b, 0) / hues.length;
    let temperature: ColorTemperature = 'neutral';
    if (avgHue >= 0 && avgHue < 90) temperature = 'warm';
    else if (avgHue >= 270 || avgHue < 90) temperature = 'cool';
    else temperature = 'neutral';

    // Оценка vibrancy
    const vibrancy = (avgSat * 100 + (1 - lights.reduce((a, b) => a + b, 0) / lights.length) * 50) / 2;

    return {
      harmonyScore: Math.max(0, Math.min(100, harmonyScore)),
      saturationBalance,
      temperature,
      vibrancy
    };
  }

  /**
   * Генерирует гармоничные вариации цветов
   */
  private static generateHarmonyVariations(
    basePalettes: PremiumPaletteData[],
    style: string
  ): PremiumPaletteData[] {
    const variations: PremiumPaletteData[] = [];

    for (const base of basePalettes.slice(0, 3)) { // Берем только первые 3 для разнообразия
      const baseColor = chroma(base.value);

      // Генерируем аналогичные цвета
      const analogous = this.generateAnalogousVariations(baseColor, style);
      variations.push(...analogous);

      // Генерируем комплементарные вариации
      const complementary = this.generateComplementaryVariations(baseColor, style);
      variations.push(...complementary);
    }

    return variations;
  }

  /**
   * Генерирует аналогичные цвета
   */
  private static generateAnalogousVariations(
    baseColor: chroma.Chroma,
    style: string
  ): PremiumPaletteData[] {
    const variations: PremiumPaletteData[] = [];
    const [h, s, l] = baseColor.hsl();

    for (let i = 1; i <= 2; i++) {
      const newHue = (h + i * 30) % 360;
      const variation = chroma.hsl(newHue, s, l);

      variations.push({
        name: `${style}-analogous-${i}`,
        value: variation.hex().replace('#', '').toUpperCase(),
        tags: ['analogous', 'harmonic', style],
        harmony: 'analogous',
        accessibility: this.checkAccessibility(variation),
      });
    }

    return variations;
  }

  /**
   * Генерирует комплементарные вариации
   */
  private static generateComplementaryVariations(
    baseColor: chroma.Chroma,
    style: string
  ): PremiumPaletteData[] {
    const variations: PremiumPaletteData[] = [];
    const [h, s, l] = baseColor.hsl();

    const complementaryHue = (h + 180) % 360;
    const variation = chroma.hsl(complementaryHue, s, l);

    variations.push({
      name: `${style}-complementary`,
      value: variation.hex().replace('#', '').toUpperCase(),
      tags: ['complementary', 'harmonic', style],
      harmony: 'complementary',
      accessibility: this.checkAccessibility(variation),
    });

    return variations;
  }

  /**
   * Генерирует адаптивные цвета для лучшей интеграции
   */
  private static generateAdaptiveColors(style: string, currentValues: string[]): PremiumPaletteData[] {
    const adaptive: PremiumPaletteData[] = [];

    // Создаем цвета, которые хорошо сочетаются с существующими
    if (currentValues.length > 0) {
      const lastColor = chroma(`#${currentValues[currentValues.length - 1]}`);
      const [h, s, l] = lastColor.hsl();

      // Создаем гармоничные дополнения
      const adaptiveHue = (h + 120) % 360; // Тriadic harmony
      const adaptiveColor = chroma.hsl(adaptiveHue, Math.min(s + 0.1, 1), l);

      adaptive.push({
        name: `${style}-adaptive`,
        value: adaptiveColor.hex().replace('#', '').toUpperCase(),
        tags: ['adaptive', 'harmonic', style],
        harmony: 'triadic',
        accessibility: this.checkAccessibility(adaptiveColor),
      });
    }

    return adaptive;
  }

  /**
   * Генерирует полностью случайную премиум палитру с гарантией качества
   */
  private static generateUnlimitedPalette(
    currentValues: string[],
    accessibilityRequired: boolean
  ): PremiumPaletteData {
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      attempts++;

      // Генерируем цвет с учетом качества
      const color = this.generateHighQualityRandomColor(accessibilityRequired);

      if (!currentValues.includes(color.value.toUpperCase())) {
        return color;
      }
    }

    // Fallback
    return {
      name: 'unlimited-fallback',
      value: '3B82F6', // Безопасный синий
      tags: ['fallback', 'unlimited'],
      accessibility: true,
    };
  }

  /**
   * Генерирует высококачественный случайный цвет
   */
  private static generateHighQualityRandomColor(accessibilityRequired: boolean): PremiumPaletteData {
    let color: chroma.Chroma;
    let attempts = 0;
    const maxAttempts = 50;

    do {
      attempts++;

      const hue = Math.random() * 360;
      const saturation = 0.3 + Math.random() * 0.7; // 30-100% насыщенность
      const lightness = 0.2 + Math.random() * 0.6; // 20-80% яркость

      color = chroma.hsl(hue, saturation, lightness);

      // Проверяем контраст для accessibility если требуется
      if (accessibilityRequired && !this.checkAccessibility(color)) {
        continue;
      }

      // Проверяем качество цвета
      if (this.calculateColorQuality(color) >= 60) {
        break;
      }

    } while (attempts < maxAttempts);

    const hex = color.hex().replace('#', '').toUpperCase();
    const [h] = color.hsl();

    // Определяем гармонию на основе hue
    let harmony: ColorHarmonyType = 'custom';
    if (h >= 0 && h < 60) harmony = 'analogous';
    else if (h >= 60 && h < 180) harmony = 'complementary';
    else if (h >= 180 && h < 300) harmony = 'triadic';
    else harmony = 'tetradic';

    return {
      name: `unlimited-${hex.toLowerCase()}`,
      value: hex,
      tags: ['unlimited', 'random', 'premium'],
      harmony,
      accessibility: this.checkAccessibility(color),
    };
  }

  /**
   * Вычисляет оценку качества палитры
   */
  private static calculateQualityScore(palette: PremiumPaletteData, currentValues: string[]): number {
    const color = chroma(`#${palette.value}`);

    const contrast = this.calculateContrastScore(color);
    const saturation = this.calculateSaturationScore(color);
    const harmony = this.calculateHarmonyScore(palette, currentValues);
    const accessibility = palette.accessibility ? 100 : this.checkAccessibility(color) ? 100 : 0;
    const uniqueness = this.calculateUniquenessScore(palette.value, currentValues);

    return Math.round(
      contrast * this.QUALITY_WEIGHTS.contrast +
      saturation * this.QUALITY_WEIGHTS.saturation +
      harmony * this.QUALITY_WEIGHTS.harmony +
      accessibility * this.QUALITY_WEIGHTS.accessibility +
      uniqueness * this.QUALITY_WEIGHTS.uniqueness
    );
  }

  /**
   * Вычисляет оценку контраста цвета
   */
  private static calculateContrastScore(color: chroma.Chroma): number {
    const whiteContrast = chroma.contrast(color, 'white');
    const blackContrast = chroma.contrast(color, 'black');

    // Идеальный контраст - 4.5 или выше для accessibility
    const bestContrast = Math.max(whiteContrast, blackContrast);
    return Math.min(bestContrast * 20, 100); // Нормализуем до 0-100
  }

  /**
   * Вычисляет оценку насыщенности цвета
   */
  private static calculateSaturationScore(color: chroma.Chroma): number {
    const [, s] = color.hsl();
    // Предпочитаем среднюю насыщенность (0.4-0.8)
    if (s >= 0.4 && s <= 0.8) return 100;
    if (s >= 0.2 && s <= 0.9) return 80;
    return s * 100;
  }

  /**
   * Вычисляет оценку гармонии с существующими цветами
   */
  private static calculateHarmonyScore(palette: PremiumPaletteData, currentValues: string[]): number {
    if (currentValues.length === 0) return 100;

    const newColor = chroma(`#${palette.value}`);
    let totalHarmony = 0;

    for (const existingValue of currentValues) {
      const existingColor = chroma(`#${existingValue}`);
      const harmony = this.calculateColorHarmony(newColor, existingColor);
      totalHarmony += harmony;
    }

    return totalHarmony / currentValues.length;
  }

  /**
   * Вычисляет гармонию между двумя цветами
   */
  private static calculateColorHarmony(color1: chroma.Chroma, color2: chroma.Chroma): number {
    const [h1] = color1.hsl();
    const [h2] = color2.hsl();

    const hueDiff = Math.min(Math.abs(h1 - h2), 360 - Math.abs(h1 - h2));

    // Гармоничные различия: 30°, 60°, 120°, 180°
    const harmonicAngles = [30, 60, 120, 180];
    let bestHarmony = 0;

    for (const angle of harmonicAngles) {
      const diff = Math.abs(hueDiff - angle);
      const harmony = Math.max(0, 100 - diff * 2); // Максимум 100 при точном совпадении
      bestHarmony = Math.max(bestHarmony, harmony);
    }

    return bestHarmony;
  }

  /**
   * Вычисляет оценку уникальности цвета
   */
  private static calculateUniquenessScore(value: string, currentValues: string[]): number {
    const newColor = chroma(`#${value}`);
    let minDistance = Infinity;

    for (const existingValue of currentValues) {
      const existingColor = chroma(`#${existingValue}`);
      const distance = chroma.deltaE(newColor, existingColor);
      minDistance = Math.min(minDistance, distance);
    }

    // Чем больше расстояние в цветовом пространстве, тем лучше уникальность
    return Math.min(minDistance * 10, 100);
  }

  /**
   * Вычисляет общее качество цвета
   */
  private static calculateColorQuality(color: chroma.Chroma): number {
    const contrast = this.calculateContrastScore(color);
    const saturation = this.calculateSaturationScore(color);

    return (contrast + saturation) / 2;
  }

  /**
   * Проверяет доступность цвета (WCAG контраст)
   */
  private static checkAccessibility(color: chroma.Chroma): boolean {
    const whiteContrast = chroma.contrast(color, 'white');
    const blackContrast = chroma.contrast(color, 'black');

    return Math.max(whiteContrast, blackContrast) >= 4.5;
  }

  /**
   * Возвращает резервную палитру если ничего не найдено
   */
  private static getFallbackPalette(style: string, currentValues: string[]): PremiumPaletteData {
    const fallbacks = {
      juicy: { name: 'juicy-fallback', value: 'FF4081', tags: ['fallback', 'juicy'] },
      pastel: { name: 'pastel-fallback', value: 'B5EAD7', tags: ['fallback', 'pastel'] },
      modern: { name: 'modern-fallback', value: '36454F', tags: ['fallback', 'modern'] },
      office: { name: 'office-fallback', value: '1E3A8A', tags: ['fallback', 'office'] },
      unlimited: { name: 'unlimited-fallback', value: '3B82F6', tags: ['fallback', 'unlimited'] },
    };

    const fallback = fallbacks[style as keyof typeof fallbacks] || fallbacks.juicy;

    // Убеждаемся что fallback уникален
    if (currentValues.includes(fallback.value.toUpperCase())) {
      return { ...fallback, value: '10B981' }; // Зеленый fallback
    }

    return fallback;
  }

  /**
   * Генерирует градиент на основе палитры
   */
  static generateGradient(palette: PaletteConfig, type: 'linear' | 'radial' | 'conic' = 'linear'): string {
    if (!palette.swatches || palette.swatches.length < 2) {
      return `linear-gradient(90deg, #${palette.value}, #${palette.value})`;
    }

    // Выбираем ключевые цвета для градиента
    const stops = [100, 300, 500, 700, 900].map(stop =>
      palette.swatches.find(s => s.stop === stop)
    ).filter(Boolean);

    if (stops.length < 2) {
      // Fallback к базовому цвету
      return `linear-gradient(90deg, #${palette.value}, #${palette.value})`;
    }

    const gradientStops = stops.map((stop, index) => {
      const position = Math.round((index / (stops.length - 1)) * 100);
      return `#${stop!.hex} ${position}%`;
    }).join(', ');

    switch (type) {
      case 'radial':
        return `radial-gradient(circle, ${gradientStops})`;
      case 'conic':
        return `conic-gradient(from 0deg, ${gradientStops})`;
      default:
        return `linear-gradient(90deg, ${gradientStops})`;
    }
  }

  /**
   * Оптимизирует палитру для accessibility (WCAG 2.1 AA)
   */
  static optimizeForAccessibility(palette: PaletteConfig): PaletteConfig {
    const optimized = { ...palette };

    if (!optimized.swatches) return optimized;

    // Проверяем и корректируем контраст для текстовых цветов
    optimized.swatches = optimized.swatches.map(swatch => {
      const color = chroma(`#${swatch.hex}`);
      const whiteContrast = chroma.contrast(color, 'white');
      const blackContrast = chroma.contrast(color, 'black');

      // Если контраст недостаточный, корректируем яркость
      if (Math.max(whiteContrast, blackContrast) < 4.5) {
        const [h, s, l] = color.hsl();
        let newL;

        if (l > 0.5) {
          // Светлый цвет - делаем темнее для лучшего контраста
          newL = Math.max(0.2, l - 0.3);
        } else {
          // Темный цвет - делаем светлее для лучшего контраста
          newL = Math.min(0.8, l + 0.3);
        }

        const optimizedColor = chroma.hsl(h, s, newL);
        return {
          ...swatch,
          hex: optimizedColor.hex().replace('#', '').toUpperCase(),
        };
      }

      return swatch;
    });

    optimized.accessibility = true;
    return optimized;
  }

  /**
   * Генерирует цветовую гармонию на основе базового цвета
   */
  static generateColorHarmony(
    baseColor: string,
    harmonyType: ColorHarmonyType,
    count: number = 3
  ): string[] {
    const base = chroma(`#${baseColor}`);
    const [h, s, l] = base.hsl();
    const colors: string[] = [baseColor];

    switch (harmonyType) {
      case 'analogous':
        // Аналогичные цвета (соседние на цветовом круге)
        for (let i = 1; i < count; i++) {
          const newHue = (h + i * 30) % 360;
          colors.push(chroma.hsl(newHue, s, l).hex().replace('#', '').toUpperCase());
        }
        break;

      case 'complementary':
        // Комплементарные цвета (противоположные на цветовом круге)
        const compHue = (h + 180) % 360;
        colors.push(chroma.hsl(compHue, s, l).hex().replace('#', '').toUpperCase());
        if (count > 2) {
          // Добавляем split-complementary
          colors.push(chroma.hsl((compHue + 30) % 360, s, l).hex().replace('#', '').toUpperCase());
        }
        break;

      case 'triadic':
        // Триадные цвета (равноудаленные на цветовом круге)
        colors.push(chroma.hsl((h + 120) % 360, s, l).hex().replace('#', '').toUpperCase());
        colors.push(chroma.hsl((h + 240) % 360, s, l).hex().replace('#', '').toUpperCase());
        break;

      case 'tetradic':
        // Тетрадные цвета (квадрат на цветовом круге)
        colors.push(chroma.hsl((h + 90) % 360, s, l).hex().replace('#', '').toUpperCase());
        colors.push(chroma.hsl((h + 180) % 360, s, l).hex().replace('#', '').toUpperCase());
        colors.push(chroma.hsl((h + 270) % 360, s, l).hex().replace('#', '').toUpperCase());
        break;

      case 'split-complementary':
        // Split-комплементарные цвета
        const splitHue = (h + 180) % 360;
        colors.push(chroma.hsl((splitHue - 30) % 360, s, l).hex().replace('#', '').toUpperCase());
        colors.push(chroma.hsl((splitHue + 30) % 360, s, l).hex().replace('#', '').toUpperCase());
        break;

      default:
        // Monochromatic - разные оттенки одного цвета
        for (let i = 1; i < count; i++) {
          const newLightness = Math.max(0.1, Math.min(0.9, l + (i - count/2) * 0.2));
          colors.push(chroma.hsl(h, s, newLightness).hex().replace('#', '').toUpperCase());
        }
    }

    return colors.slice(0, count);
  }

  /**
   * Создает премиум палитру с несколькими гармоничными цветами
   */
  static createHarmonyPalette(
    baseColor: string,
    harmonyType: ColorHarmonyType,
    style: string
  ): PremiumPaletteData[] {
    const harmonyColors = this.generateColorHarmony(baseColor, harmonyType, 3);
    const baseData = this.getBaseCollection(style.toLowerCase() as any).find(p =>
      p.value.toUpperCase() === baseColor.toUpperCase()
    );

    return harmonyColors.map((color, index) => ({
      name: index === 0 ? (baseData?.name || `${style}-harmony-${index}`) : `${style}-harmony-${index}`,
      value: color,
      tags: ['harmony', harmonyType, style, ...(baseData?.tags || [])],
      harmony: harmonyType,
      accessibility: this.checkAccessibility(chroma(`#${color}`)),
    }));
  }

  /**
   * Создает полный конфиг палитры из премиум данных
   */
  static createPaletteConfig(
    premiumData: PremiumPaletteData,
    generationMode: GenerationMode,
    stylePreset: any
  ): PaletteConfig {
    const baseColor = chroma(`#${premiumData.value}`);
    const [h, s, l] = baseColor.hsl();

    // Адаптируем параметры под стиль
    let sModifier = 0;
    let lMin = 5;
    let lMax = 95;

    switch (stylePreset.contrast) {
      case 'high':
        sModifier = 20;
        lMin = 5;
        lMax = 95;
        break;
      case 'medium':
        sModifier = 10;
        lMin = 8;
        lMax = 92;
        break;
      case 'low':
        sModifier = -10;
        lMin = 15;
        lMax = 98;
        break;
      default:
        sModifier = Math.floor(Math.random() * 40) - 20;
        lMin = Math.max(0, Math.floor(l * 100 - 40));
        lMax = Math.min(100, Math.floor(l * 100 + 30));
    }

    return {
      id: `premium-${premiumData.name}-${Date.now()}`,
      name: premiumData.name,
      value: premiumData.value,
      valueStop: 500,
      swatches: [], // Будет заполнено createSwatches
      colorMode: 'perceived',
      h: 0,
      s: sModifier,
      lMin,
      lMax,
      mode: 'oklch',
      stopSelection: 'auto',
      generationMode,
      temperature: stylePreset.temperature,
      contrast: stylePreset.contrast,
      accessibility: premiumData.accessibility,
      description: stylePreset.description,
      tags: premiumData.tags,
      premiumFeatures: stylePreset.premiumFeatures,
      qualityScore: premiumData.qualityScore,
      colorHarmony: premiumData.harmony,
      gradientSupport: true,
    };
  }
}