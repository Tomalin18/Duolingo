export const Spacing = {
  // Base spacing unit (8px)
  base: 8,
  
  // Common spacing values
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  // Screen margins
  screenHorizontal: 20,
  screenVertical: 24,
  
  // Component specific spacing
  buttonPadding: {
    horizontal: 24,
    vertical: 12,
  },
  
  cardPadding: {
    horizontal: 16,
    vertical: 16,
  },
  
  listItemPadding: {
    horizontal: 16,
    vertical: 12,
  },
  
  // Border radius
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    round: 50,
    circle: 9999,
  },
  
  // Shadows (for elevation)
  shadows: {
    small: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  
  // Common dimensions
  dimensions: {
    headerHeight: 56,
    tabBarHeight: 60,
    buttonHeight: 48,
    inputHeight: 44,
    avatarSize: 40,
    iconSize: 24,
    progressBarHeight: 8,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
export type BorderRadiusKey = keyof typeof Spacing.borderRadius;
export type ShadowKey = keyof typeof Spacing.shadows; 