import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { WelcomeStackParamList, CurrentLevel } from '../../types';
import { LEVEL_OPTIONS, ANIMATION_DURATIONS } from '../../constants/WelcomeData';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressIndicator from '../../components/welcome/ProgressIndicator';
import AnimatedButton from '../../components/welcome/AnimatedButton';
import LevelCard from '../../components/welcome/LevelCard';

type LevelAssessmentNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'LevelAssessment'>;

const LevelAssessmentScreen: React.FC = () => {
  const navigation = useNavigation<LevelAssessmentNavigationProp>();
  const { onboardingData, updateLevel } = useOnboarding();
  const [selectedLevel, setSelectedLevel] = useState<CurrentLevel | null>(onboardingData.currentLevel);
  
  const headerOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withDelay(100, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
    
    buttonOpacity.value = withDelay(500, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
  }, []);

  const handleLevelSelect = (levelId: CurrentLevel) => {
    setSelectedLevel(levelId);
    updateLevel(levelId);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      navigation.navigate('AgeSelection');
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: (1 - headerOpacity.value) * -20 }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ translateY: (1 - buttonOpacity.value) * 20 }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={3} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>How much Japanese do you know?</Text>
          <Text style={styles.subtitle}>This helps us personalize your learning path</Text>
        </Animated.View>

        <View style={styles.content}>
          {LEVEL_OPTIONS.map((level) => (
            <View key={level.id} style={styles.cardContainer}>
              <LevelCard
                level={level}
                isSelected={selectedLevel === level.id}
                onSelect={handleLevelSelect}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedLevel}
          fullWidth
          size="large"
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    marginBottom: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
});

export default LevelAssessmentScreen; 