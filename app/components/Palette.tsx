/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-20T16:12:52
 * Last Updated: 2025-12-20T16:13:24
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { Switch } from "@headlessui/react";
import {
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  LinkIcon,
  TrashIcon,
  SwatchIcon,
  FireIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState, useRef } from "react";
import { useCopyToClipboard } from "usehooks-ts";

import Graphs from "~/components/Graphs";
import Swatch from "~/components/Swatch";
import StopSelector from "~/components/StopSelector";
import {
  DEFAULT_PALETTE_CONFIG,
  COLOR_SCHEMES,
  COLOR_TEMPERATURES,
  CONTRAST_LEVELS
} from "~/lib/constants";
import { createSwatches } from "~/lib/createSwatches";
import { isHex, isValidName, calculateStopFromColor } from "~/lib/helpers";
import { createCanonicalUrl } from "~/lib/responses";
import type {
  ColorMode,
  Mode,
  PaletteConfig,
  ColorScheme,
  ColorTemperature,
  ContrastLevel
} from "~/types";

import ColorPicker from "./ColorPicker";
import { Input, InputGroup } from "./catalyst/input";
import clsx from "clsx";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "./catalyst/dropdown";
import { Select } from "./catalyst/select";

// Крутой компонент для интерактивных кнопок управления цветом
interface FancyColorControlProps<T> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  getLabel: (value: T) => string;
  getIcon?: (value: T) => React.ReactNode;
  getGradient?: (value: T) => string;
}

