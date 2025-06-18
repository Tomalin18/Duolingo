import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingState, SupportedLanguage, LearningGoal, CurrentLevel, AgeRange, OnboardingProfile } from '../types';

interface OnboardingContextType {
  onboardingData: OnboardingState;
  updateLanguage: (language: SupportedLanguage) => void;
  updateGoal: (goal: LearningGoal) => void;
  updateLevel: (level: CurrentLevel) => void;
  updateAge: (age: AgeRange) => void;
  updateProfile: (profile: OnboardingProfile) => void;
  completeOnboarding: () => Promise<void>;
  resetOnboarding: () => void;
}

const defaultOnboardingData: OnboardingState = {
  selectedLanguage: 'english',
  learningGoal: 'regular',
  currentLevel: 'new',
  ageRange: '18-24',
  profile: {
    avatar: 1,
    name: '',
    isGuest: false,
  },
  isCompleted: false,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<OnboardingState>(defaultOnboardingData);

  const updateLanguage = (language: SupportedLanguage) => {
    setOnboardingData(prev => ({
      ...prev,
      selectedLanguage: language,
    }));
  };

  const updateGoal = (goal: LearningGoal) => {
    setOnboardingData(prev => ({
      ...prev,
      learningGoal: goal,
    }));
  };

  const updateLevel = (level: CurrentLevel) => {
    setOnboardingData(prev => ({
      ...prev,
      currentLevel: level,
    }));
  };

  const updateAge = (age: AgeRange) => {
    setOnboardingData(prev => ({
      ...prev,
      ageRange: age,
    }));
  };

  const updateProfile = (profile: OnboardingProfile) => {
    setOnboardingData(prev => ({
      ...prev,
      profile,
    }));
  };

  const completeOnboarding = async () => {
    try {
      const completedData = {
        ...onboardingData,
        isCompleted: true,
      };
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('onboardingData', JSON.stringify(completedData));
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      
      setOnboardingData(completedData);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const resetOnboarding = () => {
    setOnboardingData(defaultOnboardingData);
    AsyncStorage.removeItem('onboardingData');
    AsyncStorage.removeItem('onboardingCompleted');
  };

  const value: OnboardingContextType = {
    onboardingData,
    updateLanguage,
    updateGoal,
    updateLevel,
    updateAge,
    updateProfile,
    completeOnboarding,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// Helper function to check if onboarding is completed
export const checkOnboardingStatus = async (): Promise<boolean> => {
  try {
    const completed = await AsyncStorage.getItem('onboardingCompleted');
    return completed === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

// Helper function to load onboarding data
export const loadOnboardingData = async (): Promise<OnboardingState | null> => {
  try {
    const data = await AsyncStorage.getItem('onboardingData');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error loading onboarding data:', error);
    return null;
  }
}; 