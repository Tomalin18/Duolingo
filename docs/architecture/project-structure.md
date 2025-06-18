# 專案架構說明

## 總體架構

JapaneseGo 採用標準的 React Native + Expo 架構，遵循模組化和可維護性原則。

## 目錄結構詳解

### `/src` - 主要原始碼目錄

#### `/src/components` - 可重用組件
- 存放可在多個畫面中重複使用的 React 組件
- 每個組件都有對應的 TypeScript 類型定義
- 遵循單一職責原則

#### `/src/constants` - 常數定義
- **Colors.ts** - 顏色常數，包含 Duolingo 風格色彩系統
- **Typography.ts** - 字體樣式和大小定義
- **Spacing.ts** - 間距、尺寸、陰影等佈局常數

#### `/src/i18n` - 國際化系統
- **index.ts** - i18n 主要配置和功能
- **locales/** - 語言檔案目錄
  - 支援 11 種語言：en, es, fr, de, pt, it, ko, zh-CN, zh-TW, th, vi
  - 每個語言檔案採用 JSON 格式
  - 支援動態語言切換和本地儲存

#### `/src/navigation` - 導航系統
- **AppNavigator.tsx** - 主要導航配置
- 使用 React Navigation 6.x
- 包含 Stack Navigator 和 Tab Navigator
- 支援手勢導航和動畫轉場

#### `/src/screens` - 畫面組件
各個畫面的主要組件：
- **OnboardingScreen.tsx** - 啟動和歡迎畫面
- **IntroScreen.tsx** - Duo 角色介紹
- **LoadingScreen.tsx** - 載入畫面
- **ExerciseScreen.tsx** - 練習畫面基類
- **ListeningExerciseScreen.tsx** - 聽力練習
- **TranslationExerciseScreen.tsx** - 翻譯練習
- **HomeScreen.tsx** - 主頁面 (開發中)
- **LearnScreen.tsx** - 學習頁面 (開發中)
- **PracticeScreen.tsx** - 練習頁面 (開發中)
- **ProfileScreen.tsx** - 個人資料頁面 (開發中)

#### `/src/types` - TypeScript 類型定義
- **index.ts** - 主要類型定義
- 包含導航參數、用戶資料、學習內容等類型
- 確保型別安全和程式碼可維護性

### `/assets` - 資源檔案
- **icon.png** - 應用圖示
- **splash.png** - 啟動畫面圖片
- **adaptive-icon.png** - Android 適應性圖示
- **favicon.png** - Web 版本圖示

### `/docs` - 專案文件
- **debug/** - 除錯指南
- **ui-optimization/** - UI 優化文件
- **new-features/** - 新功能開發記錄
- **architecture/** - 架構說明 (本文件)
- **deployment/** - 部署指南
- **troubleshooting/** - 問題排解

## 設計模式

### 1. 組件化設計
- 每個畫面都是獨立的 React 組件
- 可重用組件抽離到 `/src/components`
- 遵循 React Hooks 模式

### 2. 常數管理
- 所有設計常數集中管理
- 顏色、字體、間距等都有統一定義
- 便於主題切換和設計系統維護

### 3. 類型安全
- 全面使用 TypeScript
- 導航參數、API 介面都有型別定義
- 編譯時期錯誤檢查

### 4. 國際化架構
- 支援多語言的可擴展架構
- 語言檔案模組化管理
- 動態語言切換

## 資料流

### 導航流程
```
OnboardingScreen → IntroScreen → LoadingScreen → Main (TabNavigator)
                                                    ├── HomeScreen
                                                    ├── LearnScreen  
                                                    ├── PracticeScreen
                                                    └── ProfileScreen
```

### 練習流程
```
HomeScreen → LessonScreen → ExerciseScreen → ResultsScreen
                         → ListeningExerciseScreen
                         → TranslationExerciseScreen
```

## 狀態管理

目前使用 React 內建的狀態管理：
- **useState** - 組件本地狀態
- **useEffect** - 副作用處理
- **useNavigation** - 導航狀態
- **AsyncStorage** - 本地資料儲存

## 效能考量

### 1. 圖片優化
- 使用適當大小的圖片資源
- 支援不同螢幕密度

### 2. 組件優化
- 避免不必要的重新渲染
- 適當使用 React.memo

### 3. 導航優化
- 延遲載入非必要畫面
- 手勢導航流暢度優化

## 未來擴展

### 1. 狀態管理升級
- 考慮引入 Redux Toolkit 或 Zustand
- 複雜狀態的集中管理

### 2. 資料層
- API 整合
- 離線資料同步
- 快取策略

### 3. 測試架構
- 單元測試 (Jest)
- 整合測試 (Detox)
- 視覺回歸測試

---

**建立日期**: 2025年6月18日  
**更新日期**: 2025年6月18日  
**版本**: v1.0.0 