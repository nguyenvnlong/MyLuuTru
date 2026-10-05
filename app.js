const STORAGE_KEY = "my-luu-tru-todos";
const THEME_STORAGE_KEY = "my-luu-tru-theme";
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const searchInput = document.querySelector("#todo-search-input");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";
let searchQuery = "";

// 讀取待辦事項，若沒有資料就回傳空陣列
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 儲存待辦事項到 localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

/**
 * 依據目前狀態與搜尋文字，回傳可顯示的待辦清單。
 * @returns {Array<{id: number, text: string, completed: boolean}>} 符合條件的待辦事項
 */
function getVisibleTodos() {
  const normalizedQuery = searchQuery.toLocaleLowerCase();

  return todos.filter((todo) => {
    const matchesFilter = currentFilter === "active"
      ? !todo.completed
      : currentFilter === "completed"
        ? todo.completed
        : true;
    const matchesSearch = todo.text.toLocaleLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesSearch;
  });
}

// 取得目前主題：若使用者沒有手動設定，就跟隨作業系統設定
function getThemePreference() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return prefersDarkScheme.matches ? "dark" : "light";
}

// 依據主題更新可見狀態與按鈕文字
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
    themeToggle.setAttribute("aria-pressed", String(isDark));

    const themeIcon = themeToggle.querySelector(".theme-icon");
    const themeLabel = themeToggle.querySelector(".theme-label");

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "淺色模式" : "深色模式";
    }
  }
}

// 監聽系統主題變更，但只在使用者未手動設定時生效
function initTheme() {
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      applyTheme(nextTheme);
    });
  }

  const handleSystemThemeChange = (event) => {
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof prefersDarkScheme.addEventListener === "function") {
    prefersDarkScheme.addEventListener("change", handleSystemThemeChange);
  } else if (typeof prefersDarkScheme.addListener === "function") {
    prefersDarkScheme.addListener(handleSystemThemeChange);
  }
}

// 更新篩選按鈕的選取狀態
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

/**
 * 渲染符合搜尋與篩選條件的待辦事項，並更新空清單提示。
 * @returns {void} 不回傳值
 */
function renderTodos() {
  const visibleTodos = getVisibleTodos();
  list.replaceChildren();

  if (visibleTodos.length === 0) {
    emptyState.hidden = false;

    const emptyMessages = {
      all: "還沒有任何待辦事項，新增一個吧！",
      active: "目前沒有未完成的待辦事項。這些項目只是被篩選條件隱藏，並沒有被刪除。",
      completed: "目前沒有已完成的待辦事項。這些項目只是被篩選條件隱藏，並沒有被刪除。",
    };

    emptyState.textContent = searchQuery
      ? "找不到符合搜尋條件的待辦事項。"
      : emptyMessages[currentFilter] || emptyMessages.all;
  } else {
    emptyState.hidden = true;
  }

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.classList.toggle("is-completed", todo.completed);

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成待辦事項：${todo.text}`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除待辦事項：${todo.text}`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((entry) => entry !== todo);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成：${unfinishedCount} 項`;
  updateFilterButtons();
}

/**
 * 更新搜尋條件並重新渲染待辦清單。
 * @returns {void} 不回傳值
 */
function handleSearchInput() {
  searchQuery = searchInput.value.trim();
  renderTodos();
}

// 新增待辦事項
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  todos.unshift({
    id: Date.now(),
    text,
    completed: false,
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

// 篩選按鈕點擊事件
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

searchInput.addEventListener("input", handleSearchInput);

initTheme();
renderTodos();
