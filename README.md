# 📝 MyLuuTru — Offline-First Todo

[![HTML5](https://img.shields.io/badge/HTML5-markup-orange?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-styles-blue?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](#-run-locally)

[![🚀 Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-2563eb?style=for-the-badge)](https://nguyenvnlong.github.io/MyLuuTru/)

## ✨ Overview

**MyLuuTru** is an **offline-first** task management app for capturing and tracking to-dos directly in your browser. Tasks and preferences are stored locally with the LocalStorage API, so no backend is required.

The app currently supports light and dark themes, task filters, priority levels, and due dates. **Real-time search is planned but is not yet available.**

## 🧰 Skills & Tech Stack

| Technology / skill | Application |
| --- | --- |
| **HTML5** | Semantic structure for forms and task lists |
| **CSS3** | Responsive styling, light/dark themes, and priority badges |
| **Vanilla JavaScript (ES6+)** | App interactions, task parsing, and dynamic rendering |
| **LocalStorage API** | Persists tasks and theme preferences in the browser |
| **GitHub Copilot Agent Mode** | AI-assisted development and code editing |
| **Model Context Protocol (MCP)** | Connects tools to AI-assisted workflows |

## ✅ Features

- ➕ Create and delete tasks.
- ☑️ Mark tasks as complete or incomplete.
- 🎚️ Filter tasks by all, active, or completed status.
- 🚦 Set **High**, **Medium**, or **Low** priority with color-coded badges.
- 📅 Assign a **due date** to each task.
- ✨ Parse natural-language task descriptions offline with **AI Smart Task**, then review and edit the results before adding.
- 💾 Automatically persist tasks in LocalStorage, including across page reloads.
- 🌗 Switch between light and dark themes; remember the selected preference.
- 📱 Use a responsive layout on mobile screens.
- 🔎 **Real-time search — planned; not yet implemented.**

## 🏁 Run Locally

No dependencies or build tools are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/nguyenvnlong/MyLuuTru.git
   ```

2. Open the `MyLuuTru` folder.
3. Open `index.html` directly in your browser.

Alternatively, start a local static server from the project folder:

```bash
py -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## 🗂️ Project Structure

```text
MyLuuTru/
├── index.html   # Page structure and forms
├── styles.css   # Styling, themes, and responsive layout
├── app.js       # Task interactions, parsing, and LocalStorage
└── README.md    # Project documentation
```
