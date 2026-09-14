const sidebar = document.querySelector("#sidebar");
const menuButton = document.querySelector("#menuButton");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.querySelector("#pageTitle");
const todayDate = document.querySelector("#todayDate");
const studyForm = document.querySelector("#studyForm");
const accuracyPreview = document.querySelector("#accuracyPreview");
const toast = document.querySelector("#toast");
const searchInput = document.querySelector("#searchInput");
const historyBody = document.querySelector("#historyBody");
const newStudyButton = document.querySelector("#newStudyButton");
const saveStudyButton = document.querySelector("#saveStudyButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const formHint = document.querySelector("#formHint");
const studyDate = document.querySelector("#studyDate");
const subjectOptions = document.querySelector("#subjectOptions");
const topicOptions = document.querySelector("#topicOptions");
const subjectPerformance = document.querySelector("#subjectPerformance");
const syncStatus = document.querySelector("#syncStatus");
const syncStatusText = document.querySelector("#syncStatusText");

const totalQuestionsEl = document.querySelector("#totalQuestions");
const overallAccuracyEl = document.querySelector("#overallAccuracy");
const questionsPeriodEl = document.querySelector("#questionsPeriod");
const accuracyPeriodEl = document.querySelector("#accuracyPeriod");
const masteredTopicsEl = document.querySelector("#masteredTopics");
const masteredTopicsNoteEl = document.querySelector("#masteredTopicsNote");
const reviewsTodayEl = document.querySelector("#reviewsToday");

const weakTopicsCountEl = document.querySelector("#weakTopicsCount");
const weakTopicsListEl = document.querySelector("#weakTopicsList");
const learningCountEl = document.querySelector("#learningCount");
const consolidationCountEl = document.querySelector("#consolidationCount");
const maintenanceCountEl = document.querySelector("#maintenanceCount");
const topicAnalysisBody = document.querySelector("#topicAnalysisBody");

const reviewQueueCountEl = document.querySelector("#reviewQueueCount");
const reviewListEl = document.querySelector("#reviewList");
const reviewScheduleBody = document.querySelector("#reviewScheduleBody");
const reviewHistoryBody = document.querySelector("#reviewHistoryBody");
const reviewFilterButtons = document.querySelectorAll("[data-review-filter]");
const reviewModal = document.querySelector("#reviewModal");
const reviewForm = document.querySelector("#reviewForm");
const reviewModalTitle = document.querySelector("#reviewModalTitle");
const closeReviewModal = document.querySelector("#closeReviewModal");
const cancelReviewModal = document.querySelector("#cancelReviewModal");
const reviewDate = document.querySelector("#reviewDate");
const reviewAccuracyPreview = document.querySelector("#reviewAccuracyPreview");
const reviewNextIntervalPreview = document.querySelector("#reviewNextIntervalPreview");

const timerDisplay = document.querySelector("#timerDisplay");
const timerStatus = document.querySelector("#timerStatus");
const timerStart = document.querySelector("#timerStart");
const timerPause = document.querySelector("#timerPause");
const timerResume = document.querySelector("#timerResume");
const timerFinish = document.querySelector("#timerFinish");
const timerCancel = document.querySelector("#timerCancel");
const periodStudyTimeEl = document.querySelector("#periodStudyTime");
const periodQuestionsEl = document.querySelector("#periodQuestions");
const questionsPerHourEl = document.querySelector("#questionsPerHour");
const subjectTimeListEl = document.querySelector("#subjectTimeList");
const timeFilterButtons = document.querySelectorAll("[data-time-filter]");

const smartStudyCountEl = document.querySelector("#smartStudyCount");
const smartStudyListEl = document.querySelector("#smartStudyList");
const smartInsightEl = document.querySelector("#smartInsight");
const performanceChartEl = document.querySelector("#performanceChart");
const studyHoursChartEl = document.querySelector("#studyHoursChart");
const questionsChartEl = document.querySelector("#questionsChart");
const efficiencyChartEl = document.querySelector("#efficiencyChart");

let performanceChartInstance = null;
let studyHoursChartInstance = null;
let questionsChartInstance = null;
let efficiencyChartInstance = null;





let sessions = StudyStorage.load();
let editingId = null;
let reviews = ReviewStorage.load();
let syncMeta = SyncStorage.load();
let activeReviewFilter = 'today';
let activeTimeFilter = 'today';
let activeTimer = TimerStorage.load();
let timerTick = null;

function createId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatPercent(value, digits = 1) {
  if (!Number.isFinite(value)) return "0%";
  return `${value.toFixed(digits).replace(".", ",")}%`;
}

function classify(percentage) {
  if (percentage >= 80) return { label: "Forte", className: "strong" };
  if (percentage >= 60) return { label: "Atenção", className: "attention" };
  return { label: "Prioridade", className: "priority" };
}

function showToast(message, type = "default") {
  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function formatToday() {
  todayDate.textContent = new Intl.DateTimeFormat("pt-BR").format(new Date());
  if (!studyDate.value) studyDate.value = toISODate();
}

function getFormValues() {
  const subject = studyForm.elements.subject.value.trim();
  const topic = studyForm.elements.topic.value.trim();
  const questions = Number(studyForm.elements.questions.value);
  const correct = Number(studyForm.elements.correct.value);
  const date = studyForm.elements.date.value;
  const activityType = studyForm.elements.activityType.value;
  const hours = Number(studyForm.elements.hours.value || 0);
  const minutes = Number(studyForm.elements.minutes.value || 0);
  const manualDurationSeconds = (hours * 3600) + (minutes * 60);
  const durationSeconds = manualDurationSeconds || getTimerElapsedSeconds();

  return { subject, topic, questions, correct, date, activityType, durationSeconds };
}

function validateSession(data) {
  if (!data.subject) return "Informe a matéria.";
  if (!data.topic) return "Informe o subtema.";
  if (!data.date) return "Informe a data do estudo.";
  if (!Number.isInteger(data.questions) || data.questions <= 0) {
    return "Questões feitas deve ser um número inteiro maior que zero.";
  }
  if (!Number.isInteger(data.correct) || data.correct < 0) {
    return "Acertos deve ser um número inteiro igual ou maior que zero.";
  }
  if (data.correct > data.questions) {
    return "A quantidade de acertos não pode ser maior que o total de questões.";
  }
  if (!Number.isFinite(data.durationSeconds) || data.durationSeconds < 0) {
    return "Informe uma duração válida.";
  }
  return null;
}

function updateAccuracyPreview() {
  const { questions, correct } = getFormValues();

  if (!questions || questions < 1 || !Number.isFinite(correct)) {
    accuracyPreview.textContent = "0%";
    formHint.textContent = editingId ? "Editando registro existente." : "Preencha os dados da sessão.";
    return;
  }

  if (correct > questions) {
    accuracyPreview.textContent = "—";
    formHint.textContent = "Acertos não pode ser maior que questões.";
    return;
  }

  const percentage = (Math.max(correct, 0) / questions) * 100;
  accuracyPreview.textContent = formatPercent(percentage);
  formHint.textContent = classify(percentage).label;
}

function persistAndRender() {
  StudyStorage.save(sessions);
  renderAll();
  StudySync.run();
}

function getFilteredSessions() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) return [...sessions];

  return sessions.filter((session) => {
    const haystack = `${session.subject} ${session.topic} ${session.date}`.toLowerCase();
    return haystack.includes(term);
  });
}

