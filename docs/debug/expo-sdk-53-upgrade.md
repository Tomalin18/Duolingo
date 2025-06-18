# Expo SDK 53 升級除錯指南

## 升級概述

從 Expo SDK 51.0.0 升級到 53.0.0，包含 React 18 → 19 和 React Native 0.74 → 0.79 的重大更新。

## 遇到的問題與解決方案

### 1. React 版本衝突問題

**問題描述**:
```
npm error ERESOLVE could not resolve
npm error While resolving: react-native@0.79.3
npm error Found: @types/react@18.2.79
npm error Could not resolve dependency:
npm error peerOptional @types/react@"^19.0.0" from react-native@0.79.3
```

**根本原因**:
- Expo SDK 53 使用 React 19
- 部分套件的 peer dependencies 仍然期望 React 18
- npm 無法自動解決版本衝突

**解決方案**:

1. **在 package.json 中添加 overrides**:
```json
{
  "overrides": {
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@types/react": "~19.0.10"
  }
}
```

2. **更新 devDependencies**:
```json
{
  "devDependencies": {
    "@types/react": "~19.0.10",
    "typescript": "~5.8.3"
  }
}
```

3. **移除不需要的套件**:
- 移除 `@types/react-native` (React Native 0.79+ 內建型別)

4. **使用 legacy-peer-deps 安裝**:
```bash
npm install --legacy-peer-deps
```

### 2. 模組解析錯誤

**問題描述**:
```
Unable to resolve module ./locales/fr.json from /Users/toma/DuolingoJP/src/i18n/index.ts:
None of these files exist:
* src/i18n/locales/fr.json
```

**根本原因**:
- i18n/index.ts 嘗試導入多個語言檔案
- 但實際只有部分語言檔案存在

**解決方案**:
建立所有缺失的語言檔案：
- fr.json (法語)
- de.json (德語)
- pt.json (葡萄牙語)
- it.json (義大利語)
- ko.json (韓語)
- zh-CN.json (簡體中文)
- th.json (泰語)
- vi.json (越南語)

每個檔案包含基本翻譯結構：
```json
{
  "common": {
    "continue": "Continue",
    "skip": "Skip",
    // ... 其他基本翻譯
  },
  "onboarding": {
    "welcome": "Welcome to JapaneseGo",
    "description": "Learn Japanese in a fun and interactive way"
  }
}
```

### 3. 資源檔案缺失問題

**問題描述**:
```
Error validating asset fields in app.json:
Field: icon - cannot access file at './assets/icon.png'
Field: Splash.image - cannot access file at './assets/splash.png'
Field: Android.adaptiveIcon.foregroundImage - cannot access file at './assets/adaptive-icon.png'
```

**解決方案**:
1. 建立臨時 Expo 專案取得預設資源檔案
2. 複製所需的圖示檔案到 assets 目錄
3. 確保 app.json 中的路徑正確

### 4. 按鈕無反應問題

**問題描述**:
OnboardingScreen 的按鈕點擊沒有反應

**根本原因**:
按鈕使用 `View` 元件而不是 `TouchableOpacity`

**解決方案**:
```tsx
// 修改前
<View style={styles.primaryButton}>
  <Text style={styles.primaryButtonText}>GET STARTED</Text>
</View>

// 修改後
<TouchableOpacity 
  style={styles.primaryButton}
  onPress={() => navigation.navigate('Intro' as never)}
>
  <Text style={styles.primaryButtonText}>GET STARTED</Text>
</TouchableOpacity>
```

## 升級檢查清單

### 升級前準備
- [ ] 備份當前專案
- [ ] 檢查當前 SDK 版本
- [ ] 記錄自定義配置

### 升級過程
- [ ] 更新 Expo CLI 到最新版本
- [ ] 執行 `npx expo install expo@^53.0.0 --fix`
- [ ] 處理版本衝突 (添加 overrides)
- [ ] 清理 node_modules 和 package-lock.json
- [ ] 重新安裝依賴 `npm install --legacy-peer-deps`

### 升級後驗證
- [ ] 運行 `npx expo-doctor@latest`
- [ ] 檢查所有語言檔案是否存在
- [ ] 確認資源檔案路徑正確
- [ ] 測試按鈕交互功能
- [ ] 驗證導航流程
- [ ] 測試多平台運行 (iOS/Android/Web)

## 最佳實踐

### 1. 版本管理
- 使用 package.json 的 overrides 解決版本衝突
- 保持 TypeScript 版本與 Expo SDK 建議版本一致

### 2. 依賴管理
- 升級後移除不需要的 @types 套件
- 使用 --legacy-peer-deps 處理 peer dependency 警告

### 3. 測試策略
- 每次升級後完整測試所有功能
- 特別注意按鈕交互和導航流程
- 在多個平台上驗證

## 已知問題

### 1. React 19 兼容性
- 部分第三方套件可能還未完全支援 React 19
- 使用 overrides 強制版本可能導致潛在問題

### 2. New Architecture
- Expo SDK 53 預設啟用 New Architecture
- 某些舊套件可能不相容

### 3. Metro Bundler 變更
- package.json exports 預設啟用
- 可能影響某些套件的模組解析

## 參考資源

- [Expo SDK 53 升級指南](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [React 19 升級指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React Native 0.79 發布說明](https://reactnative.dev/blog/2024/11/20/0.79-release)

---

**建立日期**: 2025年6月18日  
**問題解決日期**: 2025年6月18日  
**影響版本**: v1.0.0 (Expo SDK 53) 