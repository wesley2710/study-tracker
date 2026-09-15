const CatalogEngine = (() => {
  function normalizeName(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function comparableName(value) {
    return normalizeName(value).toLocaleLowerCase("pt-BR");
  }

  function parseScores(value) {
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function migrate(state, createId, timestamp = Date.now()) {
    const subjects = [...(state.subjects || [])];
    const topics = [...(state.topics || [])];
    let changed = false;

    function findOrCreateSubject(name) {
      const normalized = normalizeName(name);
      if (!normalized) return null;
      let subject = subjects.find((item) => comparableName(item.name) === comparableName(normalized));
      if (!subject) {
        subject = { id: createId(), name: normalized, archived: false, createdAt: timestamp, updatedAt: timestamp };
        subjects.push(subject);
        changed = true;
      }
      return subject;
    }

    function findOrCreateTopic(subject, name) {
      const normalized = normalizeName(name);
      if (!subject || !normalized) return null;
      let topic = topics.find((item) => item.subjectId === subject.id && comparableName(item.name) === comparableName(normalized));
      if (!topic) {
        topic = { id: createId(), subjectId: subject.id, name: normalized, archived: false, createdAt: timestamp, updatedAt: timestamp };
        topics.push(topic);
        changed = true;
      }
      return topic;
    }

    function migrateStudyRecord(record) {
      if (!record || (!record.subject && !record.subjectId)) return record;
      const subject = subjects.find((item) => item.id === record.subjectId) || findOrCreateSubject(record.subject);
      const topic = topics.find((item) => item.id === record.topicId && item.subjectId === subject?.id) || findOrCreateTopic(subject, record.topic);
      const subjectId = subject?.id || record.subjectId || null;
      const topicId = topic?.id || record.topicId || null;
      if (record.subjectId === subjectId && record.topicId === topicId) return record;
      changed = true;
      return { ...record, subjectId, topicId, updatedAt: timestamp };
    }

    const sessions = (state.sessions || []).map(migrateStudyRecord);
    const reviews = (state.reviews || []).map(migrateStudyRecord);
    const mocks = (state.mocks || []).map((mock) => {
      const scores = parseScores(mock.subjectScores);
      let mockChanged = false;
      const migratedScores = scores.map((score) => {
        if (score.subjectId || !score.subject) return score;
        const subject = findOrCreateSubject(score.subject);
        if (!subject) return score;
        mockChanged = true;
        return { ...score, subjectId: subject.id };
      });
      if (!mockChanged) return mock;
      changed = true;
      return { ...mock, subjectScores: JSON.stringify(migratedScores), updatedAt: timestamp };
    });

    return { ...state, sessions, reviews, mocks, subjects, topics, changed };
  }

  return { normalizeName, migrate };
})();