function renderHistory() {
  const filtered = getFilteredSessions()
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);

  if (!filtered.length) {
    historyBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="9">
          <div class="empty-state">
            <strong>${sessions.length ? "Nenhum resultado encontrado" : "Nenhuma sessão registrada"}</strong>
            <span>${sessions.length ? "Tente buscar outro termo." : "Use o formulário acima para adicionar seu primeiro estudo."}</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  historyBody.innerHTML = filtered.map((session) => {
    const percentage = (session.correct / session.questions) * 100;
    const status = classify(percentage);

    return `
      <tr>
        <td>${formatDate(session.date)}</td>
        <td>${escapeHtml(session.subject)}</td>
        <td>${escapeHtml(session.topic)}</td>
        <td>${formatNumber(session.questions)}</td>
        <td>${formatNumber(session.correct)}</td>
        <td>${formatDuration(session.durationSeconds || 0)}</td>
        <td><strong>${formatPercent(percentage)}</strong></td>
        <td><span class="badge ${status.className}">${status.label}</span></td>
        <td>
          <div class="row-actions">
            <button class="table-button" data-action="edit" data-id="${session.id}">Editar</button>
            <button class="table-button danger" data-action="delete" data-id="${session.id}">Excluir</button>
          </div>
        </td>
      </tr>`;
  }).join("");
}

