const ReorderEngine = (() => {
  const uniqueIds = (items) => [...new Set((Array.isArray(items) ? items : []).map((item) => String(item || "").trim()).filter(Boolean))];

  function normalizeGroups(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(Object.entries(value).map(([key, items]) => [String(key), uniqueIds(items)]));
  }

  function normalizeCatalogOrder(value) {
    let parsed = value;
    if (typeof value === "string") {
      try { parsed = JSON.parse(value); }
      catch { parsed = {}; }
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) parsed = {};
    return {
      subjects: uniqueIds(parsed.subjects),
      topics: normalizeGroups(parsed.topics),
      subtopics: normalizeGroups(parsed.subtopics)
    };
  }

  function sortByOrder(items, orderIds, nameSelector = (item) => item?.name || "") {
    const positions = new Map(uniqueIds(orderIds).map((id, index) => [id, index]));
    return [...(items || [])].sort((a, b) => {
      const positionA = positions.has(String(a?.id)) ? positions.get(String(a.id)) : Number.MAX_SAFE_INTEGER;
      const positionB = positions.has(String(b?.id)) ? positions.get(String(b.id)) : Number.MAX_SAFE_INTEGER;
      return positionA - positionB || String(nameSelector(a)).localeCompare(String(nameSelector(b)), "pt-BR");
    });
  }

  function move(items, from, to) {
    const result = [...(items || [])];
    if (from < 0 || to < 0 || from >= result.length || to >= result.length || from === to) return result;
    const [item] = result.splice(from, 1);
    result.splice(to, 0, item);
    return result;
  }

  return { normalizeCatalogOrder, sortByOrder, move };
})();
