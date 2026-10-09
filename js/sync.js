const StudySync = (() => {
  let adapter = null;
  let running = false;
  let queued = false;
  let retryTimer = null;

  const timestamp = (item) => Number(item.deletedAt || item.updatedAt || item.createdAt || 0);

  function normalizeISODate(value) {
    const match = String(value || "").match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : value;
  }

  function normalizeRecordDates(records) {
    return (records || []).map((record) => {
      if (!record || !("date" in record)) return record;
      return { ...record, date: normalizeISODate(record.date) };
    });
  }

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
  const pendingLabel = (count) => `${count} alteraç${count === 1 ? "ão pendente" : "ões pendentes"}`;

  async function run(localChanges = false) {
    if (!adapter) return;
    if (localChanges) adapter.markPending?.();
    const pending = Number(adapter.getState()?.meta?.pendingChanges || 0);
    if (!StudyApi.isConfigured()) { setStatus("local", pending ? `${pendingLabel(pending)} apenas neste dispositivo` : "Configure a nuvem"); return; }
    if (!StudyApi.hasToken()) { setStatus("locked", pending ? pendingLabel(pending) : "Segredo ausente ou incorreto"); return; }
    if (running) { queued = true; return; }
    running = true;
    setStatus("syncing", pending ? pendingLabel(pending) : "Conferindo dados");
    try {
      const local = adapter.getState();
      const remote = await StudyApi.getAll();
      const sessions = mergeRecords(normalizeRecordDates(local.sessions), normalizeRecordDates(remote.sessions), local.meta.sessionTombstones);
      const reviews = mergeRecords(normalizeRecordDates(local.reviews), normalizeRecordDates(remote.reviews), local.meta.reviewTombstones);
      const mocks = mergeRecords(normalizeRecordDates(local.mocks), normalizeRecordDates(remote.mocks), local.meta.mockTombstones || {});
      const subjects = mergeRecords(local.subjects || [], remote.subjects || [], local.meta.subjectTombstones || {});
      const topics = mergeRecords(local.topics || [], remote.topics || [], local.meta.topicTombstones || {});
      const subtopics = mergeRecords(local.subtopics || [], remote.subtopics || [], local.meta.subtopicTombstones || {});
      const reviewPlans = mergeRecords(local.reviewPlans || [], remote.reviewPlans || [], local.meta.reviewPlanTombstones || {});
      const settings = mergeRecords(local.settings || [], remote.settings || [], local.meta.settingTombstones || {});
      const result = await StudyApi.sync({ sessions, reviews, mocks, subjects, topics, subtopics, reviewPlans, settings, sessionTombstones: local.meta.sessionTombstones, reviewTombstones: local.meta.reviewTombstones, mockTombstones: local.meta.mockTombstones || {}, subjectTombstones: local.meta.subjectTombstones || {}, topicTombstones: local.meta.topicTombstones || {}, subtopicTombstones: local.meta.subtopicTombstones || {}, reviewPlanTombstones: local.meta.reviewPlanTombstones || {}, settingTombstones: local.meta.settingTombstones || {} });
      const nextMeta = { sessionTombstones: {}, reviewTombstones: {}, mockTombstones: {}, subjectTombstones: {}, topicTombstones: {}, subtopicTombstones: {}, reviewPlanTombstones: {}, settingTombstones: {}, lastSyncAt: Date.now(), pendingChanges: 0 };
      adapter.applyState({ sessions: mergeRecords(sessions, normalizeRecordDates(result.sessions), {}), reviews: mergeRecords(reviews, normalizeRecordDates(result.reviews), {}), mocks: mergeRecords(mocks, normalizeRecordDates(result.mocks), {}), subjects: mergeRecords(subjects, result.subjects || [], {}), topics: mergeRecords(topics, result.topics || [], {}), subtopics: mergeRecords(subtopics, result.subtopics || [], {}), reviewPlans: mergeRecords(reviewPlans, result.reviewPlans || [], {}), settings: mergeRecords(settings, result.settings || [], {}), meta: nextMeta });
      const total = sessions.length + reviews.length + mocks.length + subjects.length + topics.length + subtopics.length + reviewPlans.length + settings.length;
      setStatus("synced", `${new Date(nextMeta.lastSyncAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} • ${total} registros`);
    } catch (error) {
      const authError = ["API_TOKEN_REQUIRED", "UNAUTHORIZED"].some((code) => String(error.message).includes(code));
      if (String(error.message).includes("UNAUTHORIZED")) StudyApi.clearToken();
      if (!authError) console.error("Falha de sincronização:", error);
      const remaining = Number(adapter.getState()?.meta?.pendingChanges || 0);
      setStatus(authError ? "locked" : navigator.onLine ? "error" : "offline", authError ? "Segredo ausente ou incorreto" : remaining ? pendingLabel(remaining) : "Dados locais preservados");
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
  return { init, run, mergeRecords, normalizeISODate, normalizeRecordDates };
})();
