# JapaneseGo - Duolingo 風格日語學習應用

## 專案概述

JapaneseGo 是一個仿照 Duolingo 設計的日語學習應用，使用 React Native 和 Expo SDK 53 開發。應用提供互動式的日語學習體驗，包含平假名、片假名、漢字學習等功能。

## 技術架構

### 核心技術
- **Framework**: React Native 0.79.3
- **Platform**: Expo SDK 53.0.0
- **Language**: TypeScript 5.8.3
- **State Management**: React Hooks
- **Navigation**: React Navigation 6.x
- **Styling**: StyleSheet (React Native)

### 主要依賴
- React 19.0.0
- React Native 0.79.3
- @react-navigation/native 6.1.17
- @react-navigation/bottom-tabs 6.5.20
- @react-navigation/native-stack 6.9.26
- expo-av 15.1.6
- expo-font 13.3.1
- i18n-js 4.4.3

## 專案結構

```
DuolingoJP/
├── src/
│   ├── components/         # 可重用組件
│   ├── constants/          # 常數定義 (顏色、字體、間距)
│   ├── i18n/              # 國際化 (支援11種語言)
│   │   └── locales/       # 語言檔案
│   ├── navigation/        # 導航配置
│   ├── screens/           # 畫面組件
│   └── types/             # TypeScript 類型定義
├── assets/                # 圖片和資源檔案
├── docs/                  # 專案文件
│   ├── debug/            # 除錯指南
│   ├── ui-optimization/  # UI 優化文件
│   ├── new-features/     # 新功能開發
│   ├── architecture/     # 架構說明
│   ├── deployment/       # 部署指南
│   └── troubleshooting/  # 問題排解
└── expo/                  # Expo 配置
```

## 已實現功能

### 🎨 UI/UX 設計
- ✅ 完整的 Duolingo 風格設計系統
- ✅ 響應式佈局適配不同螢幕尺寸
- ✅ 綠色主題色彩搭配 (#58CC02)
- ✅ Duo 吉祥物角色設計

### 📱 畫面實現
- ✅ **OnboardingScreen** - 啟動畫面和歡迎頁面
- ✅ **IntroScreen** - Duo 角色介紹
- ✅ **LoadingScreen** - 學習提示載入頁面
- ✅ **ExerciseScreen** - 圖片選擇練習
- ✅ **ListeningExerciseScreen** - 聽力練習
- ✅ **TranslationExerciseScreen** - 翻譯練習
- 🚧 **HomeScreen** - 主頁面 (開發中)
- 🚧 **LearnScreen** - 學習頁面 (開發中)
- 🚧 **PracticeScreen** - 練習頁面 (開發中)
- 🚧 **ProfileScreen** - 個人資料頁面 (開發中)

### 🌍 國際化支援
- ✅ 支援 11 種語言
- ✅ 動態語言切換
- ✅ 本地化儲存偏好設定

### 🎯 練習系統
- ✅ 多種練習類型 (圖片選擇、聽力、翻譯)
- ✅ 即時反饋系統
- ✅ 進度追蹤
- ✅ 錯誤處理和提示

## 開發環境設置

### 系統需求
- Node.js 20+
- Expo CLI
- iOS Simulator 或 Android Emulator
- Expo Go (手機測試)

### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/Tomalin18/Duolingo.git
cd Duolingo
```

2. **安裝依賴**
```bash
npm install --legacy-peer-deps
```

3. **啟動開發伺服器**
```bash
npx expo start
```

4. **選擇平台**
- 按 `i` 開啟 iOS 模擬器
- 按 `a` 開啟 Android 模擬器
- 按 `w` 開啟 Web 版本
- 掃描 QR Code 在手機上測試

## 文件結構說明

### 📁 docs/ 目錄
專案的所有文件都整理在 `docs/` 目錄下，按功能分類：

- **debug/** - 除錯指南和常見問題解決方案
- **ui-optimization/** - UI/UX 優化建議和實作
- **new-features/** - 新功能開發規劃和實作記錄
- **architecture/** - 系統架構設計和技術決策
- **deployment/** - 部署流程和配置說明
- **troubleshooting/** - 問題排解和故障診斷

## 開發規範

### 程式碼風格
- 使用 TypeScript 進行型別檢查
- 遵循 ESLint 規範
- 組件使用 PascalCase 命名
- 檔案使用 camelCase 命名

### Git 工作流程
- 功能開發使用 feature branch
- 提交訊息使用中文描述
- 每次重大更動需更新相關文件

### 文件維護
- 每次功能更新都需要更新對應文件
- 新功能開發需要在 `docs/new-features/` 建立文件
- Bug 修復需要在 `docs/debug/` 記錄解決方案

## 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/新功能名稱`)
3. 提交更改 (`git commit -m '新增：功能描述'`)
4. 推送到分支 (`git push origin feature/新功能名稱`)
5. 建立 Pull Request

## 授權

本專案僅供學習和開發參考使用。

## 聯絡資訊

如有問題或建議，請透過 GitHub Issues 聯絡。

---

**最後更新**: 2025年6月18日
**版本**: v1.0.0 (Expo SDK 53) 