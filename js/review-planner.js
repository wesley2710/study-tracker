const ReviewPlanner = (() => {
  const DAY_MS = 86400000;

  function clamp(value, min, max, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(min, Math.min(max, Math.round(number))) : fallback;
  }

  function dayDifference(from, to) {
    const start = new Date(`${from}T12:00:00`);
    const end = new Date(`${to}T12:00:00`);
    return Math.round((end - start) / DAY_MS);
  }

  function addDays(isoDate, days) {
    const date = new Date(`${isoDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function calculatePriority(item, today, minimumQuestions) {
    const overdueDays = Math.max(0, dayDifference(item.nextDate, today));
    const daysWithoutStudy = Math.max(0, dayDifference(item.lastDate, today));
    const accuracy = Number.isFinite(item.lastPercentage) ? item.lastPercentage : 50;
    const questionCount = Number(item.lastQuestions || 0);
    const lowEvidence = Math.max(0, minimumQuestions - questionCount);
    return Math.round(
      (Math.min(overdueDays, 30) * 4) +
      ((100 - accuracy) * 0.45) +
      (Math.min(daysWithoutStudy, 90) * 0.25) +
      (lowEvidence * 1.5)
    );
  }

  function plan(items, overrides = [], options = {}) {
    const today = options.today;
    const capacity = clamp(options.capacity, 1, 12, 4);
    const minimumQuestions = clamp(options.minimumQuestions, 1, 200, 10);
    const overrideMap = new Map((overrides || []).filter((item) => !item.deletedAt).map((item) => [item.reviewKey, item]));
    const counts = new Map();
    const fixed = [];
    const automatic = [];

    (items || []).forEach((source) => {
      const item = { ...source, originalDueDate: source.nextDate };
      item.automaticPriority = calculatePriority(item, today, minimumQuestions);
      const override = overrideMap.get(item.key);
      if (override && override.originalDueDate === item.originalDueDate && /^\d{4}-\d{2}-\d{2}$/.test(override.plannedDate || "")) {
        item.plannedDate = override.plannedDate;
        item.manualDeferred = true;
        fixed.push(item);
        counts.set(item.plannedDate, (counts.get(item.plannedDate) || 0) + 1);
      } else {
        automatic.push(item);
      }
    });

    automatic.sort((a, b) => a.originalDueDate.localeCompare(b.originalDueDate) || b.automaticPriority - a.automaticPriority || a.key.localeCompare(b.key));
    automatic.forEach((item) => {
      let date = item.originalDueDate < today ? today : item.originalDueDate;
      while ((counts.get(date) || 0) >= capacity) date = addDays(date, 1);
      item.plannedDate = date;
      item.manualDeferred = false;
      counts.set(date, (counts.get(date) || 0) + 1);
    });

    return [...fixed, ...automatic].map((item) => {
      const redistributionDays = dayDifference(item.originalDueDate, item.plannedDate);
      const status = item.plannedDate < today ? "overdue" : item.plannedDate === today ? "today" : "upcoming";
      return {
        ...item,
        nextDate: item.plannedDate,
        status,
        redistributionDays,
        redistributed: redistributionDays > 0,
        priorityScore: item.automaticPriority + (redistributionDays > 0 ? 25 + Math.min(30, redistributionDays * 3) : 0)
      };
    }).sort((a, b) => a.plannedDate.localeCompare(b.plannedDate) || a.originalDueDate.localeCompare(b.originalDueDate) || b.priorityScore - a.priorityScore);
  }

  function forecast(schedule, today, days = 7) {
    return Array.from({ length: days }, (_, index) => {
      const date = addDays(today, index);
      const entries = schedule.filter((item) => item.plannedDate === date);
      return { date, count: entries.length, redistributed: entries.filter((item) => item.redistributed).length };
    });
  }

  return { plan, forecast, calculatePriority, dayDifference, addDays, clamp };
})();
