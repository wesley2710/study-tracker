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
