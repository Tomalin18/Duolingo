import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
import { WelcomeStackParamList } from '../../types';
import { ANIMATION_DURATIONS } from '../../constants/WelcomeData';

type SplashScreenNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const breatheScale = useSharedValue(1);

  useEffect(() => {
    // Initial logo appearance
    logoOpacity.value = withTiming(1, { 
      duration: ANIMATION_DURATIONS.fadeIn,
      easing: Easing.out(Easing.quad)
    });
    
    logoScale.value = withSequence(
      withTiming(1.2, { 
        duration: ANIMATION_DURATIONS.fadeIn / 2,
        easing: Easing.out(Easing.back(1.7))
      }),
      withTiming(1, { 
        duration: ANIMATION_DURATIONS.fadeIn / 2,
        easing: Easing.out(Easing.quad)
      })
    );

    // Breathing animation
    const startBreathing = () => {
      breatheScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { 
            duration: ANIMATION_DURATIONS.breathe / 2,
            easing: Easing.inOut(Easing.quad)
          }),
          withTiming(1, { 
            duration: ANIMATION_DURATIONS.breathe / 2,
            easing: Easing.inOut(Easing.quad)
          })
        ),
        -1,
        false
      );
    };

    // Navigate to next screen
    const navigateToNext = () => {
      navigation.replace('LanguageSelection');
    };

    // Start breathing after initial animation
    const breathingTimeout = setTimeout(startBreathing, ANIMATION_DURATIONS.fadeIn);
    
    // Navigate after splash duration
    const navigationTimeout = setTimeout(() => {
      runOnJS(navigateToNext)();
    }, ANIMATION_DURATIONS.splash);

    return () => {
      clearTimeout(breathingTimeout);
      clearTimeout(navigationTimeout);
    };
  }, [navigation]);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [
        { scale: logoScale.value * breatheScale.value }
      ],
    };
  });

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryLight]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          {/* App Logo - Using text for now, replace with actual logo */}
          <View style={styles.logo}>
            <Text style={styles.logoText}>日</Text>
            <Text style={styles.logoSubtext}>Japanese</Text>
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    minWidth: 120,
    minHeight: 120,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
});

export default SplashScreen; 