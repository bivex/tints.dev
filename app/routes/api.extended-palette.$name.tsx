import type { LoaderFunctionArgs } from "react-router";
import { generateExtendedPalette, generateTailwindConfig } from "~/lib/generateExtendedPalette";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params;

  if (!name) {
    return new Response(JSON.stringify({ error: "Palette name is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Для демонстрации используем базовый цвет для pastel-analogous-2
    // В реальном приложении это можно брать из базы данных или конфигурации
    const baseColor = "#8B8B8B"; // Основной цвет из примера пользователя

    const extendedPalette = generateExtendedPalette(name, baseColor);
    const tailwindConfig = generateTailwindConfig(name, baseColor);

    return new Response(JSON.stringify({
      paletteName: name,
      baseColor,
      extendedPalette,
      tailwindConfig,
      description: `Extended UI palette configuration for ${name} with hover states, variants, gradients, and shadows`
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Failed to generate extended palette",
      details: error instanceof Error ? error.message : "Unknown error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};