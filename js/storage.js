const STUDY_TRACKER_PROFILES = Object.freeze([
  Object.freeze({ id: "wesley", name: "Wesley", initials: "WM" }),
  Object.freeze({ id: "eliane", name: "Eliane", initials: "EL" })
]);
const ACTIVE_PROFILE_KEY = "studyTracker.activeProfile.v1";
const PROFILE_SCOPED_LEGACY_KEYS = [
  "studyTracker.sessions.v1",
  "studyTracker.reviews.v1",
  "studyTracker.reviewPlans.v1",
  "studyTracker.settings.v1",
  "studyTracker.activeTimer.v1",
  "studyTracker.sync.v1",
  "studyTracker.mocks.v1",
  "studyTracker.catalog.v1",
  "studyTracker.safety.v1",
  "studyTracker.ui.v1"
];

const ProfileStorage = {
  list() { return STUDY_TRACKER_PROFILES.map((profile) => ({ ...profile })); },
  getActiveId() {
    const stored = String(localStorage.getItem(ACTIVE_PROFILE_KEY) || "").trim().toLowerCase();
    return STUDY_TRACKER_PROFILES.some((profile) => profile.id === stored) ? stored : "wesley";
  },
  getActiveProfile() {
    const activeId = this.getActiveId();
    return this.list().find((profile) => profile.id === activeId) || this.list()[0];
  },
  setActiveId(profileId) {
    const normalized = String(profileId || "").trim().toLowerCase();
    if (!STUDY_TRACKER_PROFILES.some((profile) => profile.id === normalized)) return false;
    localStorage.setItem(ACTIVE_PROFILE_KEY, normalized);
    return true;
  },
  scopedKey(baseKey, profileId = this.getActiveId()) { return `${baseKey}.${profileId}`; },
  migrateLegacyData() {
    PROFILE_SCOPED_LEGACY_KEYS.forEach((legacyKey) => {
      const legacyValue = localStorage.getItem(legacyKey);
      const wesleyKey = this.scopedKey(legacyKey, "wesley");
      if (legacyValue != null && localStorage.getItem(wesleyKey) == null) localStorage.setItem(wesleyKey, legacyValue);
    });
  }
};

ProfileStorage.migrateLegacyData();

const STORAGE_KEY = "studyTracker.sessions.v1";

const StudyStorage = {
  load() {
    try {
      const raw = localStorage.getItem(ProfileStorage.scopedKey(STORAGE_KEY));
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      return [];
    }
  },

  save(sessions) {
    localStorage.setItem(ProfileStorage.scopedKey(STORAGE_KEY), JSON.stringify(sessions));
  },

  clear() {
    localStorage.removeItem(ProfileStorage.scopedKey(STORAGE_KEY));
  }
};

const REVIEW_STORAGE_KEY = "studyTracker.reviews.v1";

const ReviewStorage = {
  load() {
    try {
      const raw = localStorage.getItem(ProfileStorage.scopedKey(REVIEW_STORAGE_KEY));
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar revisões:", error);
      return [];
    }
  },

  save(reviews) {
    localStorage.setItem(ProfileStorage.scopedKey(REVIEW_STORAGE_KEY), JSON.stringify(reviews));
  },

  clear() {
    localStorage.removeItem(ProfileStorage.scopedKey(REVIEW_STORAGE_KEY));
  }
};

function createArrayStorage(key, label) {
  return {
    load() {
      try {
        const value = JSON.parse(localStorage.getItem(ProfileStorage.scopedKey(key)) || "[]");
        return Array.isArray(value) ? value : [];
      } catch (error) {
        console.error(`Erro ao carregar ${label}:`, error);
        return [];
      }
    },
    save(value) { localStorage.setItem(ProfileStorage.scopedKey(key), JSON.stringify(Array.isArray(value) ? value : [])); },
    clear() { localStorage.removeItem(ProfileStorage.scopedKey(key)); }
  };
}

const ReviewPlanStorage = createArrayStorage("studyTracker.reviewPlans.v1", "planejamento de revisões");
const SettingsStorage = createArrayStorage("studyTracker.settings.v1", "configurações");


const TIMER_STORAGE_KEY = "studyTracker.activeTimer.v1";

