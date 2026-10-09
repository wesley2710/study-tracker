const SafetyEngine = (() => {
  const COLLECTIONS = ["sessions", "reviews", "mocks", "subjects", "topics", "subtopics"];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeBackupData(backup) {
    const data = backup?.data || backup || {};
    const catalog = data.catalog || {};
    return {
      sessions: data.sessions,
      reviews: data.reviews,
      mocks: data.mocks,
      subjects: data.subjects || catalog.subjects,
      topics: data.topics || catalog.topics,
      subtopics: data.subtopics || catalog.subtopics,
      auditLog: Array.isArray(data.auditLog) ? data.auditLog : Array.isArray(backup?.auditLog) ? backup.auditLog : []
    };
  }

  function validateBackup(backup) {
    if (!backup || typeof backup !== "object") return { valid: false, error: "O arquivo não contém um backup válido." };
    if (backup.schemaVersion != null && Number(backup.schemaVersion) !== 1) return { valid: false, error: "A versão deste backup não é compatível com o sistema atual." };
    const data = normalizeBackupData(backup);
    for (const key of COLLECTIONS) {
      if (!Array.isArray(data[key])) return { valid: false, error: `A coleção “${key}” está ausente ou inválida.` };
      const ids = new Set();
      for (const item of data[key]) {
        if (!item || typeof item !== "object" || !String(item.id || "").trim()) return { valid: false, error: `Existe um registro inválido em “${key}”.` };
        if (ids.has(item.id)) return { valid: false, error: `O identificador “${item.id}” está duplicado em “${key}”.` };
        ids.add(item.id);
      }
    }
    const subjectIds = new Set(data.subjects.map((item) => item.id));
    const topicIds = new Set(data.topics.map((item) => item.id));
    const subtopicIds = new Set(data.subtopics.map((item) => item.id));
    if (data.topics.some((item) => !item.subjectId || !subjectIds.has(item.subjectId))) return { valid: false, error: "O backup contém um tema sem matéria válida." };
    if (data.subtopics.some((item) => !item.topicId || !topicIds.has(item.topicId))) return { valid: false, error: "O backup contém um subtema sem tema válido." };
    const brokenRecord = [...data.sessions, ...data.reviews].some((item) =>
      (item.subjectId && !subjectIds.has(item.subjectId)) ||
      (item.topicId && !topicIds.has(item.topicId)) ||
      (item.subtopicId && !subtopicIds.has(item.subtopicId))
    );
    if (brokenRecord) return { valid: false, error: "O backup contém sessões ou revisões com vínculos inválidos." };
    return { valid: true, data: clone(data) };
  }

  function createBackup(state, auditLog = [], exportedAt = Date.now()) {
    return {
      schemaVersion: 1,
      appVersion: "1.9.0",
      exportedAt,
      data: {
        sessions: clone(state.sessions || []),
        reviews: clone(state.reviews || []),
        mocks: clone(state.mocks || []),
        subjects: clone(state.subjects || []),
        topics: clone(state.topics || []),
        subtopics: clone(state.subtopics || []),
        auditLog: clone(auditLog || [])
      }
    };
  }

  function prepareRestore(current, restoredData, timestamp = Date.now()) {
    const restored = normalizeBackupData(restoredData);
    const meta = clone(current.meta || {});
    const tombstoneKeys = {
      sessions: "sessionTombstones",
      reviews: "reviewTombstones",
      mocks: "mockTombstones",
      subjects: "subjectTombstones",
      topics: "topicTombstones",
      subtopics: "subtopicTombstones"
    };
    const result = { meta };

    COLLECTIONS.forEach((key) => {
      const incoming = clone(restored[key] || []).map((item) => ({ ...item, deletedAt: null, updatedAt: timestamp }));
      const incomingIds = new Set(incoming.map((item) => item.id));
      const tombstoneKey = tombstoneKeys[key];
      meta[tombstoneKey] = { ...(meta[tombstoneKey] || {}) };
      (current[key] || []).forEach((item) => {
        if (!incomingIds.has(item.id)) meta[tombstoneKey][item.id] = timestamp;
      });
      incomingIds.forEach((id) => { delete meta[tombstoneKey][id]; });
      result[key] = incoming;
    });
    meta.pendingChanges = Number(meta.pendingChanges || 0);
    return result;
  }

  function getCatalogImpact(state, type, id) {
    const subjects = state.subjects || [];
    const topics = state.topics || [];
    const subtopics = state.subtopics || [];
    const subjectIds = new Set();
    const topicIds = new Set();
    const subtopicIds = new Set();

    if (type === "subject") {
      subjectIds.add(id);
      topics.filter((item) => item.subjectId === id).forEach((item) => topicIds.add(item.id));
      subtopics.filter((item) => topicIds.has(item.topicId)).forEach((item) => subtopicIds.add(item.id));
    } else if (type === "topic") {
      topicIds.add(id);
      subtopics.filter((item) => item.topicId === id).forEach((item) => subtopicIds.add(item.id));
    } else if (type === "subtopic") {
      subtopicIds.add(id);
    }

    const matches = (item) => subjectIds.has(item.subjectId) || topicIds.has(item.topicId) || subtopicIds.has(item.subtopicId);
    const affectedSessions = (state.sessions || []).filter(matches);
    const affectedReviews = (state.reviews || []).filter(matches);
    const questions = affectedSessions.reduce((sum, item) => sum + Number(item.questions || 0), 0);
    const durationSeconds = affectedSessions.reduce((sum, item) => sum + Number(item.durationSeconds || 0), 0);
    return {
      sessions: affectedSessions.length,
      reviews: affectedReviews.length,
      questions,
      durationSeconds,
      subjects: subjectIds.size,
      topics: topicIds.size,
      subtopics: subtopicIds.size
    };
  }

  return { clone, createBackup, validateBackup, prepareRestore, getCatalogImpact };
})();
