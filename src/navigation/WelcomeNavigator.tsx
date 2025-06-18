import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeStackParamList } from '../types';

// Import Welcome Screens
import SplashScreen from '../screens/welcome/SplashScreen';
import LanguageSelectionScreen from '../screens/welcome/LanguageSelectionScreen';
import GoalSelectionScreen from '../screens/welcome/GoalSelectionScreen';
import LevelAssessmentScreen from '../screens/welcome/LevelAssessmentScreen';
import AgeSelectionScreen from '../screens/welcome/AgeSelectionScreen';
import ProfileCreationScreen from '../screens/welcome/ProfileCreationScreen';

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen 
        name="LanguageSelection" 
        component={LanguageSelectionScreen}
      />
      <Stack.Screen 
        name="GoalSelection" 
        component={GoalSelectionScreen}
      />
      <Stack.Screen 
        name="LevelAssessment" 
        component={LevelAssessmentScreen}
      />
      <Stack.Screen 
        name="AgeSelection" 
        component={AgeSelectionScreen}
      />
      <Stack.Screen 
        name="ProfileCreation" 
        component={ProfileCreationScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeNavigator; 