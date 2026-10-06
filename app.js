const STORAGE_KEY = "my-luu-tru-todos";
const THEME_STORAGE_KEY = "my-luu-tru-theme";
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const priorityInput = document.querySelector("#todo-priority");
const dueDateInput = document.querySelector("#todo-due-date");
const smartTaskForm = document.querySelector("#smart-task-form");
const smartTaskInput = document.querySelector("#smart-task-input");
const smartTaskStatus = document.querySelector("#smart-task-status");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";

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

// 依據目前篩選條件，回傳可顯示的待辦清單
function getVisibleTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
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
 * 將文字轉為不含重音的形式，並保留字元對應的原文索引。
 * @param {string} value 要正規化的文字。
 * @returns {{ text: string, starts: number[], ends: number[] }} 正規化文字及原文索引。
 */
function normalizeWithIndexes(value) {
  let normalizedText = "";
  const starts = [];
  const ends = [];

  for (let index = 0; index < value.length;) {
    const character = String.fromCodePoint(value.codePointAt(index));
    const endIndex = index + character.length;
    const normalizedCharacter = character
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/đ/g, "d");

    for (const normalizedLetter of normalizedCharacter) {
      normalizedText += normalizedLetter;
      starts.push(index);
      ends.push(endIndex);
    }

    index = endIndex;
  }

  return { text: normalizedText, starts, ends };
}

/**
 * 尋找正規化文字中的符合片段，並換算回原文位置。
 * @param {{ text: string, starts: number[], ends: number[] }} normalized 已正規化的文字。
 * @param {RegExp} pattern 要搜尋的規則。
 * @returns {{ match: RegExpMatchArray, start: number, end: number } | null} 符合片段，若無則回傳 null。
 */
function findOriginalMatch(normalized, pattern) {
  const match = normalized.text.match(pattern);
  if (!match || match.index === undefined) {
    return null;
  }

  const lastIndex = match.index + match[0].length - 1;
  return {
    match,
    start: normalized.starts[match.index],
    end: normalized.ends[lastIndex],
  };
}

/**
 * 將有效日期轉為當地時區的 YYYY-MM-DD 格式。
 * @param {number} year 年份。
 * @param {number} month 月份，範圍為 1 至 12。
 * @param {number} day 日期。
 * @returns {string | null} ISO 日期；若日期無效則回傳 null。
 */
function toLocalDateString(year, month, day) {
  const date = new Date(year, month - 1, day);
  if (
    year < 1000
    || date.getFullYear() !== year
    || date.getMonth() !== month - 1
    || date.getDate() !== day
  ) {
    return null;
  }

  const monthText = String(month).padStart(2, "0");
  const dayText = String(day).padStart(2, "0");
  return `${year}-${monthText}-${dayText}`;
}

/**
 * 依相對日期、星期或數字日期辨識到期日。
 * @param {{ text: string, starts: number[], ends: number[] }} normalized 已正規化的文字。
 * @param {Date} today 當地時區的今天日期。
 * @returns {{ dueDate: string, start: number, end: number } | null} 到期日及日期片段位置。
 */
function parseDueDate(normalized, today) {
  const absoluteDate = findOriginalMatch(
    normalized,
    /\b(\d{4})-(\d{1,2})-(\d{1,2})\b|\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/,
  );

  if (absoluteDate) {
    const { match } = absoluteDate;
    const year = Number(match[1] || match[6]);
    const month = Number(match[2] || match[5]);
    const day = Number(match[3] || match[4]);
    const dueDate = toLocalDateString(year, month, day);
    if (dueDate) {
      const datePrefix = findOriginalMatch(
        normalized,
        /\bngay\s+(?=\d{1,2}[./-]\d{1,2}[./-]\d{4}\b)/,
      );
      return {
        dueDate,
        start: datePrefix ? datePrefix.start : absoluteDate.start,
        end: absoluteDate.end,
      };
    }
  }

  const relativeDate = findOriginalMatch(
    normalized,
    /\bngay\s+(hom nay|mai|mot|kia)\b|\bhom nay\b|\bmai\b/,
  );
  if (relativeDate) {
    const phrase = relativeDate.match[0];
    const offset = /\bmai\b/.test(phrase) ? 1 : /\b(mot|kia)\b/.test(phrase) ? 2 : 0;
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    return {
      dueDate: toLocalDateString(date.getFullYear(), date.getMonth() + 1, date.getDate()),
      start: relativeDate.start,
      end: relativeDate.end,
    };
  }

  const weekday = findOriginalMatch(
    normalized,
    /\bthu\s*(2|3|4|5|6|7|hai|ba|tu|nam|sau|bay)\b|\bchu\s+nhat\b/,
  );
  if (weekday) {
    const weekdayNames = { hai: 1, ba: 2, tu: 3, nam: 4, sau: 5, bay: 6 };
    const weekdayToken = weekday.match[1];
    const targetDay = weekdayToken === undefined
      ? 0
      : /^\d$/.test(weekdayToken)
        ? Number(weekdayToken) - 1
        : weekdayNames[weekdayToken];
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayOffset = (targetDay - todayDate.getDay() + 7) % 7;
    const date = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + dayOffset);
    return {
      dueDate: toLocalDateString(date.getFullYear(), date.getMonth() + 1, date.getDate()),
      start: weekday.start,
      end: weekday.end,
    };
  }

  return null;
}

