import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { LanguageOption } from '../../types';

interface FlagCardProps {
  language: LanguageOption;
  isSelected: boolean;
  onSelect: (languageCode: string) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const FlagCard: React.FC<FlagCardProps> = ({ language, isSelected, onSelect }) => {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(isSelected ? 2 : 0);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withTiming(0.95, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const handlePress = () => {
    runOnJS(onSelect)(language.code);
  };

  React.useEffect(() => {
    borderWidth.value = withSpring(isSelected ? 2 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderWidth: borderWidth.value,
      borderColor: Colors.primary,
    };
  });

  return (
    <AnimatedTouchable
      style={[styles.card, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{language.flag}</Text>
      </View>
      <Text style={styles.languageName} numberOfLines={2}>
        {language.nativeName}
      </Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    margin: 6,
  },
  flagContainer: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  flag: {
    fontSize: 24,
  },
  languageName: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 13,
    marginBottom: 4,
  },
});

export default FlagCard; 