# HomeScreen 開發規劃

## 功能概述

HomeScreen 是應用的核心頁面，用戶完成引導流程後的主要學習入口。需要完全仿照 Duolingo 的主頁設計。

## 設計需求

### 1. 頂部區域
- **用戶資訊**
  - 用戶頭像 (圓形)
  - 用戶名稱
  - 連續學習天數 (Streak)
  - 經驗值 (XP)

- **進度指標**
  - 心心數量 (Lives)
  - 寶石數量 (Gems)
  - 等級進度條

### 2. 學習路徑
- **課程卡片**
  - 課程圖示 (平假名、片假名、漢字等)
  - 課程名稱 (日文 + 中文)
  - 完成進度 (圓形進度條)
  - 解鎖狀態指示

- **互動狀態**
  - 已完成: 綠色勾選
  - 進行中: 黃色進度圈
  - 未解鎖: 灰色鎖定

### 3. 底部區域
- **每日目標**
  - 目標設定 (5分鐘、10分鐘、15分鐘等)
  - 今日進度顯示
  - 連續達成天數

## 技術實作

### 1. 組件結構
```typescript
HomeScreen/
├── components/
│   ├── UserProfile.tsx        # 用戶資訊區域
│   ├── ProgressIndicators.tsx # 進度指標
│   ├── LessonCard.tsx         # 課程卡片
│   ├── LearningPath.tsx       # 學習路徑
│   └── DailyGoal.tsx          # 每日目標
└── HomeScreen.tsx             # 主組件
```

### 2. 資料結構
```typescript
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  streak: number;        // 連續學習天數
  xp: number;           // 經驗值
  level: number;        // 等級
  hearts: number;       // 心心數量
  gems: number;         // 寶石數量
}

interface LessonData {
  id: string;
  title: string;
  titleJapanese: string;
  icon: string;
  progress: number;     // 0-100
  isUnlocked: boolean;
  isCompleted: boolean;
  totalLessons: number;
  completedLessons: number;
}

interface DailyGoal {
  targetMinutes: number;
  completedMinutes: number;
  streakDays: number;
}
```

### 3. 狀態管理
```typescript
const [userProfile, setUserProfile] = useState<UserProfile>();
const [lessons, setLessons] = useState<LessonData[]>([]);
const [dailyGoal, setDailyGoal] = useState<DailyGoal>();
const [isLoading, setIsLoading] = useState(true);
```

## 日語學習內容規劃

### 1. 基礎課程
1. **ひらがな (平假名)**
   - あ行、か行、さ行...
   - 濁音、半濁音
   - 拗音、長音

2. **カタカナ (片假名)**
   - ア行、カ行、サ行...
   - 外來語練習

3. **基礎漢字**
   - 數字漢字 (一、二、三...)
   - 日常漢字 (人、水、火...)
   - N5 漢字

### 2. 進階課程
4. **基礎語彙**
   - 問候語
   - 家族稱謂
   - 顏色、數字

5. **基礎文法**
   - です/である
   - 助詞 (は、が、を...)
   - 動詞活用

6. **會話練習**
   - 自我介紹
   - 日常對話
   - 購物用語

## UI/UX 設計規範

### 1. 色彩配置
```typescript
// 課程狀態色彩
const lessonColors = {
  completed: Colors.primary,      // 綠色 - 已完成
  inProgress: Colors.secondary,   // 黃色 - 進行中
  locked: Colors.textLight,       // 灰色 - 未解鎖
}

// 進度指標色彩
const progressColors = {
  hearts: '#FF4757',             // 紅色心心
  gems: '#3742FA',               // 藍色寶石
  xp: Colors.secondary,          // 黃色經驗值
}
```

### 2. 動畫效果
- **課程卡片**: 點擊時輕微縮放
- **進度條**: 數值變化時的動畫
- **解鎖效果**: 新課程解鎖時的慶祝動畫

### 3. 響應式佈局
- **小螢幕**: 單列課程卡片
- **大螢幕**: 雙列課程卡片
- **平板**: 三列課程卡片

## 開發階段

### Phase 1: 基礎架構 (1-2天)
- [ ] 建立 HomeScreen 基礎組件
- [ ] 實作用戶資訊區域
- [ ] 建立課程卡片組件
- [ ] 設定基本樣式和佈局

### Phase 2: 資料整合 (2-3天)
- [ ] 建立日語學習資料結構
- [ ] 實作課程進度邏輯
- [ ] 整合用戶狀態管理
- [ ] 添加本地資料儲存

### Phase 3: 互動功能 (2-3天)
- [ ] 實作課程點擊導航
- [ ] 添加進度更新邏輯
- [ ] 實作每日目標系統
- [ ] 添加成就解鎖機制

### Phase 4: 視覺優化 (1-2天)
- [ ] 添加動畫效果
- [ ] 優化響應式佈局
- [ ] 實作載入狀態
- [ ] 完善錯誤處理

## 測試計劃

### 1. 功能測試
- [ ] 課程卡片點擊導航
- [ ] 進度數據正確顯示
- [ ] 解鎖邏輯正確運作
- [ ] 每日目標更新

### 2. UI 測試
- [ ] 不同螢幕尺寸適配
- [ ] 動畫流暢度
- [ ] 色彩對比度
- [ ] 觸控目標大小

### 3. 效能測試
- [ ] 大量課程資料載入
- [ ] 滑動流暢度
- [ ] 記憶體使用量
- [ ] 啟動時間

## 資料來源

### 1. 日語學習內容
- 參考 JLPT N5-N1 課程大綱
- 使用標準假名和漢字字典
- 整合常用語彙表

### 2. 圖示資源
- 日文字符圖示
- 課程主題圖示 (食物、動物、顏色等)
- 成就徽章圖示

## 未來擴展

### 1. 個人化功能
- 學習偏好設定
- 自定義學習目標
- 個人學習統計

### 2. 社交功能
- 好友排行榜
- 學習小組
- 分享成就

### 3. 進階功能
- 語音識別練習
- 手寫練習
- AR 學習體驗

## 參考資源

- [Duolingo 官方應用](https://www.duolingo.com/)
- [日語學習路徑設計](https://www.tofugu.com/learn-japanese/)
- [JLPT 官方指南](https://www.jlpt.jp/)

---

**建立日期**: 2025年6月18日  
**預計開始**: 2025年6月19日  
**預計完成**: 2025年6月26日  
**負責人**: 待分配  
**優先級**: 高 