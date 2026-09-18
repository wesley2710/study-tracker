const ReviewEngine = {
  intervals: [3, 7, 15, 30, 45, 60],
  initialInterval: 3,
  minimumQuestionsToAdvance: 20,

  getInitialInterval() {
    return this.initialInterval;
  },

  getAdvanceInterval(previousInterval = null) {
    const current = Number(previousInterval) || this.initialInterval;
    if (current < 3) return 3;
    if (current < 7) return 7;
    if (current < 15) return 15;
    if (current < 30) return 30;
    if (current < 45) return 45;
    if (current < 60) return 60;
    return current + 30;
  },

  getNextInterval(percentage, previousInterval = null, _streak = 0, questionCount = 0) {
    const current = Number(previousInterval) || this.initialInterval;
    const questions = Number(questionCount) || 0;
    if (percentage < 60) return 3;
    if (percentage < 70) return Math.min(current, 7);
    if (percentage < 90) return current;
    if (questions < this.minimumQuestionsToAdvance) return current;
    return this.getAdvanceInterval(current);
  },

  addDays(isoDate, days) {
    const date = new Date(`${String(isoDate || "").slice(0, 10)}T12:00:00`);
    date.setDate(date.getDate() + days);
    return this.toISODate(date);
  },

  toISODate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },

  compareDate(isoDate, reference = this.toISODate()) {
    if (isoDate < reference) return "overdue";
    if (isoDate === reference) return "today";
    return "upcoming";
  },

  getStatusLabel(status) {
    if (status === "overdue") return "Atrasada";
    if (status === "today") return "Hoje";
    return "Futura";
  }
};
