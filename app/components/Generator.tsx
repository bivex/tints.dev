/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T07:00:34
 * Last Updated: 2025-12-19T08:45:46
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import {
  PlusIcon,
  FireIcon,
  SwatchIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  VariableIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";
import {
  FireIcon as FireIconSolid,
  SwatchIcon as SwatchIconSolid,
  CpuChipIcon as CpuChipIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  VariableIcon as VariableIconSolid
} from "@heroicons/react/24/solid";
import React, { useEffect, useMemo, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import { useSearchParams, useNavigate, useLocation } from "react-router";

import { Button } from "~/components/catalyst/button";
import Demo from "~/components/Demo"; // Updated import
import Graphs from "~/components/Graphs";
import Output from "~/components/Output";
import Palette from "~/components/Palette";
import PremiumOptions from "~/components/PremiumOptions";
import type { Block } from "~/components/Prose";
import { Prose } from "~/components/Prose";
import { MODES, VERSIONS } from "~/lib/constants";
import type { PremiumOptions as PremiumOptionsType } from "~/types";
import {
  createRandomPalette,
  createJuicyPalette,
  createPastelPalette,
  createModernPalette,
  createOfficePalette,
  createUnlimitedPalette,
  createPremiumJuicyPalette,
  createPremiumPastelPalette,
  createPremiumModernPalette,
  createPremiumOfficePalette,
  createPremiumUnlimitedPalette
} from "~/lib/createRandomPalette";
import { PremiumPaletteGenerator } from "~/lib/premiumPaletteUtils";
import { handleMeta } from "~/lib/meta";
import type { Mode, PaletteConfig, Version } from "~/types";
import {
  COLOR_RULES,
  COLOR_LIBRARIES,
  MOOD_TYPES,
  SEASON_TYPES,
  ACCESSIBILITY_STANDARDS,
  EXPORT_FORMATS,
  GRADIENT_TYPES,
  PALETTE_ADJECTIVES,
  PALETTE_NOUNS
} from "~/lib/constants";

import Header from "~/components/Header";
import { createDisplayColor } from "~/lib/createDisplayColor";
import DivTemplates from "~/components/DivTemplates";

// Функция для рандомизации Adobe настроек
const randomizeAdobeSettings = (): PremiumOptionsType => {
  return {
    colorRule: COLOR_RULES[Math.floor(Math.random() * COLOR_RULES.length)],
    colorLibrary: COLOR_LIBRARIES[Math.floor(Math.random() * COLOR_LIBRARIES.length)],
    mood: MOOD_TYPES[Math.floor(Math.random() * MOOD_TYPES.length)],
    season: SEASON_TYPES[Math.floor(Math.random() * SEASON_TYPES.length)],
    accessibilityStandard: ACCESSIBILITY_STANDARDS[Math.floor(Math.random() * ACCESSIBILITY_STANDARDS.length)],
    exportFormats: EXPORT_FORMATS.filter(() => Math.random() > 0.5), // Случайно выбрать некоторые форматы экспорта
    gradientType: GRADIENT_TYPES[Math.floor(Math.random() * GRADIENT_TYPES.length)],
    brandColors: Math.random() > 0.7 ? [`#${Math.floor(Math.random()*16777215).toString(16)}`, `#${Math.floor(Math.random()*16777215).toString(16)}`] : undefined, // Иногда добавить брендовые цвета
    aiSuggestions: Math.random() > 0.5,
    advancedSliders: Math.random() > 0.5,
    colorAnalysis: Math.random() > 0.5,
    trendAnalysis: Math.random() > 0.5,
  };
};

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

type GeneratorProps = {
  palettes: PaletteConfig[];
  about: Block[];
  stars: number;
};

export default function Generator({ palettes, about, stars }: GeneratorProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [palettesState, setPalettesState] = useState(palettes);
  const [showDemo, setShowDemo] = useState(false);
  const [darkModeForDemo, setDarkModeForDemo] = useState(false); // New state for demo dark mode
  const [premiumOptions, setPremiumOptions] = useState<PremiumOptionsType>({});
  const [showPremiumPanel, setShowPremiumPanel] = useState(false);
  const paletteRefs = useRef<HTMLDivElement[]>([]);

  // Функция для рандомизации Adobe настроек
  const handleRandomizeAdobeSettings = () => {
    const randomizedSettings = randomizeAdobeSettings();
    setPremiumOptions(randomizedSettings);
  };

  // Read current mode and version from URL or use defaults
  const currentMode: Mode = (searchParams.get("output") as Mode) || MODES[0];
  const currentVersion: Version =
    (searchParams.get("version") as Version) || VERSIONS[0];

  // Helper functions to update URL parameters
  const updateMode = (mode: Mode) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("output", mode);
    navigate(`${location.pathname}?${newParams.toString()}`, {
      replace: true,
      preventScrollReset: true,
    });
  };

  const updateVersion = (version: Version) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("version", version);
    navigate(`${location.pathname}?${newParams.toString()}`, {
      replace: true,
      preventScrollReset: true,
    });
  };

  // Update meta and URL on any palette state change
  useEffect(() => {
    handleMeta(palettesState, true);
  }, [palettesState]);


  const handleNew = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const randomPalette = Object.keys(premiumOptions).length > 0
      ? createPremiumUnlimitedPalette(currentValues, premiumOptions)
      : createRandomPalette(currentValues);
    setPalettesState([randomPalette]);
    setShowDemo(true);
  };

  const handleJuicy = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const juicyPalette = Object.keys(premiumOptions).length > 0
      ? createPremiumJuicyPalette(currentValues, premiumOptions)
      : createJuicyPalette(currentValues);
    setPalettesState([juicyPalette]);
    setShowDemo(true);
  };

  const handlePastel = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const pastelPalette = Object.keys(premiumOptions).length > 0
      ? createPremiumPastelPalette(currentValues, premiumOptions)
      : createPastelPalette(currentValues);
    setPalettesState([pastelPalette]);
    setShowDemo(true);
  };

  const handleModern = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const modernPalette = Object.keys(premiumOptions).length > 0
      ? createPremiumModernPalette(currentValues, premiumOptions)
      : createModernPalette(currentValues);
    setPalettesState([modernPalette]);
    setShowDemo(true);
  };

  const handleOffice = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const officePalette = Object.keys(premiumOptions).length > 0
      ? createPremiumOfficePalette(currentValues, premiumOptions)
      : createOfficePalette(currentValues);
    setPalettesState([officePalette]);
    setShowDemo(true);
  };

  const handleUnlimited = () => {
    const currentValues = palettesState.map((p) => p.value);
    // Используем премиум настройки если они установлены
    const unlimitedPalette = Object.keys(premiumOptions).length > 0
      ? createPremiumUnlimitedPalette(currentValues, premiumOptions)
      : createUnlimitedPalette(currentValues);
    setPalettesState([unlimitedPalette]);
    setShowDemo(true);
  };

  // Премиум версии обработчиков
  const handlePremiumJuicy = () => {
    const currentValues = palettesState.map((p) => p.value);
    const premiumJuicyPalette = createPremiumJuicyPalette(currentValues, premiumOptions);
    setPalettesState([premiumJuicyPalette]);
    setShowDemo(true);
  };

  const handlePremiumPastel = () => {
    const currentValues = palettesState.map((p) => p.value);
    const premiumPastelPalette = createPremiumPastelPalette(currentValues, premiumOptions);
    setPalettesState([premiumPastelPalette]);
    setShowDemo(true);
  };

  const handlePremiumModern = () => {
    const currentValues = palettesState.map((p) => p.value);
    const premiumModernPalette = createPremiumModernPalette(currentValues, premiumOptions);
    setPalettesState([premiumModernPalette]);
    setShowDemo(true);
  };

  const handlePremiumOffice = () => {
    const currentValues = palettesState.map((p) => p.value);
    const premiumOfficePalette = createPremiumOfficePalette(currentValues, premiumOptions);
    setPalettesState([premiumOfficePalette]);
    setShowDemo(true);
  };

  const handlePremiumUnlimited = () => {
    const currentValues = palettesState.map((p) => p.value);
    const premiumUnlimitedPalette = createPremiumUnlimitedPalette(currentValues, premiumOptions);
    setPalettesState([premiumUnlimitedPalette]);
    setShowDemo(true);
  };

  const handleDemo = () => setShowDemo(!showDemo);

  const handleUpdate = (palette: PaletteConfig, index: number) => {
    const currentPalettes = [...palettesState];
    currentPalettes[index] = palette;

    if (!isEqual(currentPalettes, palettesState)) {
      setPalettesState(currentPalettes);
    }
  };

  const handleDelete = (deleteId: string) => {
    if (palettesState.length === 1) {
      return;
    }

    const updatedPalettes = palettesState.filter((p) => p.id !== deleteId);
    setPalettesState(updatedPalettes);
  };

  const styleString = useMemo(
    () =>
      palettesState.length > 0
        ? [
            `:root {`,
            ...palettesState[0].swatches.map(
              (swatch) =>
                `--first-${swatch.stop}: ${createDisplayColor(
                  swatch.hex,
                  currentMode,
                )};`,
            ),
            `}`,
          ].join(`\n`)
        : ``,
    [palettesState],
  );

  const currentPalette = palettesState[0];

  return (
    <main className="pb-32 pt-header">
      <style>{styleString}</style>

      <Header stars={stars} />

      {/* Premium Options Panel */}
      <div className="flex justify-center mb-4">
        <PremiumOptions
          options={premiumOptions}
          onChange={setPremiumOptions}
          isOpen={showPremiumPanel}
          onToggle={() => setShowPremiumPanel(!showPremiumPanel)}
          onRandomize={handleRandomizeAdobeSettings}
        />
      </div>

      {showDemo ? (
        <Demo
          key={currentPalette.id}
          close={handleDemo}
          palette={currentPalette}
          palettes={palettesState}
          title={currentPalette.name || "The tastiest demos"}
          description={currentPalette.description || "This feature could do with some work. It's currently a placeholder."}
          imageUrl={`//picsum.photos/seed/${currentPalette.value}/400/800/`}
          isDarkMode={darkModeForDemo}
          onToggleDarkMode={() => setDarkModeForDemo(prev => !prev)}
          features={[
            { label: "Uptime", value: "99.99%" },
            { label: "Funding", value: "$159m" },
            { label: "Features", value: "5,000" },
          ]}
          callToActionButtons={[
            { label: "Explore", onClick: () => console.log("Explore clicked") },
            { label: "About", onClick: () => console.log("About clicked") },
          ]}
          tags={currentPalette.tags?.length ? [currentPalette.tags[0]] : ["Early Access"]}
        />
      ) : null}

      <section className="grid grid-cols-1 p-4 gap-y-12 container mx-auto">
        {palettesState.map((palette: PaletteConfig, index: number) => (
          <React.Fragment key={palette.id}>
            <Palette
              paletteRef={(el) => (paletteRefs.current[index] = el)}
              palette={palette}
              updateGlobal={(updatedPalette: PaletteConfig) =>
                handleUpdate(updatedPalette, index)
              }
              deleteGlobal={
                palettesState.length <= 1
                  ? undefined
                  : () => handleDelete(palette.id)
              }
              currentMode={currentMode}
              isPremium={Boolean(palette.premiumFeatures && palette.premiumFeatures.length > 0)}
            />
          </React.Fragment>
        ))}

        {/* Стандартные кнопки с улучшенными тенями */}
        <section className="flex justify-center items-center gap-2 flex-wrap">
          <Button id="add-button" onClick={handleNew} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <PlusIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Random Demo</span>
          </Button>
          <Button id="juicy-button" onClick={handleJuicy} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <FireIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Juicy Demo</span>
          </Button>
          <Button id="pastel-button" onClick={handlePastel} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <SwatchIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Pastel Demo</span>
          </Button>
          <Button id="modern-button" onClick={handleModern} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CpuChipIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Modern Demo</span>
          </Button>
          <Button id="office-button" onClick={handleOffice} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <BuildingOfficeIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Office Demo</span>
          </Button>
          <Button id="unlimited-button" onClick={handleUnlimited} className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <VariableIcon className="size-4" />
            <span className="sr-only md:not-sr-only">Unlimited</span>
          </Button>
        </section>

        {/* Премиум кнопки с уникальным дизайном и тенями */}
        <section className="flex justify-center items-center gap-3 flex-wrap mt-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full text-white font-bold text-sm shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-yellow-300 backdrop-blur-sm">
            <SparklesIcon className="size-4 drop-shadow-sm" />
            <span>PREMIUM</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
          </div>

          <Button
            id="premium-juicy-button"
            onClick={handlePremiumJuicy}
            className="relative bg-gradient-to-br from-red-500 via-pink-600 to-red-700 hover:from-red-600 hover:via-pink-700 hover:to-red-800 text-white font-bold shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-red-400/50 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <StarIcon className="size-3 text-yellow-300 drop-shadow-lg" />
            </div>
            <FireIconSolid className="size-4 drop-shadow-sm relative z-10" />
            <span className="sr-only md:not-sr-only relative z-10">Premium Juicy</span>
            <TrophyIcon className="size-3 ml-1 text-yellow-200 drop-shadow-sm relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>

          <Button
            id="premium-pastel-button"
            onClick={handlePremiumPastel}
            className="relative bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 hover:from-purple-500 hover:via-pink-500 hover:to-purple-600 text-white font-bold shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-purple-300/50 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <StarIcon className="size-3 text-yellow-300 drop-shadow-lg" />
            </div>
            <SwatchIconSolid className="size-4 drop-shadow-sm relative z-10" />
            <span className="sr-only md:not-sr-only relative z-10">Premium Pastel</span>
            <TrophyIcon className="size-3 ml-1 text-yellow-200 drop-shadow-sm relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>

          <Button
            id="premium-modern-button"
            onClick={handlePremiumModern}
            className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black text-white font-bold shadow-2xl shadow-gray-900/50 hover:shadow-black/70 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-gray-500/50 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <StarIcon className="size-3 text-yellow-300 drop-shadow-lg" />
            </div>
            <CpuChipIconSolid className="size-4 drop-shadow-sm relative z-10" />
            <span className="sr-only md:not-sr-only relative z-10">Premium Modern</span>
            <TrophyIcon className="size-3 ml-1 text-yellow-200 drop-shadow-sm relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>

          <Button
            id="premium-office-button"
            onClick={handlePremiumOffice}
            className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 hover:from-blue-700 hover:via-indigo-800 hover:to-blue-900 text-white font-bold shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-blue-400/50 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <StarIcon className="size-3 text-yellow-300 drop-shadow-lg" />
            </div>
            <BuildingOfficeIconSolid className="size-4 drop-shadow-sm relative z-10" />
            <span className="sr-only md:not-sr-only relative z-10">Premium Office</span>
            <TrophyIcon className="size-3 ml-1 text-yellow-200 drop-shadow-sm relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>

          <Button
            id="premium-unlimited-button"
            onClick={handlePremiumUnlimited}
            className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 hover:from-emerald-600 hover:via-teal-700 hover:to-emerald-800 text-white font-bold shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-emerald-400/50 backdrop-blur-sm overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <StarIcon className="size-3 text-yellow-300 drop-shadow-lg" />
            </div>
            <VariableIconSolid className="size-4 drop-shadow-sm relative z-10" />
            <span className="sr-only md:not-sr-only relative z-10">Premium Unlimited</span>
            <TrophyIcon className="size-3 ml-1 text-yellow-200 drop-shadow-sm relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Button>
        </section>

        <Graphs palettes={palettesState} mode={currentMode} />

        {/* Premium Gradient Preview */}
        {palettesState.length > 0 && palettesState[0].premiumFeatures && (
          <section className="grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 rounded-xl border-2 border-yellow-200/60 dark:border-yellow-700/60 p-6 shadow-2xl shadow-yellow-500/20 dark:shadow-yellow-900/30 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-orange-400/5 to-red-400/5 animate-pulse"></div>
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 transform rotate-45 scale-150"></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                  <SparklesIcon className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Premium Palette Features
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced color harmony and quality optimization
                  </p>
                </div>
                {palettesState[0].qualityScore && (
                  <div className="ml-auto flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
                    <TrophyIcon className="size-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {palettesState[0].qualityScore}/100
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {(() => {
                  const gradient = PremiumPaletteGenerator.generateGradient(palettesState[0], 'linear');
                  const radialGradient = PremiumPaletteGenerator.generateGradient(palettesState[0], 'radial');
                  const conicGradient = PremiumPaletteGenerator.generateGradient(palettesState[0], 'conic');

                  return (
                    <>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Linear Gradient</h4>
                        <div
                          className="h-16 rounded-lg border"
                          style={{ background: gradient }}
                        />
                        <code className="text-xs text-gray-500 mt-1 block font-mono">
                          {gradient}
                        </code>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Radial Gradient</h4>
                          <div
                            className="h-16 rounded-lg border"
                            style={{ background: radialGradient }}
                          />
                          <code className="text-xs text-gray-500 mt-1 block font-mono">
                            {radialGradient}
                          </code>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Conic Gradient</h4>
                          <div
                            className="h-16 rounded-lg border"
                            style={{ background: conicGradient }}
                          />
                          <code className="text-xs text-gray-500 mt-1 block font-mono">
                            {conicGradient}
                          </code>
                        </div>
                      </div>

                      {palettesState[0].colorHarmony && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            Color Harmony: {palettesState[0].colorHarmony}
                          </h4>
                          <div className="flex gap-2">
                            {PremiumPaletteGenerator.generateColorHarmony(
                              palettesState[0].value,
                              palettesState[0].colorHarmony!,
                              5
                            ).map((color, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: `#${color}` }}
                                title={`#${color}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Расширенная информация о премиум палитре */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20 transition-all duration-300 relative overflow-hidden group">
                          {/* Subtle inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 relative z-10">
                            <StarIcon className="size-5 text-yellow-500 drop-shadow-sm" />
                            Premium Features
                          </h4>
                          <div className="space-y-2">
                            {palettesState[0].premiumFeatures?.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                  {feature.replace('-', ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden group">
                          {/* Subtle inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 relative z-10">
                            <SparklesIcon className="size-5 text-purple-500 drop-shadow-sm" />
                            Advanced Analysis
                          </h4>
                          <div className="space-y-3">
                            {/* Color Harmony */}
                            {palettesState[0].colorHarmony && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Harmony:</span>
                                <span className="ml-2 text-sm text-purple-600 dark:text-purple-400 capitalize">
                                  {palettesState[0].colorHarmony}
                                </span>
                              </div>
                            )}

                            {/* Mood Analysis */}
                            {palettesState[0].moodAnalysis && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mood:</span>
                                <span className="ml-2 text-sm text-pink-600 dark:text-pink-400 capitalize">
                                  {palettesState[0].moodAnalysis.primary}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                  ({palettesState[0].moodAnalysis.confidence}% confidence)
                                </span>
                              </div>
                            )}

                            {/* Accessibility Analysis */}
                            {palettesState[0].accessibilityMetrics && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Accessibility:</span>
                                <div className="ml-2 mt-1 space-y-1">
                                  <div className={`text-xs ${palettesState[0].accessibilityMetrics.wcagAA ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    WCAG AA: {palettesState[0].accessibilityMetrics.wcagAA ? '✓' : '✗'}
                                  </div>
                                  <div className={`text-xs ${palettesState[0].accessibilityMetrics.wcagAAA ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                    WCAG AAA: {palettesState[0].accessibilityMetrics.wcagAAA ? '✓' : '✗'}
                                  </div>
                                  <div className={`text-xs ${palettesState[0].accessibilityMetrics.colorBlindSafe ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                                    Color Blind Safe: {palettesState[0].accessibilityMetrics.colorBlindSafe ? '✓' : '✗'}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Color Analysis */}
                            {palettesState[0].colorAnalysis && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Properties:</span>
                                <div className="ml-2 mt-1 space-y-1">
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Temperature: <span className="capitalize">{palettesState[0].colorAnalysis.temperature}</span>
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Vibrancy: {Math.round(palettesState[0].colorAnalysis.vibrancy)}%
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    Harmony Score: {palettesState[0].colorAnalysis.harmonyScore}/100
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Quality Score */}
                            {palettesState[0].qualityScore && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality Score:</span>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        palettesState[0].qualityScore! >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                        palettesState[0].qualityScore! >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                        palettesState[0].qualityScore! >= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                        'bg-gradient-to-r from-red-500 to-pink-500'
                                      }`}
                                      style={{ width: `${palettesState[0].qualityScore}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[3rem] text-right">
                                    {palettesState[0].qualityScore}/100
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* Div Templates - Always visible in main interface */}
        {palettesState.length > 0 && (
          <DivTemplates palette={palettesState[0]} isDarkMode={false} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="row-start-2 md:row-start-1 md:col-span-3">
            {about.length ? <Prose blocks={about} /> : null}
          </div>
          <div className="row-start-1 md:col-span-2 flex flex-col gap-4">
            <Output
              palettes={palettesState}
              currentMode={currentMode}
              setCurrentMode={updateMode}
              currentVersion={currentVersion}
              setCurrentVersion={updateVersion}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
