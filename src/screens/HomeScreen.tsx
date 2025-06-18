import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Spacing';
import type { RootStackParamList } from '../types';

// 組件
import UserProfile from '../components/Home/UserProfile';
import ProgressIndicators from '../components/Home/ProgressIndicators';
import LessonCard from '../components/Home/LessonCard';
import DailyGoal from '../components/Home/DailyGoal';

// 資料
import { 
  mockUserProfile, 
  mockDailyGoal, 
  japaneseLessons,
  getLearningStats,
  type LessonData,
  type UserProfile as UserProfileType,
  type DailyGoal as DailyGoalType,
} from '../data/japaneseData';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userProfile, setUserProfile] = useState<UserProfileType>(mockUserProfile);
  const [dailyGoal, setDailyGoal] = useState<DailyGoalType>(mockDailyGoal);
  const [lessons, setLessons] = useState<LessonData[]>(japaneseLessons);
  const [isLoading, setIsLoading] = useState(false);

  // 計算經驗值進度 (假設每級需要 300 XP)
  const xpPerLevel = 300;
  const currentLevelXP = userProfile.xp % xpPerLevel;
  const xpProgress = Math.round((currentLevelXP / xpPerLevel) * 100);

  // 處理課程點擊
  const handleLessonPress = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && lesson.isUnlocked) {
      // 導航到課程詳情頁面
      navigation.navigate('Lesson', { lessonId });
    }
  };

  // 處理每日目標點擊
  const handleDailyGoalPress = () => {
    console.log('打開每日目標設定');
    // navigation.navigate('DailyGoalSettings');
  };

  // 模擬資料載入
  useEffect(() => {
    setIsLoading(true);
    // 模擬 API 調用
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 用戶資訊區域 */}
        <UserProfile
          name={userProfile.name}
          streak={userProfile.streak}
          xp={userProfile.xp}
          level={userProfile.level}
          avatar={userProfile.avatar}
        />

        {/* 進度指標 */}
        <ProgressIndicators
          hearts={userProfile.hearts}
          maxHearts={userProfile.maxHearts}
          gems={userProfile.gems}
          xpProgress={xpProgress}
          currentLevel={userProfile.level}
        />

        {/* 每日目標 */}
        <DailyGoal
          targetMinutes={dailyGoal.targetMinutes}
          completedMinutes={dailyGoal.completedMinutes}
          streakDays={dailyGoal.streakDays}
          onGoalPress={handleDailyGoalPress}
        />

        {/* 學習路徑 - 課程列表 */}
        <View style={styles.lessonsContainer}>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              titleJapanese={lesson.titleJapanese}
              icon={lesson.icon}
              progress={lesson.progress}
              isUnlocked={lesson.isUnlocked}
              isCompleted={lesson.isCompleted}
              totalLessons={lesson.totalLessons}
              completedLessons={lesson.completedLessons}
              onPress={handleLessonPress}
            />
          ))}
        </View>

        {/* 底部間距 */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingBottom: Spacing.xl,
  },
  lessonsContainer: {
    marginTop: Spacing.md,
  },
  bottomSpacing: {
    height: Spacing.xxl,
  },
});

export default HomeScreen; 