function FancyColorControl<T extends string>({
  label,
  value,
  options,
  onChange,
  getLabel,
  getIcon,
  getGradient
}: FancyColorControlProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className={`${labelClasses} block mb-2 font-bold text-gray-700 dark:text-gray-300`}>
        {label}
      </label>

      {/* Текущая выбранная кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ease-out
          ${getGradient ? getGradient(value) : 'bg-gradient-to-r from-blue-500 to-purple-600'}
          border-transparent text-white font-semibold shadow-lg
          hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
          group overflow-hidden
        `}
        style={{
          background: getGradient ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        {/* Фоновый эффект */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getIcon && getIcon(value)}
            <span className="text-sm font-bold tracking-wide">{getLabel(value)}</span>
          </div>
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Выпадающее меню с опциями */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-3 text-left transition-all duration-200
                hover:bg-gray-50 dark:hover:bg-gray-700
                ${value === option
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-l-4 border-blue-500'
                  : 'border-l-4 border-transparent'
                }
                first:rounded-t-xl last:rounded-b-xl
              `}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'slideInUp 0.3s ease-out forwards'
              }}
            >
              <div className="flex items-center gap-3">
                {getIcon && getIcon(option)}
                <span className={`font-medium ${value === option ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {getLabel(option)}
                </span>
                {value === option && (
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Overlay для закрытия меню */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

const tweakInputs = [
  {
    name: `h`,
    title: `Hue`,
    value: DEFAULT_PALETTE_CONFIG.h,
  },
  {
    name: `s`,
    title: `Saturation`,
    value: DEFAULT_PALETTE_CONFIG.s,
  },
  {
    name: `lMax`,
    title: `Lightness Maximum`,
    value: DEFAULT_PALETTE_CONFIG.lMax,
  },
  {
    name: `lMin`,
    title: `Lightness Minimum`,
    value: DEFAULT_PALETTE_CONFIG.lMin,
  },
] as const;

export const labelClasses = `transition-color duration-200 text-xs font-bold `;

// CSS для анимаций
const animationStyles = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(139, 92, 246, 0.6);
    }
  }
`;

// Функции для получения иконок и градиентов для разных опций
const getColorSchemeIcon = (scheme: string) => {
  switch (scheme) {
    case 'monochromatic': return <SwatchIcon className="w-5 h-5" />;
    case 'analogous': return <EyeIcon className="w-5 h-5" />;
    case 'complementary': return <FireIcon className="w-5 h-5" />;
    case 'triadic': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />;
    case 'tetradic': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />;
    case 'split-complementary': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 via-orange-500 to-blue-500" />;
    default: return <SwatchIcon className="w-5 h-5" />;
  }
};

const getColorSchemeGradient = (scheme: string) => {
  switch (scheme) {
    case 'monochromatic': return 'bg-gradient-to-r from-gray-500 to-gray-700';
    case 'analogous': return 'bg-gradient-to-r from-orange-400 to-pink-500';
    case 'complementary': return 'bg-gradient-to-r from-blue-500 to-red-500';
    case 'triadic': return 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500';
    case 'tetradic': return 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500';
    case 'split-complementary': return 'bg-gradient-to-r from-green-500 via-orange-500 to-blue-500';
    default: return 'bg-gradient-to-r from-blue-500 to-purple-600';
  }
};

const getTemperatureIcon = (temp: string) => {
  switch (temp) {
    case 'warm': return <FireIcon className="w-5 h-5" />;
    case 'cool': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500" />;
    case 'neutral': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />;
    default: return <div className="w-5 h-5 rounded-full bg-gray-500" />;
  }
};

const getTemperatureGradient = (temp: string) => {
  switch (temp) {
    case 'warm': return 'bg-gradient-to-r from-orange-400 to-red-500';
    case 'cool': return 'bg-gradient-to-r from-blue-400 to-cyan-500';
    case 'neutral': return 'bg-gradient-to-r from-gray-400 to-gray-600';
    default: return 'bg-gradient-to-r from-blue-500 to-purple-600';
  }
};

const getContrastIcon = (contrast: string) => {
  switch (contrast) {
    case 'auto': return <EyeIcon className="w-5 h-5" />;
    case 'low': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-300 to-gray-500" />;
    case 'medium': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-500 to-gray-700" />;
    case 'high': return <div className="w-5 h-5 rounded-full bg-gradient-to-r from-black to-gray-800" />;
    default: return <EyeIcon className="w-5 h-5" />;
  }
};

const getContrastGradient = (contrast: string) => {
  switch (contrast) {
    case 'auto': return 'bg-gradient-to-r from-green-400 to-blue-500';
    case 'low': return 'bg-gradient-to-r from-gray-300 to-gray-500';
    case 'medium': return 'bg-gradient-to-r from-gray-500 to-gray-700';
    case 'high': return 'bg-gradient-to-r from-black to-gray-800';
    default: return 'bg-gradient-to-r from-blue-500 to-purple-600';
  }
};

type PaletteProps = {
  palette: PaletteConfig;
  updateGlobal: (_updatedPalette: PaletteConfig) => void;
  deleteGlobal?: () => void;
  currentMode: Mode;
  paletteRef: (_el: HTMLDivElement) => void;
  isPremium?: boolean;
};

export default function Palette(props: PaletteProps) {
  const { palette, updateGlobal, deleteGlobal, currentMode, paletteRef, isPremium = false } =
    props;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);

  const [paletteState, setPaletteState] = useState({
    ...DEFAULT_PALETTE_CONFIG,
    ...palette,
    swatches: palette.swatches ?? createSwatches(palette),
    stopSelection: palette.stopSelection ?? "auto",
  });
  const [showGraphs, setShowGraphs] = useState(false);
  const [, copy] = useCopyToClipboard();

  // Update global list every time local palette changes
  // ... if name and value are legit
  useEffect(() => {
    const validName = isValidName(paletteState.name) ? paletteState.name : null;
    const validValue = isHex(paletteState.value) ? paletteState.value : null;

    if (validName && validValue) {
      updateGlobal(paletteState);
    }
  }, [palette, paletteState, updateGlobal]);

  const updateName = (name: string) => {
    // Remove current search param
    if (typeof document !== "undefined" && isValidName(name)) {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete(paletteState.name);
      window.history.replaceState({}, "", currentUrl.toString());
    }

    setPaletteState({
      ...paletteState,
      name,
    });
  };

  // Handle changes to name or value of palette
  const handlePaletteChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let newTargetValue = e.currentTarget.value ?? ``;

    if (e.currentTarget.name === "name") {
      if (!newTargetValue.match(/[A-Za-z]{3,24}/)) {
        nameInputRef.current?.setCustomValidity(`Invalid name`);
      } else {
        nameInputRef.current?.setCustomValidity(``);
      }
      updateName(newTargetValue);
    } else if (e.currentTarget.name === "value") {
      if (!newTargetValue.match(/[0-9A-Fa-f]{6}/)) {
        e.currentTarget.setCustomValidity(`Invalid value`);
      } else {
        e.currentTarget.setCustomValidity(``);
      }
      newTargetValue = newTargetValue.replace("#", ""); // Remove eventual hashes

      if (isHex(newTargetValue)) {
        const newPalette = {
          ...paletteState,
          value: newTargetValue,
          valueStop:
            paletteState.stopSelection === "manual"
              ? paletteState.valueStop // Keep current stop in manual mode
              : calculateStopFromColor(newTargetValue, paletteState.colorMode),
        };
        setPaletteState({
          ...newPalette,
          swatches: createSwatches(newPalette),
        });
      } else {
        // Update value without swatches if invalid
        setPaletteState({
          ...paletteState,
          value: newTargetValue,
        });
      }
    }
  };

  // Handle any changes to the tweaks values
  const handleTweakChange = (e: React.FormEvent<HTMLInputElement>) => {
    const tweakName = e.currentTarget.name;
    const newTweakValue = e.currentTarget.value
      ? parseInt(e.currentTarget.value, 10)
      : ``;

    const newPalette = {
      ...paletteState,
      [tweakName]: newTweakValue,
    };

    // Don't update swatches if the new value is invalid
    if (!String(newTweakValue)) {
      setPaletteState(newPalette);
      return;
    }

    setPaletteState({
      ...newPalette,
      swatches: createSwatches(newPalette),
    });
  };

  // Handle toggle between linear and perceived modes
  const handleColorModeChange = () => {
    const newColorMode: ColorMode =
      paletteState.colorMode === "linear" ? "perceived" : "linear";
    const newPalette: PaletteConfig = {
      ...paletteState,
      colorMode: newColorMode,
    };

    setPaletteState({
      ...newPalette,
      swatches: createSwatches(newPalette),
    });
  };

  const handleCopyURL = useCallback(() => {
    const shareUrl = createCanonicalUrl([paletteState]);
    copy(shareUrl);
  }, [paletteState, copy]);

  const handleOpenAPI = () => {
    if (typeof document !== "undefined") {
      const apiUrl = createCanonicalUrl([paletteState], true);

      window.open(apiUrl, "_blank");
    }
  };

  // Handle change from color picker widget (debounced)
  const handleColorPickerChange = (newColor: string) => {
    if (newColor && isHex(newColor)) {
      const hexWithoutHash = newColor.replace("#", "").toUpperCase();
      const newPalette = {
        ...paletteState,
        value: hexWithoutHash,
        valueStop:
          paletteState.stopSelection === "manual"
            ? paletteState.valueStop // Keep current stop in manual mode
            : calculateStopFromColor(hexWithoutHash, paletteState.colorMode),
      };
      setPaletteState({
        ...newPalette,
        swatches: createSwatches(newPalette),
      });
    }
  };

  const ringStyle = {
    "--tw-ring-color": palette.swatches[1].hex,
  } as React.CSSProperties;

  return (
    <article
      ref={paletteRef}
      id={`s-${palette.value}`}
      className="grid grid-cols-1 gap-4 text-gray-500"
    >
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        <div className="grid col-span-2 focus-within:text-blue-900 grid-rows-[auto] grid-cols-1 gap-y-1">
          <label className={clsx(labelClasses, "col-span-2")} htmlFor="name">
            Name
          </label>
          <div className="relative">
            <InputGroup>
              <Input
                ref={nameInputRef}
                id={`name-${paletteState.id}`}
                name="name"
                value={String(paletteState.name)}
                onChange={handlePaletteChange}
                pattern="[A-Za-z]{3,24}"
                min={3}
                max={24}
                required
                invalid={!isValidName(paletteState.name)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="grid col-span-2 focus-within:text-blue-900 grid-rows-[auto] grid-cols-[1fr_auto] gap-1">
          <label className={clsx(labelClasses, "col-span-2")} htmlFor="value">
            Value
          </label>
          <div className="relative">
            <InputGroup>
              <HashtagIcon className="size-4" />
              <Input
                ref={valueInputRef}
                id={`value-${paletteState.id}`}
                name="value"
                value={String(paletteState.value)}
                onChange={handlePaletteChange}
                pattern="[0-9A-Fa-f]{6}"
                min={6}
                max={6}
                required
                invalid={!isHex(paletteState.value)}
              />
            </InputGroup>
          </div>
          <ColorPicker
            color={paletteState.value}
            onChange={handleColorPickerChange}
            ringStyle={ringStyle}
          />
        </div>
        <div className="col-span-4 sm:col-span-1 flex justify-between items-end gap-2">
          <StopSelector
            current={paletteState.valueStop}
            palette={paletteState}
            onChange={(updatedPalette) => setPaletteState(updatedPalette)}
          />
          <Dropdown>
            <DropdownButton outline>
              <EllipsisHorizontalIcon className="size-4" />
              <span className="sr-only">Options</span>
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem onClick={handleCopyURL}>
                <LinkIcon className="size-4" />
                Copy URL
              </DropdownItem>
              <DropdownItem onClick={handleOpenAPI}>
                <CodeBracketIcon className="size-4" />
                Open API
              </DropdownItem>
              <DropdownItem onClick={() => setShowGraphs(!showGraphs)}>
                {" "}
                <AdjustmentsHorizontalIcon className="size-4" />
                {showGraphs ? "Hide" : "Show"} Graphs
              </DropdownItem>
              <DropdownItem
                onClick={() => deleteGlobal?.()}
                disabled={!deleteGlobal}
              >
                <TrashIcon className="size-4" />
                Delete Palette
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {tweakInputs.map((input) => (
          <div
            key={input.name}
            className="flex flex-col gap-1 justify-between focus-within:text-gray-900"
          >
            <label className={labelClasses} htmlFor={input.name}>
              {input.title}
            </label>
            <Input
              id={input.name}
              onChange={handleTweakChange}
              name={input.name}
              value={paletteState[input.name] ?? input.value}
              type="number"
              required
            />
          </div>
        ))}
        <div className="col-span-4 sm:col-span-1 p-2 flex justify-center items-center gap-1 border border-dashed border-gray-200">
          <span
            className={[
              labelClasses,
              paletteState.colorMode === "perceived" ? `` : `text-gray-900`,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="inline lg:hidden">Pe</span>
            <span className="hidden lg:inline">Perceived</span>
          </span>
          <Switch
            checked={paletteState.colorMode === "linear"}
            onChange={handleColorModeChange}
            style={{
              backgroundColor:
                paletteState.colorMode === "linear"
                  ? paletteState.swatches.find((swatch) => swatch.stop === 800)
                      ?.hex
                  : paletteState.swatches.find((swatch) => swatch.stop === 300)
                      ?.hex,
            }}
            className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 shrink-0"
          >
            <span className="sr-only">
              Toggle between Linear and Perceived modes
            </span>
            <span
              className={`${
                paletteState.colorMode === "linear"
                  ? "translate-x-6"
                  : "translate-x-1"
              } transition-transform duration-200 inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
          <span
            className={[
              labelClasses,
              paletteState.colorMode === "linear" ? `text-gray-900` : ``,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="inline lg:hidden">Li</span>
            <span className="hidden lg:inline">Linear</span>
          </span>
        </div>
      </div>

      {/* Расширенные опции с крутой типографикой */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <FancyColorControl
          label="🎨 Color Scheme"
          value={paletteState.colorScheme || "monochromatic"}
          options={COLOR_SCHEMES}
          onChange={(value: ColorScheme) => {
            setPaletteState({
              ...paletteState,
              colorScheme: value,
            });
          }}
          getLabel={(scheme) => scheme.charAt(0).toUpperCase() + scheme.slice(1).replace('-', ' ')}
          getIcon={getColorSchemeIcon}
          getGradient={getColorSchemeGradient}
        />

        <FancyColorControl
          label="🌡️ Temperature"
          value={paletteState.temperature || "neutral"}
          options={COLOR_TEMPERATURES}
          onChange={(value: ColorTemperature) => {
            setPaletteState({
              ...paletteState,
              temperature: value,
            });
          }}
          getLabel={(temp) => temp.charAt(0).toUpperCase() + temp.slice(1)}
          getIcon={getTemperatureIcon}
          getGradient={getTemperatureGradient}
        />

        <FancyColorControl
          label="⚡ Contrast"
          value={paletteState.contrast || "auto"}
          options={CONTRAST_LEVELS}
          onChange={(value: ContrastLevel) => {
            setPaletteState({
              ...paletteState,
              contrast: value,
            });
          }}
          getLabel={(level) => level.charAt(0).toUpperCase() + level.slice(1)}
          getIcon={getContrastIcon}
          getGradient={getContrastGradient}
        />
      </div>

      <div className="grid gap-1 grid-cols-11 sm:grid-cols-4 lg:grid-cols-11 sm:gap-2 text-2xs sm:text-xs">
        {paletteState.swatches
          .filter((swatch) => ![0, 1000].includes(swatch.stop))
          .map((swatch) => (
            <Swatch
              active={swatch.stop === paletteState.valueStop}
              key={swatch.stop}
              swatch={swatch}
              mode={currentMode}
              stopSelection={paletteState.stopSelection}
              isPremium={isPremium}
              onClick={(clickedSwatch) => {
                setPaletteState({
                  ...paletteState,
                  value: clickedSwatch.hex.replace("#", ""),
                  valueStop: clickedSwatch.stop,
                  stopSelection: "manual",
                  swatches: createSwatches({
                    ...paletteState,
                    value: clickedSwatch.hex.replace("#", ""),
                    valueStop: clickedSwatch.stop,
                    stopSelection: "manual",
                  }),
                });
              }}
            />
          ))}
      </div>
      {showGraphs && <Graphs palettes={[paletteState]} mode={currentMode} />}
    </article>
  );
}
