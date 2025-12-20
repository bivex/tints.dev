/**
 * Copyright (c) 2025 Bivex
 *
 * Author: Bivex
 * Available for contact via email: support@b-b.top
 * For up-to-date contact information:
 * https://github.com/bivex
 *
 * Created: 2025-12-19T09:05:40
 * Last Updated: 2025-12-20T14:34:57
 *
 * Licensed under the MIT License.
 * Commercial licensing available upon request.
 */

// tints.dev/app/components/Demo.tsx
import React, { useState } from "react"; // Explicitly import React
import type { PaletteConfig } from "~/types";
import { Button } from "~/components/catalyst/button";
import { FeatureCard } from "~/components/FeatureCard";
import { CallToActionSection } from "~/components/CallToActionSection";
import { Rating } from "~/components/Rating";
import { Tag } from "~/components/Tag";
import ColorPicker from "~/components/ColorPicker";
import Graphs from "~/components/Graphs";
import DistributionGraph from "~/components/DistributionGraph";
import SquareGraph from "~/components/SquareGraph";
import { Prose } from "~/components/Prose";
import Swatch from "~/components/Swatch";
import Dot from "~/components/Dot";
import { ToggleSwitch } from "~/components/ToggleSwitch";
import { Input } from "~/components/catalyst/input";
import { Select } from "~/components/catalyst/select";
import { Radio, RadioField, RadioGroup } from "~/components/catalyst/radio";
import DivTemplates from "~/components/DivTemplates";
import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  DropdownHeader
} from "~/components/catalyst/dropdown";
import {
  XMarkIcon,
  SparklesIcon,
  ChartBarIcon,
  SwatchIcon,
  Cog6ToothIcon,
  UserIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  PhotoIcon,
  MusicalNoteIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  ArrowPathIcon,
  CodeBracketIcon
} from "@heroicons/react/24/solid";
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
  const [inputValue, setInputValue] = useState("Sample text");
  const [selectValue, setSelectValue] = useState("option1");
  const [radioValue, setRadioValue] = useState("option1");
  const [themeMode, setThemeMode] = useState(false);
  const [progressValue, setProgressValue] = useState(65);
  const [isChecked, setIsChecked] = useState(true);
  const [textareaValue, setTextareaValue] = useState("This is a sample text area with some content...");
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");

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
          {tags && tags.length > 0 && <Tag label={tags[0]} />}

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

            {/* Div Templates Toggle - Always available */}
            <div className="ml-auto">
              <Button
                onClick={() => {/* Div Templates are always visible now */}}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CodeBracketIcon className="size-4" />
                Div Templates
              </Button>
            </div>
          </div>

          {showInteractiveDemo ? (
            <>
              {/* Color Picker Demo */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <SwatchIcon className="size-5 text-blue-500" />
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
                        <Dot key={index} swatch={swatch} top={0} mode="hex" />
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

              {/* Form Controls Demo */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <DocumentTextIcon className="size-5 text-indigo-500" />
                  Form Controls
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Input Field
                      </label>
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type something..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Select Dropdown
                      </label>
                      <Select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Radio Buttons
                    </label>
                    <RadioGroup value={radioValue} onChange={setRadioValue}>
                      <RadioField>
                        <Radio value="option1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Option 1</span>
                      </RadioField>
                      <RadioField>
                        <Radio value="option2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Option 2</span>
                      </RadioField>
                      <RadioField>
                        <Radio value="option3" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Option 3</span>
                      </RadioField>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Buttons and Dropdowns Demo */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Cog6ToothIcon className="size-5 text-orange-500" />
                  Buttons & Dropdowns
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button>Default Button</Button>
                    <Button outline>Outline Button</Button>
                    <Button className="bg-red-600 hover:bg-red-700">Custom Button</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Success</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Dropdown>
                      <DropdownButton outline>
                        <span className="flex items-center gap-2">
                          Actions
                          <ChevronDownIcon className="size-4" />
                        </span>
                      </DropdownButton>
                      <DropdownMenu>
                        <DropdownHeader>Actions</DropdownHeader>
                        <DropdownItem>
                          <UserIcon className="size-4" />
                          Profile
                        </DropdownItem>
                        <DropdownItem>
                          <Cog6ToothIcon className="size-4" />
                          Settings
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem>
                          <DocumentTextIcon className="size-4" />
                          Documentation
                        </DropdownItem>
                        <DropdownItem>
                          <PhotoIcon className="size-4" />
                          Gallery
                        </DropdownItem>
                        <DropdownItem>
                          <MusicalNoteIcon className="size-4" />
                          Music
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Theme:</span>
                      <ToggleSwitch
                        isDarkMode={themeMode}
                        onToggle={() => setThemeMode(!themeMode)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress & Status Elements */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <ChartBarIcon className="size-5 text-purple-500" />
                  Progress & Status
                </h3>
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</label>
                      <span className="text-sm text-gray-500">{progressValue}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressValue}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progressValue}
                      onChange={(e) => setProgressValue(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>

                  {/* Loading Spinner */}
                  <div className="flex items-center gap-4">
                    <Button onClick={() => setIsLoading(!isLoading)}>
                      {isLoading ? 'Stop Loading' : 'Start Loading'}
                    </Button>
                    {isLoading && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <ArrowPathIcon className="size-5 animate-spin" />
                        <span className="text-sm">Loading...</span>
                      </div>
                    )}
                  </div>

                  {/* Alert Types */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Alert Types
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setAlertType("success")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Success
                        </Button>
                        <Button
                          onClick={() => setAlertType("warning")}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          Warning
                        </Button>
                        <Button
                          onClick={() => setAlertType("error")}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Error
                        </Button>
                        <Button
                          onClick={() => setAlertType("info")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Info
                        </Button>
                      </div>

                      {/* Alert Display */}
                      <div className={`p-4 rounded-lg border ${
                        alertType === "success"
                          ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400"
                          : alertType === "warning"
                          ? "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400"
                          : alertType === "error"
                          ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400"
                          : "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400"
                      }`}>
                        <div className="flex items-center gap-2">
                          {alertType === "success" && <CheckCircleIcon className="size-5" />}
                          {alertType === "warning" && <ExclamationTriangleIcon className="size-5" />}
                          {alertType === "error" && <XMarkIcon className="size-5" />}
                          {alertType === "info" && <InformationCircleIcon className="size-5" />}
                          <div>
                            <h4 className="font-medium capitalize">{alertType} Alert</h4>
                            <p className="text-sm opacity-90">
                              This is a sample {alertType} message to demonstrate the alert component.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Display & Forms */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <DocumentTextIcon className="size-5 text-green-500" />
                  Data & Forms
                </h3>
                <div className="space-y-6">
                  {/* Table */}
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Data Table</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Rating
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Project Alpha
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <StarIcon key={i} className={`size-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button outline className="text-xs px-2 py-1">Edit</Button>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              Project Beta
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400">
                                Pending
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <StarIcon key={i} className={`size-4 ${i < 3 ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button outline className="text-xs px-2 py-1">Edit</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Text Area
                    </label>
                    <textarea
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your message..."
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="demo-checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="demo-checkbox" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      I agree to the terms and conditions
                    </label>
                  </div>
                </div>
              </div>

              {/* Cards & Avatars */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <UserIcon className="size-5 text-indigo-500" />
                  Cards & Avatars
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* User Card */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        JD
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">John Doe</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 text-xs">Follow</Button>
                      <Button outline className="flex-1 text-xs">Message</Button>
                    </div>
                  </div>

                  {/* Product Card */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
                      <PhotoIcon className="size-8 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Premium Design</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">High-quality design system</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">$99</span>
                      <Button className="text-xs">Buy Now</Button>
                    </div>
                  </div>

                  {/* Stats Card */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <HeartIcon className="size-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">+12%</span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Likes</p>
                  </div>
                </div>

                {/* Avatar Group */}
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Team Members</h4>
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800">
                      A
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800">
                      B
                    </div>
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800">
                      C
                    </div>
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold border-2 border-white dark:border-gray-800">
                      D
                    </div>
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white dark:border-gray-800">
                      +5
                    </div>
                  </div>
                </div>
              </div>

              {/* Div Templates - Copy popular div patterns using generated palette colors */}
              <DivTemplates palette={palette} isDarkMode={isDarkMode} />

              {/* Sample Content with Prose */}
              <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sample Documentation</h3>
                <Prose blocks={[
                  {
                    _key: 'block-1',
                    _type: 'block',
                    style: 'normal',
                    children: [
                      {
                        _type: 'span',
                        text: 'This is a comprehensive demo showcasing various design elements available in the tints.dev component library. You can interact with the color picker above, explore different visualizations, and see how components work together.'
                      }
                    ]
                  },
                  {
                    _key: 'block-2',
                    _type: 'block',
                    style: 'normal',
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
                <div className="grid grid-cols-1 gap-2 rounded-xl bg-first-500 text-white p-2 shadow-first-200 dark:shadow-first-900 shadow-lg mb-6">
                  <div className="flex gap-4">
                    {features.map((feature, index) => (
                      <FeatureCard key={index} label={feature.label} value={feature.value} />
                    ))}
                  </div>
                  <Rating stars={5} text="Rated 5 Stars" byline="By trusted research company" />
                </div>

                {/* Div Templates - Available in both interactive and simple demo modes */}
                <DivTemplates palette={palette} isDarkMode={isDarkMode} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
