import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  Easing,
  withSpring
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { WelcomeStackParamList, LearningGoal } from '../../types';
import { GOAL_OPTIONS, ANIMATION_DURATIONS } from '../../constants/WelcomeData';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressIndicator from '../../components/welcome/ProgressIndicator';
import AnimatedButton from '../../components/welcome/AnimatedButton';
import GoalCard from '../../components/welcome/GoalCard';

type GoalSelectionNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'GoalSelection'>;

const GoalSelectionScreen: React.FC = () => {
  const navigation = useNavigation<GoalSelectionNavigationProp>();
  const { onboardingData, updateGoal } = useOnboarding();
  const [selectedGoal, setSelectedGoal] = useState<LearningGoal>(onboardingData.learningGoal);
  
  const headerOpacity = useSharedValue(0);
  const cardsOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Stagger animation entrance
    headerOpacity.value = withDelay(100, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
    
    cardsOpacity.value = withDelay(300, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
    
    buttonOpacity.value = withDelay(500, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
  }, []);

  const handleGoalSelect = (goalId: LearningGoal) => {
    setSelectedGoal(goalId);
    updateGoal(goalId);
  };

  const handleContinue = () => {
    navigation.navigate('LevelAssessment');
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: (1 - headerOpacity.value) * -20 }],
    };
  });

  const cardsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardsOpacity.value,
      transform: [{ translateY: (1 - cardsOpacity.value) * 30 }],
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
      <ProgressIndicator currentStep={2} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>What's your goal?</Text>
          <Text style={styles.subtitle}>Choose your daily learning commitment</Text>
        </Animated.View>

        <Animated.View style={[styles.content, cardsAnimatedStyle]}>
          {GOAL_OPTIONS.map((goal, index) => {
            const delay = index * ANIMATION_DURATIONS.stagger;
            
            return (
              <Animated.View
                key={goal.id}
                style={[
                  styles.cardContainer,
                  {
                    opacity: cardsOpacity.value,
                    transform: [
                      { 
                        translateX: withDelay(
                          delay, 
                          withSpring((1 - cardsOpacity.value) * 50)
                        )
                      }
                    ],
                  },
                ]}
              >
                <GoalCard
                  goal={goal}
                  isSelected={selectedGoal === goal.id}
                  onSelect={handleGoalSelect}
                />
              </Animated.View>
            );
          })}
        </Animated.View>

        <Animated.View style={[styles.info, cardsAnimatedStyle]}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              You can always change your goal later in settings
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
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
    marginBottom: 4,
  },
  info: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
});

export default GoalSelectionScreen; 