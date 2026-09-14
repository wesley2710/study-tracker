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
    if (running) { queued = true; return; }
    running = true;
    setStatus("syncing");
    try {
      const local = adapter.getState();
      const remote = await StudyApi.getAll();
      const sessions = mergeRecords(local.sessions, remote.sessions || [], local.meta.sessionTombstones);
      const reviews = mergeRecords(local.reviews, remote.reviews || [], local.meta.reviewTombstones);
      const result = await StudyApi.sync({ sessions, reviews, sessionTombstones: local.meta.sessionTombstones, reviewTombstones: local.meta.reviewTombstones });
      const nextMeta = { sessionTombstones: {}, reviewTombstones: {}, lastSyncAt: Date.now() };
      adapter.applyState({ sessions: mergeRecords(sessions, result.sessions || [], {}), reviews: mergeRecords(reviews, result.reviews || [], {}), meta: nextMeta });
      setStatus("synced", new Date(nextMeta.lastSyncAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      console.error("Falha de sincronização:", error);
      setStatus(navigator.onLine ? "error" : "offline");
      clearTimeout(retryTimer);
      retryTimer = setTimeout(run, 30000);
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
