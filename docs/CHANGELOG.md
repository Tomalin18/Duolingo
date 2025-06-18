# 變更日誌

所有重要的專案變更都會記錄在此檔案中。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
並且本專案遵循 [語義化版本](https://semver.org/lang/zh-TW/)。

## [v1.0.0] - 2025-06-18

### 新增 (Added)
- 🎉 **專案初始化**
  - 建立 Expo TypeScript 專案結構
  - 設定 React Navigation 6.x
  - 整合 i18n 國際化系統

- 🎨 **設計系統**
  - Duolingo 風格色彩系統 (#58CC02 主色調)
  - 完整的字體層級定義
  - 8px 基礎間距系統
  - 響應式設計支援

- 📱 **核心畫面**
  - OnboardingScreen - 啟動和歡迎頁面
  - IntroScreen - Duo 角色介紹
  - LoadingScreen - 學習提示載入頁面
  - ExerciseScreen - 圖片選擇練習
  - ListeningExerciseScreen - 聽力練習
  - TranslationExerciseScreen - 翻譯練習

- 🌍 **國際化支援**
  - 支援 11 種語言 (en, es, fr, de, pt, it, ko, zh-CN, zh-TW, th, vi)
  - 動態語言切換功能
  - 本地化儲存偏好設定

- 📁 **文件系統**
  - 完整的專案架構說明
  - 除錯指南和問題排解
  - UI/UX 設計規範文件
  - 部署流程指南
  - 新功能開發規劃

- 🔧 **技術基礎**
  - TypeScript 類型定義完整
  - ESLint 和 Prettier 配置
  - Git 版本控制設定

### 變更 (Changed)
- ⬆️ **重大升級**
  - Expo SDK 51.0.0 → 53.0.0
  - React 18.2.0 → 19.0.0
  - React Native 0.74.5 → 0.79.3
  - TypeScript 5.3.3 → 5.8.3

### 修復 (Fixed)
- 🐛 **按鈕交互問題**
  - OnboardingScreen 按鈕無反應 → 添加 TouchableOpacity
  - 修復導航參數類型錯誤

- 📦 **依賴管理**
  - 解決 React 19 版本衝突
  - 修復模組解析錯誤
  - 建立所有缺失的語言檔案

- 🖼️ **資源檔案**
  - 添加應用圖示和啟動畫面
  - 修復 app.json 資源路徑

### 技術債務 (Technical Debt)
- 使用 `--legacy-peer-deps` 解決依賴衝突
- 部分第三方套件可能與 React 19 不完全相容

## 文件更新記錄

### 建立的文件
- `README.md` - 專案主要說明
- `docs/architecture/project-structure.md` - 專案架構說明
- `docs/debug/expo-sdk-53-upgrade.md` - SDK 升級除錯指南
- `docs/ui-optimization/duolingo-design-system.md` - 設計系統文件
- `docs/new-features/home-screen-development.md` - HomeScreen 開發規劃
- `docs/deployment/expo-deployment-guide.md` - 部署指南
- `docs/troubleshooting/common-issues.md` - 常見問題排解
- `docs/CHANGELOG.md` - 本變更日誌

### 文件維護規範
- 每次功能更新都需要更新對應文件
- 新功能開發需要在 `docs/new-features/` 建立規劃文件
- Bug 修復需要在 `docs/debug/` 記錄解決方案
- UI 變更需要更新 `docs/ui-optimization/` 中的設計文件

## 下一版本規劃 (v1.1.0)

### 預計新增功能
- 🏠 **HomeScreen 完整實作**
  - 用戶資訊區域
  - 學習路徑和課程卡片
  - 每日目標系統
  - 進度追蹤功能

- 📚 **日語學習內容**
  - 平假名課程資料
  - 片假名課程資料
  - 基礎漢字內容
  - 練習題庫建立

- 🎯 **互動功能**
  - 課程解鎖機制
  - 經驗值系統
  - 成就系統

### 技術改進
- 狀態管理優化 (考慮引入 Zustand)
- 效能優化和記憶體管理
- 單元測試框架建立

---

**維護者**: JapaneseGo 開發團隊  
**最後更新**: 2025年6月18日  
**版本格式**: [主版本.次版本.修補版本] 