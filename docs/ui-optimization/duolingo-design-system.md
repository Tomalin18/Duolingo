# Duolingo 設計系統實作

## 設計理念

JapaneseGo 完全仿照 Duolingo 的視覺設計語言，提供一致且友善的學習體驗。

## 色彩系統

### 主要色彩
```typescript
// 來源: src/constants/Colors.ts
export const Colors = {
  // 主色調 - Duolingo 經典綠
  primary: '#58CC02',        // 主要綠色
  primaryDark: '#4CAF50',    // 深綠色
  primaryLight: '#89E219',   // 淺綠色
  
  // 輔助色彩
  secondary: '#FFC107',      // 黃色
  secondaryDark: '#FF9600',  // 橙色
}
```

### 色彩使用指南

#### 1. 主色調 (#58CC02)
- **使用場景**: 主要按鈕、進度條、成功狀態
- **心理效應**: 代表成長、學習、正面進展
- **應用範例**: 
  - "GET STARTED" 按鈕背景
  - Duo 角色身體顏色
  - 完成狀態指示器

#### 2. 橙色 (#FF9600)
- **使用場景**: Duo 的嘴巴、警告提示、強調元素
- **心理效應**: 活力、注意力、友善
- **應用範例**:
  - Duo 角色嘴巴
  - "SKIP" 按鈕邊框
  - 重要提示高亮

#### 3. 中性色彩
```typescript
// 文字色彩層級
textPrimary: '#3C3C3C',    // 主要文字 - 深灰
textSecondary: '#777777',  // 次要文字 - 中灰  
textLight: '#AAAAAA',      // 輔助文字 - 淺灰
```

## 字體系統

### 字體層級
```typescript
// 來源: src/constants/Typography.ts
export const Typography = {
  // 標題字體
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  
  // 內文字體
  body: { fontSize: 16, fontWeight: 'normal' },
  bodyLarge: { fontSize: 18, fontWeight: 'normal' },
  
  // 按鈕字體
  button: { fontSize: 16, fontWeight: 'bold' },
  buttonLarge: { fontSize: 18, fontWeight: 'bold' },
}
```

### 字體使用原則

1. **層級清晰**: 使用不同字體大小建立視覺層級
2. **易讀性**: 確保在各種螢幕尺寸下都能清楚閱讀
3. **一致性**: 相同功能的元素使用相同字體樣式

## 間距系統

### 基礎間距
```typescript
// 來源: src/constants/Spacing.ts
export const Spacing = {
  // 基礎間距單位 (8px 系統)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // 畫面間距
  screenHorizontal: 20,
  screenVertical: 16,
}
```

### 間距應用

1. **8px 基礎系統**: 所有間距都是 8 的倍數
2. **一致性**: 相同類型的元素使用相同間距
3. **呼吸感**: 適當的留白提升閱讀體驗

## 組件設計規範

### 1. 按鈕設計

#### 主要按鈕 (Primary Button)
```typescript
primaryButton: {
  backgroundColor: Colors.primary,
  borderRadius: 12,
  paddingVertical: 16,
  paddingHorizontal: 24,
  minHeight: 50,
  // 陰影效果
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
}
```

#### 次要按鈕 (Secondary Button)
```typescript
secondaryButton: {
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: Colors.borderDark,
  borderRadius: 12,
  paddingVertical: 14,
  paddingHorizontal: 24,
}
```

### 2. Duo 角色設計

#### 設計特色
- **圓潤造型**: 使用 borderRadius 創造友善感
- **大眼睛**: 白色圓形 + 深色瞳孔
- **橙色嘴巴**: 三角形設計
- **綠色身體**: 主品牌色

#### 實作細節
```typescript
duoBody: {
  width: 120,
  height: 140,
  backgroundColor: Colors.primary,
  borderRadius: 60,
  // 立體感陰影
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
}
```

### 3. 卡片設計

#### 練習卡片
```typescript
exerciseCard: {
  backgroundColor: Colors.white,
  borderRadius: 16,
  padding: Spacing.lg,
  // 邊框
  borderWidth: 2,
  borderColor: Colors.borderLight,
  // 陰影
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
}
```

## 動畫與互動

### 1. 按鈕互動
- **按下狀態**: 輕微縮放 (scale: 0.98)
- **懸停效果**: 顏色加深
- **載入狀態**: 透明度變化

### 2. 頁面轉場
- **進入動畫**: slide_from_right
- **退出動畫**: slide_to_left
- **持續時間**: 300ms

### 3. 反饋動畫
- **成功**: 綠色閃爍 + 縮放
- **錯誤**: 紅色震動
- **載入**: 旋轉動畫

## 響應式設計

### 螢幕尺寸適配
```typescript
const { width, height } = Dimensions.get('window');

// 根據螢幕寺寸調整
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

// 動態字體大小
fontSize: isSmallScreen ? 14 : 16,
```

### 安全區域處理
- 使用 `react-native-safe-area-context`
- 確保內容不被狀態列或 Home 指示器遮擋

## 可訪問性 (Accessibility)

### 1. 色彩對比
- 所有文字都符合 WCAG AA 標準
- 主要文字對比度 > 4.5:1
- 大文字對比度 > 3:1

### 2. 觸控目標
- 最小觸控區域: 44x44 點
- 按鈕間距: 至少 8px

### 3. 螢幕閱讀器支援
- 所有互動元素都有 accessibilityLabel
- 使用語義化的 accessibilityRole

## 設計資源

### 1. 圖示系統
- 使用 `@expo/vector-icons`
- 一致的圖示風格
- 適當的圖示大小 (24px, 32px)

### 2. 插圖風格
- 扁平化設計
- 圓潤邊角
- 明亮色彩
- 友善表情

## 品牌一致性檢查清單

### 視覺元素
- [ ] 使用正確的品牌色彩
- [ ] 遵循字體層級系統
- [ ] 保持間距一致性
- [ ] 應用正確的圓角半徑

### 互動體驗
- [ ] 按鈕有適當的觸覺反饋
- [ ] 載入狀態清楚可見
- [ ] 錯誤訊息友善易懂
- [ ] 成功狀態令人愉悅

### 內容呈現
- [ ] 文字層級清晰
- [ ] 圖片品質良好
- [ ] 動畫流暢自然
- [ ] 資訊架構合理

## 未來優化方向

### 1. 深色模式支援
- 建立深色主題色彩系統
- 確保所有組件支援主題切換

### 2. 動態字體大小
- 支援系統字體大小設定
- 保持佈局不破壞

### 3. 更豐富的動畫
- 微互動動畫
- 頁面轉場效果
- 慶祝動畫

---

**建立日期**: 2025年6月18日  
**更新日期**: 2025年6月18日  
**設計版本**: v1.0.0 