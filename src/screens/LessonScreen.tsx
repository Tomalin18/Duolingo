import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  StatusBar 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Spacing } from '../constants/Spacing';
import { japaneseLessons, type LessonData } from '../data/japaneseData';
import type { RootStackParamList } from '../types';

type LessonScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LessonScreen: React.FC = () => {
  const navigation = useNavigation<LessonScreenNavigationProp>();
  const route = useRoute();
  const [lesson, setLesson] = useState<LessonData | null>(null);

  // 從路由參數獲取課程 ID
  const lessonId = (route.params as any)?.lessonId;

  useEffect(() => {
    if (lessonId) {
      const foundLesson = japaneseLessons.find(l => l.id === lessonId);
      setLesson(foundLesson || null);
    }
  }, [lessonId]);

  const handleStartLesson = () => {
    if (lesson) {
      // 根據課程類型導航到不同的練習
      switch (lesson.category) {
        case 'hiragana':
        case 'katakana':
          navigation.navigate('Exercise', { 
            lessonId: lesson.id,
            exerciseId: 'ex1',
            exerciseIndex: 0
          });
          break;
        case 'vocabulary':
          navigation.navigate('TranslationExercise', { 
            lessonId: lesson.id,
            exerciseId: 'ex1'
          });
          break;
        case 'grammar':
          navigation.navigate('ListeningExercise', { 
            lessonId: lesson.id,
            exerciseId: 'ex1'
          });
          break;
        default:
          navigation.navigate('Exercise', { 
            lessonId: lesson.id,
            exerciseId: 'ex1',
            exerciseIndex: 0
          });
      }
    }
  };

  const handleContinueLesson = () => {
    // 繼續未完成的課程
    handleStartLesson();
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>課程未找到</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercentage = Math.round((lesson.completedLessons / lesson.totalLessons) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 課程標題區域 */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.lessonIcon}>{lesson.icon}</Text>
          </View>
          
          <Text style={styles.titleJapanese}>{lesson.titleJapanese}</Text>
          <Text style={styles.title}>{lesson.title}</Text>
          
          {/* 難度標籤 */}
          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyText}>
              {lesson.difficulty === 'beginner' ? '初級' : 
               lesson.difficulty === 'intermediate' ? '中級' : '高級'}
            </Text>
          </View>
        </View>

        {/* 進度區域 */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>學習進度</Text>
            <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>
          
          <Text style={styles.progressText}>
            {lesson.completedLessons} / {lesson.totalLessons} 課程已完成
          </Text>
        </View>

        {/* 課程描述 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>課程內容</Text>
          <Text style={styles.description}>
            {getDescriptionByCategory(lesson.category)}
          </Text>
        </View>

        {/* 學習目標 */}
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>學習目標</Text>
          {getGoalsByCategory(lesson.category).map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalBullet}>•</Text>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 底部按鈕區域 */}
      <View style={styles.bottomSection}>
        {lesson.isCompleted ? (
          <TouchableOpacity 
            style={[styles.actionButton, styles.reviewButton]}
            onPress={handleStartLesson}
          >
            <Text style={styles.actionButtonText}>複習課程</Text>
          </TouchableOpacity>
        ) : lesson.completedLessons > 0 ? (
          <TouchableOpacity 
            style={[styles.actionButton, styles.continueButton]}
            onPress={handleContinueLesson}
          >
            <Text style={styles.actionButtonText}>繼續學習</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.startButton]}
            onPress={handleStartLesson}
          >
            <Text style={styles.actionButtonText}>開始學習</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

// 根據課程類別獲取描述
const getDescriptionByCategory = (category: string): string => {
  switch (category) {
    case 'hiragana':
      return '學習日語的基本表音文字平假名，掌握正確的筆順和發音。';
    case 'katakana':
      return '學習用於外來語的片假名文字，擴展日語詞彙量。';
    case 'kanji':
      return '學習漢字的讀音和意思，建立扎實的日語基礎。';
    case 'vocabulary':
      return '學習日常生活中常用的詞彙，提升溝通能力。';
    case 'grammar':
      return '掌握日語文法規則，學會正確的句子結構。';
    default:
      return '系統性學習日語，從基礎到進階全面提升。';
  }
};

// 根據課程類別獲取學習目標
const getGoalsByCategory = (category: string): string[] => {
  switch (category) {
    case 'hiragana':
      return [
        '認識並書寫所有平假名字符',
        '掌握正確的發音',
        '理解平假名的使用場合',
      ];
    case 'katakana':
      return [
        '認識並書寫所有片假名字符',
        '學會外來語的表達方式',
        '提升閱讀理解能力',
      ];
    case 'kanji':
      return [
        '學習常用漢字的讀音',
        '理解漢字的意思和用法',
        '掌握基本的漢字組合',
      ];
    case 'vocabulary':
      return [
        '擴展日語詞彙量',
        '學會正確使用新詞彙',
        '提升日常對話能力',
      ];
    case 'grammar':
      return [
        '理解基本文法結構',
        '學會正確的助詞使用',
        '掌握動詞活用規則',
      ];
    default:
      return [
        '全面提升日語能力',
        '建立扎實的語言基礎',
        '增強學習信心',
      ];
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  lessonIcon: {
    fontSize: 36,
    color: Colors.white,
  },
  titleJapanese: {
    ...Typography.styles.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  title: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  difficultyContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  difficultyText: {
    ...Typography.styles.caption,
    color: Colors.white,
    fontWeight: 'bold',
  },
  progressSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
  },
  progressPercentage: {
    ...Typography.styles.h3,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginBottom: Spacing.sm,
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
  progressText: {
    ...Typography.styles.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  descriptionSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalsSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  goalBullet: {
    ...Typography.styles.body,
    color: Colors.primary,
    marginRight: Spacing.xs,
    marginTop: 2,
  },
  goalText: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  bottomSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    backgroundColor: Colors.primary,
  },
  continueButton: {
    backgroundColor: Colors.secondary,
  },
  reviewButton: {
    backgroundColor: Colors.success,
  },
  actionButtonText: {
    ...Typography.styles.button,
    color: Colors.white,
  },
  errorText: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  backButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  backButtonText: {
    ...Typography.styles.button,
    color: Colors.white,
  },
});

export default LessonScreen; 