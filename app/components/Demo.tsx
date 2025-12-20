// tints.dev/app/components/Demo.tsx
import React, { useState } from "react"; // Explicitly import React
import type { PaletteConfig } from "~/types";
import { Button } from "~/components/catalyst/button";
import { ToggleSwitch } from "~/components/ToggleSwitch";
import { FeatureCard } from "~/components/FeatureCard";
import { CallToActionSection } from "~/components/CallToActionSection";
import { Rating } from "~/components/Rating";
import { Tag } from "~/components/Tag";
import { ColorPicker } from "~/components/ColorPicker";
import Graphs from "~/components/Graphs";
import DistributionGraph from "~/components/DistributionGraph";
import SquareGraph from "~/components/SquareGraph";
import { Prose } from "~/components/Prose";
import { Swatch } from "~/components/Swatch";
import { Dot } from "~/components/Dot";
import { XMarkIcon, SparklesIcon, ChartBarIcon, PaletteIcon } from "@heroicons/react/24/solid";
import { MODES } from "~/lib/constants";

interface DemoProps {
  close: () => void;
  palette: PaletteConfig;
  title: string;
  description: string;
  features: { label: string; value: string; }[];
  callToActionButtons: { label: string; onClick: () => void; }[];
  imageUrl: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  tags?: string[];
  palettes?: PaletteConfig[];
}

export default function Demo(props: DemoProps) {
  const {
    close,
    palette,
    title,
    description,
    features,
    callToActionButtons,
    imageUrl,
    isDarkMode,
    onToggleDarkMode,
    tags,
    palettes = [palette],
  } = props;

  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(true);

  return (
    <section className="fixed inset-0 pointer-events-none w-screen h-screen z-50 flex flex-col justify-end items-center px-2 md:px-0">
      {/* Close button */}
      <div className="relative container z-10 w-full p-4 flex items-center justify-end pointer-events-auto">
        <Button id="close-demo" onClick={close}>
          <XMarkIcon className="size-4" />
          Close Demo
        </Button>
      </div>

      {/* Background 'screen */}
      <div className="absolute inset-0 top-auto from-gray-900 via-gray-900/50 to-gray-900/0 bg-linear-to-t mix-blend-multiply h-[75vh]" />

      {/* Demo container */}
      <div
        className={[
          `relative container mx-auto border-gray-800 border-16 border-b-0 pb-0 rounded-t-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3 md:min-h-[50vh] pointer-events-auto bg-linear-to-b`,
          isDarkMode
            ? `dark from-first-800 to-first-900`
            : `from-white to-first-100`,
        ].join(` `)}
      >
        <div className="absolute z-10 p-4 md:p-12">
          <ToggleSwitch isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
        </div>
        <img
          loading="lazy"
          style={{ clipPath: `polygon(0 0, 100% 0%, 75% 100%, 0% 100%)` }}
          className="bg-first-100 md:absolute top-0 md:bottom-0 w-11/12 md:w-1/3 h-24 md:h-full object-cover"
          src={imageUrl}
          width="400"
          height="800"
          alt={title}
        />

        <div className="md:col-span-2 md:col-start-2 p-4 md:p-12 flex flex-col items-start gap-4 md:gap-8">
          {tags?.length > 0 && <Tag label={tags[0]} />}

          <h2 className="text-3xl md:text-5xl font-bold text-first-500 dark:text-first-400 leading-none">
            {title}
          </h2>

          {/* Interactive Demo Toggle */}
          <div className="flex items-center gap-4 w-full">
            <Button
              onClick={() => setShowInteractiveDemo(!showInteractiveDemo)}
              className="flex items-center gap-2"
            >
              {showInteractiveDemo ? <XMarkIcon className="size-4" /> : <SparklesIcon className="size-4" />}
              {showInteractiveDemo ? 'Hide' : 'Show'} Interactive Demo
            </Button>
          </div>

          {showInteractiveDemo ? (
            <>
              {/* Color Picker Demo */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <PaletteIcon className="size-5 text-blue-500" />
                  Interactive Color Picker
                </h3>
                <div className="flex items-center gap-4">
                  <ColorPicker
                    color={selectedColor}
                    onChange={setSelectedColor}
                    lightnessId="demo-lightness"
                  />
                  <div className="flex flex-col gap-2">
                    <div
                      className="w-16 h-16 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <code className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {selectedColor}
                    </code>
                  </div>
                </div>
              </div>

              {/* Swatches and Dots Demo */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <ChartBarIcon className="size-5 text-green-500" />
                  Color Swatches & Visualization
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Swatches</h4>
                    <div className="flex gap-2 flex-wrap">
                      {palette.swatches.slice(0, 8).map((swatch, index) => (
                        <Swatch key={index} swatch={swatch} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Color Dots</h4>
                    <div className="flex gap-2 flex-wrap">
                      {palette.swatches.slice(0, 6).map((swatch, index) => (
                        <Dot key={index} swatch={swatch} size="large" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphs Demo */}
              {palettes.length > 0 && (
                <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                    <ChartBarIcon className="size-5 text-purple-500" />
                    Color Analysis Graphs
                  </h3>
                  <Graphs palettes={palettes} mode={MODES[0]} />
                </div>
              )}

              {/* Sample Content with Prose */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sample Documentation</h3>
                <Prose blocks={[
                  {
                    _type: 'block',
                    children: [
                      {
                        _type: 'span',
                        text: 'This is a comprehensive demo showcasing various design elements available in the tints.dev component library. You can interact with the color picker above, explore different visualizations, and see how components work together.'
                      }
                    ]
                  },
                  {
                    _type: 'block',
                    children: [
                      {
                        _type: 'span',
                        text: 'The library provides extensive customization options for color palettes, interactive elements, and data visualization components that work seamlessly together.'
                      }
                    ]
                  }
                ]} />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              <div className="flex flex-col md:col-span-1 lg:col-span-2">
                <p className="text-gray-600 dark:text-first-50 md:text-lg max-w-sm mb-4">
                  {description}
                </p>
                <CallToActionSection buttons={callToActionButtons} />
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <div className="grid grid-cols-1 gap-2 rounded-xl bg-first-500 text-white p-2 shadow-first-200 dark:shadow-first-900 shadow-lg">
                  <div className="flex gap-4">
                    {features.map((feature, index) => (
                      <FeatureCard key={index} label={feature.label} value={feature.value} />
                    ))}
                  </div>
                  <Rating stars={5} text="Rated 5 Stars" byline="By trusted research company" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
