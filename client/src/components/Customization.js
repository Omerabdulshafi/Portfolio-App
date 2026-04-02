import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaCog, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

const Customization = () => {
  const { theme, updateTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const colors = ['blue', 'red', 'green', 'purple', 'pink', 'indigo', 'yellow', 'orange', 'cyan', 'teal'];
  const fontFamilies = [
    { id: 'sans', label: 'Sans-serif' },
    { id: 'serif', label: 'Serif' },
    { id: 'mono', label: 'Monospace' }
  ];
  const fontSizes = [
    { id: 'sm', label: 'Small' },
    { id: 'base', label: 'Medium' },
    { id: 'lg', label: 'Large' }
  ];

  const handleColorChange = (colorType, color) => {
    updateTheme({ [colorType]: color });
  };

  const handleFontChange = (property, value) => {
    updateTheme({ [property]: value });
  };

  const handleReset = () => {
    resetTheme();
  };

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      red: 'bg-red-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      yellow: 'bg-yellow-500',
      orange: 'bg-orange-500',
      cyan: 'bg-cyan-500',
      teal: 'bg-teal-500'
    };
    return colorMap[color] || 'bg-blue-500';
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-primary fixed bottom-6 right-6 p-3 rounded-full shadow-lg hover:opacity-90 transition z-40 flex items-center justify-center"
        aria-label="Customize"
      >
        <FaCog className="text-xl" />
      </button>

      {/* Customization Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-80 max-h-96 overflow-y-auto z-40 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Customize Theme</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          {/* Primary Color */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Primary Color</label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange('primaryColor', color)}
                  className={`w-10 h-10 rounded-lg border-2 transition ${getColorClass(color)} ${
                    theme.primaryColor === color ? 'border-black' : 'border-transparent'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Secondary Color */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Secondary Color</label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange('secondaryColor', color)}
                  className={`w-10 h-10 rounded-lg border-2 transition ${getColorClass(color)} ${
                    theme.secondaryColor === color ? 'border-black' : 'border-transparent'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Accent Color</label>
            <div className="grid grid-cols-5 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorChange('accentColor', color)}
                  className={`w-10 h-10 rounded-lg border-2 transition ${getColorClass(color)} ${
                    theme.accentColor === color ? 'border-black' : 'border-transparent'
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Font Family</label>
            <div className="space-y-2">
              {fontFamilies.map(font => (
                <button
                  key={font.id}
                  onClick={() => handleFontChange('fontFamily', font.id)}
                  className={`w-full px-3 py-2 rounded text-left transition ${
                    theme.fontFamily === font.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2">Font Size</label>
            <div className="space-y-2">
              {fontSizes.map(size => (
                <button
                  key={size.id}
                  onClick={() => handleFontChange('fontSize', size.id)}
                  className={`w-full px-3 py-2 rounded text-left transition ${
                    theme.fontSize === size.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="mb-5 flex items-center justify-between">
            <label className="block text-sm font-semibold">Dark Mode</label>
            <button
              onClick={() => updateTheme({ darkMode: !theme.darkMode })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                theme.darkMode ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  theme.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold"
          >
            Reset to Default
          </button>
        </div>
      )}
    </>
  );
};

export default Customization;
