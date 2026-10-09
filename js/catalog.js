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
    const subtopics = [...(state.subtopics || [])];
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

    return { ...state, sessions, reviews, mocks, subjects, topics, subtopics, changed };
  }

  function mergeTopics(state, options) {
    const timestamp = Number(options?.timestamp) || Date.now();
    const subjectId = options?.subjectId;
    const targetTopicId = options?.targetTopicId;
    const requestedSourceIds = new Set(options?.sourceTopicIds || []);
    requestedSourceIds.delete(targetTopicId);

    const topics = (state.topics || []).map((item) => ({ ...item }));
    const subtopics = (state.subtopics || []).map((item) => ({ ...item }));
    const target = topics.find((item) => item.id === targetTopicId && item.subjectId === subjectId && !item.archived);
    const sources = topics.filter((item) => requestedSourceIds.has(item.id) && item.subjectId === subjectId && !item.archived);
    if (!target || !sources.length) return { ...state, changed: false };

    const sourceIds = new Set(sources.map((item) => item.id));
    const sourceNames = new Set(sources.map((item) => comparableName(item.name)));
    const subject = (state.subjects || []).find((item) => item.id === subjectId);
    const subtopicTargets = new Map();

    subtopics.filter((item) => sourceIds.has(item.topicId)).forEach((sourceSubtopic) => {
      const duplicate = subtopics.find((item) => item.id !== sourceSubtopic.id && item.topicId === target.id && comparableName(item.name) === comparableName(sourceSubtopic.name));
      if (duplicate) {
        if (duplicate.archived && !sourceSubtopic.archived) duplicate.archived = false;
        duplicate.updatedAt = timestamp;
        subtopicTargets.set(sourceSubtopic.id, duplicate);
        sourceSubtopic.archived = true;
        sourceSubtopic.updatedAt = timestamp;
      } else {
        sourceSubtopic.topicId = target.id;
        sourceSubtopic.updatedAt = timestamp;
        subtopicTargets.set(sourceSubtopic.id, sourceSubtopic);
      }
    });

    const belongsToSource = (record) => sourceIds.has(record.topicId) || (
      (!record.topicId || record.subjectId === subjectId || comparableName(record.subject) === comparableName(subject?.name)) &&
      sourceNames.has(comparableName(record.topic))
    );

    const moveRecord = (record) => {
      if (!belongsToSource(record)) return record;
      const mappedSubtopic = subtopicTargets.get(record.subtopicId);
      const subtopicId = mappedSubtopic?.id || record.subtopicId || null;
      const subtopic = mappedSubtopic?.name || record.subtopic || "";
      return {
        ...record,
        subjectId,
        topicId: target.id,
        subtopicId,
        subject: subject?.name || record.subject,
        topic: target.name,
        subtopic,
        reviewKey: record.reviewKey ? `${subject?.name || record.subject}|||${target.name}|||${subtopic}` : record.reviewKey,
        updatedAt: timestamp
      };
    };

    const sessions = (state.sessions || []).map(moveRecord);
    const reviews = (state.reviews || []).map((record) => {
      const moved = moveRecord(record);
      if (moved === record) return record;
      return { ...moved, reviewKey: `${moved.subject}|||${moved.topic}|||${moved.subtopic || ""}` };
    });

    sources.forEach((source) => { source.archived = true; source.updatedAt = timestamp; });
    target.updatedAt = timestamp;

    return {
      ...state,
      sessions,
      reviews,
      topics,
      subtopics,
      changed: true,
      summary: {
        targetTopicId: target.id,
        mergedTopicIds: [...sourceIds],
        movedSessions: sessions.filter((item, index) => item !== (state.sessions || [])[index]).length,
        movedReviews: reviews.filter((item, index) => item !== (state.reviews || [])[index]).length
      }
    };
  }

  return { normalizeName, migrate, mergeTopics };
})();
