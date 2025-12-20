/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-20T16:13:25
 * Last Updated: 2025-12-20T16:38:00
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

import { ClipboardDocumentIcon, CheckIcon, EyeIcon, CodeBracketIcon, PaintBrushIcon, CubeIcon, SparklesIcon, SunIcon, MoonIcon, SwatchIcon } from "@heroicons/react/24/solid";
import * as Headless from "@headlessui/react";
import { useCopyToClipboard } from "usehooks-ts";

import { Button } from "~/components/catalyst/button";
import { MODES, VERSIONS } from "~/lib/constants";
import { output } from "~/lib/responses";
import type { Mode, PaletteConfig, Version } from "~/types";
import { Radio } from "~/components/catalyst/radio";
import { useState } from "react";
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "~/components/catalyst/dropdown";

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
  const [viewMode, setViewMode] = useState<'code' | 'visual'>('code');
  const [buttonStyleBatch, setButtonStyleBatch] = useState<'primary' | 'secondary' | 'accent'>('primary');
  const [paletteDetail, setPaletteDetail] = useState<'standard' | 'extended'>('standard');
  const [themeContext, setThemeContext] = useState<'light' | 'dark' | 'auto'>('auto');
  const shaped = output(palettes, currentMode, paletteDetail, themeContext);

  const displayed: string =
    currentVersion === "3"
      ? createVersion3Config(shaped, themeContext)
      : createVersion4Config(shaped, themeContext);

  const handleCopy = async () => {
    await copy(displayed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyWithTheme = async () => {
    const shapedWithTheme = output(palettes, currentMode, paletteDetail, themeContext);
    const displayedWithTheme = currentVersion === "3"
      ? createVersion3Config(shapedWithTheme)
      : createVersion4Config(shapedWithTheme);

    await copy(displayedWithTheme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyColor = async (color: string) => {
    await copy(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateButtonStyles = (batch: 'primary' | 'secondary' | 'accent') => {
    const paletteNames = Object.keys(shaped);

    return paletteNames.map(paletteName => {
      const shades = shaped[paletteName];

      let bgColor, hoverBgColor, textColor, borderColor;

      switch (batch) {
        case 'primary':
          bgColor = shades['600'] || shades['500'];
          hoverBgColor = shades['700'] || shades['600'];
          textColor = shades['50'] || '#ffffff';
          borderColor = bgColor;
          break;
        case 'secondary':
          bgColor = shades['100'] || shades['50'];
          hoverBgColor = shades['200'] || shades['100'];
          textColor = shades['900'] || shades['800'];
          borderColor = shades['300'] || shades['200'];
          break;
        case 'accent':
          bgColor = shades['500'];
          hoverBgColor = shades['600'] || shades['500'];
          textColor = shades['50'] || '#ffffff';
          borderColor = shades['400'] || shades['500'];
          break;
      }

      return {
        className: `${paletteName}-${batch}`,
        styles: `
.btn-${paletteName}-${batch} {
  background-color: ${bgColor};
  color: ${textColor};
  border: 1px solid ${borderColor};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-${paletteName}-${batch}:hover {
  background-color: ${hoverBgColor};
}

.btn-${paletteName}-${batch}:focus {
  outline: 2px solid ${borderColor};
  outline-offset: 2px;
}`
      };
    });
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

        <Headless.Fieldset className="flex gap-3">
          <Headless.Legend className="text-base/6 font-medium sm:text-sm/6">
            Palette detail:
          </Headless.Legend>
          <Headless.RadioGroup
            onChange={(v) => setPaletteDetail(v as 'standard' | 'extended')}
            name="detail"
            value={paletteDetail}
            className="flex gap-3"
          >
            <Headless.Field className="flex items-center gap-2">
              <Radio value="standard" />
              <Headless.Label className="text-base/6 select-none sm:text-sm/6 whitespace-nowrap">
                Standard (11 stops)
              </Headless.Label>
            </Headless.Field>
            <Headless.Field className="flex items-center gap-2">
              <Radio value="extended" />
              <Headless.Label className="text-base/6 select-none sm:text-sm/6 whitespace-nowrap">
                Extended (23 stops)
              </Headless.Label>
            </Headless.Field>
          </Headless.RadioGroup>
        </Headless.Fieldset>

        <Headless.Fieldset className="flex gap-3">
          <Headless.Legend className="text-base/6 font-medium sm:text-sm/6">
            Theme context:
          </Headless.Legend>
          <Headless.RadioGroup
            onChange={(v) => setThemeContext(v as 'light' | 'dark' | 'auto')}
            name="theme"
            value={themeContext}
            className="flex gap-3"
          >
            <Headless.Field className="flex items-center gap-2">
              <Radio value="auto" />
              <SwatchIcon className="size-4" />
              <Headless.Label className="text-base/6 select-none sm:text-sm/6 whitespace-nowrap">
                Auto (Universal)
              </Headless.Label>
            </Headless.Field>
            <Headless.Field className="flex items-center gap-2">
              <Radio value="light" />
              <SunIcon className="size-4" />
              <Headless.Label className="text-base/6 select-none sm:text-sm/6 whitespace-nowrap">
                Light Theme
              </Headless.Label>
            </Headless.Field>
            <Headless.Field className="flex items-center gap-2">
              <Radio value="dark" />
              <MoonIcon className="size-4" />
              <Headless.Label className="text-base/6 select-none sm:text-sm/6 whitespace-nowrap">
                Dark Theme
              </Headless.Label>
            </Headless.Field>
          </Headless.RadioGroup>
        </Headless.Fieldset>
      </div>

      <section
        id="output"
        className="relative w-full p-4 mx-auto bg-gray-50 text-gray-800 text-sm border border-gray-200 rounded-lg overflow-scroll"
      >
        <div className="absolute right-4 top-4 flex gap-2 z-10">
          <Button
            outline
            onClick={() => setViewMode(viewMode === 'code' ? 'visual' : 'code')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-white hover:bg-blue-50 shadow-md border-gray-300 font-medium transition-colors"
          >
            {viewMode === 'code' ? (
              <>
                <EyeIcon className="size-4" />
                <span>Visual</span>
              </>
            ) : (
              <>
                <CodeBracketIcon className="size-4" />
                <span>Code</span>
              </>
            )}
          </Button>
          {themeContext !== 'auto' && (
            <Button
              outline
              onClick={handleCopyWithTheme}
              className="flex items-center gap-2 px-3 py-2.5 text-sm bg-white hover:bg-purple-50 shadow-md border-gray-300 font-medium transition-colors"
            >
              {copied ? (
                <CheckIcon className="size-4 text-green-600" />
              ) : (
                <ClipboardDocumentIcon className="size-4" />
              )}
              <span className="hidden sm:inline">Copy ({themeContext})</span>
              <span className="sm:hidden">Copy</span>
            </Button>
          )}
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
          {viewMode === 'visual' ? (
            <VisualPalettePreview
              palettes={shaped}
              currentMode={currentMode}
              onCopyColor={handleCopyColor}
              copied={copied}
              paletteDetail={paletteDetail}
            />
          ) : (
            <>
              {currentVersion === "3" ? (
                <pre className="whitespace-pre-wrap break-all">{formatVersion3Output(shaped, themeContext)}</pre>
              ) : (
                <pre className="whitespace-pre-wrap break-all">{displayed}</pre>
              )}
            </>
          )}
        </div>
      </section>
      {/* Button Styles Generator */}
      <section className="w-full mt-6">
        <div className="flex items-center gap-4 mb-4">
          <PaintBrushIcon className="size-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Button Styles Generator</h3>
        </div>

        {/* Batch Selection */}
        <div className="flex gap-2 mb-4">
          <Button
            outline={buttonStyleBatch !== 'primary'}
            onClick={() => setButtonStyleBatch('primary')}
            className="flex items-center gap-2"
          >
            <CubeIcon className="size-4" />
            Primary
          </Button>
          <Button
            outline={buttonStyleBatch !== 'secondary'}
            onClick={() => setButtonStyleBatch('secondary')}
            className="flex items-center gap-2"
          >
            <SparklesIcon className="size-4" />
            Secondary
          </Button>
          <Button
            outline={buttonStyleBatch !== 'accent'}
            onClick={() => setButtonStyleBatch('accent')}
            className="flex items-center gap-2"
          >
            <PaintBrushIcon className="size-4" />
            Accent
          </Button>
        </div>

        {/* Generated Button Styles */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900 capitalize">
              {buttonStyleBatch} Button Styles
            </h4>
            <Button outline onClick={() => {
              const styles = generateButtonStyles(buttonStyleBatch);
              const cssText = styles.map(style => style.styles).join('\n\n');
              copy(cssText);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}>
              {copied ? (
                <CheckIcon className="size-4 text-green-600" />
              ) : (
                <ClipboardDocumentIcon className="size-4" />
              )}
              Copy CSS
            </Button>
          </div>

          <div className="space-y-4">
            {generateButtonStyles(buttonStyleBatch).map((style, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">{style.className}</span>
                  <Button
                    outline
                    size="sm"
                    onClick={() => {
                      copy(style.styles);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    <ClipboardDocumentIcon className="size-3" />
                  </Button>
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded border overflow-x-auto">
                  {style.styles}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="prose">
        <div className="flex items-center justify-between">
          <div>
            {currentVersion === "3" ? (
              <p>
                Paste this into your <code>tailwind.config.js</code> file
                {themeContext !== 'auto' && (
                  <span className="text-purple-600 font-medium">
                    {' '}(optimized for {themeContext} theme)
                  </span>
                )}
              </p>
            ) : (
              <p>
                Paste this into the <code>css</code> file with your Tailwind config
                {themeContext !== 'auto' && (
                  <span className="text-purple-600 font-medium">
                    {' '}(optimized for {themeContext} theme)
                  </span>
                )}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {viewMode === 'visual' ? (
              <span>Visual preview • Click colors to copy values</span>
            ) : (
              <span>
                Code view • {paletteDetail} • {themeContext} theme • Use eye icon for visual preview
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function VisualPalettePreview({
  palettes,
  currentMode,
  onCopyColor,
  copied,
  paletteDetail
}: {
  palettes: Record<string, any>;
  currentMode: Mode;
  onCopyColor: (color: string) => void;
  copied: boolean;
  paletteDetail: 'standard' | 'extended';
}) {
  return (
    <div className="space-y-8">
      {Object.entries(palettes).map(([paletteName, shades]) => (
        <div key={paletteName} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {paletteName.replace(/-/g, ' ')}
          </h3>
          <div className={`grid gap-2 ${paletteDetail === 'extended'
            ? 'grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 xl:grid-cols-13'
            : 'grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11'
          }`}>
            {Object.entries(shades as Record<string, string>).map(([shade, colorValue]) => (
              <div
                key={shade}
                className="flex flex-col items-center space-y-2 p-2 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onCopyColor(colorValue)}
              >
                <div
                  className="w-12 h-12 rounded-md border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: colorValue.replace(' / <alpha-value>', '') }}
                  title={`${paletteName}-${shade}: ${colorValue}`}
                />
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-700">{shade}</div>
                  <div className="text-xs text-gray-500 font-mono truncate max-w-16">
                    {colorValue.length > 12 ? `${colorValue.substring(0, 12)}...` : colorValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(palettes).length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <EyeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No palettes to preview</h3>
          <p className="mt-1 text-sm text-gray-500">
            Generate some color palettes to see the visual preview here.
          </p>
        </div>
      )}
    </div>
  );
}

function formatVersion3Output(colors: Record<string, any>, themeContext?: string) {
  const themeNote = themeContext && themeContext !== 'auto' ? `// Theme: ${themeContext} (optimized for ${themeContext} interfaces)\n` : '';

  const output = [
    `// ==========================================================================`,
    `// ${Object.keys(colors).length} Custom Color Palette${Object.keys(colors).length > 1 ? 's' : ''}`,
    `// Generated by tints.dev`,
    `// Copy and paste this into your tailwind.config.js`,
    themeNote,
    `// ==========================================================================`,
    ``,
    `module.exports = {`,
    `  theme: {`,
    `    extend: {`,
    `      colors: {`
  ];

  Object.entries(colors).forEach(([paletteName, shades], index) => {
    const paletteTitle = paletteName.charAt(0).toUpperCase() + paletteName.slice(1).replace(/-/g, ' ');
    output.push(`        // ${paletteTitle} Colors`);
    output.push(`        "${paletteName}": {`);

    const shadeEntries = Object.entries(shades as Record<string, string>);
    shadeEntries.forEach(([shade, value], shadeIndex) => {
      const isLastShade = shadeIndex === shadeEntries.length - 1;
      const comma = isLastShade ? '' : ',';
      output.push(`          ${shade}: "${value}"${comma}`);
    });

    const isLastPalette = index === Object.keys(colors).length - 1;
    const comma = isLastPalette ? '' : ',';
    output.push(`        }${comma}`);

    // Add empty line between palettes, but not after the last one
    if (!isLastPalette) {
      output.push(``);
    }
  });

  output.push(`      },`, `    },`, `  },`, `};`, ``);

  return output.join('\n');
}

function createVersion3Config(colors: Record<string, any>, themeContext?: string) {
  const config = JSON.stringify({ colors }, null, 2).replace(
    /"+[0-9]+"/g,
    function (m) {
      return m.replace(/"/g, "");
    },
  );

  const themeNote = themeContext && themeContext !== 'auto' ? `// Theme: ${themeContext} (optimized for ${themeContext} interfaces)\n` : '';

  return themeNote + config;
}

function createVersion4Config(colors: Record<string, any>, themeContext?: string) {
  const themeNote = themeContext && themeContext !== 'auto' ? ` * Theme: ${themeContext} (optimized for ${themeContext} interfaces)` : '';

  const output = [
    `/* ==========================================================================`,
    ` * ${Object.keys(colors).length} Custom Color Palette${Object.keys(colors).length > 1 ? 's' : ''}`,
    ` * Generated by tints.dev`,
    ` * Copy and paste this into your CSS file with Tailwind CSS v4`,
    themeNote,
    ` * ========================================================================== */`,
    ``,
    `@theme {`
  ];

  Object.entries(colors).forEach(([colorName, shades], paletteIndex) => {
    const paletteTitle = colorName.charAt(0).toUpperCase() + colorName.slice(1).replace(/-/g, ' ');
    output.push(`  /* ${paletteTitle} Colors */`);

    Object.entries(shades as Record<string, string>).forEach(([shade, value]) => {
      const cleanValue = value.toLocaleLowerCase().replace(" / <alpha-value>", "");
      output.push(`  --color-${colorName}-${shade}: ${cleanValue};`);
    });

    // Add empty line between palettes, but not after the last one
    if (paletteIndex < Object.keys(colors).length - 1) {
      output.push("");
    }
  });

  output.push(`}`, ``);

  return output.join('\n');
}