const TimerStorage = {
  load() {
    try {
      const raw = localStorage.getItem(ProfileStorage.scopedKey(TIMER_STORAGE_KEY));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(timer) {
    localStorage.setItem(ProfileStorage.scopedKey(TIMER_STORAGE_KEY), JSON.stringify(timer));
  },
  clear() {
    localStorage.removeItem(ProfileStorage.scopedKey(TIMER_STORAGE_KEY));
  }
};

const SYNC_META_KEY = "studyTracker.sync.v1";
const AUTH_TOKEN_KEY = "studyTracker.authToken.v1";

const SyncStorage = {
  load() {
    try {
      const value = JSON.parse(localStorage.getItem(ProfileStorage.scopedKey(SYNC_META_KEY)) || "{}");
      return {
        sessionTombstones: value.sessionTombstones || {},
        reviewTombstones: value.reviewTombstones || {},
        mockTombstones: value.mockTombstones || {},
        subjectTombstones: value.subjectTombstones || {},
        topicTombstones: value.topicTombstones || {},
        subtopicTombstones: value.subtopicTombstones || {},
        reviewPlanTombstones: value.reviewPlanTombstones || {},
        settingTombstones: value.settingTombstones || {},
        lastSyncAt: value.lastSyncAt || null,
        pendingChanges: Number(value.pendingChanges || 0)
      };
    } catch (error) {
      console.error("Erro ao carregar metadados de sincronização:", error);
      return { sessionTombstones: {}, reviewTombstones: {}, mockTombstones: {}, subjectTombstones: {}, topicTombstones: {}, subtopicTombstones: {}, reviewPlanTombstones: {}, settingTombstones: {}, lastSyncAt: null, pendingChanges: 0 };
    }
  },
  save(value) {
    localStorage.setItem(ProfileStorage.scopedKey(SYNC_META_KEY), JSON.stringify(value));
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
      const raw = localStorage.getItem(ProfileStorage.scopedKey(MOCK_STORAGE_KEY));
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao carregar simulados:", error);
      return [];
    }
  },
  save(mocks) { localStorage.setItem(ProfileStorage.scopedKey(MOCK_STORAGE_KEY), JSON.stringify(mocks)); },
  clear() { localStorage.removeItem(ProfileStorage.scopedKey(MOCK_STORAGE_KEY)); }
};


const CATALOG_STORAGE_KEY = "studyTracker.catalog.v1";
const CatalogStorage = {
  load() {
    try { const data = JSON.parse(localStorage.getItem(ProfileStorage.scopedKey(CATALOG_STORAGE_KEY)) || "{}"); return { subjects: Array.isArray(data.subjects) ? data.subjects : [], topics: Array.isArray(data.topics) ? data.topics : [], subtopics: Array.isArray(data.subtopics) ? data.subtopics : [] }; }
    catch (error) { console.error("Erro ao carregar catálogo:", error); return { subjects: [], topics: [], subtopics: [] }; }
  },
  save(catalog) { localStorage.setItem(ProfileStorage.scopedKey(CATALOG_STORAGE_KEY), JSON.stringify(catalog)); },
  clear() { localStorage.removeItem(ProfileStorage.scopedKey(CATALOG_STORAGE_KEY)); }
};

const SAFETY_STORAGE_KEY = "studyTracker.safety.v1";
const SafetyStorage = {
  load() {
    try {
      const data = JSON.parse(localStorage.getItem(ProfileStorage.scopedKey(SAFETY_STORAGE_KEY)) || "{}");
      return {
        undoSnapshot: data.undoSnapshot && typeof data.undoSnapshot === "object" ? data.undoSnapshot : null,
        auditLog: Array.isArray(data.auditLog) ? data.auditLog.slice(0, 100) : []
      };
    } catch (error) {
      console.error("Erro ao carregar dados de segurança:", error);
      return { undoSnapshot: null, auditLog: [] };
    }
  },
  save(value) {
    try {
      localStorage.setItem(ProfileStorage.scopedKey(SAFETY_STORAGE_KEY), JSON.stringify({
        undoSnapshot: value?.undoSnapshot || null,
        auditLog: Array.isArray(value?.auditLog) ? value.auditLog.slice(0, 100) : []
      }));
      return true;
    } catch (error) {
      console.error("Erro ao salvar a cópia de segurança:", error);
      return false;
    }
  },
  clear() { localStorage.removeItem(ProfileStorage.scopedKey(SAFETY_STORAGE_KEY)); }
};

const UI_STORAGE_KEY = "studyTracker.ui.v1";
const UiStorage = {
  load() {
    try {
      const value = JSON.parse(localStorage.getItem(ProfileStorage.scopedKey(UI_STORAGE_KEY)) || "{}");
      return {
        dailyGoalMinutes: Math.max(15, Math.min(1440, Number(value.dailyGoalMinutes || 120))),
        activeSection: typeof value.activeSection === "string" ? value.activeSection : "dashboard",
        collapsible: value.collapsible && typeof value.collapsible === "object" ? value.collapsible : {},
        openSubjects: Array.isArray(value.openSubjects) ? value.openSubjects : [],
        openTopics: Array.isArray(value.openTopics) ? value.openTopics : []
      };
    } catch (error) {
      console.error("Erro ao carregar preferências da interface:", error);
      return { dailyGoalMinutes: 120, activeSection: "dashboard", collapsible: {}, openSubjects: [], openTopics: [] };
    }
  },
  save(value) {
    localStorage.setItem(ProfileStorage.scopedKey(UI_STORAGE_KEY), JSON.stringify({
      dailyGoalMinutes: Number(value?.dailyGoalMinutes || 120),
      activeSection: typeof value?.activeSection === "string" ? value.activeSection : "dashboard",
      collapsible: value?.collapsible || {},
      openSubjects: Array.isArray(value?.openSubjects) ? value.openSubjects : [],
      openTopics: Array.isArray(value?.openTopics) ? value.openTopics : []
    }));
  },
  clear() { localStorage.removeItem(ProfileStorage.scopedKey(UI_STORAGE_KEY)); }
};
