// 日語學習課程資料
export interface LessonData {
  id: string;
  title: string;
  titleJapanese: string;
  icon: string;
  progress: number; // 0-100
  isUnlocked: boolean;
  isCompleted: boolean;
  totalLessons: number;
  completedLessons: number;
  category: 'hiragana' | 'katakana' | 'kanji' | 'vocabulary' | 'grammar';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  xp: number;
  level: number;
  hearts: number;
  maxHearts: number;
  gems: number;
}

export interface DailyGoal {
  targetMinutes: number;
  completedMinutes: number;
  streakDays: number;
}

// 模擬用戶資料
export const mockUserProfile: UserProfile = {
  id: 'user_001',
  name: 'Toma',
  streak: 7,
  xp: 1250,
  level: 5,
  hearts: 4,
  maxHearts: 5,
  gems: 120,
};

// 模擬每日目標
export const mockDailyGoal: DailyGoal = {
  targetMinutes: 15,
  completedMinutes: 8,
  streakDays: 7,
};

// 日語課程資料
export const japaneseLessons: LessonData[] = [
  // 平假名課程
  {
    id: 'hiragana_01',
    title: '平假名基礎',
    titleJapanese: 'ひらがな きそ',
    icon: 'あ',
    progress: 100,
    isUnlocked: true,
    isCompleted: true,
    totalLessons: 10,
    completedLessons: 10,
    category: 'hiragana',
    difficulty: 'beginner',
  },
  {
    id: 'hiragana_02',
    title: '平假名進階',
    titleJapanese: 'ひらがな しんぽ',
    icon: 'か',
    progress: 60,
    isUnlocked: true,
    isCompleted: false,
    totalLessons: 15,
    completedLessons: 9,
    category: 'hiragana',
    difficulty: 'beginner',
  },
  
  // 片假名課程
  {
    id: 'katakana_01',
    title: '片假名基礎',
    titleJapanese: 'カタカナ きそ',
    icon: 'ア',
    progress: 0,
    isUnlocked: true,
    isCompleted: false,
    totalLessons: 10,
    completedLessons: 0,
    category: 'katakana',
    difficulty: 'beginner',
  },
  {
    id: 'katakana_02',
    title: '片假名進階',
    titleJapanese: 'カタカナ しんぽ',
    icon: 'カ',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 15,
    completedLessons: 0,
    category: 'katakana',
    difficulty: 'beginner',
  },

  // 基礎漢字
  {
    id: 'kanji_01',
    title: '數字漢字',
    titleJapanese: 'すうじ かんじ',
    icon: '一',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 8,
    completedLessons: 0,
    category: 'kanji',
    difficulty: 'beginner',
  },
  {
    id: 'kanji_02',
    title: '日常漢字',
    titleJapanese: 'にちじょう かんじ',
    icon: '人',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 12,
    completedLessons: 0,
    category: 'kanji',
    difficulty: 'beginner',
  },

  // 基礎語彙
  {
    id: 'vocabulary_01',
    title: '問候語',
    titleJapanese: 'あいさつ',
    icon: '👋',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 6,
    completedLessons: 0,
    category: 'vocabulary',
    difficulty: 'beginner',
  },
  {
    id: 'vocabulary_02',
    title: '家族稱謂',
    titleJapanese: 'かぞく',
    icon: '👨‍👩‍👧‍👦',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 8,
    completedLessons: 0,
    category: 'vocabulary',
    difficulty: 'beginner',
  },
  {
    id: 'vocabulary_03',
    title: '顏色',
    titleJapanese: 'いろ',
    icon: '🌈',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 7,
    completedLessons: 0,
    category: 'vocabulary',
    difficulty: 'beginner',
  },

  // 基礎文法
  {
    id: 'grammar_01',
    title: '基礎助詞',
    titleJapanese: 'きそ じょし',
    icon: 'は',
    progress: 0,
    isUnlocked: false,
    isCompleted: false,
    totalLessons: 10,
    completedLessons: 0,
    category: 'grammar',
    difficulty: 'intermediate',
  },
];

// 學習統計
export const getLearningStats = () => {
  const totalLessons = japaneseLessons.length;
  const completedLessons = japaneseLessons.filter(lesson => lesson.isCompleted).length;
  const unlockedLessons = japaneseLessons.filter(lesson => lesson.isUnlocked).length;
  
  return {
    totalLessons,
    completedLessons,
    unlockedLessons,
    completionRate: Math.round((completedLessons / totalLessons) * 100),
  };
};

// 根據類別獲取課程
export const getLessonsByCategory = (category: LessonData['category']) => {
  return japaneseLessons.filter(lesson => lesson.category === category);
};

// 獲取下一個可解鎖的課程
export const getNextUnlockableLesson = () => {
  return japaneseLessons.find(lesson => !lesson.isUnlocked);
}; 