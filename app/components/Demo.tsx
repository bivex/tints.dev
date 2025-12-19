// tints.dev/app/components/Demo.tsx
import React from "react"; // Explicitly import React
import type { PaletteConfig } from "~/types";
import { Button } from "~/components/catalyst/button";
import { ToggleSwitch } from "~/components/ToggleSwitch";
import { FeatureCard } from "~/components/FeatureCard";
import { CallToActionSection } from "~/components/CallToActionSection";
import { Rating } from "~/components/Rating";
import { Tag } from "~/components/Tag";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
  } = props;

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
        </div>
      </div>
    </section>
  );
}
