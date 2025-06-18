import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import IntroScreen from '../screens/IntroScreen';
import LoadingScreen from '../screens/LoadingScreen';
import WelcomeNavigator from './WelcomeNavigator';
import AppInitializer from '../screens/AppInitializer';
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import PracticeScreen from '../screens/PracticeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LessonScreen from '../screens/LessonScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import ListeningExerciseScreen from '../screens/ListeningExerciseScreen';
import TranslationExerciseScreen from '../screens/TranslationExerciseScreen';
import ResultsScreen from '../screens/ResultsScreen';

// Import types
import { RootStackParamList, TabParamList } from '../types';

// Import colors
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator Component
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Spacing.dimensions.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          // We'll add icons later
        }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{
          tabBarLabel: 'Learn',
        }}
      />
      <Tab.Screen 
        name="Practice" 
        component={PracticeScreen}
        options={{
          tabBarLabel: 'Practice',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
              screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="AppInitializer"
    >
        <Stack.Screen 
          name="AppInitializer" 
          component={AppInitializer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
        />
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen}
        />
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen}
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
        />
        <Stack.Screen 
          name="Lesson" 
          component={LessonScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: Colors.white,
            },
            headerTintColor: Colors.textPrimary,
          }}
        />
        <Stack.Screen 
          name="Exercise" 
          component={ExerciseScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: '',
            headerStyle: {
              backgroundColor: Colors.white,
            },
            headerTintColor: Colors.textPrimary,
            gestureEnabled: false, // Prevent back gesture during exercises
          }}
        />
        <Stack.Screen 
          name="ListeningExercise" 
          component={ListeningExerciseScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="TranslationExercise" 
          component={TranslationExerciseScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // Prevent back gesture on results
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 