const STORAGE_KEY = "studyTracker.sessions.v1";

const StudyStorage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      return [];
    }
  },

  save(sessions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const REVIEW_STORAGE_KEY = "studyTracker.reviews.v1";

const ReviewStorage = {
  load() {
    try {
      const raw = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar revisões:", error);
      return [];
    }
  },

  save(reviews) {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  },

  clear() {
    localStorage.removeItem(REVIEW_STORAGE_KEY);
  }
};


const TIMER_STORAGE_KEY = "studyTracker.activeTimer.v1";

const TimerStorage = {
  load() {
    try {
      const raw = localStorage.getItem(TIMER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(timer) {
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timer));
  },
  clear() {
    localStorage.removeItem(TIMER_STORAGE_KEY);
  }
};

const SYNC_META_KEY = "studyTracker.sync.v1";
const AUTH_TOKEN_KEY = "studyTracker.authToken.v1";

const SyncStorage = {
  load() {
    try {
      const value = JSON.parse(localStorage.getItem(SYNC_META_KEY) || "{}");
      return {
        sessionTombstones: value.sessionTombstones || {},
        reviewTombstones: value.reviewTombstones || {},
        mockTombstones: value.mockTombstones || {},
        subjectTombstones: value.subjectTombstones || {},
        topicTombstones: value.topicTombstones || {},
        subtopicTombstones: value.subtopicTombstones || {},
        lastSyncAt: value.lastSyncAt || null
      };
    } catch (error) {
      console.error("Erro ao carregar metadados de sincronização:", error);
      return { sessionTombstones: {}, reviewTombstones: {}, mockTombstones: {}, subjectTombstones: {}, topicTombstones: {}, subtopicTombstones: {}, lastSyncAt: null };
    }
  },
  save(value) {
    localStorage.setItem(SYNC_META_KEY, JSON.stringify(value));
  }
};

const AuthStorage = {
  load() { return localStorage.getItem(AUTH_TOKEN_KEY) || ""; },
  save(token) { localStorage.setItem(AUTH_TOKEN_KEY, String(token || "").trim()); },
  clear() { localStorage.removeItem(AUTH_TOKEN_KEY); }
};


const MOCK_STORAGE_KEY = "studyTracker.mocks.v1";

const MockStorage = {
  load() {
    try {
      const raw = localStorage.getItem(MOCK_STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar simulados:", error);
      return [];
    }
  },
  save(mocks) { localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(mocks)); },
  clear() { localStorage.removeItem(MOCK_STORAGE_KEY); }
};


const CATALOG_STORAGE_KEY = "studyTracker.catalog.v1";
const CatalogStorage = {
  load() {
    try { const data = JSON.parse(localStorage.getItem(CATALOG_STORAGE_KEY) || "{}"); return { subjects: Array.isArray(data.subjects) ? data.subjects : [], topics: Array.isArray(data.topics) ? data.topics : [], subtopics: Array.isArray(data.subtopics) ? data.subtopics : [] }; }
    catch (error) { console.error("Erro ao carregar catálogo:", error); return { subjects: [], topics: [], subtopics: [] }; }
  },
  save(catalog) { localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog)); },
  clear() { localStorage.removeItem(CATALOG_STORAGE_KEY); }
};
