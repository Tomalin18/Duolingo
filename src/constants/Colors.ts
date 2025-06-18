// Duolingo-inspired Color Palette
export const Colors = {
  // Primary Colors
  primary: '#58CC02',
  primaryDark: '#4CAF50',
  primaryLight: '#89E219',
  
  // Secondary Colors
  secondary: '#FFC107',
  secondaryDark: '#FF9600',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9600',
  error: '#FF4B4B',
  info: '#2196F3',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Text Colors
  textPrimary: '#3C3C3C',
  textSecondary: '#777777',
  textLight: '#AAAAAA',
  textOnPrimary: '#FFFFFF',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundGray: '#E5E5E5',
  
  // Border Colors
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  borderDark: '#CCCCCC',
  
  // Duolingo Character Colors
  duoGreen: '#58CC02',
  duoOrange: '#FF9600',
  duoBlue: '#1CB0F6',
  duoPurple: '#CE82FF',
  duoRed: '#FF4B4B',
  duoYellow: '#FFD43B',
  
  // Japanese Learning Specific
  hiragana: '#FF6B6B',
  katakana: '#4ECDC4',
  kanji: '#45B7D1',
  vocabulary: '#96CEB4',
  grammar: '#FFEAA7',
  
  // Lesson Status Colors
  locked: '#CCCCCC',
  available: '#58CC02',
  completed: '#4CAF50',
  perfect: '#FFD700',
  
  // Streak Colors
  streak: '#FF6B35',
  streakBackground: '#FFF5F5',
} as const;

export type ColorKey = keyof typeof Colors; 