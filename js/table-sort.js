const TopicTableSortEngine = (() => {
  const KEYS = new Set(["subject", "topic", "questions", "correct", "durationSeconds", "percentage", "confidence", "mastery", "priority"]);
  const TEXT_KEYS = new Set(["subject", "topic"]);
  const CONFIDENCE_RANK = { low: 1, medium: 2, high: 3 };
  const MASTERY_RANK = { learning: 1, consolidation: 2, maintenance: 3 };

  function normalize(state) {
    if (!state || !KEYS.has(state.key) || !["asc", "desc"].includes(state.direction)) return null;
    return { key: state.key, direction: state.direction };
  }

  function initialDirection(key) {
    return TEXT_KEYS.has(key) ? "asc" : "desc";
  }

  function cycle(currentState, key) {
    if (!KEYS.has(key)) return normalize(currentState);
    const current = normalize(currentState);
    const first = initialDirection(key);
    if (!current || current.key !== key) return { key, direction: first };
    if (current.direction === first) return { key, direction: first === "asc" ? "desc" : "asc" };
    return null;
  }

  function textValue(item, key) {
    if (key === "topic") return `${item?.topic || ""}\u0000${item?.subtopic || ""}`;
    return String(item?.subject || "");
  }

  function numericValue(item, key) {
    if (key === "confidence") return CONFIDENCE_RANK[item?.confidence?.className] || 0;
    if (key === "mastery") return MASTERY_RANK[item?.mastery?.className] || 0;
    if (key === "priority") return Number(item?.priorityScore || 0);
    if (item?.[key] === null || item?.[key] === undefined || item?.[key] === "") return null;
    const value = Number(item?.[key]);
    return Number.isFinite(value) ? value : null;
  }

  function compareItems(a, b, state) {
    if (TEXT_KEYS.has(state.key)) {
      const result = textValue(a, state.key).localeCompare(textValue(b, state.key), "pt-BR", { sensitivity: "base", numeric: true });
      return state.direction === "asc" ? result : -result;
    }

    const valueA = numericValue(a, state.key);
    const valueB = numericValue(b, state.key);
    if (valueA === null && valueB === null) return 0;
    if (valueA === null) return 1;
    if (valueB === null) return -1;
    const result = valueA - valueB;
    return state.direction === "asc" ? result : -result;
  }

  function sort(items, state) {
    const normalized = normalize(state);
    const rows = [...(Array.isArray(items) ? items : [])];
    if (!normalized) return rows;
    return rows
      .map((item, index) => ({ item, index }))
      .sort((a, b) => compareItems(a.item, b.item, normalized) || a.index - b.index)
      .map(({ item }) => item);
  }

  function ariaSort(state, key) {
    const normalized = normalize(state);
    if (!normalized || normalized.key !== key) return "none";
    return normalized.direction === "asc" ? "ascending" : "descending";
  }

  return { normalize, cycle, sort, ariaSort, initialDirection };
})();
