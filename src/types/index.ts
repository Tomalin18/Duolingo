// User and Progress Types
export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  streak: number;
  totalXP: number;
  level: number;
  languageSettings: LanguageSettings;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface LanguageSettings {
  nativeLanguage: SupportedLanguage;
  learningLanguage: 'japanese';
  interfaceLanguage: SupportedLanguage;
}

export type SupportedLanguage = 
  | 'english'
  | 'spanish' 
  | 'french'
  | 'german'
  | 'portuguese'
  | 'italian'
  | 'korean'
  | 'chinese-simplified'
  | 'chinese-traditional'
  | 'thai'
  | 'vietnamese';

// Japanese Learning Content Types
export type JapaneseScript = 'hiragana' | 'katakana' | 'kanji' | 'romaji';

export type LessonCategory = 
  | 'hiragana'
  | 'katakana'
  | 'basic-kanji'
  | 'vocabulary'
  | 'grammar'
  | 'conversation'
  | 'culture';

export type ExerciseType = 
  | 'multiple-choice'
  | 'translation'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'matching'
  | 'fill-blank'
  | 'select-image'
  | 'arrange-words';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface JapaneseCharacter {
  id: string;
  character: string;
  reading: string;
  meaning: string;
  script: JapaneseScript;
  strokeOrder?: string[];
  examples?: string[];
}

export interface Vocabulary {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
  level: DifficultyLevel;
  examples: VocabularyExample[];
  audio?: string;
  image?: string;
}

export interface VocabularyExample {
  japanese: string;
  reading: string;
  translation: string;
  audio?: string;
}

export interface Grammar {
  id: string;
  name: string;
  structure: string;
  meaning: string;
  level: DifficultyLevel;
  examples: GrammarExample[];
  notes?: string;
}

export interface GrammarExample {
  japanese: string;
  reading: string;
  translation: string;
  breakdown?: string;
}

// Lesson and Exercise Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  level: DifficultyLevel;
  order: number;
  isLocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  exercises: Exercise[];
  prerequisites?: string[];
  thumbnail?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionAudio?: string;
  options?: ExerciseOption[];
  correctAnswer: string | string[];
  explanation?: string;
  hints?: string[];
  media?: ExerciseMedia;
  difficulty: DifficultyLevel;
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  image?: string;
  audio?: string;
}

export interface ExerciseMedia {
  type: 'image' | 'audio' | 'video';
  url: string;
  description?: string;
}

// User Progress Types
export interface UserProgress {
  userId: string;
  lessonProgress: LessonProgress[];
  vocabulary: LearnedVocabulary[];
  characters: LearnedCharacter[];
  grammar: LearnedGrammar[];
  statistics: UserStatistics;
}

export interface LessonProgress {
  lessonId: string;
  isCompleted: boolean;
  score: number;
  attempts: number;
  lastAttemptAt?: Date;
  completedAt?: Date;
  exerciseResults: ExerciseResult[];
}

export interface ExerciseResult {
  exerciseId: string;
  isCorrect: boolean;
  attempts: number;
  timeSpent: number;
  hintsUsed: number;
}

export interface LearnedVocabulary {
  vocabularyId: string;
  strength: number; // 0-100, for spaced repetition
  lastReviewed: Date;
  nextReview: Date;
  correctCount: number;
  incorrectCount: number;
}

export interface LearnedCharacter {
  characterId: string;
  script: JapaneseScript;
  strength: number;
  lastReviewed: Date;
  nextReview: Date;
  correctCount: number;
  incorrectCount: number;
}

export interface LearnedGrammar {
  grammarId: string;
  strength: number;
  lastReviewed: Date;
  nextReview: Date;
  correctCount: number;
  incorrectCount: number;
}

export interface UserStatistics {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  timeSpent: number; // in minutes
  wordsLearned: number;
  charactersLearned: {
    hiragana: number;
    katakana: number;
    kanji: number;
  };
  accuracyRate: number;
  lastStudyDate?: Date;
}

// Achievement and Gamification Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  type: AchievementType;
}

export type AchievementType = 
  | 'streak'
  | 'lessons'
  | 'vocabulary'
  | 'perfect-lesson'
  | 'time-spent'
  | 'character-mastery';

// Navigation Types
export type RootStackParamList = {
  AppInitializer: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  Intro: undefined;
  Loading: undefined;
  Main: undefined;
  Lesson: { lessonId: string };
  Exercise: { 
    lessonId: string; 
    exerciseId: string; 
    exerciseIndex: number;
  };
  ListeningExercise: {
    lessonId: string;
    exerciseId: string;
  };
  TranslationExercise: {
    lessonId: string;
    exerciseId: string;
  };
  Results: { 
    lessonId: string; 
    score: number; 
    results: ExerciseResult[];
  };
  Profile: undefined;
  Settings: undefined;
  Leaderboard: undefined;
};

export type TabParamList = {
  Home: undefined;
  Learn: undefined;
  Practice: undefined;
  Profile: undefined;
};

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  backgroundColor?: string;
  height?: number;
  animated?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Settings Types
export interface AppSettings {
  notifications: NotificationSettings;
  audio: AudioSettings;
  display: DisplaySettings;
  learning: LearningSettings;
}

export interface NotificationSettings {
  dailyReminder: boolean;
  reminderTime: string; // HH:mm format
  streakReminder: boolean;
  achievementNotifications: boolean;
}

export interface AudioSettings {
  enabled: boolean;
  volume: number; // 0-1
  speed: number; // 0.5-2.0
  autoplay: boolean;
}

export interface DisplaySettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  showFurigana: boolean;
  showRomaji: boolean;
}

export interface LearningSettings {
  dailyGoal: number; // XP per day
  difficultyPreference: DifficultyLevel;
  reviewSettings: ReviewSettings;
}

export interface ReviewSettings {
  enableSpacedRepetition: boolean;
  maxReviewsPerDay: number;
  reviewMix: ReviewMix;
}

export interface ReviewMix {
  vocabulary: number; // percentage
  characters: number; // percentage  
  grammar: number; // percentage
}

// Welcome/Onboarding Types
export interface OnboardingState {
  selectedLanguage: SupportedLanguage;
  learningGoal: LearningGoal;
  currentLevel: CurrentLevel;
  ageRange: AgeRange;
  profile: OnboardingProfile;
  isCompleted: boolean;
}

export type LearningGoal = 'casual' | 'regular' | 'serious' | 'intense';

export type CurrentLevel = 'new' | 'some' | 'much';

export type AgeRange = 'under13' | '13-17' | '18-24' | '25-34' | '35-49' | '50+';

export interface OnboardingProfile {
  avatar: number;
  name: string;
  isGuest: boolean;
}

export type WelcomeStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  GoalSelection: undefined;
  LevelAssessment: undefined;
  AgeSelection: undefined;
  ProfileCreation: undefined;
};

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface GoalOption {
  id: LearningGoal;
  title: string;
  subtitle: string;
  minutes: number;
  icon: string;
  isDefault?: boolean;
}

export interface LevelOption {
  id: CurrentLevel;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  showPlacementTest?: boolean;
}

export interface AvatarOption {
  id: number;
  source: string; // Using emoji strings for now
  name: string;
} 