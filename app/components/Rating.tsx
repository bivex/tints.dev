import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

interface RatingProps {
  stars: number;
  text: string;
  byline: string;
}

export function Rating({ stars, text, byline }: RatingProps) {
  return (
    <div className="bg-first-700 p-2 rounded-lg">
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center text-first-100 mb-2">
          {Array.from({ length: stars }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-auto" />
          ))}
        </div>
        <span className="text-3xl tracking-tight leading-none">
          {text}
        </span>
        <span className="text-xs font-bold text-first-100">
          {byline}
        </span>
      </div>
    </div>
  );
}