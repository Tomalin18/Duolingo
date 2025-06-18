import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Spacing } from '../../constants/Spacing';

interface ProgressIndicatorsProps {
  hearts: number;
  maxHearts: number;
  gems: number;
  xpProgress: number; // 0-100 百分比
  currentLevel: number;
}

const ProgressIndicators: React.FC<ProgressIndicatorsProps> = ({
  hearts,
  maxHearts,
  gems,
  xpProgress,
  currentLevel,
}) => {
  return (
    <View style={styles.container}>
      {/* 心心指標 */}
      <View style={styles.indicator}>
        <View style={styles.iconContainer}>
          <Text style={styles.heartIcon}>❤️</Text>
        </View>
        <Text style={styles.indicatorText}>
          {hearts}/{maxHearts}
        </Text>
      </View>

      {/* 寶石指標 */}
      <View style={styles.indicator}>
        <View style={styles.iconContainer}>
          <Text style={styles.gemIcon}>💎</Text>
        </View>
        <Text style={styles.indicatorText}>{gems}</Text>
      </View>

      {/* 等級進度條 */}
      <View style={styles.levelContainer}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelText}>等級 {currentLevel}</Text>
          <Text style={styles.progressText}>{xpProgress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${xpProgress}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    // 陰影效果
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.xs,
  },
  heartIcon: {
    fontSize: 18,
  },
  gemIcon: {
    fontSize: 16,
  },
  indicatorText: {
    ...Typography.styles.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  levelContainer: {
    flex: 1,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  levelText: {
    ...Typography.styles.caption,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  progressText: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
});

export default ProgressIndicators; 