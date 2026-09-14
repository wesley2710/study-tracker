const ReviewEngine = {
  intervals: [1, 3, 7, 15, 30, 60, 90, 120, 180],

  getBaseInterval(percentage) {
    if (percentage < 50) return 1;
    if (percentage < 60) return 3;
    if (percentage < 70) return 7;
    if (percentage < 80) return 15;
    if (percentage < 90) return 30;
    if (percentage < 95) return 60;
    return 90;
  },

  getNextInterval(percentage, previousInterval = null, streak = 0, questionCount = 20) {
    let base = this.getBaseInterval(percentage);

    // A amostra limita saltos excessivos: 100% em poucas questões não equivale
    // a uma revisão robusta com 20+ questões.
    if (questionCount < 10) base = Math.min(base, 15);
    else if (questionCount < 20) base = Math.min(base, 30);

    if (percentage < 90) {
      return base;
    }

    if (!previousInterval) {
      return base;
    }

    // Progressão de manutenção após bom desempenho recorrente.
    if (percentage >= 95 && streak >= 2 && questionCount >= 20) {
      if (previousInterval >= 120) return 180;
      if (previousInterval >= 90) return 120;
      return 90;
    }

    if (percentage >= 90 && streak >= 2 && questionCount >= 20) {
      if (previousInterval >= 90) return 120;
      if (previousInterval >= 60) return 90;
      return Math.max(base, previousInterval);
    }

    return Math.max(base, Math.min(previousInterval, 90));
  },

  addDays(isoDate, days) {
    const date = new Date(`${isoDate}T12:00:00`);
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
