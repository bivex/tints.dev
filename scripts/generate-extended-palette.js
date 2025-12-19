#!/usr/bin/env node

/**
 * CLI tool for generating extended Tailwind palette configurations
 * Usage: node generate-extended-palette.js <palette-name> [base-color]
 */

const { generateExtendedPalette, generateTailwindConfig } = require('../dist/lib/generateExtendedPalette.js');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node generate-extended-palette.js <palette-name> [base-color]');
  console.log('Example: node generate-extended-palette.js pastel-analogous-2 #8B8B8B');
  process.exit(1);
}

const paletteName = args[0];
const baseColor = args[1] || '#8B8B8B'; // Default to gray

try {
  console.log(`Generating extended palette: ${paletteName}`);
  console.log(`Base color: ${baseColor}`);
  console.log('='.repeat(50));

  const extendedPalette = generateExtendedPalette(paletteName, baseColor);
  const tailwindConfig = generateTailwindConfig(paletteName, baseColor);

  console.log('\n=== EXTENDED PALETTE OBJECT ===');
  console.log(JSON.stringify(extendedPalette, null, 2));

  console.log('\n=== TAILWIND CONFIG ===');
  console.log(tailwindConfig);

  console.log('\n=== USAGE EXAMPLES ===');
  console.log(`// Basic colors`);
  console.log(`bg-${paletteName}-500`);
  console.log(`text-${paletteName}-700`);
  console.log('');
  console.log(`// UI States`);
  console.log(`hover:bg-${paletteName}-ui-hover-500`);
  console.log(`focus:bg-${paletteName}-ui-focus-500`);
  console.log(`disabled:bg-${paletteName}-ui-disabled-500`);
  console.log('');
  console.log(`// Variants`);
  console.log(`bg-${paletteName}-light-400`);
  console.log(`bg-${paletteName}-dark-600`);
  console.log(`bg-${paletteName}-accent-500`);
  console.log('');
  console.log(`// Gradients`);
  console.log(`bg-${paletteName}-gradient-primary`);
  console.log(`bg-${paletteName}-gradient-secondary`);
  console.log('');
  console.log(`// Shadows`);
  console.log(`shadow-${paletteName}-sm`);
  console.log(`shadow-${paletteName}-md`);
  console.log(`shadow-${paletteName}-lg`);

} catch (error) {
  console.error('Error generating palette:', error.message);
  process.exit(1);
}