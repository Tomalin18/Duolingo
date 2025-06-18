import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Spacing } from '../../constants/Spacing';

interface LessonCardProps {
  id: string;
  title: string;
  titleJapanese: string;
  icon: string;
  progress: number; // 0-100
  isUnlocked: boolean;
  isCompleted: boolean;
  totalLessons: number;
  completedLessons: number;
  onPress: (lessonId: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  titleJapanese,
  icon,
  progress,
  isUnlocked,
  isCompleted,
  totalLessons,
  completedLessons,
  onPress,
}) => {
  const getCardStyle = () => {
    if (!isUnlocked) {
      return [styles.card, styles.cardLocked];
    }
    if (isCompleted) {
      return [styles.card, styles.cardCompleted];
    }
    return [styles.card, styles.cardAvailable];
  };

  const getIconStyle = () => {
    if (!isUnlocked) {
      return [styles.iconContainer, styles.iconLocked];
    }
    if (isCompleted) {
      return [styles.iconContainer, styles.iconCompleted];
    }
    return [styles.iconContainer, styles.iconAvailable];
  };

  const renderProgressCircle = () => {
    const circumference = 2 * Math.PI * 30; // radius = 30
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <Text style={styles.progressText}>
            {isCompleted ? '✓' : `${completedLessons}/${totalLessons}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getCardStyle()}
      onPress={() => isUnlocked && onPress(id)}
      disabled={!isUnlocked}
      activeOpacity={0.8}
    >
      {/* 課程圖示 */}
      <View style={getIconStyle()}>
        <Text style={styles.icon}>{isUnlocked ? icon : '🔒'}</Text>
      </View>

      {/* 課程資訊 */}
      <View style={styles.content}>
        <Text style={styles.titleJapanese}>{titleJapanese}</Text>
        <Text style={styles.title}>{title}</Text>
        
        {/* 進度資訊 */}
        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>
            {isCompleted 
              ? '已完成' 
              : isUnlocked 
                ? `${completedLessons}/${totalLessons} 課程`
                : '未解鎖'
            }
          </Text>
        </View>
      </View>

      {/* 進度圓圈 */}
      {isUnlocked && renderProgressCircle()}

      {/* 完成徽章 */}
      {isCompleted && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>完成</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    // 陰影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardAvailable: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardCompleted: {
    backgroundColor: Colors.success,
  },
  cardLocked: {
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconAvailable: {
    backgroundColor: Colors.primary,
  },
  iconCompleted: {
    backgroundColor: Colors.white,
  },
  iconLocked: {
    backgroundColor: Colors.locked,
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  titleJapanese: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLabel: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
  },
  progressContainer: {
    marginLeft: Spacing.sm,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  progressText: {
    ...Typography.styles.caption,
    fontWeight: 'bold',
    color: Colors.primary,
    fontSize: 10,
  },
  completedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  completedBadgeText: {
    ...Typography.styles.caption,
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default LessonCard; 