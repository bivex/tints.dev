import { SparklesIcon } from "@heroicons/react/24/solid";
import React from "react";

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <div className="bg-first-100 text-first-500 dark:bg-first-900 dark:text-first-100 text-xs leading-none font-bold inline-flex items-center gap-2 rounded-full py-1.5 px-2">
      <SparklesIcon className="w-3 h-auto" />
      {label}
    </div>
  );
}