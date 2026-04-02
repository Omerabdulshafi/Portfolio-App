import { useTheme } from '../context/ThemeContext';

export const useThemeClasses = () => {
  const { theme } = useTheme();

  const getColorClass = (colorType, intensity = '600') => {
    const colorMap = {
      blue: `bg-blue-${intensity}`,
      red: `bg-red-${intensity}`,
      green: `bg-green-${intensity}`,
      purple: `bg-purple-${intensity}`,
      pink: `bg-pink-${intensity}`,
      indigo: `bg-indigo-${intensity}`,
      yellow: `bg-yellow-${intensity}`,
      orange: `bg-orange-${intensity}`,
      cyan: `bg-cyan-${intensity}`,
      teal: `bg-teal-${intensity}`
    };
    
    const color = theme[colorType] || 'blue';
    return colorMap[color] || `bg-blue-${intensity}`;
  };

  const getTextColorClass = (colorType, intensity = '600') => {
    const colorMap = {
      blue: `text-blue-${intensity}`,
      red: `text-red-${intensity}`,
      green: `text-green-${intensity}`,
      purple: `text-purple-${intensity}`,
      pink: `text-pink-${intensity}`,
      indigo: `text-indigo-${intensity}`,
      yellow: `text-yellow-${intensity}`,
      orange: `text-orange-${intensity}`,
      cyan: `text-cyan-${intensity}`,
      teal: `text-teal-${intensity}`
    };
    
    const color = theme[colorType] || 'blue';
    return colorMap[color] || `text-blue-${intensity}`;
  };

  const getFontFamily = () => {
    const fontMap = {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono'
    };
    return fontMap[theme.fontFamily] || 'font-sans';
  };

  const getFontSize = () => {
    const sizeMap = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg'
    };
    return sizeMap[theme.fontSize] || 'text-base';
  };

  return {
    getColorClass,
    getTextColorClass,
    getFontFamily,
    getFontSize,
    theme
  };
};
