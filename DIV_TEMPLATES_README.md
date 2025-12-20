# 🎨 Div Templates - Copy Popular UI Patterns

This feature automatically generates copy-paste ready div templates based on your generated color palette and the most popular div patterns used across your website.

## ✨ What's Included

The Div Templates feature provides categorized templates for:

### 🏗️ **Flexbox Layouts**
- Centered flex containers
- Horizontal layouts with spacing
- Justified content layouts
- Responsive flex grids

### 📐 **Spacing & Layout**
- Vertical spacing containers
- Responsive layout helpers
- Text alignment utilities
- Center containers

### 🃏 **Cards & Containers**
- Basic cards with shadows
- Colored cards using palette colors
- Premium rounded cards
- Avatar cards with gradients

### 🔴 **Status Indicators**
- Animated status dots
- Avatar badges with borders
- Progress indicators
- Gentle Aura themed badges

### 💀 **Skeleton Loaders**
- Skeleton rectangles and circles
- Card skeleton layouts
- Avatar placeholders
- Loading state patterns

### 🌈 **Gradients & Backgrounds**
- Linear gradients using palette colors
- Brand color backgrounds
- Gentle Aura gradients
- Progress bar styling

## 🎯 How It Works

1. **Generate a Palette**: Use any of the palette generators (Random, Juicy, Pastel, etc.)
2. **Find Div Templates**: Scroll down past the graphs to see the "Div Templates" section
3. **Browse Categories**: Use the tabs (Flexbox, Cards, Status, Skeleton, Gradients) to explore templates
4. **Preview Designs**: Each template shows a live preview with your palette colors
5. **Copy & Paste**: Click the "Copy" button to copy the HTML code to clipboard
6. **Use in UI**: Paste the templates directly into your components

## 🎨 Visual Previews

Each template now includes:
- **Live color previews** using your generated palette
- **Proper styling** with shadows, borders, and spacing
- **Dark mode support** that adapts to your theme
- **Animated elements** (pulse effects, gradients)
- **Realistic content simulation** (skeleton loaders, status indicators)

## 🎨 Color Integration

All templates automatically use your generated palette colors:
- `bg-first-500`, `bg-first-400`, etc. for palette-based backgrounds
- `text-first-500`, `text-first-400`, etc. for palette-based text colors
- Gradient combinations using multiple palette colors
- Neutral colors for supporting elements

## 🌙 Dark Mode Support

Templates adapt to your selected theme:
- Light mode: Uses `bg-white`, `border-gray-200` for cards
- Dark mode: Uses `dark:bg-gray-800`, `dark:border-gray-700` for cards
- Neutral colors adjust automatically

## 📋 Popular Patterns Analysis

Based on analysis of 100+ div elements from your codebase, the templates include:

- **Flexbox**: `flex`, `flex items-center`, `justify-between`, `space-x-*`
- **Spacing**: `space-y-*`, `gap-*`, `mb-*`, `p-*`
- **Cards**: `bg-white border rounded-2xl shadow-sm`
- **Status**: `bg-*-500 rounded-full`, `border-2 border-white`
- **Skeletons**: `bg-neutral-200 rounded`, `animate-pulse`
- **Gradients**: `bg-linear-to-r from-* to-*`

## 🚀 Usage Examples

```jsx
// Copy this directly from the templates:
<div className="flex-1 flex flex-col items-center">
  <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm h-full">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-2 h-2 bg-first-500 rounded-full animate-pulse"></div>
      <span className="text-sm">Active</span>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-neutral-200 rounded w-20"></div>
      <div className="h-3 bg-neutral-200 rounded w-16"></div>
    </div>
  </div>
</div>

// Дополнительные примеры с цветами палитры:
<div className="bg-first-50 dark:bg-first-900/20 p-4 rounded-xl border border-first-200">
  <div className="w-12 h-12 bg-gradient-to-r from-first-400 to-first-600 rounded-full"></div>
</div>
```

## 🎨 Preview Features

**Карточки:**
- Тени и скругленные углы (`shadow-sm`, `rounded-2xl`)
- Цветные границы и фоны с палитрой
- Аватары и статус индикаторы

**Статус элементы:**
- Анимированные точки (`animate-pulse`)
- Градиентные бейджи
- Цветовые индикаторы из палитры

**Скелетоны:**
- Анимированная загрузка
- Разные размеры и формы
- Реалистичные плейсхолдеры

**Градиенты:**
- Линейные градиенты (`bg-linear-to-r`)
- Прогресс бары с цветами палитры
- Gentle Aura эффекты

## 🔧 Integration

The Div Templates component is automatically integrated into the Demo modal and appears after generating any palette. No additional setup required!

## 🎨 Gentle Aura Integration

Templates include special Gentle Aura patterns:
- `bg-Gentle-Aura-400` to `bg-Gentle-Aura-600` gradients
- Gentle Aura themed status indicators
- Premium card designs with Gentle Aura accents

---

**Pro Tip**: Generate a palette, open the demo, and copy templates directly into your components for instant UI consistency! 🎉