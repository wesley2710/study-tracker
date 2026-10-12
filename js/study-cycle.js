const StudyCycleEngine = (() => {
  const toIndex = (value, length, fallback = 0) => {
    if (!length) return -1;
    const parsed = Number(value);
    const index = Number.isInteger(parsed) ? parsed : fallback;
    return ((index % length) + length) % length;
  };

  function parseSubjectIds(value) {
    let items = value;
    if (!Array.isArray(items)) {
      try { items = JSON.parse(String(items || "[]")); }
      catch { items = []; }
    }
    return Array.isArray(items) ? items.map((id) => String(id || "").trim()).filter(Boolean) : [];
  }

  function normalize(record = {}) {
    const subjectIds = parseSubjectIds(record.studyCycleSubjectIds);
    const currentIndex = toIndex(record.studyCycleCurrentIndex, subjectIds.length);
    const rawPrevious = Number(record.studyCyclePreviousIndex);
    const previousIndex = subjectIds.length && Number.isInteger(rawPrevious) && rawPrevious >= 0 && rawPrevious < subjectIds.length ? rawPrevious : -1;
    const activeValue = record.studyCycleActive;
    const active = subjectIds.length > 0 && activeValue !== false && String(activeValue).toLowerCase() !== "false" && String(activeValue) !== "0";
    return { subjectIds, currentIndex, previousIndex, active, lastAdvancedAt: Number(record.studyCycleLastAdvancedAt || 0) };
  }

  function toRecord(cycle, previous = {}, timestamp = Date.now()) {
    const normalized = normalize({
      studyCycleSubjectIds: cycle.subjectIds,
      studyCycleCurrentIndex: cycle.currentIndex,
      studyCyclePreviousIndex: cycle.previousIndex,
      studyCycleActive: cycle.active,
      studyCycleLastAdvancedAt: cycle.lastAdvancedAt
    });
    return {
      ...previous,
      id: "study-cycle",
      studyCycleSubjectIds: JSON.stringify(normalized.subjectIds),
      studyCycleCurrentIndex: normalized.currentIndex,
      studyCyclePreviousIndex: normalized.previousIndex,
      studyCycleActive: normalized.active,
      studyCycleLastAdvancedAt: Number(cycle.lastAdvancedAt || 0),
      createdAt: Number(previous.createdAt || timestamp),
      updatedAt: timestamp
    };
  }

  function add(record, subjectId, timestamp = Date.now()) {
    const cycle = normalize(record);
    cycle.subjectIds.push(String(subjectId));
    if (cycle.currentIndex < 0) cycle.currentIndex = 0;
    cycle.active = true;
    cycle.previousIndex = -1;
    return toRecord(cycle, record, timestamp);
  }

  function remove(record, index, timestamp = Date.now()) {
    const cycle = normalize(record);
    if (index < 0 || index >= cycle.subjectIds.length) return toRecord(cycle, record, timestamp);
    cycle.subjectIds.splice(index, 1);
    if (!cycle.subjectIds.length) {
      cycle.currentIndex = -1;
      cycle.previousIndex = -1;
      cycle.active = false;
    } else {
      if (index < cycle.currentIndex) cycle.currentIndex -= 1;
      else if (index === cycle.currentIndex && cycle.currentIndex >= cycle.subjectIds.length) cycle.currentIndex = 0;
      cycle.currentIndex = toIndex(cycle.currentIndex, cycle.subjectIds.length);
      cycle.previousIndex = -1;
    }
    return toRecord(cycle, record, timestamp);
  }

  function reorder(record, from, to, timestamp = Date.now()) {
    const cycle = normalize(record);
    if (from < 0 || to < 0 || from >= cycle.subjectIds.length || to >= cycle.subjectIds.length || from === to) return toRecord(cycle, record, timestamp);
    const [item] = cycle.subjectIds.splice(from, 1);
    cycle.subjectIds.splice(to, 0, item);
    if (cycle.currentIndex === from) cycle.currentIndex = to;
    else if (from < cycle.currentIndex && cycle.currentIndex <= to) cycle.currentIndex -= 1;
    else if (to <= cycle.currentIndex && cycle.currentIndex < from) cycle.currentIndex += 1;
    cycle.previousIndex = -1;
    return toRecord(cycle, record, timestamp);
  }

  function move(record, direction = 1, timestamp = Date.now()) {
    const cycle = normalize(record);
    if (!cycle.subjectIds.length) return toRecord(cycle, record, timestamp);
    cycle.previousIndex = cycle.currentIndex;
    cycle.currentIndex = toIndex(cycle.currentIndex + Number(direction || 0), cycle.subjectIds.length);
    cycle.lastAdvancedAt = timestamp;
    return toRecord(cycle, record, timestamp);
  }

  function undo(record, timestamp = Date.now()) {
    const cycle = normalize(record);
    if (cycle.previousIndex < 0 || !cycle.subjectIds.length) return toRecord(cycle, record, timestamp);
    const current = cycle.currentIndex;
    cycle.currentIndex = cycle.previousIndex;
    cycle.previousIndex = current;
    cycle.lastAdvancedAt = timestamp;
    return toRecord(cycle, record, timestamp);
  }

  function reset(record, timestamp = Date.now()) {
    const cycle = normalize(record);
    cycle.previousIndex = cycle.currentIndex;
    cycle.currentIndex = cycle.subjectIds.length ? 0 : -1;
    cycle.lastAdvancedAt = timestamp;
    return toRecord(cycle, record, timestamp);
  }

  function setActive(record, active, timestamp = Date.now()) {
    const cycle = normalize(record);
    cycle.active = Boolean(active) && cycle.subjectIds.length > 0;
    return toRecord(cycle, record, timestamp);
  }

  return { parseSubjectIds, normalize, toRecord, add, remove, reorder, move, undo, reset, setActive };
})();
