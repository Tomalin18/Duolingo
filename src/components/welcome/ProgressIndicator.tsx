import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolateColor 
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { TOTAL_STEPS } from '../../constants/WelcomeData';

interface ProgressIndicatorProps {
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const progress = useSharedValue(currentStep / TOTAL_STEPS);

  React.useEffect(() => {
    progress.value = withSpring(currentStep / TOTAL_STEPS, {
      damping: 15,
      stiffness: 150,
    });
  }, [currentStep]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [Colors.border, Colors.primary]
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]} />
      </View>
      <View style={styles.dots}>
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
          const isActive = index < currentStep;
          const isCompleted = index < currentStep - 1;
          
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive && styles.dotActive,
                isCompleted && styles.dotCompleted,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  track: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    transform: [{ scale: 1.2 }],
  },
  dotCompleted: {
    backgroundColor: Colors.primaryDark,
  },
});

export default ProgressIndicator; 