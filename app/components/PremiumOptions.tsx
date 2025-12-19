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

import React, { useState } from "react";
import {
  CogIcon,
  SwatchIcon,
  PhotoIcon,
  ChartBarIcon,
  SparklesIcon,
  BeakerIcon,
  PaintBrushIcon,
  LightBulbIcon,
  CloudIcon,
  EyeIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import {
  CogIcon as CogIconSolid,
  SwatchIcon as SwatchIconSolid,
  PhotoIcon as PhotoIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  SparklesIcon as SparklesIconSolid,
  BeakerIcon as BeakerIconSolid,
  PaintBrushIcon as PaintBrushIconSolid,
  LightBulbIcon as LightBulbIconSolid,
  CloudIcon as CloudIconSolid,
  EyeIcon as EyeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid
} from "@heroicons/react/24/solid";

import { Button } from "~/components/catalyst/button";
import {
  COLOR_RULES,
  COLOR_LIBRARIES,
  MOOD_TYPES,
  SEASON_TYPES,
  ACCESSIBILITY_STANDARDS,
  EXPORT_FORMATS,
  GRADIENT_TYPES,
  LIBRARY_PALETTES,
  MOOD_PALETTES,
  SEASON_PALETTES
} from "~/lib/constants";
import type {
  ColorRule,
  ColorLibrary,
  MoodType,
  SeasonType,
  AccessibilityStandard,
  ExportFormat,
  GradientType,
  PremiumOptions
} from "~/types";

interface PremiumOptionsProps {
  options: PremiumOptions;
  onChange: (options: PremiumOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  onRandomize?: () => void;
}

export default function PremiumOptions({ options, onChange, isOpen, onToggle, onRandomize }: PremiumOptionsProps) {
  const [activeTab, setActiveTab] = useState<'rules' | 'library' | 'mood' | 'accessibility' | 'export' | 'advanced'>('rules');

  const updateOption = <K extends keyof PremiumOptions>(key: K, value: PremiumOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  const tabs = [
    { id: 'rules', label: 'Color Rules', icon: SwatchIcon, activeIcon: SwatchIconSolid },
    { id: 'library', label: 'Libraries', icon: PhotoIcon, activeIcon: PhotoIconSolid },
    { id: 'mood', label: 'Mood & Season', icon: LightBulbIcon, activeIcon: LightBulbIconSolid },
    { id: 'accessibility', label: 'Accessibility', icon: EyeIcon, activeIcon: EyeIconSolid },
    { id: 'export', label: 'Export', icon: DocumentTextIcon, activeIcon: DocumentTextIconSolid },
    { id: 'advanced', label: 'Advanced', icon: CogIcon, activeIcon: CogIconSolid },
  ];

  return (
    <div className="relative">
      {/* Premium Options Toggle */}
      <Button
        onClick={onToggle}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
          isOpen
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        <SparklesIcon className={`size-5 ${isOpen ? 'text-yellow-300' : 'text-purple-500'}`} />
        <span>Premium Options</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          isOpen
            ? 'bg-white/20 text-white'
            : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
        }`}>
          PRO
        </span>
      </Button>

      {/* Premium Options Panel */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/30 border border-gray-200/60 dark:border-gray-700/60 z-50 min-w-max overflow-hidden">
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl"></div>
          {/* Header */}
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white p-4 rounded-t-2xl shadow-lg relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer opacity-60"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SparklesIconSolid className="size-6 text-yellow-300" />
                  <div>
                    <h3 className="font-bold text-lg">Adobe-Style Premium Tools</h3>
                    <p className="text-sm text-purple-100">Professional color design features</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onRandomize && (
                    <Button
                      onClick={onRandomize}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                      title="Randomize Adobe Settings"
                    >
                      🎲 Random
                    </Button>
                  )}
                  <Button
                    onClick={onToggle}
                    className="text-white hover:bg-white/20 rounded-full p-1"
                  >
                    ×
                  </Button>
                </div>
              </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200/60 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
            {tabs.map((tab) => {
              const Icon = activeTab === tab.id ? tab.activeIcon : tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'rules' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <SwatchIconSolid className="size-5 text-purple-500" />
                  Color Harmony Rules
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_RULES.map((rule) => (
                    <button
                      key={rule}
                      onClick={() => updateOption('colorRule', rule)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        options.colorRule === rule
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-300 dark:border-purple-600 shadow-lg shadow-purple-500/30 transform scale-105'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:shadow-md hover:shadow-gray-400/20 dark:hover:shadow-gray-600/20 hover:transform hover:scale-102'
                      }`}
                    >
                      {rule.replace('-', ' ')}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Choose how colors relate to each other in your palette
                </p>
              </div>
            )}

            {activeTab === 'library' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <PhotoIconSolid className="size-5 text-blue-500" />
                  Design System Libraries
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_LIBRARIES.map((library) => (
                    <button
                      key={library}
                      onClick={() => updateOption('colorLibrary', library)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        options.colorLibrary === library
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-600'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                    >
                      {library.replace('-', ' ')}
                    </button>
                  ))}
                </div>
                {options.colorLibrary && LIBRARY_PALETTES[options.colorLibrary as keyof typeof LIBRARY_PALETTES] && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {options.colorLibrary.replace('-', ' ')} Colors:
                    </h5>
                    <div className="flex gap-2 flex-wrap">
                      {LIBRARY_PALETTES[options.colorLibrary as keyof typeof LIBRARY_PALETTES].map((color, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                          <div
                            className="w-8 h-8 rounded border-2 border-gray-200 dark:border-gray-600"
                            style={{ backgroundColor: `#${color.value}` }}
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            {color.name.split(' ')[1] || color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'mood' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <LightBulbIconSolid className="size-5 text-yellow-500" />
                    Mood & Atmosphere
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {MOOD_TYPES.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => updateOption('mood', mood)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          options.mood === mood
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-2 border-yellow-300 dark:border-yellow-600'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <CloudIcon className="size-5 text-green-500" />
                    Seasonal Themes
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {SEASON_TYPES.map((season) => (
                      <button
                        key={season}
                        onClick={() => updateOption('season', season)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          options.season === season
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-600'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                        }`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>

                {(options.mood || options.season) && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preview Colors:
                    </h5>
                    <div className="flex gap-2 flex-wrap">
                      {(options.mood ? MOOD_PALETTES[options.mood] : options.season ? SEASON_PALETTES[options.season] : []).slice(0, 5).map((color, index) => (
                        <div key={index} className="flex flex-col items-center gap-1">
                          <div
                            className="w-8 h-8 rounded border-2 border-gray-200 dark:border-gray-600"
                            style={{ backgroundColor: `#${color.value}` }}
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            {color.tags[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <EyeIconSolid className="size-5 text-red-500" />
                  Accessibility Standards
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {ACCESSIBILITY_STANDARDS.map((standard) => (
                    <button
                      key={standard}
                      onClick={() => updateOption('accessibilityStandard', standard)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all text-left ${
                        options.accessibilityStandard === standard
                          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-2 border-red-300 dark:border-red-600'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium">{standard.replace('-', ' ')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {standard === 'wcag-aa' && '4.5:1 contrast ratio for normal text'}
                        {standard === 'wcag-aaa' && '7:1 contrast ratio for normal text'}
                        {standard === 'color-blind-friendly' && 'Safe for color vision deficiencies'}
                        {standard === 'high-contrast' && 'Maximum contrast for visibility'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'export' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <DocumentTextIconSolid className="size-5 text-indigo-500" />
                  Export Formats
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {EXPORT_FORMATS.map((format) => (
                    <button
                      key={format}
                      onClick={() => {
                        const currentFormats = options.exportFormats || [];
                        const newFormats = currentFormats.includes(format)
                          ? currentFormats.filter(f => f !== format)
                          : [...currentFormats, format];
                        updateOption('exportFormats', newFormats);
                      }}
                      className={`p-2 rounded text-xs font-medium transition-all ${
                        (options.exportFormats || []).includes(format)
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-600'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Select multiple formats for export
                </div>
              </div>
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CogIconSolid className="size-5 text-gray-500" />
                  Advanced Features
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.aiSuggestions || false}
                      onChange={(e) => updateOption('aiSuggestions', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <SparklesIcon className="size-4 text-purple-500" />
                        AI-Powered Suggestions
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Smart color recommendations based on your palette
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.advancedSliders || false}
                      onChange={(e) => updateOption('advancedSliders', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <PaintBrushIcon className="size-4 text-blue-500" />
                        Advanced HSL Sliders
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Fine-tune hue, saturation, and lightness precisely
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.colorAnalysis || false}
                      onChange={(e) => updateOption('colorAnalysis', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <ChartBarIcon className="size-4 text-green-500" />
                        Color Analysis
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Detailed harmony, temperature, and vibrancy analysis
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={options.trendAnalysis || false}
                      onChange={(e) => updateOption('trendAnalysis', e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <BeakerIcon className="size-4 text-orange-500" />
                        Trend Analysis
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Seasonal trends and color popularity insights
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    Pro Tip 💡
                  </h5>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Combine AI suggestions with advanced sliders for the most professional color palettes.
                    Enable trend analysis to stay current with design trends.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200/60 dark:border-gray-700/60 p-4 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-b-2xl shadow-inner">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {(() => {
                  const entries = Object.entries(options);
                  const selectedCount = entries.filter(([key, value]) => {
                    // Считаем опцию выбранной если:
                    // - это строка/число и не пустая
                    // - это булево true
                    // - это массив (даже пустой)
                    // - это любое определенное значение (не undefined/null)
                    if (value === undefined || value === null) return false;
                    if (Array.isArray(value)) return true;
                    if (typeof value === 'boolean') return value;
                    if (typeof value === 'string') return value.length > 0;
                    return true;
                  }).length;
                  return `${selectedCount}/${entries.length} options selected`;
                })()}
              </div>
              <Button
                onClick={onToggle}
                className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 border-2 border-purple-400/50 backdrop-blur-sm relative overflow-hidden group"
              >
                Apply Premium Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}