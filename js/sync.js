const StudySync = (() => {
  const SYNC_DEBOUNCE_MS = 900;
  const TOMBSTONE_KEYS = [
    "sessionTombstones", "reviewTombstones", "mockTombstones",
    "subjectTombstones", "topicTombstones", "subtopicTombstones",
    "reviewPlanTombstones", "settingTombstones"
  ];

  let adapter = null;
  let running = false;
  let queued = false;
  let retryTimer = null;
  let debounceTimer = null;
  let localRevision = 0;

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
    [...(localRecords || []), ...(remoteRecords || [])].forEach((record) => {
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

  function unsyncedTombstones(latestMeta, sentMeta, key) {
    const latest = latestMeta?.[key] || {};
    const sent = sentMeta?.[key] || {};
    return Object.fromEntries(Object.entries(latest).filter(([id, deletedAt]) => (
      !Object.prototype.hasOwnProperty.call(sent, id) || Number(deletedAt) > Number(sent[id])
    )));
  }

  function nextSyncMeta(latestMeta, sentMeta, syncedAt) {
    const sentPending = Number(sentMeta?.pendingChanges || 0);
    const latestPending = Number(latestMeta?.pendingChanges || 0);
    const next = {
      lastSyncAt: syncedAt,
      pendingChanges: Math.max(0, latestPending - sentPending)
    };
    TOMBSTONE_KEYS.forEach((key) => { next[key] = unsyncedTombstones(latestMeta, sentMeta, key); });
    return next;
  }

  const setStatus = (state, detail = "") => adapter?.setStatus(state, detail);
  const pendingLabel = (count) => `${count} alteraç${count === 1 ? "ão pendente" : "ões pendentes"}`;

  function schedule(delay = SYNC_DEBOUNCE_MS) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      syncNow();
    }, delay);
  }

  async function syncNow() {
    if (!adapter) return;
    const pending = Number(adapter.getState()?.meta?.pendingChanges || 0);
    if (!StudyApi.isConfigured()) { setStatus("local", pending ? `${pendingLabel(pending)} apenas neste dispositivo` : "Configure a nuvem"); return; }
    if (!StudyApi.hasToken()) { setStatus("locked", pending ? pendingLabel(pending) : "Segredo ausente ou incorreto"); return; }
    if (running) { queued = true; return; }

    running = true;
    queued = false;
    const revisionAtStart = localRevision;
    const local = adapter.getState();
    const sentMeta = local.meta || {};
    setStatus("syncing", pending ? pendingLabel(pending) : "Conferindo dados");

    try {
      // O endpoint de sync já compara timestamps e devolve o estado remoto final.
      // Assim evitamos a antiga consulta completa anterior a cada envio.
      const result = await StudyApi.sync({
        profiles: local.profiles || [],
        sessions: normalizeRecordDates(local.sessions),
        reviews: normalizeRecordDates(local.reviews),
        mocks: normalizeRecordDates(local.mocks),
        subjects: local.subjects || [],
        topics: local.topics || [],
        subtopics: local.subtopics || [],
        reviewPlans: local.reviewPlans || [],
        settings: local.settings || [],
        sessionTombstones: sentMeta.sessionTombstones || {},
        reviewTombstones: sentMeta.reviewTombstones || {},
        mockTombstones: sentMeta.mockTombstones || {},
        subjectTombstones: sentMeta.subjectTombstones || {},
        topicTombstones: sentMeta.topicTombstones || {},
        subtopicTombstones: sentMeta.subtopicTombstones || {},
        reviewPlanTombstones: sentMeta.reviewPlanTombstones || {},
        settingTombstones: sentMeta.settingTombstones || {}
      });

      // Usa o estado local mais recente, não o retrato feito antes da requisição.
      // Isso impede que uma resposta mais lenta apague ações realizadas enquanto
      // a sincronização estava em andamento.
      const latest = adapter.getState();
      const syncedAt = Date.now();
      const meta = nextSyncMeta(latest.meta || {}, sentMeta, syncedAt);
      const nextState = {
        profiles: mergeRecords(latest.profiles, result.profiles, {}),
        sessions: mergeRecords(normalizeRecordDates(latest.sessions), normalizeRecordDates(result.sessions), meta.sessionTombstones),
        reviews: mergeRecords(normalizeRecordDates(latest.reviews), normalizeRecordDates(result.reviews), meta.reviewTombstones),
        mocks: mergeRecords(normalizeRecordDates(latest.mocks), normalizeRecordDates(result.mocks), meta.mockTombstones),
        subjects: mergeRecords(latest.subjects, result.subjects, meta.subjectTombstones),
        topics: mergeRecords(latest.topics, result.topics, meta.topicTombstones),
        subtopics: mergeRecords(latest.subtopics, result.subtopics, meta.subtopicTombstones),
        reviewPlans: mergeRecords(latest.reviewPlans, result.reviewPlans, meta.reviewPlanTombstones),
        settings: mergeRecords(latest.settings, result.settings, meta.settingTombstones),
        meta
      };
      adapter.applyState(nextState);

      const total = nextState.profiles.length + nextState.sessions.length + nextState.reviews.length + nextState.mocks.length
        + nextState.subjects.length + nextState.topics.length + nextState.subtopics.length + nextState.reviewPlans.length + nextState.settings.length;
      if (meta.pendingChanges) setStatus("pending", pendingLabel(meta.pendingChanges));
      else setStatus("synced", `${new Date(syncedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} • ${total} registros`);
    } catch (error) {
      const authError = ["API_TOKEN_REQUIRED", "UNAUTHORIZED"].some((code) => String(error.message).includes(code));
      if (String(error.message).includes("UNAUTHORIZED")) StudyApi.clearToken();
      if (!authError) console.error("Falha de sincronização:", error);
      const remaining = Number(adapter.getState()?.meta?.pendingChanges || 0);
      setStatus(authError ? "locked" : navigator.onLine ? "error" : "offline", authError ? "Segredo ausente ou incorreto" : remaining ? pendingLabel(remaining) : "Dados locais preservados");
      if (!authError) {
        clearTimeout(retryTimer);
        retryTimer = setTimeout(syncNow, 30000);
      }
    } finally {
      running = false;
      const remaining = Number(adapter.getState()?.meta?.pendingChanges || 0);
      if ((queued || localRevision !== revisionAtStart) && remaining) {
        queued = false;
        schedule(120);
      }
    }
  }

  function run(localChanges = false) {
    if (!adapter) return;
    if (localChanges) {
      localRevision += 1;
      adapter.markPending?.();
      const pending = Number(adapter.getState()?.meta?.pendingChanges || 0);
      setStatus("pending", pendingLabel(pending));
      if (running) queued = true;
      else schedule();
      return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = null;
    return syncNow();
  }

  function init(nextAdapter) {
    adapter = nextAdapter;
    window.addEventListener("online", () => run());
    window.addEventListener("offline", () => setStatus("offline"));
    run();
  }

  return { init, run, mergeRecords, normalizeISODate, normalizeRecordDates, nextSyncMeta };
})();
