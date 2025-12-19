import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";
import * as Headless from "@headlessui/react";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "~/components/catalyst/button";
import { MODES, VERSIONS } from "~/lib/constants";
import { output } from "~/lib/responses";
import type { Mode, PaletteConfig, Version } from "~/types";
import { Radio } from "~/components/catalyst/radio";
import { useState } from "react";

type OutputProps = {
  palettes: PaletteConfig[];
  currentMode: Mode;
  setCurrentMode: (mode: Mode) => void;
  currentVersion: Version;
  setCurrentVersion: (version: Version) => void;
};

export default function Output({
  palettes,
  currentMode,
  setCurrentMode,
  currentVersion,
  setCurrentVersion,
}: OutputProps) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const shaped = output(palettes, currentMode);

  const displayed: string =
    currentVersion === "3"
      ? createVersion3Config(shaped)
      : createVersion4Config(shaped);

  const handleCopy = async () => {
    await copy(displayed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Headless.Fieldset className="flex gap-3">
          <Headless.Legend className="text-base/6 font-medium sm:text-sm/6">
            Tailwind CSS Version:
          </Headless.Legend>
          <Headless.RadioGroup
            onChange={(v) => setCurrentVersion(v as Version)}
            name="version"
            value={currentVersion}
            className="flex gap-3"
          >
            {VERSIONS.map((version) => (
              <Headless.Field key={version} className="flex items-center gap-2">
                <Radio value={version} />
                <Headless.Label className="text-base/6 select-none sm:text-sm/6 font-mono whitespace-nowrap">
                  {version}
                </Headless.Label>
              </Headless.Field>
            ))}
          </Headless.RadioGroup>
        </Headless.Fieldset>
      </div>
      <div className="flex flex-col gap-2">
        <Headless.Fieldset className="flex gap-3">
          <Headless.Legend className="text-base/6 font-medium sm:text-sm/6">
            Output color mode:
          </Headless.Legend>
          <Headless.RadioGroup
            onChange={(v) => setCurrentMode(v as Mode)}
            name="mode"
            value={currentMode}
            className="flex gap-3"
          >
            {MODES.map((mode) => (
              <Headless.Field key={mode} className="flex items-center gap-2">
                <Radio value={mode} />
                <Headless.Label className="text-base/6 select-none sm:text-sm/6 font-mono whitespace-nowrap">
                  {mode}
                </Headless.Label>
              </Headless.Field>
            ))}
          </Headless.RadioGroup>
        </Headless.Fieldset>
      </div>

      <section
        id="output"
        className="relative w-full p-4 mx-auto bg-gray-50 text-gray-800 text-sm border border-gray-200 rounded-lg overflow-scroll"
      >
        <div className="absolute right-4 top-4 flex gap-2">
          <Button outline onClick={handleCopy}>
            {copied ? (
              <CheckIcon className="size-4 text-green-600" />
            ) : (
              <ClipboardDocumentIcon className="size-4" />
            )}
            <span className="sr-only">Copy to Clipboard</span>
          </Button>
        </div>
        <div className="pr-20">
          {currentVersion === "3" ? (
            <pre className="whitespace-pre-wrap break-all">{formatVersion3Output(shaped)}</pre>
          ) : (
            <pre className="whitespace-pre-wrap break-all">{displayed}</pre>
          )}
        </div>
      </section>
      <div className="prose">
        {currentVersion === "3" ? (
          <p>
            Paste this into your <code>tailwind.config.js</code> file
          </p>
        ) : (
          <p>
            Paste this into the <code>css</code> file with your Tailwind config
          </p>
        )}
      </div>
    </>
  );
}

function formatVersion3Output(colors: Record<string, any>) {
  const output = [`// Copy and paste this into your tailwind.config.js`, `module.exports = {`, `  theme: {`, `    extend: {`, `      colors: {`];

  Object.entries(colors).forEach(([paletteName, shades], index) => {
    output.push(`        "${paletteName}": {`);
    Object.entries(shades as Record<string, string>).forEach(([shade, value]) => {
      const isLast = index === Object.keys(colors).length - 1 &&
                    shade === Object.keys(shades).pop();
      const comma = isLast ? '' : ',';
      output.push(`          ${shade}: "${value}"${comma}`);
    });
    const isLastPalette = index === Object.keys(colors).length - 1;
    const comma = isLastPalette ? '' : ',';
    output.push(`        }${comma}`);
  });

  output.push(`      },`, `    },`, `  },`, `};`);

  return output.join('\n');
}

function createVersion3Config(colors: Record<string, string>) {
  return JSON.stringify({ colors }, null, 2).replace(
    /"+[0-9]+"/g,
    function (m) {
      return m.replace(/"/g, "");
    },
  );
}

function createVersion4Config(colors: Record<string, any>) {
  const output = [`/* Copy and paste this into your CSS file with Tailwind CSS v4 */`, `@theme {`];

  Object.entries(colors).forEach(([colorName, shades]) => {
    output.push(`  /* ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} colors */`);
    Object.entries(shades as Record<string, string>).forEach(([shade, value]) => {
      const cleanValue = value.toLocaleLowerCase().replace(" / <alpha-value>", "");
      output.push(`  --color-${colorName}-${shade}: ${cleanValue};`);
    });
    output.push(""); // Empty line between palettes
  });

  output.push(`}`);

  return output.join('\n');
}
