import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import it from './locales/it.json';
import ko from './locales/ko.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import th from './locales/th.json';
import vi from './locales/vi.json';

// Create I18n instance
const i18n = new I18n({
  en,
  es,
  fr,
  de,
  pt,
  it,
  ko,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  th,
  vi,
});

// Default to English if translation is missing
i18n.fallbacks = true;
i18n.defaultLocale = 'en';

// Storage key for saved language
const LANGUAGE_STORAGE_KEY = 'user_language';

// Set initial locale based on device settings or saved preference
export const initializeI18n = async (): Promise<void> => {
  try {
    // Try to get saved language from storage
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      i18n.locale = savedLanguage;
    } else {
      // Use device locale or fallback to English
      const deviceLocale = Localization.locale;
      const languageCode = deviceLocale.split('-')[0];
      
      if (isLanguageSupported(languageCode)) {
        i18n.locale = languageCode;
      } else if (isLanguageSupported(deviceLocale)) {
        i18n.locale = deviceLocale;
      } else {
        i18n.locale = 'en';
      }
    }
  } catch (error) {
    console.warn('Failed to initialize i18n:', error);
    i18n.locale = 'en';
  }
};

// Change language and save to storage
export const changeLanguage = async (languageCode: string): Promise<void> => {
  if (isLanguageSupported(languageCode)) {
    i18n.locale = languageCode;
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }
};

// Get current language
export const getCurrentLanguage = (): string => {
  return i18n.locale;
};

// Check if language is supported
export const isLanguageSupported = (languageCode: string): boolean => {
  return Object.keys(i18n.translations).includes(languageCode);
};

// Get available languages
export const getAvailableLanguages = () => {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
    { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  ];
};

// Translation function with type safety
export const t = (key: string, options?: any): string => {
  return i18n.t(key, options);
};

// Export the i18n instance
export default i18n; 