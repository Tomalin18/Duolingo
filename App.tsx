import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeI18n } from './src/i18n';

export default function App() {
  useEffect(() => {
    // Initialize internationalization
    initializeI18n();
    
    // Load custom fonts
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        // You can add custom fonts here
        // 'NotoSansJP-Regular': require('./assets/fonts/NotoSansJP-Regular.ttf'),
        // 'NotoSansJP-Bold': require('./assets/fonts/NotoSansJP-Bold.ttf'),
      });
    } catch (error) {
      console.warn('Error loading fonts:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
} 