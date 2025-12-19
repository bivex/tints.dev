import React from "react";

interface FeatureCardProps {
  label: string;
  value: string;
}

export function FeatureCard({ label, value }: FeatureCardProps) {
  return (
    <div className="flex-1 flex flex-col gap-1 p-2">
      <span className="text-3xl tracking-tight leading-none">
        {value}
      </span>
      <span className="text-xs font-bold text-first-100">
        {label}
      </span>
    </div>
  );
}