import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  runOnJS,
  interpolateColor
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/Colors';
import { LevelOption, CurrentLevel } from '../../types';

interface LevelCardProps {
  level: LevelOption;
  isSelected: boolean;
  onSelect: (levelId: CurrentLevel) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const LevelCard: React.FC<LevelCardProps> = ({ level, isSelected, onSelect }) => {
  const scale = useSharedValue(1);
  const selected = useSharedValue(isSelected ? 1 : 0);

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withTiming(0.98, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const handlePress = () => {
    runOnJS(onSelect)(level.id);
  };

  React.useEffect(() => {
    selected.value = withSpring(isSelected ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isSelected]);

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
      transform: [{ scale: scale.value }],
      backgroundColor,
      borderColor,
      borderWidth: 1 + selected.value * 1,
    };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 + selected.value * 0.1 }],
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
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Text style={styles.icon}>{level.icon}</Text>
        </Animated.View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{level.title}</Text>
          <Text style={styles.subtitle}>{level.subtitle}</Text>
          <Text style={styles.description}>{level.description}</Text>
        </View>
      </View>
      
      {level.showPlacementTest && (
        <View style={styles.placementTestContainer}>
          <Text style={styles.placementTestText}>
            We'll recommend a placement test
          </Text>
        </View>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  icon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '400',
    lineHeight: 18,
  },
  placementTestContainer: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  placementTestText: {
    fontSize: 13,
    color: Colors.info,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default LevelCard; 