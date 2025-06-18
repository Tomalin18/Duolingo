# Expo 部署指南

## 部署概述

JapaneseGo 使用 Expo SDK 53，支援多平台部署：iOS、Android 和 Web。

## 開發環境部署

### 1. 本地開發伺服器
```bash
# 啟動開發伺服器
npx expo start

# 特定平台啟動
npx expo start --ios
npx expo start --android
npx expo start --web

# 清除快取啟動
npx expo start --clear
```

### 2. 使用 Tunnel 模式
```bash
# 當遇到網路問題時使用
npx expo start --tunnel
```

### 3. 開發工具
- **Expo Go**: 手機掃描 QR Code 測試
- **iOS Simulator**: macOS 開發機器
- **Android Emulator**: 需要 Android Studio
- **Web Browser**: 任何現代瀏覽器

## 測試部署

### 1. Expo Go 測試
**適用場景**: 快速原型測試、功能驗證

**優點**:
- 快速部署，掃碼即可測試
- 無需編譯原生程式碼
- 支援熱重載

**限制**:
- 只能使用 Expo SDK 包含的原生模組
- 無法使用自定義原生程式碼
- 檔案大小限制

**使用方法**:
```bash
npx expo start
# 手機掃描 QR Code 或輸入 URL
```

### 2. Development Build
**適用場景**: 需要自定義原生模組、完整功能測試

**優點**:
- 支援所有 React Native 功能
- 可以添加自定義原生程式碼
- 更接近生產環境

**建立方法**:
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## 生產環境部署

### 1. EAS Build (推薦)

#### 初始設定
```bash
# 安裝 EAS CLI
npm install -g eas-cli

# 登入 Expo 帳號
eas login

# 初始化 EAS 配置
eas build:configure
```

#### 建立配置檔案 (eas.json)
```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### 執行建置
```bash
# Android APK (測試用)
eas build --platform android --profile preview

# iOS TestFlight (測試用)
eas build --platform ios --profile preview

# 生產版本
eas build --platform all --profile production
```

### 2. 本地建置

#### Android APK
```bash
# 建立 Android APK
npx expo build:android

# 選擇建置類型
# 1. APK (測試用)
# 2. AAB (Google Play Store)
```

#### iOS IPA
```bash
# 建立 iOS IPA (需要 macOS)
npx expo build:ios

# 選擇憑證類型
# 1. App Store
# 2. Ad Hoc
# 3. Enterprise
```

## 應用商店發布

### 1. Google Play Store

#### 準備工作
- [ ] Google Play Developer 帳號 ($25 一次性費用)
- [ ] 應用簽名憑證
- [ ] 應用圖示和截圖
- [ ] 應用描述和隱私政策

#### 發布流程
```bash
# 建立 AAB 檔案
eas build --platform android --profile production

# 使用 EAS Submit 自動上傳
eas submit --platform android --profile production
```

#### 手動上傳
1. 登入 [Google Play Console](https://play.google.com/console)
2. 建立新應用
3. 上傳 AAB 檔案
4. 填寫應用資訊
5. 設定內容評級
6. 提交審核

### 2. Apple App Store

#### 準備工作
- [ ] Apple Developer 帳號 ($99/年)
- [ ] iOS 分發憑證
- [ ] App Store Connect 設定
- [ ] 應用圖示和截圖

#### 發布流程
```bash
# 建立 IPA 檔案
eas build --platform ios --profile production

# 使用 EAS Submit 自動上傳
eas submit --platform ios --profile production
```

#### 手動上傳
1. 登入 [App Store Connect](https://appstoreconnect.apple.com)
2. 建立新應用
3. 使用 Xcode 或 Transporter 上傳 IPA
4. 填寫應用資訊
5. 設定價格和可用性
6. 提交審核

## Web 部署

### 1. Expo Web Hosting
```bash
# 建置 Web 版本
npx expo export:web

# 部署到 Expo
npx expo publish:web
```

### 2. 靜態網站託管

#### Vercel 部署
```bash
# 安裝 Vercel CLI
npm install -g vercel

# 建置專案
npx expo export:web

# 部署
vercel --prod
```

#### Netlify 部署
```bash
# 建置專案
npx expo export:web

# 上傳 web-build 資料夾到 Netlify
```

#### GitHub Pages 部署
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
    - name: Install dependencies
      run: npm install --legacy-peer-deps
    - name: Build for web
      run: npx expo export:web
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./web-build
```

## 環境配置

### 1. 環境變數
```bash
# .env.local
API_URL=https://api.japanesego.com
ANALYTICS_KEY=your_analytics_key
SENTRY_DSN=your_sentry_dsn
```

### 2. 應用配置 (app.json)
```json
{
  "expo": {
    "name": "JapaneseGo",
    "slug": "japanesego",
    "version": "1.0.0",
    "platforms": ["ios", "android", "web"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#58CC02"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.japanesego.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#58CC02"
      },
      "package": "com.japanesego.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## Over-the-Air (OTA) 更新

### 1. EAS Update
```bash
# 安裝 EAS Update
npx expo install expo-updates

# 發布更新
eas update --branch production --message "修復按鈕問題"
```

### 2. 更新策略
- **自動更新**: 應用啟動時檢查更新
- **手動更新**: 用戶主動檢查更新
- **強制更新**: 關鍵安全更新

## 監控和分析

### 1. Expo Analytics
```bash
# 啟用分析
npx expo install expo-analytics-amplitude
```

### 2. 錯誤追蹤
```bash
# 整合 Sentry
npx expo install @sentry/react-native
```

### 3. 效能監控
- 使用 Flipper 進行本地除錯
- 整合 Firebase Performance Monitoring
- 監控應用啟動時間和記憶體使用

## 部署檢查清單

### 發布前檢查
- [ ] 所有功能測試通過
- [ ] 在多種裝置上測試
- [ ] 檢查應用圖示和啟動畫面
- [ ] 驗證應用權限設定
- [ ] 測試離線功能
- [ ] 檢查應用大小
- [ ] 驗證深層連結
- [ ] 測試推播通知

### 商店上架檢查
- [ ] 應用名稱和描述準確
- [ ] 截圖和預覽影片最新
- [ ] 隱私政策連結有效
- [ ] 年齡評級適當
- [ ] 關鍵字優化
- [ ] 聯絡資訊正確

## 常見問題排解

### 1. 建置失敗
```bash
# 清除快取
npx expo start --clear

# 重新安裝依賴
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 2. iOS 憑證問題
- 檢查 Apple Developer 帳號狀態
- 更新 Xcode 到最新版本
- 重新產生憑證和描述檔

### 3. Android 簽名問題
- 確保 keystore 檔案正確
- 檢查簽名配置
- 驗證包名唯一性

## 版本管理

### 1. 語義化版本
- **主版本**: 重大功能更新 (1.0.0 → 2.0.0)
- **次版本**: 新功能添加 (1.0.0 → 1.1.0)
- **修補版本**: 錯誤修復 (1.0.0 → 1.0.1)

### 2. 發布節奏
- **每週**: 錯誤修復和小改進
- **每月**: 新功能發布
- **每季**: 重大功能更新

---

**建立日期**: 2025年6月18日  
**更新日期**: 2025年6月18日  
**適用版本**: Expo SDK 53+ 