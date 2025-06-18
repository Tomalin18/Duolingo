import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Spacing } from '../../constants/Spacing';

interface DailyGoalProps {
  targetMinutes: number;
  completedMinutes: number;
  streakDays: number;
  onGoalPress: () => void;
}

const DailyGoal: React.FC<DailyGoalProps> = ({
  targetMinutes,
  completedMinutes,
  streakDays,
  onGoalPress,
}) => {
  const progress = Math.min((completedMinutes / targetMinutes) * 100, 100);
  const isCompleted = completedMinutes >= targetMinutes;

  return (
    <TouchableOpacity style={styles.container} onPress={onGoalPress}>
      {/* 標題區域 */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>每日目標</Text>
          <Text style={styles.subtitle}>
            {isCompleted ? '今日目標已達成！' : `還需 ${targetMinutes - completedMinutes} 分鐘`}
          </Text>
        </View>
        <View style={styles.streakContainer}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>{streakDays}</Text>
        </View>
      </View>

      {/* 進度條 */}
      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {completedMinutes} / {targetMinutes} 分鐘
          </Text>
          <Text style={styles.percentageText}>
            {Math.round(progress)}%
          </Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${progress}%` },
                isCompleted && styles.progressBarCompleted
              ]} 
            />
          </View>
        </View>
      </View>

      {/* 目標選項 */}
      <View style={styles.goalOptions}>
        <Text style={styles.goalOptionsText}>調整目標：</Text>
        <View style={styles.goalButtons}>
          {[5, 10, 15, 20].map((minutes) => (
            <View
              key={minutes}
              style={[
                styles.goalButton,
                targetMinutes === minutes && styles.goalButtonActive
              ]}
            >
              <Text
                style={[
                  styles.goalButtonText,
                  targetMinutes === minutes && styles.goalButtonTextActive
                ]}
              >
                {minutes}分
              </Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    // 陰影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
  },
  streakContainer: {
    alignItems: 'center',
    backgroundColor: Colors.streakBackground,
    borderRadius: 20,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  streakIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  streakText: {
    ...Typography.styles.caption,
    fontWeight: 'bold',
    color: Colors.streak,
  },
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  progressText: {
    ...Typography.styles.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  percentageText: {
    ...Typography.styles.body,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  progressBarCompleted: {
    backgroundColor: Colors.success,
  },
  goalOptions: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.md,
  },
  goalOptionsText: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  goalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalButton: {
    flex: 1,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  goalButtonActive: {
    backgroundColor: Colors.primary,
  },
  goalButtonText: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  goalButtonTextActive: {
    color: Colors.white,
  },
});

export default DailyGoal; 