import React from "react";
import { Button } from "~/components/catalyst/button";

interface CallToActionButtonsProps {
  buttons: { label: string; onClick: () => void; }[];
}

export function CallToActionSection({ buttons }: CallToActionButtonsProps) {
  return (
    <div className="flex items-center justify-start gap-2">
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={button.onClick}
          className={`py-3 px-4 leading-none rounded-sm font-bold text-sm transition-colors duration-200 hover:cursor-pointer ${
            index === 0
              ? `bg-first-500 text-white hover:bg-first-100 hover:text-first-600`
              : `bg-white text-first-500 hover:bg-first-100 hover:text-first-600`
          }`}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}