# MyLuuTru

> 一個離線優先、無建置依賴的待辦清單應用程式，也是 GitHub Copilot Agent Mode 與 MCP 工作坊的實作專案。

[![HTML5](https://img.shields.io/badge/HTML5-semantic-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-responsive-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
![GitHub MCP](https://img.shields.io/badge/GitHub-MCP%20workflow-181717?style=flat&logo=github&logoColor=white)

MyLuuTru 是以原生 HTML、CSS 與 JavaScript 建立的待辦清單。介面支援響應式版面與淺色／深色主題；任務及主題偏好儲存在瀏覽器的 `localStorage`，不需伺服器或外部套件即可使用。

GitHub MCP badge 代表此儲存庫包含 MCP 與 Agent 工作流程教材，不代表待辦應用程式執行時需要連線 GitHub。

## 主要功能

- **Live Search**：輸入關鍵字即時搜尋待辦事項。
- **狀態篩選**：依全部、正在做或已完成篩選清單，可與搜尋條件同時使用。
- **Dark Mode**：支援手動切換，初次使用時會依照系統外觀偏好設定主題。
- **LocalStorage**：重新載入頁面後保留待辦事項與使用者選擇的主題。
- **Responsive UI**：適應桌面與手機螢幕，並提供鍵盤可操作的原生表單控制項。
- **零建置依賴**：使用原生瀏覽器技術，不需要套件管理器或編譯流程。

## 快速開始

### 直接開啟

下載或複製專案後，以瀏覽器開啟根目錄的 `index.html` 即可使用。無需安裝 Node.js、執行建置指令或啟動伺服器。

### 使用本機伺服器

若偏好透過本機 HTTP 伺服器預覽，可使用 Python：

```bash
python -m http.server 8000
```

接著在瀏覽器開啟 `http://localhost:8000`。

## 專案結構

```text
MyLuuTru/
├── index.html                   # 應用程式頁面與語意化結構
├── styles.css                   # 主題、元件樣式與響應式版面
├── app.js                       # 待辦、搜尋、篩選與主題邏輯
├── README.md                    # 專案介紹與使用說明
├── AGENDA.md                    # 工作坊議程
├── CHANGELOG.md                 # 專案變更紀錄
├── docs/                        # 設定、教學與疑難排解文件
├── scripts/
│   └── export-completions.mjs   # 匯出工作坊完成資料的工具
├── solutions/                   # 分階段範例與參考解答
│   ├── step-1/                  # 基礎 Todo 應用程式
│   ├── step-2/                  # 進階 Todo 應用程式
│   ├── step-3/                  # MCP 設定範例
│   ├── step-4/                  # Copilot 指示與修正 Issue prompt
│   └── step-5/                  # 作品集範例
└── .github/                     # Issue 範本、prompts 與工作流程設定
```

## 技術說明

- **前端**：HTML5、CSS3、原生 JavaScript（ES6+）。
- **資料保存**：瀏覽器 `localStorage`，資料留在目前使用的瀏覽器。
- **GitHub MCP**：用於儲存庫中的工作坊 Agent 工作流程與範例；不是應用程式的必要執行環境。
- **相容性**：使用支援 `localStorage`、`matchMedia` 與現代 DOM API 的瀏覽器。

