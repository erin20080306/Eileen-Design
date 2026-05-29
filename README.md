# ERIN. Design Studio

艾琳設計工作室的一頁式品牌網站（React + Tailwind CSS + lucide-react）。

## 兩種預覽方式

### 方式 A：免安裝即時預覽（推薦快速查看）
直接用瀏覽器開啟 `preview.html` 即可。
此檔案透過 CDN 載入 React / Tailwind / Babel，**不需安裝任何東西**，
但需要連線網路（載入 CDN 與 Unsplash 圖片）。

### 方式 B：正式 Vite 開發環境（可開發、可打包上線）
需先安裝 Node.js（建議 LTS 版本）：<https://nodejs.org/>

安裝後，在本資料夾開啟終端機並執行：

```bash
npm install      # 安裝相依套件
npm run dev      # 啟動開發伺服器（通常為 http://localhost:5173）
npm run build    # 打包成可部署的靜態檔案（輸出到 dist/）
npm run preview  # 預覽打包後的結果
```

## 專案結構

```
erin-design-studio/
├─ preview.html          # 免安裝即時預覽（CDN 版）
├─ index.html            # Vite 進入點
├─ package.json          # 相依套件與指令
├─ vite.config.js        # Vite 設定
├─ tailwind.config.js    # Tailwind 設定
├─ postcss.config.js     # PostCSS 設定
└─ src/
   ├─ main.jsx           # React 進入點
   ├─ App.jsx            # 主要頁面元件（原始程式碼）
   └─ index.css          # Tailwind 指令
```

## 備註
- `src/App.jsx` 為您提供的原始程式碼，使用 `lucide-react` 套件。
- `preview.html` 為免安裝版本，因環境未安裝 Node.js，已將圖示改為內嵌 SVG，畫面與功能相同。