function renderStats() {
  const totalQuestions = sessions.reduce((sum, s) => sum + s.questions, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correct, 0);
  const overall = totalQuestions ? (totalCorrect / totalQuestions) * 100 : 0;

  totalQuestionsEl.textContent = formatNumber(totalQuestions);
  overallAccuracyEl.textContent = formatPercent(overall);

  if (!sessions.length) {
    questionsPeriodEl.textContent = "Nenhum registro ainda";
    accuracyPeriodEl.textContent = "Comece registrando uma sessão";
    masteredTopicsEl.textContent = "0";
    masteredTopicsNoteEl.textContent = "Calculado pelos seus registros";
    return;
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const recent = sessions.filter((s) => {
    const date = new Date(`${s.date}T00:00:00`);
    return date >= sevenDaysAgo;
  });

  const recentQuestions = recent.reduce((sum, s) => sum + s.questions, 0);
  questionsPeriodEl.textContent = `${formatNumber(recentQuestions)} nos últimos 7 dias`;

  const recentCorrect = recent.reduce((sum, s) => sum + s.correct, 0);
  const recentAccuracy = recentQuestions ? (recentCorrect / recentQuestions) * 100 : 0;
  accuracyPeriodEl.textContent = recent.length
    ? `${formatPercent(recentAccuracy)} nos últimos 7 dias`
    : "Sem sessões nos últimos 7 dias";

  const topicMap = new Map();
  sessions.forEach((s) => {
    const key = `${s.subject}|||${s.topic}`;
    const current = topicMap.get(key) || { q: 0, c: 0 };
    current.q += s.questions;
    current.c += s.correct;
    topicMap.set(key, current);
  });

  const mastered = [...topicMap.values()].filter((item) => item.q >= 20 && (item.c / item.q) * 100 >= 80).length;
  masteredTopicsEl.textContent = mastered;
  masteredTopicsNoteEl.textContent = `${topicMap.size} subtema${topicMap.size === 1 ? "" : "s"} acompanhado${topicMap.size === 1 ? "" : "s"}`;
}

function renderSubjectPerformance() {
  if (!sessions.length) {
    subjectPerformance.innerHTML = `
      <div class="empty-state compact">
        <strong>Nenhum dado ainda</strong>
        <span>Registre suas primeiras sessões para ver o desempenho por matéria.</span>
      </div>`;
    return;
  }

  const subjects = new Map();

  sessions.forEach((s) => {
    const current = subjects.get(s.subject) || { q: 0, c: 0 };
    current.q += s.questions;
    current.c += s.correct;
    subjects.set(s.subject, current);
  });

  const rows = [...subjects.entries()]
    .map(([name, value]) => ({
      name,
      q: value.q,
      percentage: value.q ? (value.c / value.q) * 100 : 0
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);

  subjectPerformance.innerHTML = rows.map((item) => `
    <div class="subject-row">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${formatPercent(item.percentage)} • ${formatNumber(item.q)} questões</span>
      </div>
      <div class="progress"><i style="width:${Math.max(0, Math.min(item.percentage, 100))}%"></i></div>
    </div>
  `).join("");
}

function renderDatalists() {
  const subjects = [...new Set(sessions.map((s) => s.subject))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  subjectOptions.innerHTML = subjects.map((subject) => `<option value="${escapeAttribute(subject)}"></option>`).join("");

  const selectedSubject = studyForm.elements.subject.value.trim().toLowerCase();
  const topics = [...new Set(
    sessions
      .filter((s) => !selectedSubject || s.subject.toLowerCase() === selectedSubject)
      .map((s) => s.topic)
  )].sort((a, b) => a.localeCompare(b, "pt-BR"));

  topicOptions.innerHTML = topics.map((topic) => `<option value="${escapeAttribute(topic)}"></option>`).join("");
}




function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

function formatClock(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function getTimerElapsedSeconds() {
  if (!activeTimer) return 0;
  let elapsed = Number(activeTimer.accumulatedSeconds || 0);
  if (activeTimer.running && activeTimer.startedAt) {
    elapsed += Math.max(0, Math.floor((Date.now() - activeTimer.startedAt) / 1000));
  }
  return elapsed;
}

function persistTimer() {
  if (activeTimer) TimerStorage.save(activeTimer);
  else TimerStorage.clear();
}

function renderTimer() {
  const elapsed = getTimerElapsedSeconds();
  timerDisplay.textContent = formatClock(elapsed);

  const running = Boolean(activeTimer?.running);
  const exists = Boolean(activeTimer);

  timerStart.classList.toggle("hidden", exists);
  timerPause.classList.toggle("hidden", !running);
  timerResume.classList.toggle("hidden", !exists || running);
  timerFinish.classList.toggle("hidden", !exists);
  timerCancel.classList.toggle("hidden", !exists);

  timerStatus.textContent = running ? "Sessão em andamento" : exists ? "Sessão pausada" : "Pronto para iniciar";
}

function startTimer() {
  activeTimer = { running: true, startedAt: Date.now(), accumulatedSeconds: 0 };
  persistTimer();
  startTimerTick();
  renderTimer();
}

function pauseTimer() {
  if (!activeTimer?.running) return;
  activeTimer.accumulatedSeconds = getTimerElapsedSeconds();
  activeTimer.running = false;
  activeTimer.startedAt = null;
  persistTimer();
  stopTimerTick();
  renderTimer();
}

function resumeTimer() {
  if (!activeTimer || activeTimer.running) return;
  activeTimer.running = true;
  activeTimer.startedAt = Date.now();
  persistTimer();
  startTimerTick();
  renderTimer();
}

function finishTimer() {
  if (!activeTimer) return;
  const elapsed = getTimerElapsedSeconds();
  activeTimer = { running: false, startedAt: null, accumulatedSeconds: elapsed };
  persistTimer();
  stopTimerTick();
  studyForm.elements.hours.value = Math.floor(elapsed / 3600);
  studyForm.elements.minutes.value = Math.floor((elapsed % 3600) / 60);
  renderTimer();
  showToast(`Tempo capturado: ${formatDuration(elapsed)}. Complete os dados e salve a sessão.`, "success");
}

function cancelTimer() {
  if (!activeTimer) return;
  if (!window.confirm("Cancelar o cronômetro desta sessão?")) return;
  activeTimer = null;
  persistTimer();
  stopTimerTick();
  renderTimer();
}

function startTimerTick() {
  stopTimerTick();
  timerTick = window.setInterval(renderTimer, 1000);
}

function stopTimerTick() {
  if (timerTick) window.clearInterval(timerTick);
  timerTick = null;
}

function resetTimerAfterSave() {
  activeTimer = null;
  persistTimer();
  stopTimerTick();
  renderTimer();
}

function sessionInTimeFilter(session) {
  if (activeTimeFilter === "all") return true;
  const sessionDate = new Date(`${session.date}T00:00:00`);
  const today = new Date();
  today.setHours(0,0,0,0);

  if (activeTimeFilter === "today") return session.date === toISODate();

  const days = activeTimeFilter === "week" ? 6 : 29;
  const start = new Date(today);
  start.setDate(start.getDate() - days);
  return sessionDate >= start && sessionDate <= today;
}

function renderTimeDashboard() {
  const filtered = sessions.filter(sessionInTimeFilter);
  const totalSeconds = filtered.reduce((sum, s) => sum + Number(s.durationSeconds || 0), 0);
  const totalQuestions = filtered.reduce((sum, s) => sum + s.questions, 0);
  const hours = totalSeconds / 3600;
  const qph = hours > 0 ? totalQuestions / hours : 0;

  periodStudyTimeEl.textContent = formatDuration(totalSeconds);
  periodQuestionsEl.textContent = formatNumber(totalQuestions);
  questionsPerHourEl.textContent = hours > 0 ? qph.toFixed(1).replace(".", ",") : "0";

  const subjects = new Map();
  filtered.forEach((s) => {
    subjects.set(s.subject, (subjects.get(s.subject) || 0) + Number(s.durationSeconds || 0));
  });

  const rows = [...subjects.entries()].sort((a,b) => b[1] - a[1]);
  if (!rows.length) {
    subjectTimeListEl.innerHTML = `<div class="empty-state compact"><strong>Sem tempo registrado</strong><span>Use o cronômetro ou informe a duração manualmente.</span></div>`;
    return;
  }

  const max = Math.max(...rows.map(([, seconds]) => seconds), 1);
  subjectTimeListEl.innerHTML = rows.map(([subject, seconds]) => `
    <div class="time-subject-row">
      <div><strong>${escapeHtml(subject)}</strong><span>${formatDuration(seconds)}</span></div>
      <div class="progress"><i style="width:${(seconds/max)*100}%"></i></div>
    </div>`).join("");
}


function daysSince(isoDate) {
  if (!isoDate) return 999;
  const date = new Date(`${isoDate}T00:00:00`);
  const now = new Date();
  now.setHours(0,0,0,0);
  return Math.max(0, Math.floor((now - date) / 86400000));
}

function getLatestSessionForTopic(subject, topic) {
  return sessions
    .filter((s) => s.subject === subject && s.topic === topic)
    .sort((a,b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)[0] || null;
}

function buildSmartStudyRecommendations() {
  const topics = aggregateTopics();
  const schedule = buildReviewSchedule();

  return topics.map((topic) => {
    const review = schedule.find((r) => r.key === getTopicKey(topic.subject, topic.topic));
    const latest = getLatestSessionForTopic(topic.subject, topic.topic);
    const recencyDays = latest ? daysSince(latest.date) : 999;

    let score = 0;
    score += Math.max(0, 100 - topic.percentage) * 0.45;

    if (topic.confidence.className === "low") score += 18;
    else if (topic.confidence.className === "medium") score += 8;

    if (review?.status === "overdue") score += 30;
    else if (review?.status === "today") score += 18;

    if (recencyDays >= 30) score += 12;
    else if (recencyDays >= 14) score += 8;
    else if (recencyDays >= 7) score += 4;

    if (topic.questions < 20) score += 8;

    return {
      subject: topic.subject,
      topic: topic.topic,
      percentage: topic.percentage,
      confidence: topic.confidence,
      mastery: topic.mastery,
      questions: topic.questions,
      recencyDays,
      reviewStatus: review?.status || "upcoming",
      reviewDate: review?.nextDate || null,
      score: Math.round(Math.min(100, score))
    };
  }).sort((a,b) => b.score - a.score || a.percentage - b.percentage);
}

function getRecommendationReason(item) {
  const reasons = [];
  if (item.reviewStatus === "overdue") reasons.push("revisão atrasada");
  else if (item.reviewStatus === "today") reasons.push("revisão para hoje");
  if (item.percentage < 60) reasons.push("baixo desempenho");
  else if (item.percentage < 80) reasons.push("desempenho intermediário");
  if (item.confidence.className === "low") reasons.push("poucos dados");
  if (item.recencyDays >= 14) reasons.push(`${item.recencyDays} dias sem contato`);
  return reasons.slice(0,3).join(" • ") || "manutenção preventiva";
}

function renderSmartStudy() {
  const items = buildSmartStudyRecommendations().slice(0, 6);
  smartStudyCountEl.textContent = items.length;

  if (!items.length) {
    smartStudyListEl.innerHTML = `<div class="empty-state compact"><strong>Sem recomendações ainda</strong><span>Registre estudos e revisões para gerar prioridades.</span></div>`;
    smartInsightEl.innerHTML = `<div class="empty-state compact"><strong>Aguardando dados</strong><span>O sistema vai cruzar tempo, desempenho e revisão.</span></div>`;
    return;
  }

  smartStudyListEl.innerHTML = items.map((item, index) => `
    <div class="smart-study-item">
      <div class="smart-rank">${index + 1}</div>
      <div class="smart-study-copy">
        <strong>${escapeHtml(item.topic)}</strong>
        <small>${escapeHtml(item.subject)} • ${formatPercent(item.percentage)} • ${getRecommendationReason(item)}</small>
      </div>
      <span class="smart-score">${item.score}</span>
    </div>
  `).join("");

  const top = items[0];
  const overdue = items.filter((i) => i.reviewStatus === "overdue").length;
  const weak = items.filter((i) => i.percentage < 70).length;

  smartInsightEl.innerHTML = `
    <div class="insight-main">
      <span>Maior prioridade agora</span>
      <strong>${escapeHtml(top.topic)}</strong>
      <small>${escapeHtml(top.subject)} • prioridade ${top.score}/100</small>
    </div>
    <div class="insight-stats">
      <div><span>Revisões atrasadas</span><strong>${overdue}</strong></div>
      <div><span>Subtemas abaixo de 70%</span><strong>${weak}</strong></div>
      <div><span>Confiança do principal</span><strong>${top.confidence.label}</strong></div>
    </div>
  `;
}

function getDailySeries(days = 14) {
  const result = [];
  const today = new Date();
  today.setHours(0,0,0,0);

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = toISODate(d);
    const daySessions = sessions.filter((s) => s.date === iso);
    const questions = daySessions.reduce((sum,s) => sum + s.questions, 0);
    const correct = daySessions.reduce((sum,s) => sum + s.correct, 0);
    const seconds = daySessions.reduce((sum,s) => sum + Number(s.durationSeconds || 0), 0);

    result.push({
      iso,
      label: new Intl.DateTimeFormat("pt-BR", {day:"2-digit", month:"2-digit"}).format(d),
      questions,
      accuracy: questions ? (correct/questions)*100 : null,
      hours: seconds/3600
    });
  }

  return result;
}

function destroyChart(instance) {
  if (instance) instance.destroy();
  return null;
}

function renderCharts() {
  if (typeof Chart === "undefined") return;

  const series = getDailySeries(14);
  const labels = series.map((d) => d.label);

  performanceChartInstance = destroyChart(performanceChartInstance);
  performanceChartInstance = new Chart(performanceChartEl, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Acertos (%)",
        data: series.map((d) => d.accuracy),
        tension: 0.3,
        spanGaps: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { min: 0, max: 100 } },
      plugins: { legend: { display: false } }
    }
  });

  const bySubject = new Map();
  sessions.forEach((s) => bySubject.set(s.subject, (bySubject.get(s.subject) || 0) + Number(s.durationSeconds || 0)));
  const subjectRows = [...bySubject.entries()].sort((a,b) => b[1]-a[1]).slice(0,8);

  studyHoursChartInstance = destroyChart(studyHoursChartInstance);
  studyHoursChartInstance = new Chart(studyHoursChartEl, {
    type: "bar",
    data: {
      labels: subjectRows.map(([name]) => name),
      datasets: [{
        label: "Horas",
        data: subjectRows.map(([,seconds]) => +(seconds/3600).toFixed(2))
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });

  questionsChartInstance = destroyChart(questionsChartInstance);
  questionsChartInstance = new Chart(questionsChartEl, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Questões",
        data: series.map((d) => d.questions)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });

  const efficiencyRows = [...bySubject.keys()].map((subject) => {
    const items = sessions.filter((s) => s.subject === subject);
    const q = items.reduce((sum,s) => sum+s.questions,0);
    const c = items.reduce((sum,s) => sum+s.correct,0);
    const seconds = items.reduce((sum,s) => sum+Number(s.durationSeconds||0),0);
    return {
      subject,
      hours: seconds/3600,
      accuracy: q ? (c/q)*100 : 0,
      questions: q
    };
  }).filter((r) => r.hours > 0).slice(0,12);

  efficiencyChartInstance = destroyChart(efficiencyChartInstance);
  efficiencyChartInstance = new Chart(efficiencyChartEl, {
    type: "scatter",
    data: {
      datasets: [{
        label: "Matérias",
        data: efficiencyRows.map((r) => ({x:+r.hours.toFixed(2), y:+r.accuracy.toFixed(1), subject:r.subject}))
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Horas estudadas" } },
        y: { min: 0, max: 100, title: { display: true, text: "Acertos (%)" } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              const raw = context.raw;
              return `${raw.subject}: ${raw.x}h • ${raw.y}%`;
            }
          }
        }
      }
    }
  });
}

function getTopicKey(subject, topic) {
  return `${subject}|||${topic}`;
}

function getCompletedReviewsForTopic(subject, topic) {
  return reviews
    .filter((r) => r.subject === subject && r.topic === topic)
    .sort((a, b) => a.date.localeCompare(b.date) || a.createdAt - b.createdAt);
}

function getReviewStreak(subject, topic) {
  const completed = getCompletedReviewsForTopic(subject, topic).slice().reverse();
  let streak = 0;

  for (const review of completed) {
    const percentage = (review.correct / review.questions) * 100;
    if (percentage >= 90) streak += 1;
    else break;
  }

  return streak;
}

function buildReviewSchedule() {
  const topics = aggregateTopics();

  return topics.map((topic) => {
    const topicReviews = getCompletedReviewsForTopic(topic.subject, topic.topic);
    const latestReview = topicReviews.length ? topicReviews[topicReviews.length - 1] : null;

    const latestStudySession = sessions
      .filter((s) => s.subject === topic.subject && s.topic === topic.topic)
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)[0];

    let lastDate = latestStudySession?.date || topic.latestDate;
    let lastPercentage = latestStudySession
      ? (latestStudySession.correct / latestStudySession.questions) * 100
      : topic.percentage;
    let previousInterval = null;

    if (latestReview) {
      lastDate = latestReview.date;
      lastPercentage = (latestReview.correct / latestReview.questions) * 100;
      previousInterval = latestReview.nextInterval || ReviewEngine.getBaseInterval(lastPercentage);
    }

    const streak = getReviewStreak(topic.subject, topic.topic);
    // Uma revisão concluída já possui o intervalo calculado. Renderizar o
    // dashboard nunca deve avançá-lo novamente; só uma nova revisão progride.
    const nextInterval = latestReview
      ? (latestReview.nextInterval || ReviewEngine.getBaseInterval(lastPercentage))
      : ReviewEngine.getBaseInterval(lastPercentage);

    const nextDate = ReviewEngine.addDays(lastDate, nextInterval);
    const status = ReviewEngine.compareDate(nextDate);

    return {
      key: getTopicKey(topic.subject, topic.topic),
      subject: topic.subject,
      topic: topic.topic,
      lastDate,
      lastPercentage,
      previousInterval,
      interval: nextInterval,
      nextDate,
      status,
      streak,
      priorityScore: topic.priorityScore
    };
  }).sort((a, b) => a.nextDate.localeCompare(b.nextDate) || b.priorityScore - a.priorityScore);
}

function renderReviewQueue() {
  const schedule = buildReviewSchedule();
  let filtered = schedule;

  if (activeReviewFilter === "today") {
    filtered = schedule.filter((item) => item.status === "today");
  } else if (activeReviewFilter === "overdue") {
    filtered = schedule.filter((item) => item.status === "overdue");
  } else if (activeReviewFilter === "upcoming") {
    filtered = schedule.filter((item) => item.status === "upcoming");
  }

  reviewQueueCountEl.textContent = filtered.length;

  if (!filtered.length) {
    reviewListEl.innerHTML = `
      <div class="empty-state compact">
        <strong>Nenhuma revisão nesta categoria</strong>
        <span>O sistema recalcula automaticamente as datas conforme seu desempenho.</span>
      </div>`;
    return;
  }

  reviewListEl.innerHTML = filtered.slice(0, 8).map((item) => {
    const priorityClass = item.status === "overdue"
      ? "priority-high"
      : item.priorityScore >= 55
        ? "priority-high"
        : item.priorityScore >= 30
          ? "priority-medium"
          : "priority-low";

    return `
      <div class="review-item ${priorityClass}">
        <span class="priority-dot"></span>
        <div>
          <strong>${escapeHtml(item.topic)}</strong>
          <small>${escapeHtml(item.subject)} • ${formatPercent(item.lastPercentage)} • ${formatDate(item.nextDate)}</small>
        </div>
        <button class="table-button" data-review-action="complete" data-review-key="${escapeAttribute(item.key)}">Revisar</button>
      </div>`;
  }).join("");
}

function renderReviewSchedule() {
  const schedule = buildReviewSchedule();

  const todayCount = schedule.filter((item) => item.status === "today").length;
  const overdueCount = schedule.filter((item) => item.status === "overdue").length;
  reviewsTodayEl.textContent = todayCount + overdueCount;

  if (!schedule.length) {
    reviewScheduleBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="7">
          <div class="empty-state">
            <strong>Nenhuma revisão agendada</strong>
            <span>Cadastre sessões de estudo para criar a agenda automática.</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  reviewScheduleBody.innerHTML = schedule.map((item) => `
    <tr>
      <td>${escapeHtml(item.subject)}</td>
      <td>${escapeHtml(item.topic)}</td>
      <td><strong>${formatPercent(item.lastPercentage)}</strong></td>
      <td>${item.interval} dia${item.interval === 1 ? "" : "s"}</td>
      <td>${formatDate(item.nextDate)}</td>
      <td><span class="review-status ${item.status}">${ReviewEngine.getStatusLabel(item.status)}</span></td>
      <td><button class="table-button" data-review-action="complete" data-review-key="${escapeAttribute(item.key)}">Registrar</button></td>
    </tr>
  `).join("");
}

function renderReviewHistory() {
  const ordered = [...reviews].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);

  if (!ordered.length) {
    reviewHistoryBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="7">
          <div class="empty-state">
            <strong>Nenhuma revisão concluída</strong>
            <span>Quando você registrar uma revisão, ela aparecerá aqui.</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  reviewHistoryBody.innerHTML = ordered.slice(0, 50).map((review) => {
    const percentage = (review.correct / review.questions) * 100;
    return `
      <tr>
        <td>${formatDate(review.date)}</td>
        <td>${escapeHtml(review.subject)}</td>
        <td>${escapeHtml(review.topic)}</td>
        <td>${formatNumber(review.questions)}</td>
        <td>${formatNumber(review.correct)}</td>
        <td><strong>${formatPercent(percentage)}</strong></td>
        <td>${review.nextInterval} dia${review.nextInterval === 1 ? "" : "s"}</td>
      </tr>`;
  }).join("");
}

function openReviewModal(reviewKey) {
  const schedule = buildReviewSchedule();
  const item = schedule.find((entry) => entry.key === reviewKey);
  if (!item) return;

  reviewForm.elements.reviewKey.value = reviewKey;
  reviewForm.elements.questions.value = "";
  reviewForm.elements.correct.value = "";
  reviewForm.elements.date.value = toISODate();
  reviewModalTitle.textContent = `${item.subject} — ${item.topic}`;
  reviewAccuracyPreview.textContent = "0%";
  reviewNextIntervalPreview.textContent = "Próximo intervalo será calculado pelo desempenho.";
  reviewModal.classList.remove("hidden");
}

function closeReviewModalNow() {
  reviewModal.classList.add("hidden");
  reviewForm.reset();
}

function updateReviewPreview() {
  const questions = Number(reviewForm.elements.questions.value || 0);
  const correct = Number(reviewForm.elements.correct.value || 0);
  const key = reviewForm.elements.reviewKey.value;

  if (!questions || questions < 1 || correct < 0 || correct > questions) {
    reviewAccuracyPreview.textContent = "0%";
    reviewNextIntervalPreview.textContent = "Próximo intervalo será calculado pelo desempenho.";
    return;
  }

  const percentage = (correct / questions) * 100;
  const schedule = buildReviewSchedule();
  const item = schedule.find((entry) => entry.key === key);
  const previousInterval = item?.interval || null;
  const [subject, topic] = key.split("|||");
  const currentStreak = getReviewStreak(subject, topic);
  const projectedStreak = percentage >= 90 ? currentStreak + 1 : 0;
  const nextInterval = ReviewEngine.getNextInterval(percentage, previousInterval, projectedStreak, questions);

  reviewAccuracyPreview.textContent = formatPercent(percentage);
  reviewNextIntervalPreview.textContent = `Se concluir agora: próxima revisão em ${nextInterval} dia${nextInterval === 1 ? "" : "s"}.`;
}

function saveReviewResult(event) {
  event.preventDefault();

  const reviewKey = reviewForm.elements.reviewKey.value;
  const questions = Number(reviewForm.elements.questions.value);
  const correct = Number(reviewForm.elements.correct.value);
  const date = reviewForm.elements.date.value;

  if (!reviewKey || !date || !Number.isInteger(questions) || questions <= 0 || !Number.isInteger(correct) || correct < 0 || correct > questions) {
    showToast("Preencha corretamente os dados da revisão.", "error");
    return;
  }

  const [subject, topic] = reviewKey.split("|||");
  const schedule = buildReviewSchedule();
  const item = schedule.find((entry) => entry.key === reviewKey);
  const percentage = (correct / questions) * 100;
  const currentStreak = getReviewStreak(subject, topic);
  const projectedStreak = percentage >= 90 ? currentStreak + 1 : 0;
  const previousInterval = item?.interval || null;
  const nextInterval = ReviewEngine.getNextInterval(percentage, previousInterval, projectedStreak, questions);

  const now = Date.now();
  const reviewId = createId();
  const sessionId = createId();
  reviews.push({
    id: reviewId,
    sessionId,
    subject,
    topic,
    questions,
    correct,
    date,
    previousInterval,
    nextInterval,
    createdAt: now,
    updatedAt: now
  });

  // Toda revisão também é atividade real e entra nas estatísticas gerais.
  sessions.push({
    id: sessionId,
    subject,
    topic,
    questions,
    correct,
    date,
    activityType: "review",
    durationSeconds: 0,
    createdAt: now,
    updatedAt: now
  });

  ReviewStorage.save(reviews);
  StudyStorage.save(sessions);
  closeReviewModalNow();
  renderAll();
  StudySync.run();
  showToast(`Revisão concluída. Próxima em ${nextInterval} dia${nextInterval === 1 ? "" : "s"}.`, "success");
}

function aggregateTopics() {
  const topicMap = new Map();

  sessions.forEach((session) => {
    const key = `${session.subject}|||${session.topic}`;
    const current = topicMap.get(key) || {
      subject: session.subject,
      topic: session.topic,
      questions: 0,
      correct: 0,
      sessions: 0,
      latestDate: session.date,
      percentages: []
    };

    current.questions += session.questions;
    current.correct += session.correct;
    current.sessions += 1;
    current.percentages.push((session.correct / session.questions) * 100);

    if (session.date > current.latestDate) {
      current.latestDate = session.date;
    }

    topicMap.set(key, current);
  });

  return [...topicMap.values()].map((item) => {
    const percentage = item.questions ? (item.correct / item.questions) * 100 : 0;
    const confidence = getConfidence(item.questions, item.sessions);
    const mastery = getMasteryState(percentage, confidence, item.questions);
    const priorityScore = getPriorityScore(percentage, confidence, item.questions);

    return {
      ...item,
      percentage,
      confidence,
      mastery,
      priorityScore
    };
  });
}

function getConfidence(questions, sessionCount) {
  if (questions >= 100 && sessionCount >= 4) {
    return { label: "Alta", className: "high", weight: 1 };
  }
  if (questions >= 40 && sessionCount >= 2) {
    return { label: "Média", className: "medium", weight: 0.7 };
  }
  return { label: "Baixa", className: "low", weight: 0.4 };
}

function getMasteryState(percentage, confidence, questions) {
  if (percentage >= 90 && confidence.className === "high") {
    return { label: "Manutenção", className: "maintenance" };
  }

  if (percentage >= 70 && questions >= 20) {
    return { label: "Consolidação", className: "consolidation" };
  }

  return { label: "Aprendizado", className: "learning" };
}

function getPriorityScore(percentage, confidence, questions) {
  const performanceFactor = Math.max(0, 100 - percentage);
  const confidencePenalty = confidence.className === "low" ? 15 : confidence.className === "medium" ? 7 : 0;
  const samplePenalty = questions < 20 ? 10 : 0;
  return Math.round(Math.min(100, performanceFactor + confidencePenalty + samplePenalty));
}

function getPriorityLabel(score) {
  if (score >= 55) return { label: "Alta", className: "high" };
  if (score >= 30) return { label: "Média", className: "medium" };
  return { label: "Baixa", className: "low" };
}

function renderTopicAnalytics() {
  const topics = aggregateTopics()
    .sort((a, b) => b.priorityScore - a.priorityScore || a.percentage - b.percentage);

  if (!topics.length) {
    weakTopicsCountEl.textContent = "0";
    learningCountEl.textContent = "0";
    consolidationCountEl.textContent = "0";
    maintenanceCountEl.textContent = "0";

    weakTopicsListEl.innerHTML = `
      <div class="empty-state compact">
        <strong>Sem diagnóstico ainda</strong>
        <span>Registre mais sessões para identificar seus pontos fracos.</span>
      </div>`;

    topicAnalysisBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="9">
          <div class="empty-state">
            <strong>Nenhum subtema analisado</strong>
            <span>Os dados aparecerão aqui conforme você registrar sessões.</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  const learning = topics.filter((t) => t.mastery.className === "learning");
  const consolidation = topics.filter((t) => t.mastery.className === "consolidation");
  const maintenance = topics.filter((t) => t.mastery.className === "maintenance");

  learningCountEl.textContent = learning.length;
  consolidationCountEl.textContent = consolidation.length;
  maintenanceCountEl.textContent = maintenance.length;

  const weakTopics = topics.filter((t) => t.priorityScore >= 30).slice(0, 5);
  weakTopicsCountEl.textContent = weakTopics.length;

  if (!weakTopics.length) {
    weakTopicsListEl.innerHTML = `
      <div class="empty-state compact">
        <strong>Nenhum ponto crítico</strong>
        <span>Seu desempenho atual não indica subtemas de alta prioridade.</span>
      </div>`;
  } else {
    weakTopicsListEl.innerHTML = weakTopics.map((item) => `
      <div class="diagnostic-item">
        <div>
          <strong>${escapeHtml(item.topic)}</strong>
          <small>${escapeHtml(item.subject)} • ${formatPercent(item.percentage)} • ${formatNumber(item.questions)} questões</small>
        </div>
        <span class="priority-score">${item.priorityScore}</span>
      </div>
    `).join("");
  }

  topicAnalysisBody.innerHTML = topics.map((item) => {
    const priority = getPriorityLabel(item.priorityScore);

    return `
      <tr>
        <td>${escapeHtml(item.subject)}</td>
        <td>${escapeHtml(item.topic)}</td>
        <td>${formatNumber(item.questions)}</td>
        <td>${formatNumber(item.correct)}</td>
        <td><strong>${formatPercent(item.percentage)}</strong></td>
        <td><span class="confidence-badge ${item.confidence.className}">${item.confidence.label}</span></td>
        <td><span class="state-badge ${item.mastery.className}">${item.mastery.label}</span></td>
        <td><span class="priority-badge ${priority.className}">${priority.label}</span></td>
      </tr>
    `;
  }).join("");
}

function renderAll() {
  renderHistory();
  renderStats();
  renderSubjectPerformance();
  renderTopicAnalytics();
  renderReviewQueue();
  renderReviewSchedule();
  renderReviewHistory();
  renderTimeDashboard();
  renderSmartStudy();
  renderCharts();
  renderDatalists();
}

function resetForm() {
  editingId = null;
  studyForm.reset();
  studyDate.value = toISODate();
  saveStudyButton.textContent = "Salvar sessão";
  cancelEditButton.classList.add("hidden");
  accuracyPreview.textContent = "0%";
  formHint.textContent = "Preencha os dados da sessão.";
  renderDatalists();
}

function startEdit(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;

  editingId = id;
  studyForm.elements.subject.value = session.subject;
  studyForm.elements.topic.value = session.topic;
  studyForm.elements.questions.value = session.questions;
  studyForm.elements.correct.value = session.correct;
  studyForm.elements.date.value = session.date;
  const typeInput = studyForm.querySelector(`input[name="activityType"][value="${session.activityType || "study"}"]`);
  if (typeInput) typeInput.checked = true;
  studyForm.elements.hours.value = Math.floor((session.durationSeconds || 0) / 3600) || "";
  studyForm.elements.minutes.value = Math.floor(((session.durationSeconds || 0) % 3600) / 60) || "";

  saveStudyButton.textContent = "Atualizar sessão";
  cancelEditButton.classList.remove("hidden");
  formHint.textContent = "Editando registro existente.";
  updateAccuracyPreview();
  renderDatalists();
  document.getElementById("registrar").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteSession(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;

  const ok = window.confirm(`Excluir o registro "${session.subject} — ${session.topic}"?`);
  if (!ok) return;

  const deletedAt = Date.now();
  sessions = sessions.filter((item) => item.id !== id);
  syncMeta.sessionTombstones[id] = deletedAt;
  const linkedReviews = reviews.filter((item) => item.sessionId === id);
  if (linkedReviews.length) {
    linkedReviews.forEach((item) => { syncMeta.reviewTombstones[item.id] = deletedAt; });
    reviews = reviews.filter((item) => item.sessionId !== id);
    ReviewStorage.save(reviews);
  }
  SyncStorage.save(syncMeta);

  if (editingId === id) resetForm();
  persistAndRender();
  showToast("Registro excluído.", "success");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function syncReviewRecordForSession(session) {
  const existing = reviews.find((item) => item.sessionId === session.id);
  if (session.activityType !== "review") {
    if (existing) {
      syncMeta.reviewTombstones[existing.id] = Date.now();
      reviews = reviews.filter((item) => item.id !== existing.id);
    }
    return;
  }

  const priorReviews = reviews
    .filter((item) => item.sessionId !== session.id && item.subject === session.subject && item.topic === session.topic)
    .sort((a, b) => b.date.localeCompare(a.date) || Number(b.createdAt) - Number(a.createdAt));
  const previousInterval = priorReviews[0]?.nextInterval || null;
  const percentage = (session.correct / session.questions) * 100;
  const streak = priorReviews.slice(0, 2).every((item) => (item.correct / item.questions) * 100 >= 90)
    ? Math.min(2, priorReviews.length) + 1
    : percentage >= 90 ? 1 : 0;
  const nextInterval = ReviewEngine.getNextInterval(percentage, previousInterval, streak, session.questions);
  const now = Date.now();
  const record = {
    id: existing?.id || createId(), sessionId: session.id,
    subject: session.subject, topic: session.topic,
    questions: session.questions, correct: session.correct, date: session.date,
    previousInterval, nextInterval,
    createdAt: existing?.createdAt || session.createdAt || now,
    updatedAt: now
  };
  reviews = existing ? reviews.map((item) => item.id === existing.id ? record : item) : [...reviews, record];
}

studyForm.addEventListener("input", (event) => {
  updateAccuracyPreview();
  if (event.target.name === "subject") renderDatalists();
});

studyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = getFormValues();
  const error = validateSession(data);

  if (error) {
    showToast(error, "error");
    return;
  }

  if (editingId) {
    sessions = sessions.map((session) => {
      if (session.id !== editingId) return session;
      return {
        ...session,
        ...data,
        updatedAt: Date.now()
      };
    });
    syncReviewRecordForSession(sessions.find((session) => session.id === editingId));
    showToast("Sessão atualizada.", "success");
  } else {
    const newId = createId();
    sessions.push({
      id: newId,
      ...data,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    syncReviewRecordForSession(sessions[sessions.length - 1]);
    showToast("Sessão salva no navegador.", "success");
  }

  StudyStorage.save(sessions);
  ReviewStorage.save(reviews);
  SyncStorage.save(syncMeta);
  resetTimerAfterSave();
  resetForm();
  renderAll();
  StudySync.run();
});

cancelEditButton.addEventListener("click", resetForm);

historyBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  if (action === "edit") startEdit(id);
  if (action === "delete") deleteSession(id);
});

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    pageTitle.textContent = item.textContent.trim();

    const target = item.dataset.section;
    const targetNode = document.getElementById(target);

    if (targetNode) targetNode.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.innerWidth <= 860) sidebar.classList.remove("open");
  });
});

