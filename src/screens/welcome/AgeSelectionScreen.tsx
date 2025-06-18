import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  Easing,
  withSpring,
  interpolateColor
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { WelcomeStackParamList, AgeRange } from '../../types';
import { AGE_OPTIONS, ANIMATION_DURATIONS } from '../../constants/WelcomeData';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressIndicator from '../../components/welcome/ProgressIndicator';
import AnimatedButton from '../../components/welcome/AnimatedButton';

type AgeSelectionNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'AgeSelection'>;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AgeSelectionScreen: React.FC = () => {
  const navigation = useNavigation<AgeSelectionNavigationProp>();
  const { onboardingData, updateAge } = useOnboarding();
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(onboardingData.ageRange);
  
  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Stagger animation entrance
    headerOpacity.value = withDelay(100, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
    
    contentOpacity.value = withDelay(300, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
    
    buttonOpacity.value = withDelay(500, withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    }));
  }, []);

  useEffect(() => {
    if (selectedAge) {
      buttonOpacity.value = withSpring(1);
    }
  }, [selectedAge]);

  const handleAgeSelect = (ageId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const age = ageId as AgeRange;
    setSelectedAge(age);
    updateAge(age);
  };

  const handleContinue = () => {
    if (selectedAge) {
      navigation.navigate('ProfileCreation');
    }
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: (1 - headerOpacity.value) * -20 }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateY: (1 - contentOpacity.value) * 30 }],
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
      transform: [{ translateY: (1 - buttonOpacity.value) * 20 }],
    };
  });

  const AgeOption: React.FC<{ option: typeof AGE_OPTIONS[0], index: number }> = ({ option, index }) => {
    const scale = useSharedValue(1);
    const selected = useSharedValue(selectedAge === option.id ? 1 : 0);

    const delay = index * ANIMATION_DURATIONS.stagger;

    useEffect(() => {
      selected.value = withSpring(selectedAge === option.id ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    }, [selectedAge]);

    const handlePressIn = () => {
      scale.value = withTiming(0.98, { duration: 150 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    };

    const animatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        selected.value,
        [0, 1],
        [Colors.white, '#E8F5E8']
      );

      const borderColor = interpolateColor(
        selected.value,
        [0, 1],
        [Colors.border, Colors.primary]
      );

      return {
        transform: [
          { scale: scale.value },
          { translateY: withDelay(delay, withTiming((1 - contentOpacity.value) * 20)) }
        ],
        backgroundColor,
        borderColor,
        borderWidth: 1 + selected.value * 1,
      };
    });

    return (
      <AnimatedTouchable
        style={[styles.ageOption, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleAgeSelect(option.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.ageText}>{option.label}</Text>
        <View style={[styles.radio, selectedAge === option.id && styles.radioSelected]}>
          {selectedAge === option.id && <View style={styles.radioInner} />}
        </View>
      </AnimatedTouchable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={4} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>How old are you?</Text>
          <Text style={styles.subtitle}>This helps us create age-appropriate content</Text>
        </Animated.View>

        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          {AGE_OPTIONS.map((option, index) => (
            <AgeOption key={option.id} option={option} index={index} />
          ))}
        </Animated.View>

        <Animated.View style={[styles.privacy, contentAnimatedStyle]}>
          <View style={styles.privacyCard}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <Text style={styles.privacyText}>
              Your age information is private and helps us personalize your learning experience
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedAge}
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
  ageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginVertical: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ageText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  privacy: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  privacyIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  privacyText: {
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

export default AgeSelectionScreen; 