/**
 * 從越南文或不含重音符號的句子擷取工作名稱、優先程度及到期日。
 * @param {string} sentence 使用者輸入的句子。
 * @param {Date} [today] 當天日期，可供測試時指定。
 * @returns {{ text: string, priority: string, dueDate: string }} 分析後的欄位。
 */
function parseSmartTask(sentence, today = new Date()) {
  const normalized = normalizeWithIndexes(sentence);
  const removals = [];
  let priority = "medium";
  let dueDate = "";

  const priorityMatch = findOriginalMatch(
    normalized,
    /\b(?:muc do uu tien|do uu tien|uu tien|priority)\s+(cao|high|trung binh|medium|thap|low)\b|\b(cao|high|trung binh|medium|thap|low)\s+(?:uu tien|priority)\b/,
  );
  if (priorityMatch) {
    const priorityWord = priorityMatch.match[1] || priorityMatch.match[2];
    const normalizedPriority = priorityWord.replace(/\s+/g, " ");
    priority = ["cao", "high"].includes(normalizedPriority)
      ? "high"
      : ["thap", "low"].includes(normalizedPriority)
        ? "low"
        : "medium";
    removals.push(priorityMatch);
  }

  const dateMatch = parseDueDate(normalized, today);
  if (dateMatch) {
    dueDate = dateMatch.dueDate;
    removals.push(dateMatch);

    const timeMatch = findOriginalMatch(
      normalized,
      /\b(?:luc\s*)?\d{1,2}\s*(?:h(?:\s*\d{1,2})?|gio(?:\s*\d{1,2})?)(?:\s*(?:sang|chieu|toi|trua))?\b|\b\d{1,2}:\d{2}\s*(?:sang|chieu|toi|trua)?\b/,
    );
    if (timeMatch) {
      removals.push(timeMatch);
    }
  }

  let text = sentence;
  removals.sort((first, second) => second.start - first.start);
  for (const { start, end } of removals) {
    text = `${text.slice(0, start)} ${text.slice(end)}`;
  }
  text = text.replace(/\s+/g, " ").replace(/^[\s,;:.-]+|[\s,;:.-]+$/g, "");

  return { text, priority, dueDate };
}

/**
 * 將分析結果填入工作表單，供使用者確認或修改。
 * @param {SubmitEvent} event AI 智慧任務表單的送出事件。
 * @returns {void}
 */
function handleSmartTaskSubmit(event) {
  event.preventDefault();

  const sentence = smartTaskInput.value.trim();
  if (!sentence) {
    smartTaskInput.focus();
    return;
  }

  const parsedTask = parseSmartTask(sentence);
  if (!parsedTask.text) {
    smartTaskStatus.textContent = "找不到任務名稱，請輸入想完成的事項。";
    return;
  }

  input.value = parsedTask.text;
  priorityInput.value = parsedTask.priority;
  dueDateInput.value = parsedTask.dueDate;

  const priorityLabels = { high: "高", medium: "中", low: "低" };
  const dueDateMessage = parsedTask.dueDate ? `，到期日 ${parsedTask.dueDate}` : "，未辨識到日期";
  smartTaskStatus.textContent = `已填入表單：${parsedTask.text}｜${priorityLabels[parsedTask.priority]}優先${dueDateMessage}。請確認後按「新增」。`;
  input.focus();
}

/**
 * 渲染待辦事項及優先程度、到期日，並更新空清單提示。
 * @returns {void}
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

    emptyState.textContent = emptyMessages[currentFilter] || emptyMessages.all;
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

    const content = document.createElement("div");
    content.className = "todo-content";
    content.append(text);

    const priority = ["high", "medium", "low"].includes(todo.priority) ? todo.priority : "medium";
    const priorityLabels = {
      high: "高優先",
      medium: "中優先",
      low: "低優先",
    };
    const metadata = document.createElement("div");
    metadata.className = "todo-metadata";

    const priorityBadge = document.createElement("span");
    priorityBadge.className = `priority-badge priority-${priority}`;
    priorityBadge.textContent = priorityLabels[priority];
    metadata.append(priorityBadge);

    if (todo.dueDate) {
      const dueDate = document.createElement("span");
      dueDate.className = "todo-due-date";
      dueDate.textContent = `到期日：${todo.dueDate}`;
      metadata.append(dueDate);
    }

    content.append(metadata);

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

    item.append(checkbox, content, deleteButton);
    list.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成：${unfinishedCount} 項`;
  updateFilterButtons();
}

/**
 * 驗證並儲存表單中的新待辦事項。
 * @param {SubmitEvent} event 表單送出的事件。
 * @returns {void}
 */
function handleFormSubmit(event) {
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
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
}

form.addEventListener("submit", handleFormSubmit);
smartTaskForm.addEventListener("submit", handleSmartTaskSubmit);

// 篩選按鈕點擊事件
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

initTheme();
renderTodos();
