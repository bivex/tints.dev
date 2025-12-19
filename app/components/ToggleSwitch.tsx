import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ToggleSwitchProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ isDarkMode, onToggle }: ToggleSwitchProps) {
  return (
    <button
      className={`rounded-full p-2 bg-white dark:bg-first-900 text-first-500 hover:bg-first-500 hover:text-white transition-colors duration-200`}
      type="button"
      onClick={onToggle}
    >
      {isDarkMode ? (
        <SunIcon className="w-5 h-auto" />
      ) : (
        <MoonIcon className="w-5 h-auto" />
      )}
    </button>
  );
}