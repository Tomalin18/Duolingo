import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
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
import { WelcomeStackParamList, SupportedLanguage } from '../../types';
import { LANGUAGE_OPTIONS, ANIMATION_DURATIONS } from '../../constants/WelcomeData';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressIndicator from '../../components/welcome/ProgressIndicator';
import AnimatedButton from '../../components/welcome/AnimatedButton';
import FlagCard from '../../components/welcome/FlagCard';

type LanguageSelectionNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'LanguageSelection'>;

const LanguageSelectionScreen: React.FC = () => {
  const navigation = useNavigation<LanguageSelectionNavigationProp>();
  const { onboardingData, updateLanguage } = useOnboarding();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(onboardingData.selectedLanguage);
  
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
    // Animate button when selection changes
    if (selectedLanguage) {
      buttonOpacity.value = withSpring(1);
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageCode: string) => {
    const language = languageCode as SupportedLanguage;
    setSelectedLanguage(language);
    updateLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      navigation.navigate('GoalSelection');
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

  const renderLanguageCard = ({ item, index }: { item: typeof LANGUAGE_OPTIONS[0], index: number }) => {
    return (
      <FlagCard
        language={item}
        isSelected={selectedLanguage === item.code}
        onSelect={handleLanguageSelect}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={1} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>I want to learn Japanese</Text>
          <Text style={styles.subtitle}>Choose your native language</Text>
        </Animated.View>

        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          <FlatList
            data={LANGUAGE_OPTIONS}
            renderItem={renderLanguageCard}
            keyExtractor={(item) => item.code}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
          />
        </Animated.View>
      </ScrollView>

      <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
        <AnimatedButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedLanguage}
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
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.white,
  },
});

export default LanguageSelectionScreen; 