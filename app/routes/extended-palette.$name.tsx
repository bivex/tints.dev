import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { generateExtendedPalette, generateTailwindConfig } from "~/lib/generateExtendedPalette";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { name } = params;

  if (!name) {
    throw new Response("Palette name is required", { status: 400 });
  }

  try {
    // Для демонстрации используем базовый цвет для pastel-analogous-2
    const baseColor = "#8B8B8B";

    const extendedPalette = generateExtendedPalette(name, baseColor);
    const tailwindConfig = generateTailwindConfig(name, baseColor);

    return {
      paletteName: name,
      baseColor,
      extendedPalette,
      tailwindConfig,
    };
  } catch (error) {
    throw new Response("Failed to generate extended palette", { status: 500 });
  }
};

export default function ExtendedPalettePage() {
  const { paletteName, baseColor, extendedPalette, tailwindConfig } = useLoaderData<typeof loader>();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Extended Palette: {paletteName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Base color: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{baseColor}</code>
          </p>
        </div>

        {/* Основная палитра */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Main Color Scale
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(extendedPalette[paletteName]).map(([stop, color]) => (
              <div key={stop} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
                  style={{ backgroundColor: `oklch(${color})` }}
                />
                <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                  {stop}
                </div>
                <div className="text-xs font-mono text-gray-500 dark:text-gray-400 break-all">
                  {color}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* UI состояния */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            UI States
          </h2>
          <div className="space-y-8">
            {Object.entries(extendedPalette.ui).map(([state, colors]) => (
              <div key={state}>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 capitalize">
                  {state} States
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Object.entries(colors).map(([stop, color]) => (
                    <div key={stop} className="text-center">
                      <div
                        className="w-full h-12 rounded border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: `oklch(${color})` }}
                      />
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
                        {stop}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Варианты */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Variants
          </h2>
          <div className="space-y-8">
            {Object.entries(extendedPalette.variants).map(([variant, colors]) => (
              <div key={variant}>
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 capitalize">
                  {variant} Variant
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Object.entries(colors).map(([stop, color]) => (
                    <div key={stop} className="text-center">
                      <div
                        className="w-full h-12 rounded border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: `oklch(${color})` }}
                      />
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-1">
                        {stop}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Градиенты */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Gradients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(extendedPalette.gradients).map(([name, gradient]) => (
              <div key={name} className="text-center">
                <div
                  className="w-full h-20 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
                  style={{ background: gradient }}
                />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {name.replace(`${paletteName}-gradient-`, '').replace('-', ' ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tailwind Config */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Tailwind Configuration
          </h2>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
            <button
              onClick={() => copyToClipboard(tailwindConfig)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <pre className="text-sm">
              <code>{tailwindConfig}</code>
            </pre>
          </div>
        </section>

        {/* Использование */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Usage Examples
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basic Colors:</h4>
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  bg-{paletteName}-500, text-{paletteName}-700
                </code>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">UI States:</h4>
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  hover:bg-{paletteName}-ui-hover-500, focus:bg-{paletteName}-ui-focus-500
                </code>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Variants:</h4>
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  bg-{paletteName}-light-400, bg-{paletteName}-dark-600
                </code>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Gradients:</h4>
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  bg-{paletteName}-gradient-primary
                </code>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shadows:</h4>
                <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  shadow-{paletteName}-md
                </code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}