newStudyButton.addEventListener("click", () => {
  resetForm();
  document.getElementById("registrar").scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => studyForm.elements.subject.focus(), 450);
});

searchInput.addEventListener("input", renderHistory);



timerStart.addEventListener("click", startTimer);
timerPause.addEventListener("click", pauseTimer);
timerResume.addEventListener("click", resumeTimer);
timerFinish.addEventListener("click", finishTimer);
timerCancel.addEventListener("click", cancelTimer);

timeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeFilterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeTimeFilter = button.dataset.timeFilter;
    renderTimeDashboard();
  });
});

reviewFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    reviewFilterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeReviewFilter = button.dataset.reviewFilter;
    renderReviewQueue();
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-review-action='complete']");
  if (!button) return;
  openReviewModal(button.dataset.reviewKey);
});

reviewForm.addEventListener("input", updateReviewPreview);
reviewForm.addEventListener("submit", saveReviewResult);
closeReviewModal.addEventListener("click", closeReviewModalNow);
cancelReviewModal.addEventListener("click", closeReviewModalNow);

reviewModal.addEventListener("click", (event) => {
  if (event.target === reviewModal) closeReviewModalNow();
});

function setSyncStatus(state, detail = "") {
  const labels = { local: "Somente local", syncing: "Sincronizando...", synced: "Sincronizado", offline: "Offline", error: "Erro de sincronização" };
  syncStatus.className = `sync-status ${state}`;
  syncStatusText.textContent = labels[state] || labels.local;
  syncStatus.title = detail ? `${labels[state]} — ${detail}` : labels[state];
}

syncStatus.addEventListener("click", () => StudySync.run());

StudySync.init({
  getState: () => ({ sessions, reviews, meta: syncMeta }),
  applyState: (state) => {
    sessions = state.sessions;
    reviews = state.reviews;
    syncMeta = state.meta;
    StudyStorage.save(sessions);
    ReviewStorage.save(reviews);
    SyncStorage.save(syncMeta);
    renderAll();
  },
  setStatus: setSyncStatus
});

formatToday();
renderAll();
updateAccuracyPreview();
renderTimer();
if (activeTimer?.running) startTimerTick();
