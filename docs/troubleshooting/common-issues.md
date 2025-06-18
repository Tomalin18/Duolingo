# 常見問題排解

## 開發環境問題

### 1. EMFILE: too many open files

**問題描述**:
```
Error: EMFILE: too many open files, watch
```

**原因**: macOS 系統文件描述符限制

**解決方案**:
```bash
# 臨時解決 (重啟後失效)
ulimit -n 65536

# 永久解決
echo "kern.maxfiles=65536" | sudo tee -a /etc/sysctl.conf
echo "kern.maxfilesperproc=65536" | sudo tee -a /etc/sysctl.conf

# 重啟系統或使用
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=65536
```

### 2. Metro Bundler 啟動失敗

**問題描述**:
```
Metro Bundler can't listen on port 8081
```

**解決方案**:
```bash
# 查看佔用 8081 端口的進程
lsof -ti:8081

# 終止進程
kill -9 $(lsof -ti:8081)

# 或使用不同端口
npx expo start --port 8082
```

### 3. 快取問題

**問題描述**: 
- 修改程式碼但沒有反映在應用中
- 奇怪的錯誤訊息

**解決方案**:
```bash
# 清除 Expo 快取
npx expo start --clear

# 清除 npm 快取
npm cache clean --force

# 清除 Metro 快取
npx react-native start --reset-cache

# 重新安裝依賴
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 依賴管理問題

### 1. React 版本衝突

**問題描述**:
```
npm error ERESOLVE could not resolve
peer dep @types/react@"^19.0.0"
```

**解決方案**:
```bash
# 使用 legacy-peer-deps
npm install --legacy-peer-deps

# 或在 package.json 添加 overrides
{
  "overrides": {
    "react": "19.0.0",
    "@types/react": "~19.0.10"
  }
}
```

### 2. TypeScript 版本問題

**問題描述**:
```
TypeScript error: Cannot find module 'react'
```

**解決方案**:
```bash
# 確保 TypeScript 版本匹配
npm install typescript@~5.8.3 --save-dev

# 檢查 tsconfig.json 配置
{
  "compilerOptions": {
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### 3. 模組解析錯誤

**問題描述**:
```
Unable to resolve module './locales/fr.json'
```

**解決方案**:
1. 檢查檔案是否存在
2. 檢查檔案名稱大小寫
3. 檢查相對路徑是否正確
4. 建立缺失的檔案

## 平台特定問題

### 1. iOS 模擬器問題

**問題描述**: iOS 模擬器無法啟動或連接

**解決方案**:
```bash
# 重啟模擬器
xcrun simctl shutdown all
xcrun simctl boot "iPhone 15"

# 重置模擬器
xcrun simctl erase all

# 檢查 Xcode 版本
xcode-select --print-path
```

### 2. Android 模擬器問題

**問題描述**: Android 模擬器連接失敗

**解決方案**:
```bash
# 檢查 ADB 連接
adb devices

# 重啟 ADB
adb kill-server
adb start-server

# 檢查模擬器狀態
emulator -list-avds
```

### 3. Web 版本問題

**問題描述**: Web 版本無法載入或功能異常

**解決方案**:
```bash
# 安裝 Web 依賴
npx expo install react-native-web react-dom

# 檢查瀏覽器控制台錯誤
# 確保使用支援的瀏覽器版本
```

## 建置和部署問題

### 1. EAS Build 失敗

**問題描述**: EAS 建置過程中失敗

**解決方案**:
```bash
# 檢查 eas.json 配置
# 確保所有必要檔案都已提交到 Git
# 檢查建置日誌獲取詳細錯誤資訊

# 本地測試建置
eas build --platform ios --local
```

### 2. 憑證問題

**問題描述**: iOS 憑證或 Android 簽名問題

**解決方案**:
```bash
# iOS - 重新產生憑證
eas credentials

# Android - 檢查 keystore
keytool -list -v -keystore my-release-key.keystore
```

### 3. 應用大小過大

**問題描述**: 應用檔案大小超過商店限制

**解決方案**:
1. 移除未使用的依賴
2. 優化圖片資源
3. 啟用程式碼分割
4. 使用 App Bundle (Android)

## 效能問題

### 1. 應用啟動緩慢

**解決方案**:
- 減少啟動時的初始化工作
- 使用懶載入
- 優化字體載入
- 減少同步操作

### 2. 記憶體使用過高

**解決方案**:
- 檢查記憶體洩漏
- 優化圖片使用
- 清理事件監聽器
- 使用 React.memo 避免不必要的重新渲染

### 3. 動畫卡頓

**解決方案**:
- 使用 `react-native-reanimated`
- 避免在動畫中使用 setState
- 使用 `InteractionManager`
- 優化列表渲染

## 除錯工具

### 1. React Native Debugger
```bash
# 安裝
brew install react-native-debugger

# 使用
在應用中按 Cmd+D (iOS) 或 Cmd+M (Android)
選擇 "Debug with Chrome"
```

### 2. Flipper
```bash
# 安裝
brew install flipper

# 整合到專案
npx expo install react-native-flipper
```

### 3. 日誌除錯
```typescript
// 使用 console.log 進行基本除錯
console.log('Debug info:', data);

// 使用 React Native 日誌
import { YellowBox, LogBox } from 'react-native';
LogBox.ignoreAllLogs(); // 生產環境中忽略警告
```

## 常用除錯指令

### 1. 檢查專案狀態
```bash
# 檢查 Expo 版本
npx expo --version

# 檢查專案健康狀態
npx expo-doctor

# 檢查依賴問題
npm audit
```

### 2. 重置環境
```bash
# 完全重置專案
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
npx expo start --clear
```

### 3. 網路除錯
```bash
# 檢查網路連接
ping google.com

# 使用 tunnel 模式
npx expo start --tunnel

# 檢查防火牆設定
```

## 錯誤日誌分析

### 1. JavaScript 錯誤
- 檢查堆疊追蹤
- 確認檔案路徑正確
- 檢查 TypeScript 型別錯誤

### 2. 原生錯誤
- 查看 Xcode Console (iOS)
- 使用 `adb logcat` (Android)
- 檢查權限設定

### 3. 網路錯誤
- 檢查 API 端點
- 驗證 CORS 設定
- 確認網路權限

## 預防措施

### 1. 版本控制
- 鎖定依賴版本
- 使用 package-lock.json
- 定期更新依賴

### 2. 測試策略
- 在多個裝置上測試
- 測試不同網路環境
- 模擬低記憶體情況

### 3. 監控設定
- 整合錯誤追蹤 (Sentry)
- 設定效能監控
- 建立警報機制

## 尋求協助

### 1. 官方資源
- [Expo 文件](https://docs.expo.dev/)
- [React Native 文件](https://reactnative.dev/)
- [GitHub Issues](https://github.com/expo/expo/issues)

### 2. 社群支援
- [Expo Discord](https://discord.gg/expo)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- [Reddit r/reactnative](https://reddit.com/r/reactnative)

### 3. 問題回報格式
```markdown
## 問題描述
簡要描述遇到的問題

## 重現步驟
1. 執行 xxx
2. 點擊 xxx
3. 出現錯誤

## 預期行為
描述預期應該發生什麼

## 實際行為
描述實際發生了什麼

## 環境資訊
- Expo SDK 版本:
- React Native 版本:
- 作業系統:
- 裝置型號:

## 錯誤日誌
貼上完整的錯誤訊息
```

---

**建立日期**: 2025年6月18日  
**更新日期**: 2025年6月18日  
**適用版本**: v1.0.0 