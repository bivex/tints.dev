import React from "react";
import chroma from "chroma-js";
import { DEFAULT_MODE } from "~/lib/constants";
import { createDisplayColor } from "~/lib/createDisplayColor";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import type { Mode, SwatchValue } from "~/types";

type SwatchProps = {
  swatch: SwatchValue;
  mode?: Mode;

  active?: boolean;
  onClick?: (swatch: SwatchValue) => void;
  stopSelection?: "auto" | "manual";
  isPremium?: boolean; // Флаг премиум палитры для специальных эффектов
};

export default function Swatch(props: SwatchProps) {
  const {
    swatch,
    active = false,
    mode = DEFAULT_MODE,
    onClick,
    stopSelection = "auto",
    isPremium = false,
  } = props;

  const [isRippling, setIsRippling] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isPremium) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 600);
    }
    onClick?.(swatch);
  };

  let display = createDisplayColor(swatch.hex, mode);

  const ringStyle = { backgroundColor: display || `transparent` };

  // Создаем динамическую цветную тень на основе цвета свотча
  const chromaColor = chroma(swatch.hex);
  const hsl = chromaColor.hsl();
  const hue = hsl[0];
  const saturation = hsl[1];
  const lightness = hsl[2];

  // Определяем цвет тени на основе hue
  let shadowColor = 'rgb(0 0 0 / 0.1)'; // по умолчанию черная тень
  if (hue >= 0 && hue < 60) {
    shadowColor = 'rgb(255 165 0 / 0.2)'; // оранжевая тень для желтых/оранжевых
  } else if (hue >= 60 && hue < 120) {
    shadowColor = 'rgb(0 255 0 / 0.2)'; // зеленая тень для зеленых
  } else if (hue >= 120 && hue < 180) {
    shadowColor = 'rgb(0 255 255 / 0.2)'; // голубая тень для голубых
  } else if (hue >= 180 && hue < 240) {
    shadowColor = 'rgb(0 0 255 / 0.2)'; // синяя тень для синих
  } else if (hue >= 240 && hue < 300) {
    shadowColor = 'rgb(255 0 255 / 0.2)'; // magenta тень для magenta
  } else {
    shadowColor = 'rgb(255 0 0 / 0.2)'; // красная тень для красных
  }

  // Премиум эффекты: более насыщенные тени и дополнительные эффекты
  const premiumShadowColor = hue >= 0 && hue < 60 ? 'rgb(255 215 0 / 0.4)' : // золотая для теплых
                             hue >= 60 && hue < 180 ? 'rgb(0 255 128 / 0.4)' : // изумрудная для зеленых/голубых
                             'rgb(255 0 128 / 0.4)'; // розовая для холодных

  const baseClasses = "h-12 xl:h-16 w-full rounded-lg flex flex-col items-center justify-center transition-all duration-500 cursor-pointer relative";
  const shadowClasses = isPremium
    ? `shadow-2xl hover:shadow-3xl transform hover:scale-110 hover:-translate-y-2 ${active ? 'ring-4 ring-white/60 ring-offset-2 ring-offset-current shadow-white/20' : 'hover:ring-4 hover:ring-white/40'} border border-white/20`
    : `shadow-md hover:shadow-lg transform hover:scale-102 hover:-translate-y-0.5 ${active ? 'ring-2 ring-white/70' : 'hover:ring-2 hover:ring-white/50'} border border-white/10`;

  const dynamicShadowStyle = isPremium ? {
    boxShadow: active
      ? `0 25px 50px -12px ${premiumShadowColor}, 0 0 0 3px rgba(255,255,255,0.3)`
      : `0 10px 25px -5px ${premiumShadowColor}, 0 0 0 1px rgba(255,255,255,0.1)`
  } : {
    boxShadow: active
      ? `0 10px 25px -5px ${shadowColor}, 0 0 0 2px rgba(255,255,255,0.5)`
      : `0 4px 12px -2px ${shadowColor}`
  };

  return (
    <div className="flex-1 flex flex-col gap-2 sm:gap-1">
      <div
        className={`${baseClasses} ${shadowClasses} backdrop-blur-sm overflow-hidden group relative`}
        style={{ ...ringStyle, ...dynamicShadowStyle }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick({} as any);
          }
        }}
      >
        {/* Премиум shimmer эффект */}
        {isPremium && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out opacity-0 group-hover:opacity-100" />
        )}

        {/* Премиум inner glow для активных элементов */}
        {isPremium && active && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent animate-pulse" />
            {/* Дополнительный outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-400/20 blur-sm animate-pulse" style={{ transform: 'scale(1.1)' }} />
          </>
        )}

        {/* Премиум floating particles для hover */}
        {isPremium && (
          <>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-100" />
            <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-300" />
            <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-yellow-300/50 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-500" />
          </>
        )}

        {/* Премиум ripple эффект при клике */}
        {isPremium && isRippling && (
          <div className="absolute inset-0 bg-white/30 rounded-lg animate-ping" />
        )}

        <div data-active={active} className={`text-white relative z-10 drop-shadow-lg transition-all duration-300 ${isPremium ? 'filter brightness-110' : ''} ${active && isPremium ? 'scale-110' : ''}`}>
          {active && (
            <div className={`relative ${isPremium ? 'animate-pulse' : ''}`}>
              {stopSelection === "manual" ? (
                <LockClosedIcon className="size-5" />
              ) : (
                <LockOpenIcon className={`size-5 ${isPremium ? 'animate-bounce' : ''}`} />
              )}
              {/* Премиум glowing effect для активных иконок */}
              {isPremium && (
                <div className="absolute inset-0 bg-white/30 rounded-full blur-sm animate-ping" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="rotate-90 text-right sm:rotate-0 flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center justify-center">
        <div className={`font-mono text-sm transition-all duration-300 px-2 py-1 rounded-md backdrop-blur-sm ${
          isPremium
            ? `font-bold text-gray-900 dark:text-white bg-white/20 dark:bg-gray-800/40 shadow-lg border border-white/30 ${
                active ? 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-900 dark:text-yellow-100 animate-pulse' : ''
              }`
            : `text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-700/30 ${
                active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''
              }`
        }`}>
          {swatch.stop}
          {/* Премиум звездочка для активных стопов */}
          {isPremium && active && (
            <span className="ml-1 text-yellow-400 animate-spin">⭐</span>
          )}
        </div>
      </div>
    </div>
  );
}
