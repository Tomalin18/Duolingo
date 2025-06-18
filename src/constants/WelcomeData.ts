import { LanguageOption, GoalOption, LevelOption, AvatarOption } from '../types';

// Language options with flags and names
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'english',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
  },
  {
    code: 'spanish',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
  },
  {
    code: 'french',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
  },
  {
    code: 'german',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
  },
  {
    code: 'portuguese',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
  },
  {
    code: 'italian',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
  },
  {
    code: 'korean',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
  },
  {
    code: 'chinese-simplified',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
  },
  {
    code: 'chinese-traditional',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
  },
  {
    code: 'thai',
    name: 'Thai',
    nativeName: 'ไทย',
    flag: '🇹🇭',
  },
  {
    code: 'vietnamese',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
];

// Learning goal options
export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'casual',
    title: 'Casual',
    subtitle: '5 min/day',
    minutes: 5,
    icon: '🌱',
  },
  {
    id: 'regular',
    title: 'Regular',
    subtitle: '10 min/day',
    minutes: 10,
    icon: '⚡',
    isDefault: true,
  },
  {
    id: 'serious',
    title: 'Serious',
    subtitle: '15 min/day',
    minutes: 15,
    icon: '🔥',
  },
  {
    id: 'intense',
    title: 'Intense',
    subtitle: '20 min/day',
    minutes: 20,
    icon: '🏆',
  },
];

// Current level options
export const LEVEL_OPTIONS: LevelOption[] = [
  {
    id: 'new',
    title: 'NEW',
    subtitle: "I'm new to Japanese",
    description: 'Perfect for complete beginners',
    icon: '👶',
  },
  {
    id: 'some',
    title: 'SOME',
    subtitle: 'I know some Japanese',
    description: 'I can say hello and a few basic words',
    icon: '🌱',
    showPlacementTest: true,
  },
  {
    id: 'much',
    title: 'MUCH',
    subtitle: 'I know much Japanese',
    description: 'I can have basic conversations',
    icon: '🌟',
    showPlacementTest: true,
  },
];

// Age range options
export const AGE_OPTIONS = [
  { id: 'under13', label: 'Under 13' },
  { id: '13-17', label: '13-17' },
  { id: '18-24', label: '18-24' },
  { id: '25-34', label: '25-34' },
  { id: '35-49', label: '35-49' },
  { id: '50+', label: '50+' },
];

// Avatar options - using emoji placeholders for now
export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 1, source: '😊', name: 'Happy' },
  { id: 2, source: '😎', name: 'Cool' },
  { id: 3, source: '🤓', name: 'Smart' },
  { id: 4, source: '😸', name: 'Cute' },
  { id: 5, source: '💪', name: 'Strong' },
  { id: 6, source: '😂', name: 'Funny' },
  { id: 7, source: '🧠', name: 'Wise' },
  { id: 8, source: '🦸', name: 'Brave' },
];

// Animation constants
export const ANIMATION_DURATIONS = {
  splash: 2000,
  breathe: 2000,
  fadeIn: 800,
  slideIn: 600,
  scalePress: 150,
  stagger: 100,
};

// Progress steps
export const TOTAL_STEPS = 5; 