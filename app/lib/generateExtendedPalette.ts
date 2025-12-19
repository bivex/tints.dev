import chroma from "chroma-js";

/**
 * Расширенная генерация палитры с дополнительными настройками для UI
 */
export function generateExtendedPalette(paletteName: string, baseColor: string) {
  const base = chroma(baseColor);

  // Генерируем основную шкалу
  const scale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const colors: Record<string, string> = {};

  // Создаем основную шкалу цветов
  scale.forEach(stop => {
    const lightness = 1 - (stop / 1000); // Конвертируем в 0-1 диапазон
    const saturation = Math.max(0.02, Math.min(0.15, 0.08 + Math.sin(stop / 100) * 0.05)); // Низкая насыщенность для pastel

    const color = chroma.oklch(lightness, saturation, base.get('hsl.h'));
    colors[stop.toString()] = color.oklch().join(' ');
  });

  // Генерируем дополнительные UI настройки
  const extendedConfig = {
    // Основная палитра
    [paletteName]: colors,

    // UI состояния
    ui: {
      // Hover состояния (немного темнее)
      hover: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const hoverColor = chroma.oklch(Math.max(0, l - 0.05), c, h);
          return [stop, hoverColor.oklch().join(' ')];
        })
      ),

      // Active состояния (еще темнее)
      active: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const activeColor = chroma.oklch(Math.max(0, l - 0.1), c, h);
          return [stop, activeColor.oklch().join(' ')];
        })
      ),

      // Focus состояния (с повышенной насыщенностью)
      focus: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const focusColor = chroma.oklch(l, Math.min(0.3, c + 0.05), h);
          return [stop, focusColor.oklch().join(' ')];
        })
      ),

      // Disabled состояния (очень светлые и бледные)
      disabled: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const disabledColor = chroma.oklch(Math.min(0.95, l + 0.1), c * 0.3, h);
          return [stop, disabledColor.oklch().join(' ')];
        })
      ),
    },

    // Дополнительные вариации
    variants: {
      // Светлая версия (pastel-light)
      light: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const lightColor = chroma.oklch(Math.min(0.95, l + 0.1), c * 0.8, h);
          return [stop, lightColor.oklch().join(' ')];
        })
      ),

      // Темная версия (pastel-dark)
      dark: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const darkColor = chroma.oklch(Math.max(0.1, l - 0.2), c * 1.2, h);
          return [stop, darkColor.oklch().join(' ')];
        })
      ),

      // Акцентная версия (pastel-accent)
      accent: Object.fromEntries(
        Object.entries(colors).map(([stop, color]) => {
          const [l, c, h] = color.split(' ').map(Number);
          const accentColor = chroma.oklch(l, Math.min(0.25, c + 0.1), (h + 30) % 360);
          return [stop, accentColor.oklch().join(' ')];
        })
      ),
    },

    // Градиенты
    gradients: {
      primary: `linear-gradient(135deg, oklch(${colors['400']}), oklch(${colors['600']}))`,
      secondary: `linear-gradient(135deg, oklch(${colors['300']}), oklch(${colors['500']}))`,
      accent: `linear-gradient(135deg, oklch(${colors['200']}), oklch(${colors['700']}))`,
      subtle: `linear-gradient(135deg, oklch(${colors['100']}), oklch(${colors['300']}))`,
    },

    // Тени
    shadows: {
      sm: `0 1px 2px 0 oklch(${colors['500']} / 0.05)`,
      base: `0 1px 3px 0 oklch(${colors['500']} / 0.1), 0 1px 2px -1px oklch(${colors['500']} / 0.1)`,
      md: `0 4px 6px -1px oklch(${colors['500']} / 0.1), 0 2px 4px -2px oklch(${colors['500']} / 0.1)`,
      lg: `0 10px 15px -3px oklch(${colors['500']} / 0.1), 0 4px 6px -4px oklch(${colors['500']} / 0.1)`,
      xl: `0 20px 25px -5px oklch(${colors['500']} / 0.1), 0 8px 10px -6px oklch(${colors['500']} / 0.1)`,
    },

    // Прозрачности для разных состояний
    alpha: {
      '10': `oklch(${colors['500']} / 0.1)`,
      '20': `oklch(${colors['500']} / 0.2)`,
      '30': `oklch(${colors['500']} / 0.3)`,
      '40': `oklch(${colors['500']} / 0.4)`,
      '50': `oklch(${colors['500']} / 0.5)`,
      '60': `oklch(${colors['500']} / 0.6)`,
      '70': `oklch(${colors['500']} / 0.7)`,
      '80': `oklch(${colors['500']} / 0.8)`,
      '90': `oklch(${colors['500']} / 0.9)`,
    }
  };

  return extendedConfig;
}

/**
 * Генерирует полную конфигурацию Tailwind для расширенной палитры
 */
export function generateTailwindConfig(paletteName: string, baseColor: string): string {
  const extendedPalette = generateExtendedPalette(paletteName, baseColor);

  const config = {
    theme: {
      extend: {
        colors: {
          [paletteName]: extendedPalette[paletteName],
          [`${paletteName}-ui`]: extendedPalette.ui,
          [`${paletteName}-light`]: extendedPalette.variants.light,
          [`${paletteName}-dark`]: extendedPalette.variants.dark,
          [`${paletteName}-accent`]: extendedPalette.variants.accent,
        },
        backgroundImage: {
          [`${paletteName}-gradient-primary`]: extendedPalette.gradients.primary,
          [`${paletteName}-gradient-secondary`]: extendedPalette.gradients.secondary,
          [`${paletteName}-gradient-accent`]: extendedPalette.gradients.accent,
          [`${paletteName}-gradient-subtle`]: extendedPalette.gradients.subtle,
        },
        boxShadow: {
          [`${paletteName}-sm`]: extendedPalette.shadows.sm,
          [`${paletteName}-base`]: extendedPalette.shadows.base,
          [`${paletteName}-md`]: extendedPalette.shadows.md,
          [`${paletteName}-lg`]: extendedPalette.shadows.lg,
          [`${paletteName}-xl`]: extendedPalette.shadows.xl,
        },
        backgroundColor: {
          [`${paletteName}-alpha-10`]: extendedPalette.alpha['10'],
          [`${paletteName}-alpha-20`]: extendedPalette.alpha['20'],
          [`${paletteName}-alpha-30`]: extendedPalette.alpha['30'],
          [`${paletteName}-alpha-40`]: extendedPalette.alpha['40'],
          [`${paletteName}-alpha-50`]: extendedPalette.alpha['50'],
          [`${paletteName}-alpha-60`]: extendedPalette.alpha['60'],
          [`${paletteName}-alpha-70`]: extendedPalette.alpha['70'],
          [`${paletteName}-alpha-80`]: extendedPalette.alpha['80'],
          [`${paletteName}-alpha-90`]: extendedPalette.alpha['90'],
        }
      },
    },
  };

  return `// Extended ${paletteName} palette configuration
// Generated for comprehensive UI design system

module.exports = ${JSON.stringify(config, null, 2)};`;
}