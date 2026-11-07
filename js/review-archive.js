const ReviewArchiveEngine = (() => {
  const ARCHIVED_PREFIX = "archived";

  function isArchived(plan) {
    return String(plan?.reason || "").startsWith(ARCHIVED_PREFIX);
  }

  function isKeyArchived(plans, reviewKey) {
    return (plans || []).some((plan) => !plan.deletedAt && plan.reviewKey === reviewKey && isArchived(plan));
  }

  function archive(plans, scheduleItem, timestamp = Date.now()) {
    if (!scheduleItem?.key) return [...(plans || [])];
    const reviewKey = scheduleItem.key;
    const matching = (plans || []).filter((plan) => !plan.deletedAt && plan.reviewKey === reviewKey);
    const reason = scheduleItem.manualDeferred ? "archived:manual" : "archived:auto";
    const update = (plan) => ({
      ...plan,
      reviewKey,
      originalDueDate: plan.reason === "manual" ? plan.originalDueDate : scheduleItem.originalDueDate,
      plannedDate: plan.reason === "manual" ? plan.plannedDate : scheduleItem.nextDate,
      reason,
      createdAt: Number(plan.createdAt || timestamp),
      updatedAt: timestamp
    });

    if (matching.length) {
      return (plans || []).map((plan) => plan.reviewKey === reviewKey && !plan.deletedAt ? update(plan) : plan);
    }

    return [...(plans || []), {
      id: `review-plan:${reviewKey}`,
      reviewKey,
      originalDueDate: scheduleItem.originalDueDate,
      plannedDate: scheduleItem.nextDate,
      reason,
      createdAt: timestamp,
      updatedAt: timestamp
    }];
  }

  function restore(plans, reviewKey, timestamp = Date.now()) {
    return (plans || []).map((plan) => {
      if (plan.reviewKey !== reviewKey || !isArchived(plan)) return plan;
      const restoreManualDate = plan.reason === "archived:manual";
      return {
        ...plan,
        originalDueDate: restoreManualDate ? plan.originalDueDate : "",
        plannedDate: restoreManualDate ? plan.plannedDate : "",
        reason: restoreManualDate ? "manual" : "restored",
        updatedAt: timestamp
      };
    });
  }

  function list(plans) {
    const unique = new Map();
    (plans || []).filter((plan) => !plan.deletedAt && isArchived(plan)).forEach((plan) => {
      const current = unique.get(plan.reviewKey);
      if (!current || Number(plan.updatedAt || 0) > Number(current.updatedAt || 0)) unique.set(plan.reviewKey, plan);
    });
    return [...unique.values()].sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
  }

  return { isArchived, isKeyArchived, archive, restore, list };
})();
