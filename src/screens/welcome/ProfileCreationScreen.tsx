import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Alert
} from 'react-native';
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
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { WelcomeStackParamList } from '../../types';
import { ANIMATION_DURATIONS } from '../../constants/WelcomeData';
import { useOnboarding } from '../../context/OnboardingContext';
import ProgressIndicator from '../../components/welcome/ProgressIndicator';
import AnimatedButton from '../../components/welcome/AnimatedButton';

type ProfileCreationNavigationProp = NativeStackNavigationProp<WelcomeStackParamList, 'ProfileCreation'>;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

// Placeholder avatar data - replace with actual images
const AVATAR_OPTIONS = [
  { id: 1, emoji: '😊', name: 'Happy' },
  { id: 2, emoji: '😎', name: 'Cool' },
  { id: 3, emoji: '🤓', name: 'Smart' },
  { id: 4, emoji: '😸', name: 'Cute' },
  { id: 5, emoji: '💪', name: 'Strong' },
  { id: 6, emoji: '😂', name: 'Funny' },
  { id: 7, emoji: '🧠', name: 'Wise' },
  { id: 8, emoji: '🦸', name: 'Brave' },
];

const ProfileCreationScreen: React.FC = () => {
  const navigation = useNavigation<ProfileCreationNavigationProp>();
  const { onboardingData, updateProfile, completeOnboarding } = useOnboarding();
  const [selectedAvatar, setSelectedAvatar] = useState<number>(onboardingData.profile.avatar);
  const [name, setName] = useState<string>(onboardingData.profile.name);
  const [isGuest, setIsGuest] = useState<boolean>(onboardingData.profile.isGuest);
  
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

  const handleAvatarSelect = (avatarId: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedAvatar(avatarId);
    updateProfile({
      avatar: avatarId,
      name,
      isGuest,
    });
  };

  const handleCreateAccount = async () => {
    if (!name.trim() && !isGuest) {
      Alert.alert('Name Required', 'Please enter your name or continue as guest');
      return;
    }
    
    // Update profile and complete onboarding
    updateProfile({
      avatar: selectedAvatar,
      name: name.trim(),
      isGuest: false,
    });
    
    await completeOnboarding();
    
    // Navigate to main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' as any }],
    });
  };

  const handleContinueAsGuest = async () => {
    updateProfile({
      avatar: selectedAvatar,
      name: 'Guest',
      isGuest: true,
    });
    
    await completeOnboarding();
    
    // Navigate to main app as guest
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' as any }],
    });
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

  const AvatarOption: React.FC<{ avatar: typeof AVATAR_OPTIONS[0], index: number }> = ({ avatar, index }) => {
    const scale = useSharedValue(1);
    const selected = useSharedValue(selectedAvatar === avatar.id ? 1 : 0);

    useEffect(() => {
      selected.value = withSpring(selectedAvatar === avatar.id ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    }, [selectedAvatar]);

    const handlePressIn = () => {
      scale.value = withTiming(0.95, { duration: 150 });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value * (1 + selected.value * 0.1) }],
        borderWidth: 2 + selected.value * 2,
        borderColor: selected.value > 0 ? Colors.primary : Colors.border,
      };
    });

    return (
      <AnimatedTouchable
        style={[styles.avatarOption, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => handleAvatarSelect(avatar.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.avatarEmoji}>{avatar.emoji}</Text>
      </AnimatedTouchable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={5} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.title}>Create your profile</Text>
          <Text style={styles.subtitle}>Choose an avatar and tell us your name</Text>
        </Animated.View>

        <Animated.View style={[styles.content, contentAnimatedStyle]}>
          {/* Avatar Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose your avatar</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_OPTIONS.map((avatar, index) => (
                <AvatarOption key={avatar.id} avatar={avatar} index={index} />
              ))}
            </View>
          </View>

          {/* Name Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's your name?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Enter your name"
                placeholderTextColor={Colors.textSecondary}
                value={name}
                onChangeText={setName}
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>✨</Text>
            <Text style={styles.infoText}>
              Your profile helps us personalize your Japanese learning journey
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
        <AnimatedButton
          title="Create Account"
          onPress={handleCreateAccount}
          disabled={!name.trim()}
          fullWidth
          size="large"
          style={styles.createButton}
        />
        
        <AnimatedButton
          title="Continue as Guest"
          onPress={handleContinueAsGuest}
          variant="text"
          fullWidth
          size="medium"
          style={styles.guestButton}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nameInput: {
    height: 56,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
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
  createButton: {
    marginBottom: 12,
  },
  guestButton: {
    marginTop: 8,
  },
});

export default ProfileCreationScreen; 