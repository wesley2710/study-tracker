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

  function consolidateSubtopics(state, options) {
    const timestamp = Number(options?.timestamp) || Date.now();
    const topicId = options?.topicId;
    const requestedSourceIds = new Set(options?.subtopicIds || []);
    const topics = (state.topics || []).map((item) => ({ ...item }));
    const subtopics = (state.subtopics || []).map((item) => ({ ...item }));
    const topic = topics.find((item) => item.id === topicId && !item.archived);
    const sources = subtopics.filter((item) => requestedSourceIds.has(item.id) && item.topicId === topicId && !item.archived);
    if (!topic || !sources.length) return { ...state, changed: false };

    const subject = (state.subjects || []).find((item) => item.id === topic.subjectId);
    const sourceIds = new Set(sources.map((item) => item.id));
    const sourceNames = new Set(sources.map((item) => comparableName(item.name)));
    const subjectName = subject?.name || "";
    const parentReviewKey = `${subjectName}|||${topic.name}|||`;

    const belongsToSource = (record) => sourceIds.has(record.subtopicId) || (
      (record.topicId === topic.id || (
        comparableName(record.topic) === comparableName(topic.name) &&
        (!subjectName || comparableName(record.subject) === comparableName(subjectName))
      )) && sourceNames.has(comparableName(record.subtopic))
    );

    const moveRecord = (record) => {
      if (!belongsToSource(record)) return record;
      return {
        ...record,
        subjectId: topic.subjectId,
        topicId: topic.id,
        subtopicId: null,
        subject: subjectName || record.subject,
        topic: topic.name,
        subtopic: "",
        reviewKey: record.reviewKey ? parentReviewKey : record.reviewKey,
        updatedAt: timestamp
      };
    };

    const sessions = (state.sessions || []).map(moveRecord);
    const reviews = (state.reviews || []).map((record) => {
      const moved = moveRecord(record);
      return moved === record ? record : { ...moved, reviewKey: parentReviewKey };
    });
    const sourceReviewKeys = new Set(sources.map((item) => `${subjectName}|||${topic.name}|||${item.name}`));
    const reviewPlans = (state.reviewPlans || []).map((plan) => sourceReviewKeys.has(plan.reviewKey)
      ? { ...plan, reviewKey: parentReviewKey, updatedAt: timestamp }
      : plan);

    sources.forEach((source) => { source.archived = true; source.updatedAt = timestamp; });
    topic.updatedAt = timestamp;

    return {
      ...state,
      sessions,
      reviews,
      reviewPlans,
      topics,
      subtopics,
      changed: true,
      summary: {
        topicId: topic.id,
        topicName: topic.name,
        consolidatedSubtopicIds: [...sourceIds],
        consolidatedSubtopicNames: sources.map((item) => item.name),
        movedSessions: sessions.filter((item, index) => item !== (state.sessions || [])[index]).length,
        movedReviews: reviews.filter((item, index) => item !== (state.reviews || [])[index]).length,
        movedReviewPlans: reviewPlans.filter((item, index) => item !== (state.reviewPlans || [])[index]).length
      }
    };
  }

  function findLatestMerge(state, subjectId = null) {
    const topics = state.topics || [];
    const candidates = [];
    const groups = new Map();

    topics.filter((item) => item.archived && Number(item.updatedAt) > 0 && (!subjectId || item.subjectId === subjectId)).forEach((item) => {
      const key = `${item.subjectId}|||${Number(item.updatedAt)}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });

    groups.forEach((sources) => {
      const mergeTimestamp = Number(sources[0].updatedAt);
      const mergeSubjectId = sources[0].subjectId;
      const target = topics.find((item) => !item.archived && item.subjectId === mergeSubjectId && Number(item.updatedAt) === mergeTimestamp);
      if (!target) return;
      const movedSessions = (state.sessions || []).filter((item) => item.topicId === target.id && Number(item.updatedAt) === mergeTimestamp);
      const movedReviews = (state.reviews || []).filter((item) => item.topicId === target.id && Number(item.updatedAt) === mergeTimestamp);
      if (!movedSessions.length && !movedReviews.length) return;
      candidates.push({
        subjectId: mergeSubjectId,
        targetTopicId: target.id,
        targetTopicName: target.name,
        sourceTopicIds: sources.map((item) => item.id),
        sourceTopicNames: sources.map((item) => item.name),
        mergeTimestamp,
        movedSessions: movedSessions.length,
        movedReviews: movedReviews.length
      });
    });

    return candidates.sort((a, b) => b.mergeTimestamp - a.mergeTimestamp)[0] || null;
  }

  function redirectLatestMerge(state, options) {
    const merge = findLatestMerge(state, options?.subjectId);
    const name = normalizeName(options?.newTopicName);
    const timestamp = Number(options?.timestamp) || Date.now();
    if (!merge || !name || typeof options?.createId !== "function") return { ...state, changed: false };
    const duplicate = (state.topics || []).some((item) => item.subjectId === merge.subjectId && !item.archived && comparableName(item.name) === comparableName(name));
    if (duplicate) return { ...state, changed: false, error: "DUPLICATE_TOPIC" };

    const subject = (state.subjects || []).find((item) => item.id === merge.subjectId);
    const newTopic = { id: options.createId(), subjectId: merge.subjectId, name, archived: false, createdAt: timestamp, updatedAt: timestamp };
    const topics = (state.topics || []).map((item) => item.id === merge.targetTopicId ? { ...item, updatedAt: timestamp } : { ...item });
    topics.push(newTopic);
    const subtopics = (state.subtopics || []).map((item) => ({ ...item }));
    const createdSubtopics = new Map();

    const isMovedRecord = (record) => record.topicId === merge.targetTopicId && Number(record.updatedAt) === merge.mergeTimestamp;
    const moveRecord = (record) => {
      if (!isMovedRecord(record)) return record;
      let subtopicId = null;
      const subtopicName = normalizeName(record.subtopic);
      if (subtopicName) {
        const comparable = comparableName(subtopicName);
        let subtopic = createdSubtopics.get(comparable);
        if (!subtopic) {
          subtopic = { id: options.createId(), topicId: newTopic.id, name: subtopicName, archived: false, createdAt: timestamp, updatedAt: timestamp };
          createdSubtopics.set(comparable, subtopic);
          subtopics.push(subtopic);
        }
        subtopicId = subtopic.id;
      }
      const subjectName = subject?.name || record.subject;
      return {
        ...record,
        subjectId: merge.subjectId,
        topicId: newTopic.id,
        subtopicId,
        subject: subjectName,
        topic: newTopic.name,
        subtopic: subtopicName,
        reviewKey: record.reviewKey ? `${subjectName}|||${newTopic.name}|||${subtopicName}` : record.reviewKey,
        updatedAt: timestamp
      };
    };

    const sessions = (state.sessions || []).map(moveRecord);
    const reviews = (state.reviews || []).map((record) => {
      const moved = moveRecord(record);
      return moved === record ? record : { ...moved, reviewKey: `${moved.subject}|||${moved.topic}|||${moved.subtopic || ""}` };
    });
    const movedSessions = sessions.filter((item, index) => item !== (state.sessions || [])[index]).length;
    const movedReviews = reviews.filter((item, index) => item !== (state.reviews || [])[index]).length;
    if (!movedSessions && !movedReviews) return { ...state, changed: false };

    return {
      ...state,
      sessions,
      reviews,
      topics,
      subtopics,
      changed: true,
      summary: { newTopicId: newTopic.id, newTopicName: newTopic.name, movedSessions, movedReviews, previousTargetName: merge.targetTopicName }
    };
  }

  return { normalizeName, migrate, mergeTopics, consolidateSubtopics, findLatestMerge, redirectLatestMerge };
})();
