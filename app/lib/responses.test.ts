import { createAdobePremiumPalette } from './responses';
import { STYLE_PRESETS } from './constants';

describe('Adobe Premium Palette Generation', () => {
  it('should generate a palette with modern style preset', () => {
    const palette = createAdobePremiumPalette();

    // Check that palette has required properties
    expect(palette).toHaveProperty('name');
    expect(palette).toHaveProperty('value');
    expect(palette).toHaveProperty('swatches');
    expect(palette.swatches.length).toBeGreaterThan(0);

    // Check that it uses modern style settings
    expect(palette.temperature).toBe(STYLE_PRESETS.modern.temperature);
    expect(palette.generationMode).toBe('curated');
  });

  it('should generate different palettes on multiple calls', () => {
    const palette1 = createAdobePremiumPalette();
    const palette2 = createAdobePremiumPalette();

    // Palettes should be different (though there's a small chance they could be the same)
    expect(palette1.value !== palette2.value || palette1.name !== palette2.name).toBeTruthy();
  });

  it('should exclude current values when provided', () => {
    const existingPalette = createAdobePremiumPalette();
    const currentValues = [existingPalette.value];

    const newPalette = createAdobePremiumPalette(currentValues);

    // New palette should not have the same value as existing
    expect(newPalette.value.toUpperCase()).not.toBe(existingPalette.value.toUpperCase());
  });
});