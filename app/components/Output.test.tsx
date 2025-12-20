/**
 * Tests for Output component helper functions
 */

import { describe, it, expect } from 'vitest';
import { generateSemanticColors, generateDesignTokens, createTestPalette } from '~/lib/outputUtils';

describe('Output Component Helper Functions', () => {
  describe('generateSemanticColors', () => {
    it('should return empty string when no palettes provided', () => {
      const result = generateSemanticColors([], 'light', 'oklch');
      expect(result).toBe('');
    });

    it('should return empty string when palette array is empty', () => {
      const result = generateSemanticColors([], 'dark', 'oklch');
      expect(result).toBe('');
    });

    it('should generate semantic colors for light theme', () => {
      const testPalette = createTestPalette();
      const result = generateSemanticColors([testPalette], 'light', 'oklch');

      expect(result).toContain('Semantic Color System (light theme)');
      expect(result).toContain('--color-background: #ffffff');
      expect(result).toContain('--color-surface: #f8fafc');
      expect(result).toContain('--color-text-primary: #0f172a');
      expect(result).toContain('--color-primary:');
      expect(result).toContain(':root {');
    });

    it('should generate semantic colors for dark theme', () => {
      const testPalette = createTestPalette();
      const result = generateSemanticColors([testPalette], 'dark', 'oklch');

      expect(result).toContain('Semantic Color System (dark theme)');
      expect(result).toContain('--color-background: #0f172a');
      expect(result).toContain('--color-surface: #1e293b');
      expect(result).toContain('--color-text-primary: #f8fafc');
      expect(result).toContain('--color-primary:');
    });

    it('should generate semantic colors for auto theme', () => {
      const testPalette = createTestPalette();
      const result = generateSemanticColors([testPalette], 'auto', 'oklch');

      expect(result).toContain('Semantic Color System (universal theme)');
    });

    it('should use fallback colors when shades are missing', () => {
      const incompletePalette = {
        ...createTestPalette(),
        swatches: [
          { stop: 100, hex: '#dbeafe', h: 214, hScale: -50, s: 95, sScale: -5, l: 90 },
          { stop: 500, hex: '#3b82f6', h: 214, hScale: -50, s: 78, sScale: -22, l: 50 },
        ]
      };

      const result = generateSemanticColors([incompletePalette], 'light', 'oklch');

      // Should use fallback colors when specific shades are missing
      expect(result).toContain('--color-accent:');
      expect(result).toContain('--color-primary:');
    });

    it('should generate valid CSS with all required color roles', () => {
      const testPalette = createTestPalette();
      const result = generateSemanticColors([testPalette], 'light', 'oklch');

      // Check for all semantic color roles
      const requiredRoles = [
        'background', 'surface', 'surface-hover', 'border', 'border-hover',
        'text-primary', 'text-secondary', 'text-tertiary', 'text-disabled',
        'primary', 'primary-hover', 'primary-active', 'primary-contrast',
        'success', 'success-hover', 'warning', 'warning-hover',
        'error', 'error-hover', 'info', 'info-hover',
        'accent', 'accent-hover', 'disabled', 'disabled-text'
      ];

      requiredRoles.forEach(role => {
        expect(result).toContain(`--color-${role}:`);
      });
    });

    it('should handle different color modes', () => {
      const testPalette = createTestPalette();
      const resultOklch = generateSemanticColors([testPalette], 'light', 'oklch');
      const resultHex = generateSemanticColors([testPalette], 'light', 'hex');

      expect(resultOklch).toContain('oklch(from');
      expect(resultHex).not.toContain('oklch(from');
    });
  });

  describe('generateDesignTokens', () => {
    it('should return empty string when no palettes provided', () => {
      const result = generateDesignTokens([], 'light', 'oklch');
      expect(result).toBe('');
    });

    it('should generate valid JSON design tokens', () => {
      const testPalette = createTestPalette();
      const result = generateDesignTokens([testPalette], 'light', 'oklch');

      expect(() => JSON.parse(result)).not.toThrow();

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('name');
      expect(parsed).toHaveProperty('theme');
      expect(parsed).toHaveProperty('version');
      expect(parsed).toHaveProperty('tokens');

      expect(parsed.tokens).toHaveProperty('palette');
      expect(parsed.tokens).toHaveProperty('semantic');
      expect(parsed.tokens).toHaveProperty('components');
    });

    it('should include palette information in tokens', () => {
      const testPalette = createTestPalette();
      const result = generateDesignTokens([testPalette], 'light', 'oklch');
      const parsed = JSON.parse(result);

      expect(parsed.name).toBe('Test Palette Design Tokens');
      expect(parsed.theme).toBe('light');
      expect(parsed.tokens.palette).toHaveProperty('500');
    });

    it('should generate component-specific tokens', () => {
      const testPalette = createTestPalette();
      const result = generateDesignTokens([testPalette], 'dark', 'oklch');
      const parsed = JSON.parse(result);

      expect(parsed.tokens.components).toHaveProperty('button');
      expect(parsed.tokens.components.button).toHaveProperty('primary');
      expect(parsed.tokens.components.button.primary).toHaveProperty('background');
      expect(parsed.tokens.components.button.primary).toHaveProperty('hover');
      expect(parsed.tokens.components.button.primary).toHaveProperty('active');
      expect(parsed.tokens.components.button.primary).toHaveProperty('text');
    });
  });

  describe('createTestPalette', () => {
    it('should create a valid palette with all required properties', () => {
      const palette = createTestPalette();

      expect(palette).toHaveProperty('id');
      expect(palette).toHaveProperty('name');
      expect(palette).toHaveProperty('value');
      expect(palette).toHaveProperty('swatches');
      expect(Array.isArray(palette.swatches)).toBe(true);
      expect(palette.swatches.length).toBeGreaterThan(0);
    });

    it('should have swatches with required properties', () => {
      const palette = createTestPalette();
      const firstSwatch = palette.swatches[0];

      expect(firstSwatch).toHaveProperty('stop');
      expect(firstSwatch).toHaveProperty('hex');
      expect(firstSwatch).toHaveProperty('h');
      expect(firstSwatch).toHaveProperty('s');
      expect(firstSwatch).toHaveProperty('l');
    });
  });
});
