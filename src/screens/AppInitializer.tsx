import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkOnboardingStatus } from '../context/OnboardingContext';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/Colors';

type AppInitializerNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AppInitializer: React.FC = () => {
  const navigation = useNavigation<AppInitializerNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if onboarding has been completed
        const onboardingCompleted = await checkOnboardingStatus();
        
        // Small delay for smooth transition
        setTimeout(() => {
          if (onboardingCompleted) {
            // User has completed onboarding, go to main app
            navigation.replace('Main');
          } else {
            // User needs to complete onboarding
            navigation.replace('Welcome');
          }
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Default to showing welcome flow on error
        navigation.replace('Welcome');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Simple loading screen - you can customize this */}
        <View style={styles.loadingContainer}>
          {/* Add loading spinner or logo here */}
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppInitializer; 