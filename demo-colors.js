#!/usr/bin/env node

/**
 * Демонстрация улучшенного вывода цветов для Tailwind CSS
 */

const colors = {
  brand: {
    50: 'rgb(247, 254, 231)',
    100: 'rgb(236, 252, 203)',
    200: 'rgb(217, 249, 157)',
    300: 'rgb(190, 242, 100)',
    400: 'rgb(163, 230, 53)',
    500: 'rgb(132, 204, 22)',
    600: 'rgb(101, 163, 13)',
    700: 'rgb(77, 124, 15)',
    800: 'rgb(63, 98, 18)',
    900: 'rgb(54, 83, 20)',
  },
  neutral: {
    0: 'rgb(255, 255, 255)',
    50: 'rgb(250, 250, 250)',
    100: 'rgb(245, 245, 245)',
    200: 'rgb(229, 229, 229)',
    300: 'rgb(212, 212, 212)',
    400: 'rgb(163, 163, 163)',
    500: 'rgb(115, 115, 115)',
    600: 'rgb(82, 82, 82)',
    700: 'rgb(64, 64, 64)',
    800: 'rgb(38, 38, 38)',
    900: 'rgb(23, 23, 23)',
    950: 'rgb(10, 10, 10)',
  },
};

function formatVersion3Output(colors) {
  const output = [`// Copy and paste this into your tailwind.config.js`, `module.exports = {`, `  theme: {`, `    extend: {`, `      colors: {`];

  Object.entries(colors).forEach(([paletteName, shades], index) => {
    output.push(`        "${paletteName}": {`);
    Object.entries(shades).forEach(([shade, value]) => {
      const isLast = index === Object.keys(colors).length - 1 &&
                    shade === Object.keys(shades).pop();
      const comma = isLast ? '' : ',';
      output.push(`          ${shade}: "${value}"${comma}`);
    });
    const isLastPalette = index === Object.keys(colors).length - 1;
    const comma = isLastPalette ? '' : ',';
    output.push(`        }${comma}`);
  });

  output.push(`      },`, `    },`, `  },`, `};`);

  return output.join('\n');
}

function formatVersion4Output(colors) {
  const output = [`/* Copy and paste this into your CSS file with Tailwind CSS v4 */`, `@theme {`];

  Object.entries(colors).forEach(([colorName, shades]) => {
    output.push(`  /* ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} colors */`);
    Object.entries(shades).forEach(([shade, value]) => {
      output.push(`  --color-${colorName}-${shade}: ${value};`);
    });
    output.push(""); // Empty line between palettes
  });

  output.push(`}`);

  return output.join('\n');
}

console.log('=== УЛУЧШЕННЫЙ ВЫВОД ЦВЕТОВ ДЛЯ TAILWIND CSS ===\n');

console.log('📋 ВЕРСИЯ 3 (tailwind.config.js):');
console.log('─'.repeat(50));
console.log(formatVersion3Output(colors));
console.log('\n');

console.log('📋 ВЕРСИЯ 4 (@theme в CSS):');
console.log('─'.repeat(50));
console.log(formatVersion4Output(colors));
console.log('\n');

console.log('✨ УЛУЧШЕНИЯ:');
console.log('• Красивый форматированный вывод с комментариями');
console.log('• Четкая структура для легкого копирования');
console.log('• Комментарии для каждой палитры цветов');
console.log('• Правильные отступы и форматирование');
console.log('• Кнопка копирования с визуальной обратной связью');
console.log('• Поддержка как v3, так и v4 Tailwind CSS');
