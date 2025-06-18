import { Platform } from 'react-native';

export const Typography = {
  // Font Families
  fonts: {
    regular: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'System',
      android: 'Roboto-Medium',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'System',
    }),
    japanese: Platform.select({
      ios: 'Hiragino Sans',
      android: 'Noto Sans CJK JP',
      default: 'sans-serif',
    }),
  },

  // Font Sizes
  sizes: {
    tiny: 10,
    small: 12,
    body: 14,
    medium: 16,
    large: 18,
    title: 20,
    heading: 24,
    display: 32,
    hero: 48,
  },

  // Line Heights
  lineHeights: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Font Weights
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Text Styles
  styles: {
    h1: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
    // Japanese specific styles
    japanese: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    japaneseTitle: {
      fontSize: 20,
      fontWeight: '500' as const,
      lineHeight: 28,
    },
    kana: {
      fontSize: 24,
      fontWeight: '400' as const,
      lineHeight: 32,
    },
    kanji: {
      fontSize: 28,
      fontWeight: '400' as const,
      lineHeight: 36,
    },
  },
} as const;

export type FontFamily = keyof typeof Typography.fonts;
export type FontSize = keyof typeof Typography.sizes;
export type FontWeight = keyof typeof Typography.weights;
export type TextStyle = keyof typeof Typography.styles; 