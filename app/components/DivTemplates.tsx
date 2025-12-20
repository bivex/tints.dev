/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-20T15:30:00
 * Last Updated: 2025-12-20T15:30:00
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import React, { useState } from "react";
import type { PaletteConfig } from "~/types";
import { Button } from "~/components/catalyst/button";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  RectangleStackIcon,
  BoltIcon,
  EyeIcon,
  CubeIcon,
  ArrowPathIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon as ClipboardDocumentIconSolid } from "@heroicons/react/24/solid";

interface DivTemplatesProps {
  palette: PaletteConfig;
  isDarkMode?: boolean;
}

interface Template {
  name: string;
  code: string;
  preview: React.ReactElement;
}

// Template categories based on popular patterns
const TEMPLATE_CATEGORIES = {
  flexbox: {
    name: "Flexbox Layouts",
    icon: RectangleStackIcon,
    description: "Common flexbox patterns for layouts"
  },
  spacing: {
    name: "Spacing & Layout",
    icon: CubeIcon,
    description: "Spacing utilities and layout helpers"
  },
  cards: {
    name: "Cards & Containers",
    icon: PaintBrushIcon,
    description: "Card designs and container patterns"
  },
  status: {
    name: "Status Indicators",
    icon: BoltIcon,
    description: "Status dots, badges, and indicators"
  },
  skeleton: {
    name: "Skeleton Loaders",
    icon: ArrowPathIcon,
    description: "Loading states and skeleton patterns"
  },
  gradients: {
    name: "Gradients & Backgrounds",
    icon: EyeIcon,
    description: "Gradient backgrounds and visual effects"
  }
};

// Generate color classes from palette
const generateColorClasses = (palette: PaletteConfig, isDarkMode: boolean = false) => {
  const colors = palette.swatches.map((swatch, index) => ({
    class: `bg-first-${swatch.stop}`,
    hex: swatch.hex,
    index
  }));

  // Add neutral colors for common patterns
  const neutralColors = isDarkMode
    ? ['bg-gray-800', 'bg-gray-700', 'bg-gray-600', 'bg-gray-500']
    : ['bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300'];

  return { paletteColors: colors, neutralColors };
};

// Template generators
const generateFlexboxTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { paletteColors, neutralColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Centered Flex Container",
      code: `<div class="flex-1 flex flex-col items-center">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80px] bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
          Centered
        </div>
      )
    },
    {
      name: "Horizontal Layout with Space",
      code: `<div class="flex items-center space-x-3">\n  <!-- Items -->\n</div>`,
      preview: (
        <div className="flex items-center space-x-3 min-h-[40px] bg-gray-200 dark:bg-gray-700 rounded p-2">
          <div className={`w-4 h-4 ${paletteColors[0]?.class || 'bg-blue-500'} rounded`}></div>
          <div className={`w-4 h-4 ${paletteColors[1]?.class || 'bg-green-500'} rounded`}></div>
          <div className={`w-4 h-4 ${paletteColors[2]?.class || 'bg-purple-500'} rounded`}></div>
        </div>
      )
    },
    {
      name: "Justified Layout",
      code: `<div class="flex justify-between">\n  <!-- Left content -->\n  <!-- Right content -->\n</div>`,
      preview: (
        <div className="flex justify-between items-center min-h-[40px] bg-gray-300 dark:bg-gray-600 rounded p-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Left</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">Right</span>
        </div>
      )
    },
    {
      name: "Responsive Flex Grid",
      code: `<div class="flex flex-wrap items-center gap-4 mt-4">\n  <!-- Items -->\n</div>`,
      preview: (
        <div className="flex flex-wrap items-center gap-2 mt-2 min-h-[60px] bg-gray-100 dark:bg-gray-800 rounded p-2">
          <div className={`w-6 h-6 ${paletteColors[0]?.class || 'bg-red-500'} rounded-full`}></div>
          <div className={`w-6 h-6 ${paletteColors[1]?.class || 'bg-blue-500'} rounded-full`}></div>
          <div className={`w-6 h-6 ${paletteColors[2]?.class || 'bg-green-500'} rounded-full`}></div>
          <div className={`w-6 h-6 ${paletteColors[3]?.class || 'bg-purple-500'} rounded-full`}></div>
        </div>
      )
    }
  ];
};

const generateSpacingTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { neutralColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Vertical Spacing Container",
      code: `<div class="space-y-3">\n  <!-- Items -->\n</div>`,
      preview: (
        <div className="space-y-2 min-h-[80px] bg-gray-100 dark:bg-gray-800 rounded p-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      )
    },
    {
      name: "Responsive Layout",
      code: `<div class="flex-1 min-w-0">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="flex-1 min-w-0 min-h-[40px] bg-gray-200 dark:bg-gray-700 rounded border text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
          Responsive
        </div>
      )
    },
    {
      name: "Text Right Alignment",
      code: `<div class="text-right">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="text-right min-h-[40px] bg-gray-300 dark:bg-gray-600 rounded p-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">Right aligned</span>
        </div>
      )
    },
    {
      name: "Center Container",
      code: `<div class="text-center space-y-6">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="text-center space-y-4 min-h-[100px] bg-gray-100 dark:bg-gray-800 rounded p-2">
          <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block">Centered</span>
        </div>
      )
    }
  ];
};

const generateCardTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { paletteColors, neutralColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Basic Card",
      code: `<div class="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm h-full">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 p-4 rounded-xl shadow-sm min-h-[80px] flex flex-col justify-center">
          <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )
    },
    {
      name: "Colored Card",
      code: `<div class="bg-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-50 p-6 rounded-2xl border border-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-200">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className={`bg-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-50 dark:bg-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-900/20 p-4 rounded-xl border border-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-200 dark:border-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-700 min-h-[80px] flex flex-col justify-center`}>
          <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )
    },
    {
      name: "Premium Card",
      code: `<div class="bg-white rounded-3xl p-8 border border-neutral-200 shadow-lg">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-neutral-200 dark:border-gray-700 shadow-lg min-h-[80px] flex flex-col justify-center relative">
          <div className={`absolute top-2 right-2 w-2 h-2 ${paletteColors[0]?.class || 'bg-yellow-500'} rounded-full`}></div>
          <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="w-4/5 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      )
    },
    {
      name: "Avatar Card",
      code: `<div class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200">\n  <!-- Content -->\n</div>`,
      preview: (
        <div className="bg-neutral-50 dark:bg-gray-700 p-4 rounded-xl border border-neutral-200 dark:border-gray-600 min-h-[80px] flex items-center space-x-3">
          <div className={`w-12 h-12 ${paletteColors[0]?.class || 'bg-gradient-to-r from-blue-500 to-purple-500'} rounded-full`}></div>
          <div className="flex-1 space-y-2">
            <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-2/3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      )
    }
  ];
};

const generateStatusTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { paletteColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Status Dot",
      code: `<div class="w-2 h-2 bg-${paletteColors[0]?.class?.replace('bg-', '') || 'green'}-500 rounded-full animate-pulse"></div>`,
      preview: (
        <div className="flex items-center space-x-2 p-2">
          <div className={`w-2 h-2 ${paletteColors[0]?.class || 'bg-green-500'} rounded-full animate-pulse`}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Active</span>
        </div>
      )
    },
    {
      name: "Avatar with Status",
      code: `<div class="w-6 h-6 bg-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-500 rounded-full border-2 border-white"></div>`,
      preview: (
        <div className="flex items-center space-x-2 p-2">
          <div className={`w-6 h-6 ${paletteColors[0]?.class || 'bg-blue-500'} rounded-full border-2 border-white dark:border-gray-800`}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
        </div>
      )
    },
    {
      name: "Progress Indicator",
      code: `<div class="w-3 h-3 bg-${paletteColors[1]?.class?.replace('bg-', '') || 'yellow'}-500 rounded-full"></div>`,
      preview: (
        <div className="flex items-center space-x-2 p-2">
          <div className={`w-3 h-3 ${paletteColors[1]?.class || 'bg-yellow-500'} rounded-full`}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Pending</span>
        </div>
      )
    },
    {
      name: "Gentle Aura Badge",
      code: `<div class="w-12 h-12 bg-gradient-to-r from-Gentle-Aura-400 to-Gentle-Aura-600 rounded-full flex items-center justify-center"></div>`,
      preview: (
        <div className="flex items-center space-x-2 p-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">GA</span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Gentle Aura</span>
        </div>
      )
    }
  ];
};

const generateSkeletonTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { neutralColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Skeleton Rectangle",
      code: `<div class="h-3 bg-neutral-200 rounded w-20"></div>`,
      preview: (
        <div className="space-y-2 p-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
        </div>
      )
    },
    {
      name: "Skeleton Circle",
      code: `<div class="w-6 h-6 bg-neutral-200 rounded-full"></div>`,
      preview: (
        <div className="flex items-center space-x-2 p-2">
          <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        </div>
      )
    },
    {
      name: "Card Skeleton",
      code: `<div class="w-full bg-neutral-200 rounded-t-lg mb-2 h-40"></div>`,
      preview: (
        <div className="max-w-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-2 space-y-2 animate-pulse">
          <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-t-lg h-20"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      )
    },
    {
      name: "Avatar Skeleton",
      code: `<div class="w-20 h-20 bg-neutral-200 rounded-full mx-auto mb-3"></div>`,
      preview: (
        <div className="flex flex-col items-center space-y-2 p-2">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
        </div>
      )
    }
  ];
};

const generateGradientTemplates = (palette: PaletteConfig, isDarkMode: boolean): Template[] => {
  const { paletteColors } = generateColorClasses(palette, isDarkMode);

  return [
    {
      name: "Linear Gradient",
      code: `<div class="bg-linear-to-r from-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-400 to-${paletteColors[1]?.class?.replace('bg-', '') || 'purple'}-600"></div>`,
      preview: (
        <div className={`w-full h-12 bg-linear-to-r from-${paletteColors[0]?.class?.replace('bg-', '') || 'blue'}-400 to-${paletteColors[1]?.class?.replace('bg-', '') || 'purple'}-600 rounded-lg`}></div>
      )
    },
    {
      name: "Brand Gradient",
      code: `<div class="w-full bg-${paletteColors[0]?.class?.replace('bg-', '') || 'brand'}-500 rounded-t-lg mb-2" style="height: 100%"></div>`,
      preview: (
        <div className={`w-full h-16 ${paletteColors[0]?.class || 'bg-blue-500'} rounded-t-lg mb-2`}></div>
      )
    },
    {
      name: "Gentle Aura Gradient",
      code: `<div class="w-12 h-12 bg-gradient-to-r from-Gentle-Aura-400 to-Gentle-Aura-600 rounded-full flex items-center justify-center"></div>`,
      preview: (
        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">GA</span>
        </div>
      )
    },
    {
      name: "Progress Bar",
      code: `<div class="w-full bg-neutral-200 rounded-full h-2 mb-2"></div>`,
      preview: (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div className={`bg-linear-to-r from-${paletteColors[0]?.class?.replace('bg-', '') || 'green'}-500 to-${paletteColors[1]?.class?.replace('bg-', '') || 'blue'}-500 h-2 rounded-full`} style={{width: '65%'}}></div>
        </div>
      )
    }
  ];
};

export default function DivTemplates({ palette, isDarkMode = false }: DivTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof TEMPLATE_CATEGORIES>('flexbox');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const copyToClipboard = async (code: string, templateName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedTemplate(templateName);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getTemplatesForCategory = (category: keyof typeof TEMPLATE_CATEGORIES) => {
    switch (category) {
      case 'flexbox':
        return generateFlexboxTemplates(palette, isDarkMode);
      case 'spacing':
        return generateSpacingTemplates(palette, isDarkMode);
      case 'cards':
        return generateCardTemplates(palette, isDarkMode);
      case 'status':
        return generateStatusTemplates(palette, isDarkMode);
      case 'skeleton':
        return generateSkeletonTemplates(palette, isDarkMode);
      case 'gradients':
        return generateGradientTemplates(palette, isDarkMode);
      default:
        return [];
    }
  };

  const templates = getTemplatesForCategory(selectedCategory);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <CodeBracketIcon className="size-5 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Div Templates
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({palette.name})
        </span>
      </div>

      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
        {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as keyof typeof TEMPLATE_CATEGORIES)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon className="size-4" />
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                {template.name}
              </h4>
              <Button
                onClick={() => copyToClipboard(template.code, template.name)}
                className="text-xs px-2 py-1 h-auto"
                outline
              >
                {copiedTemplate === template.name ? (
                  <>
                    <CheckIcon className="size-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="size-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Preview */}
            <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-900 rounded border">
              {template.preview}
            </div>

            {/* Code */}
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded border overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-200 font-mono">
                {template.code}
              </code>
            </pre>
          </div>
        ))}
      </div>

      {/* Usage Instructions */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
        <div className="flex items-start gap-2">
          <InformationCircleIcon className="size-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
              How to use
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Copy the div templates above and paste them into your components. The templates use your generated palette colors and follow the most popular patterns from your codebase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}