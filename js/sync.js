const StudySync = (() => {
  let adapter = null;
  let running = false;
  let queued = false;
  let retryTimer = null;

  const timestamp = (item) => Number(item.deletedAt || item.updatedAt || item.createdAt || 0);

  // Last-write-wins por id. Tombstones evitam que exclusões reapareçam.
  function mergeRecords(localRecords, remoteRecords, tombstones) {
    const merged = new Map();
    [...localRecords, ...remoteRecords].forEach((record) => {
      if (!record?.id) return;
      const current = merged.get(record.id);
      if (!current || timestamp(record) > timestamp(current)) merged.set(record.id, record);
    });
    Object.entries(tombstones || {}).forEach(([id, deletedAt]) => {
      const current = merged.get(id);
      if (!current || Number(deletedAt) >= timestamp(current)) merged.delete(id);
    });
    return [...merged.values()].filter((record) => !record.deletedAt);
  }

  const setStatus = (state, detail = "") => adapter?.setStatus(state, detail);

  async function run() {
    if (!adapter || !StudyApi.isConfigured()) { setStatus("local", "Configure a nuvem"); return; }
    if (!StudyApi.hasToken()) { setStatus("locked", "Segredo ausente ou incorreto"); return; }
    if (running) { queued = true; return; }
    running = true;
    setStatus("syncing");
    try {
      const local = adapter.getState();
      const remote = await StudyApi.getAll();
      const sessions = mergeRecords(local.sessions, remote.sessions || [], local.meta.sessionTombstones);
      const reviews = mergeRecords(local.reviews, remote.reviews || [], local.meta.reviewTombstones);
      const mocks = mergeRecords(local.mocks || [], remote.mocks || [], local.meta.mockTombstones || {});
      const subjects = mergeRecords(local.subjects || [], remote.subjects || [], local.meta.subjectTombstones || {});
      const topics = mergeRecords(local.topics || [], remote.topics || [], local.meta.topicTombstones || {});
      const subtopics = mergeRecords(local.subtopics || [], remote.subtopics || [], local.meta.subtopicTombstones || {});
      const result = await StudyApi.sync({ sessions, reviews, mocks, subjects, topics, subtopics, sessionTombstones: local.meta.sessionTombstones, reviewTombstones: local.meta.reviewTombstones, mockTombstones: local.meta.mockTombstones || {}, subjectTombstones: local.meta.subjectTombstones || {}, topicTombstones: local.meta.topicTombstones || {}, subtopicTombstones: local.meta.subtopicTombstones || {} });
      const nextMeta = { sessionTombstones: {}, reviewTombstones: {}, mockTombstones: {}, subjectTombstones: {}, topicTombstones: {}, subtopicTombstones: {}, lastSyncAt: Date.now() };
      adapter.applyState({ sessions: mergeRecords(sessions, result.sessions || [], {}), reviews: mergeRecords(reviews, result.reviews || [], {}), mocks: mergeRecords(mocks, result.mocks || [], {}), subjects: mergeRecords(subjects, result.subjects || [], {}), topics: mergeRecords(topics, result.topics || [], {}), subtopics: mergeRecords(subtopics, result.subtopics || [], {}), meta: nextMeta });
      setStatus("synced", new Date(nextMeta.lastSyncAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      const authError = ["API_TOKEN_REQUIRED", "UNAUTHORIZED"].some((code) => String(error.message).includes(code));
      if (String(error.message).includes("UNAUTHORIZED")) StudyApi.clearToken();
      if (!authError) console.error("Falha de sincronização:", error);
      setStatus(authError ? "locked" : navigator.onLine ? "error" : "offline", authError ? "Segredo ausente ou incorreto" : "");
      if (!authError) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(run, 30000);
      }
    } finally {
      running = false;
      if (queued) { queued = false; run(); }
    }
  }

  function init(nextAdapter) {
    adapter = nextAdapter;
    window.addEventListener("online", run);
    window.addEventListener("offline", () => setStatus("offline"));
    run();
  }
  return { init, run, mergeRecords };
})();
