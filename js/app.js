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
const historySubjectFilter = document.querySelector("#historySubjectFilter");
const historyTopicFilter = document.querySelector("#historyTopicFilter");
const historyContextFilter = document.querySelector("#historyContextFilter");
const historyStartDate = document.querySelector("#historyStartDate");
const historyEndDate = document.querySelector("#historyEndDate");
const clearHistoryFilters = document.querySelector("#clearHistoryFilters");
const newStudyButton = document.querySelector("#newStudyButton");
const saveStudyButton = document.querySelector("#saveStudyButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const formHint = document.querySelector("#formHint");
const studyDate = document.querySelector("#studyDate");
const subjectInput = document.querySelector("#subjectInput");
const topicInput = document.querySelector("#topicInput");
const subtopicInput = document.querySelector("#subtopicInput");
const performanceDetailsButton = document.querySelector("#performanceDetailsButton");
const timeExactDate = document.querySelector("#timeExactDate");
const subjectCatalogForm = document.querySelector("#subjectCatalogForm");
const catalogList = document.querySelector("#catalogList");
const catalogSubjectCount = document.querySelector("#catalogSubjectCount");
const catalogSearch = document.querySelector("#catalogSearch");
const catalogBulkActions = document.querySelector("#catalogBulkActions");
const catalogSelectedCount = document.querySelector("#catalogSelectedCount");
const mergeSelectedTopicsButton = document.querySelector("#mergeSelectedTopics");
const archiveSelectedTopicsButton = document.querySelector("#archiveSelectedTopics");
const clearCatalogSelectionButton = document.querySelector("#clearCatalogSelection");
const subjectPerformance = document.querySelector("#subjectPerformance");
const syncStatus = document.querySelector("#syncStatus");
const syncStatusText = document.querySelector("#syncStatusText");
const authModal = document.querySelector("#authModal");
const authForm = document.querySelector("#authForm");
const closeAuthModal = document.querySelector("#closeAuthModal");
const cancelAuthModal = document.querySelector("#cancelAuthModal");
const catalogRenameModal = document.querySelector("#catalogRenameModal");
const catalogRenameForm = document.querySelector("#catalogRenameForm");
const catalogRenameTitle = document.querySelector("#catalogRenameTitle");
const closeCatalogRenameModal = document.querySelector("#closeCatalogRenameModal");
const cancelCatalogRename = document.querySelector("#cancelCatalogRename");
const catalogMergeModal = document.querySelector("#catalogMergeModal");
const catalogMergeForm = document.querySelector("#catalogMergeForm");
const catalogMergeTitle = document.querySelector("#catalogMergeTitle");
const catalogMergeSources = document.querySelector("#catalogMergeSources");
const catalogMergeSummary = document.querySelector("#catalogMergeSummary");
const closeCatalogMergeModal = document.querySelector("#closeCatalogMergeModal");
const cancelCatalogMerge = document.querySelector("#cancelCatalogMerge");
const catalogMergeNewTarget = document.querySelector("#catalogMergeNewTarget");
const catalogMergeCorrectionModal = document.querySelector("#catalogMergeCorrectionModal");
const catalogMergeCorrectionForm = document.querySelector("#catalogMergeCorrectionForm");
const catalogMergeCorrectionSummary = document.querySelector("#catalogMergeCorrectionSummary");
const closeCatalogMergeCorrectionModal = document.querySelector("#closeCatalogMergeCorrectionModal");
const cancelCatalogMergeCorrection = document.querySelector("#cancelCatalogMergeCorrection");
const openArchivedItemsButton = document.querySelector("#openArchivedItems");
const archivedItemsModal = document.querySelector("#archivedItemsModal");
const archivedItemsList = document.querySelector("#archivedItemsList");
const closeArchivedItemsModal = document.querySelector("#closeArchivedItemsModal");
const doneArchivedItems = document.querySelector("#doneArchivedItems");
const archivedBulkActions = document.querySelector("#archivedBulkActions");
const archivedSelectedCount = document.querySelector("#archivedSelectedCount");
const restoreSelectedArchivedButton = document.querySelector("#restoreSelectedArchived");
const clearArchivedSelectionButton = document.querySelector("#clearArchivedSelection");
const undoLastActionButton = document.querySelector("#undoLastAction");
const undoActionLabel = document.querySelector("#undoActionLabel");
const undoActionTime = document.querySelector("#undoActionTime");
const exportBackupButton = document.querySelector("#exportBackup");
const selectBackupFileButton = document.querySelector("#selectBackupFile");
const backupFileInput = document.querySelector("#backupFileInput");
const auditLogList = document.querySelector("#auditLogList");
const auditCount = document.querySelector("#auditCount");
const todaySummaryText = document.querySelector("#todaySummaryText");
const todayStartTimerButton = document.querySelector("#todayStartTimer");
const todayRegisterStudyButton = document.querySelector("#todayRegisterStudy");
const todayStudyTime = document.querySelector("#todayStudyTime");
const dailyGoalMinutesInput = document.querySelector("#dailyGoalMinutes");
const todayGoalProgressText = document.querySelector("#todayGoalProgressText");
const todayGoalProgressBar = document.querySelector("#todayGoalProgressBar");
const todayOverdueCount = document.querySelector("#todayOverdueCount");
const todayOverdueNote = document.querySelector("#todayOverdueNote");
const todayDueCount = document.querySelector("#todayDueCount");
const todayDueNote = document.querySelector("#todayDueNote");
const todaySuggestionTitle = document.querySelector("#todaySuggestionTitle");
const todaySuggestionPath = document.querySelector("#todaySuggestionPath");
const todaySuggestionReason = document.querySelector("#todaySuggestionReason");
const todayStudySuggestionButton = document.querySelector("#todayStudySuggestion");
const todayAgendaCount = document.querySelector("#todayAgendaCount");
const todayAgendaList = document.querySelector("#todayAgendaList");

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
const topicAnalysisSearch = document.querySelector("#topicAnalysisSearch");

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
const studyHoursChartInner = document.querySelector("#studyHoursChartInner");
const efficiencyRankingEl = document.querySelector("#efficiencyRanking");
const chartPeriodFilter = document.querySelector("#chartPeriodFilter");
const chartCustomPeriod = document.querySelector("#chartCustomPeriod");
const chartStartDate = document.querySelector("#chartStartDate");
const chartEndDate = document.querySelector("#chartEndDate");
const chartPeriodSummary = document.querySelector("#chartPeriodSummary");
const performanceChartCaption = document.querySelector("#performanceChartCaption");
const studyHoursChartCaption = document.querySelector("#studyHoursChartCaption");
const questionsChartTitle = document.querySelector("#questionsChartTitle");
const questionsChartCaption = document.querySelector("#questionsChartCaption");
const efficiencyChartCaption = document.querySelector("#efficiencyChartCaption");
const questionContextEl = document.querySelector("#questionContext");
const mockForm = document.querySelector("#mockForm");
const mockDate = document.querySelector("#mockDate");
const mockSubjectRows = document.querySelector("#mockSubjectRows");
const addMockSubjectButton = document.querySelector("#addMockSubject");
const cancelMockEditButton = document.querySelector("#cancelMockEdit");
const saveMockButton = document.querySelector("#saveMockButton");
const mockHistoryBody = document.querySelector("#mockHistoryBody");
const mockChartFilter = document.querySelector("#mockChartFilter");
const mockEvolutionChartEl = document.querySelector("#mockEvolutionChart");
const mockCountEl = document.querySelector("#mockCount");
const mockLatestScoreEl = document.querySelector("#mockLatestScore");
const mockBestScoreEl = document.querySelector("#mockBestScore");
const studyContextAccuracyEl = document.querySelector("#studyContextAccuracy");
const independentContextAccuracyEl = document.querySelector("#independentContextAccuracy");
const reviewContextAccuracyEl = document.querySelector("#reviewContextAccuracy");
const studyContextCountEl = document.querySelector("#studyContextCount");
const independentContextCountEl = document.querySelector("#independentContextCount");
const reviewContextCountEl = document.querySelector("#reviewContextCount");

let performanceChartInstance = null;
let studyHoursChartInstance = null;
let questionsChartInstance = null;
let mockEvolutionChartInstance = null;





let sessions = StudyStorage.load();
let editingId = null;
let reviews = ReviewStorage.load();
let scheduledReviewKey = null;
let mocks = MockStorage.load();
let catalog = CatalogStorage.load();
let editingMockId = null;
let pendingCatalogRename = null;
let pendingCatalogMergeSubjectId = null;
let pendingCatalogMergeCorrection = null;
let syncMeta = SyncStorage.load();
let safetyState = SafetyStorage.load();
let uiPreferences = UiStorage.load();
let catalogTopicSelection = new Set();
let archivedSelection = new Set();
let suggestedStudyItem = null;
let activeReviewFilter = 'today';
let activeTimeFilter = 'today';
let exactTimeDate = '';
let activeChartPeriod = '30';
let activeTimer = TimerStorage.load();
let timerTick = null;

function migrateLegacyCatalogState() {
  const migrated = CatalogEngine.migrate({ sessions, reviews, mocks, subjects: catalog.subjects, topics: catalog.topics, subtopics: catalog.subtopics }, createId);
  sessions = migrated.sessions;
  reviews = migrated.reviews;
  mocks = migrated.mocks;
  catalog = { subjects: migrated.subjects, topics: migrated.topics, subtopics: migrated.subtopics || [] };
  if (migrated.changed) {
    StudyStorage.save(sessions);
    ReviewStorage.save(reviews);
    MockStorage.save(mocks);
    CatalogStorage.save(catalog);
  }
}

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
  const [year, month, day] = String(isoDate).slice(0, 10).split("-");
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

function getSafetyAppState() {
  return {
    sessions,
    reviews,
    mocks,
    subjects: catalog.subjects,
    topics: catalog.topics,
    subtopics: catalog.subtopics || [],
    meta: syncMeta
  };
}

function saveCompleteLocalState() {
  StudyStorage.save(sessions);
  ReviewStorage.save(reviews);
  MockStorage.save(mocks);
  CatalogStorage.save(catalog);
  SyncStorage.save(syncMeta);
  SafetyStorage.save(safetyState);
}

function captureUndo(label) {
  const previousSnapshot = safetyState.undoSnapshot;
  safetyState.undoSnapshot = {
    id: createId(),
    label,
    createdAt: Date.now(),
    state: SafetyEngine.clone(getSafetyAppState())
  };
  if (!SafetyStorage.save(safetyState)) {
    safetyState.undoSnapshot = previousSnapshot;
    showToast("Não foi possível criar a cópia automática. A ação foi cancelada.", "error");
    return false;
  }
  renderSafetyCenter();
  return true;
}

function addAuditEntry(action, label, detail = "") {
  safetyState.auditLog = [{ id: createId(), action, label, detail, createdAt: Date.now() }, ...(safetyState.auditLog || [])].slice(0, 100);
  SafetyStorage.save(safetyState);
  renderSafetyCenter();
}

function formatAuditTime(timestamp) {
  return new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" }).format(new Date(timestamp));
}

function renderSafetyCenter() {
  if (!undoLastActionButton) return;
  const snapshot = safetyState.undoSnapshot;
  undoLastActionButton.disabled = !snapshot;
  undoActionLabel.textContent = snapshot?.label || "Nenhuma ação disponível";
  undoActionTime.textContent = snapshot ? `Cópia criada em ${formatAuditTime(snapshot.createdAt)}` : "Mudanças no cadastro e exclusões criam uma cópia automática.";
  const entries = safetyState.auditLog || [];
  auditCount.textContent = entries.length;
  auditLogList.innerHTML = entries.length ? entries.slice(0, 20).map((entry) => `
    <div class="audit-item">
      <span class="audit-icon">${entry.action === "undo" ? "↶" : entry.action === "restore" ? "↥" : entry.action === "delete" ? "×" : "✓"}</span>
      <div class="audit-copy"><strong>${escapeHtml(entry.label)}</strong>${entry.detail ? `<small>${escapeHtml(entry.detail)}</small>` : ""}</div>
      <span class="audit-time">${formatAuditTime(entry.createdAt)}</span>
    </div>`).join("") : `<div class="empty-state compact"><strong>Nenhuma alteração estrutural registrada</strong><span>As próximas ações aparecerão aqui.</span></div>`;
}

function applyRestoredSafetyState(restored, auditLog = null) {
  sessions = restored.sessions;
  reviews = restored.reviews;
  mocks = restored.mocks;
  catalog = { subjects: restored.subjects, topics: restored.topics, subtopics: restored.subtopics };
  syncMeta = restored.meta;
  if (auditLog) safetyState.auditLog = auditLog.slice(0, 100);
  saveCompleteLocalState();
  renderAll();
  StudySync.run(true);
}

function undoLastStructuralAction() {
  const snapshot = safetyState.undoSnapshot;
  if (!snapshot) return;
  if (!window.confirm(`Desfazer “${snapshot.label}” e restaurar o estado anterior?`)) return;
  const restored = SafetyEngine.prepareRestore(getSafetyAppState(), snapshot.state, Date.now());
  const label = snapshot.label;
  safetyState.undoSnapshot = null;
  applyRestoredSafetyState(restored);
  addAuditEntry("undo", `Ação desfeita: ${label}`, "Os dados anteriores foram restaurados e serão sincronizados.");
  showToast("Última ação desfeita com sucesso.", "success");
}

function exportCompleteBackup() {
  const backup = SafetyEngine.createBackup(getSafetyAppState(), safetyState.auditLog, Date.now());
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `study-tracker-backup-${toISODate()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  addAuditEntry("backup", "Backup completo exportado", `${sessions.length} sessões e ${reviews.length} revisões.`);
  showToast("Backup baixado com sucesso.", "success");
}

async function importCompleteBackup(file) {
  let parsed;
  try { parsed = JSON.parse(await file.text()); }
  catch { showToast("Não foi possível ler o arquivo JSON.", "error"); return; }
  const validation = SafetyEngine.validateBackup(parsed);
  if (!validation.valid) { showToast(validation.error, "error"); return; }
  const data = validation.data;
  const questions = data.sessions.reduce((sum,item) => sum + Number(item.questions || 0), 0);
  const seconds = data.sessions.reduce((sum,item) => sum + Number(item.durationSeconds || 0), 0);
  const summary = `${data.sessions.length} sessões • ${formatDuration(seconds)} • ${formatNumber(questions)} questões • ${data.reviews.length} revisões`;
  if (!window.confirm(`Restaurar este backup?\n\n${summary}\n\nUma cópia do estado atual será criada para permitir desfazer.`)) return;
  if (!captureUndo("Restauração de backup")) return;
  const restored = SafetyEngine.prepareRestore(getSafetyAppState(), data, Date.now());
  const importedAudit = Array.isArray(data.auditLog) ? data.auditLog : [];
  applyRestoredSafetyState(restored, importedAudit);
  addAuditEntry("restore", "Backup restaurado", summary);
  showToast("Backup validado e restaurado.", "success");
}

function catalogImpactSummary(type, id) {
  const impact = SafetyEngine.getCatalogImpact(getSafetyAppState(), type, id);
  return `${impact.sessions} sessões • ${formatDuration(impact.durationSeconds)} • ${formatNumber(impact.questions)} questões • ${impact.reviews} revisões`;
}

function renderArchivedItems() {
  const subjectsById = new Map(catalog.subjects.map((item) => [item.id, item]));
  const topicsById = new Map(catalog.topics.map((item) => [item.id, item]));
  const groups = [
    { type:"subject", title:"Matérias", items:catalog.subjects.filter((item) => item.archived), path:() => "Matéria completa" },
    { type:"topic", title:"Temas", items:catalog.topics.filter((item) => item.archived), path:(item) => subjectsById.get(item.subjectId)?.name || "Matéria não encontrada" },
    { type:"subtopic", title:"Subtemas", items:(catalog.subtopics || []).filter((item) => item.archived), path:(item) => { const topic=topicsById.get(item.topicId); return `${subjectsById.get(topic?.subjectId)?.name || "Matéria"} → ${topic?.name || "Tema"}`; } }
  ];
  const validKeys = new Set(groups.flatMap((group) => group.items.map((item) => `${group.type}:${item.id}`)));
  archivedSelection = new Set([...archivedSelection].filter((key) => validKeys.has(key)));
  archivedSelectedCount.textContent = archivedSelection.size;
  archivedBulkActions.classList.toggle("hidden", !archivedSelection.size);
  const total = groups.reduce((sum,group) => sum + group.items.length, 0);
  archivedItemsList.innerHTML = total ? groups.filter((group) => group.items.length).map((group) => `
    <section class="archived-group"><strong>${group.title} (${group.items.length})</strong>${group.items.sort((a,b) => a.name.localeCompare(b.name,"pt-BR")).map((item) => `
      <div class="archived-row"><input class="archived-select" type="checkbox" data-archived-key="${group.type}:${escapeAttribute(item.id)}" aria-label="Selecionar ${escapeAttribute(item.name)}" ${archivedSelection.has(`${group.type}:${item.id}`) ? "checked" : ""}/><div><span>${escapeHtml(item.name)}</span><small>${escapeHtml(group.path(item))} • ${catalogImpactSummary(group.type,item.id)}</small></div><button class="ghost-button" type="button" data-restore-type="${group.type}" data-restore-id="${escapeAttribute(item.id)}">Restaurar</button></div>`).join("")}</section>`).join("") : `<div class="empty-state"><strong>Nenhum item arquivado</strong><span>Matérias, temas e subtemas arquivados aparecerão aqui.</span></div>`;
}

function restoreCatalogRecordInternal(type, id, now) {
  const items = type === "subject" ? catalog.subjects : type === "topic" ? catalog.topics : catalog.subtopics;
  const record = items.find((item) => item.id === id && item.archived);
  if (!record) return null;
  const restore = (item) => { item.archived = false; item.updatedAt = now; };
  if (type === "subject") {
    restore(record);
    catalog.topics.filter((item) => item.subjectId === id).forEach((topic) => { restore(topic); catalog.subtopics.filter((item) => item.topicId === topic.id).forEach(restore); });
  } else if (type === "topic") {
    restore(record);
    const subject = catalog.subjects.find((item) => item.id === record.subjectId); if (subject) restore(subject);
    catalog.subtopics.filter((item) => item.topicId === id).forEach(restore);
  } else {
    restore(record);
    const topic = catalog.topics.find((item) => item.id === record.topicId); if (topic) { restore(topic); const subject = catalog.subjects.find((item) => item.id === topic.subjectId); if (subject) restore(subject); }
  }
  return record;
}

function restoreArchivedCatalogRecord(type, id) {
  const items = type === "subject" ? catalog.subjects : type === "topic" ? catalog.topics : catalog.subtopics;
  const record = items.find((item) => item.id === id && item.archived);
  if (!record) return;
  const summary = catalogImpactSummary(type, id);
  if (!window.confirm(`Restaurar “${record.name}”?\n\n${summary}`)) return;
  if (!captureUndo(`Restauração de ${type === "subject" ? "matéria" : type === "topic" ? "tema" : "subtema"}: ${record.name}`)) return;
  restoreCatalogRecordInternal(type, id, Date.now());
  CatalogStorage.save(catalog);
  addAuditEntry("restore", `Cadastro restaurado: ${record.name}`, summary);
  renderAll();
  renderArchivedItems();
  StudySync.run(true);
  showToast("Cadastro restaurado.", "success");
}

function restoreSelectedArchivedItems() {
  const selected = [...archivedSelection].map((key) => { const separator=key.indexOf(":"); return { type:key.slice(0,separator), id:key.slice(separator+1) }; });
  if (!selected.length) return;
  const subjectIds = new Set(selected.filter((item) => item.type === "subject").map((item) => item.id));
  const topicIds = new Set(selected.filter((item) => item.type === "topic").map((item) => item.id));
  const subtopicIds = new Set(selected.filter((item) => item.type === "subtopic").map((item) => item.id));
  catalog.topics.filter((item) => subjectIds.has(item.subjectId)).forEach((item) => topicIds.add(item.id));
  catalog.subtopics.filter((item) => topicIds.has(item.topicId)).forEach((item) => subtopicIds.add(item.id));
  const affected = (item) => subjectIds.has(item.subjectId) || topicIds.has(item.topicId) || subtopicIds.has(item.subtopicId);
  const affectedSessions = sessions.filter(affected);
  const affectedReviews = reviews.filter(affected);
  const totals = { sessions:affectedSessions.length, reviews:affectedReviews.length, questions:affectedSessions.reduce((sum,item)=>sum+Number(item.questions||0),0), durationSeconds:affectedSessions.reduce((sum,item)=>sum+Number(item.durationSeconds||0),0) };
  const summary = `${totals.sessions} registros relacionados • ${formatDuration(totals.durationSeconds)} • ${formatNumber(totals.questions)} questões • ${totals.reviews} revisões`;
  if (!window.confirm(`Restaurar ${selected.length} ${selected.length === 1 ? "item selecionado" : "itens selecionados"}?\n\n${summary}\n\nUma cópia automática permitirá desfazer.`)) return;
  if (!captureUndo(`Restauração em lote de ${selected.length} item(ns)`)) return;
  const now = Date.now();
  selected.forEach((item) => restoreCatalogRecordInternal(item.type, item.id, now));
  addAuditEntry("restore", `${selected.length} cadastro(s) restaurado(s) em lote`, summary);
  archivedSelection.clear();
  CatalogStorage.save(catalog);
  renderAll();
  renderArchivedItems();
  StudySync.run(true);
  showToast("Itens restaurados com sucesso.", "success");
}

function formatToday() {
  todayDate.textContent = new Intl.DateTimeFormat("pt-BR").format(new Date());
  if (!studyDate.value) studyDate.value = toISODate();
}

function getFormValues() {
  const subjectId = studyForm.elements.subject.value;
  const topicId = studyForm.elements.topic.value;
  const subjectRecord = catalog.subjects.find((item) => item.id === subjectId);
  const topicRecord = catalog.topics.find((item) => item.id === topicId && item.subjectId === subjectId);
  const subtopicId = studyForm.elements.subtopic?.value || null;
  const subtopicRecord = catalog.subtopics.find((item) => item.id === subtopicId && item.topicId === topicId);
  const subject = subjectRecord?.name || "";
  const topic = topicRecord?.name || "";
  const subtopic = subtopicRecord?.name || "";
  const questions = Number(studyForm.elements.questions.value);
  const correct = Number(studyForm.elements.correct.value);
  const date = studyForm.elements.date.value;
  const activityType = studyForm.elements.activityType.value;
  const questionContext = activityType === "review" ? "review" : (studyForm.elements.questionContext?.value || "study");
  const hours = Number(studyForm.elements.hours.value || 0);
  const minutes = Number(studyForm.elements.minutes.value || 0);
  const manualDurationSeconds = (hours * 3600) + (minutes * 60);
  const durationSeconds = manualDurationSeconds || getTimerElapsedSeconds();

  const reviewKey = activityType === "review" ? (scheduledReviewKey || getTopicKey(subject, topic, subtopic)) : null;

  return { subjectId, topicId, subtopicId, subject, topic, subtopic, questions, correct, date, activityType, questionContext, reviewKey, durationSeconds };
}

function validateSession(data) {
  if (!data.subject) return "Informe a matéria.";
  if (!data.topic) return "Informe o tema.";
  if (!data.date) return "Informe a data do estudo.";
  const allowsNoQuestions = data.activityType === "study" && data.questionContext === "study";
  if (!Number.isInteger(data.questions) || data.questions < 0 || (!allowsNoQuestions && data.questions === 0)) {
    return allowsNoQuestions
      ? "Questões feitas deve ser um número inteiro igual ou maior que zero."
      : "Informe pelo menos uma questão para bateria independente ou revisão.";
  }
  if (!Number.isInteger(data.correct) || data.correct < 0) {
    return "Acertos deve ser um número inteiro igual ou maior que zero.";
  }
  if (data.questions === 0 && data.correct !== 0) {
    return "Sem questões feitas, a quantidade de acertos também deve ser zero.";
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
    accuracyPreview.textContent = "—";
    formHint.textContent = editingId ? "Editando registro existente." : "Sem questões, a sessão será salva sem afetar seu desempenho.";
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
  StudySync.run(true);
}

function renderHistoryFilterOptions() {
  if (!historySubjectFilter || !historyTopicFilter) return;
  const selectedSubject = historySubjectFilter.value;
  const selectedTopic = historyTopicFilter.value;
  const subjects = catalog.subjects.filter((item) => !item.archived).sort((a,b) => a.name.localeCompare(b.name,"pt-BR"));
  historySubjectFilter.innerHTML = `<option value="">Todas as matérias</option>${subjects.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</option>`).join("")}`;
  if (subjects.some((item) => item.id === selectedSubject)) historySubjectFilter.value = selectedSubject;
  const topics = catalog.topics.filter((item) => !item.archived && (!historySubjectFilter.value || item.subjectId === historySubjectFilter.value)).sort((a,b) => a.name.localeCompare(b.name,"pt-BR"));
  historyTopicFilter.innerHTML = `<option value="">Todos os temas</option>${topics.map((item) => { const subject=catalog.subjects.find((subjectItem)=>subjectItem.id===item.subjectId); return `<option value="${escapeAttribute(item.id)}">${escapeHtml(historySubjectFilter.value ? item.name : `${subject?.name || "Matéria"} → ${item.name}`)}</option>`; }).join("")}`;
  if (topics.some((item) => item.id === selectedTopic)) historyTopicFilter.value = selectedTopic;
}

function getFilteredSessions() {
  const term = searchInput.value.trim().toLowerCase();
  return sessions.filter((session) => {
    const haystack = `${session.subject || ""} ${session.topic || ""} ${session.subtopic || ""} ${session.date || ""}`.toLowerCase();
    const context = session.questionContext || (session.activityType === "review" ? "review" : "study");
    return (!term || haystack.includes(term))
      && (!historySubjectFilter?.value || session.subjectId === historySubjectFilter.value)
      && (!historyTopicFilter?.value || session.topicId === historyTopicFilter.value)
      && (!historyContextFilter?.value || context === historyContextFilter.value)
      && (!historyStartDate?.value || ReviewEngine.normalizeISODate(session.date) >= historyStartDate.value)
      && (!historyEndDate?.value || ReviewEngine.normalizeISODate(session.date) <= historyEndDate.value);
  });
}

function renderHistory() {
  const filtered = getFilteredSessions()
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt);

  if (!filtered.length) {
    historyBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="10">
          <div class="empty-state">
            <strong>${sessions.length ? "Nenhum resultado encontrado" : "Nenhuma sessão registrada"}</strong>
            <span>${sessions.length ? "Ajuste a busca, matéria, tema, contexto ou período." : "Use o formulário acima para adicionar seu primeiro estudo."}</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  historyBody.innerHTML = filtered.map((session) => {
    const hasQuestions = Number(session.questions) > 0;
    const percentage = hasQuestions ? (session.correct / session.questions) * 100 : null;
    const status = hasQuestions ? classify(percentage) : null;

    return `
      <tr>
        <td>${formatDate(session.date)}</td>
        <td>${escapeHtml(session.subject)}</td>
        <td>${escapeHtml(session.topic)}${session.subtopic ? `<span class="table-subtopic">${escapeHtml(session.subtopic)}</span>` : ""}</td>
        <td>${formatNumber(session.questions)}</td>
        <td>${formatNumber(session.correct)}</td>
        <td>${formatDuration(session.durationSeconds || 0)}</td>
        <td><span class="context-badge">${getQuestionContextLabel(session)}</span></td>
        <td><strong>${hasQuestions ? formatPercent(percentage) : "—"}</strong></td>
        <td>${status ? `<span class="badge ${status.className}">${status.label}</span>` : "—"}</td>
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
  masteredTopicsNoteEl.textContent = `${topicMap.size} tema${topicMap.size === 1 ? "" : "s"} acompanhado${topicMap.size === 1 ? "" : "s"}`;
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
    <div class="subject-row ${classify(item.percentage).className}">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${formatPercent(item.percentage)} • ${formatNumber(item.q)} questões</span>
      </div>
      <div class="progress"><i style="width:${Math.max(0, Math.min(item.percentage, 100))}%"></i></div>
    </div>
  `).join("");
}

function renderDatalists(selectedSubjectId = null, selectedTopicId = null, selectedSubtopicId = null) {
  const currentSubject = selectedSubjectId ?? subjectInput.value;
  const activeSubjects = catalog.subjects.filter((item) => !item.archived).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
  subjectInput.innerHTML = `<option value="">Selecione uma matéria</option>${activeSubjects.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</option>`).join("")}`;
  if (activeSubjects.some((item) => item.id === currentSubject)) subjectInput.value = currentSubject;
  const subjectId = subjectInput.value;
  const currentTopic = selectedTopicId ?? topicInput.value;
  const activeTopics = catalog.topics.filter((item) => !item.archived && item.subjectId === subjectId).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
  topicInput.disabled = !subjectId;
  topicInput.innerHTML = subjectId ? `<option value="">Selecione um tema</option>${activeTopics.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</option>`).join("")}` : `<option value="">Selecione primeiro a matéria</option>`;
  if (activeTopics.some((item) => item.id === currentTopic)) topicInput.value = currentTopic;
  const topicId = topicInput.value;
  const currentSubtopic = selectedSubtopicId ?? (subtopicInput?.value || "");
  const activeSubtopics = (catalog.subtopics || []).filter((item) => !item.archived && item.topicId === topicId).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
  if (subtopicInput) {
    subtopicInput.disabled = !topicId;
    subtopicInput.innerHTML = topicId ? `<option value="">Sem subtema</option>${activeSubtopics.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</option>`).join("")}` : `<option value="">Selecione primeiro o tema</option>`;
    if (activeSubtopics.some((item) => item.id === currentSubtopic)) subtopicInput.value = currentSubtopic;
  }
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
  if (todayStartTimerButton) todayStartTimerButton.textContent = running ? "▶ Cronômetro em andamento" : exists ? "▶ Continuar cronômetro" : "▶ Iniciar cronômetro";
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
  const sessionDateValue = ReviewEngine.normalizeISODate(session.date);
  if (activeTimeFilter === "exact") return Boolean(exactTimeDate) && sessionDateValue === exactTimeDate;
  if (activeTimeFilter === "all") return true;
  const sessionDate = new Date(`${sessionDateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0,0,0,0);

  if (activeTimeFilter === "today") return sessionDateValue === toISODate();

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

function getLatestSessionForTopic(subject, topic, subtopic = "") {
  return sessions
    .filter((s) => s.subject === subject && s.topic === topic && (s.subtopic || "") === (subtopic || ""))
    .sort((a,b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)[0] || null;
}

function buildSmartStudyRecommendations() {
  const topics = aggregateTopics();
  const schedule = buildReviewSchedule();

  return topics.map((topic) => {
    const review = schedule.find((r) => r.key === getTopicKey(topic.subject, topic.topic, topic.subtopic));
    const latest = getLatestSessionForTopic(topic.subject, topic.topic, topic.subtopic);
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
      subjectId: topic.subjectId || null,
      topicId: topic.topicId || null,
      subtopicId: topic.subtopicId || null,
      subject: topic.subject,
      topic: topic.topic,
      subtopic: topic.subtopic || "",
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
      <div><span>Temas/subtemas abaixo de 70%</span><strong>${weak}</strong></div>
      <div><span>Confiança do principal</span><strong>${top.confidence.label}</strong></div>
    </div>
  `;
}

function openStudyRegistration(item = null, startClock = false) {
  resetForm();
  if (item) {
    const subjectId = item.subjectId || catalog.subjects.find((entry) => entry.name === item.subject)?.id || "";
    const topicId = item.topicId || catalog.topics.find((entry) => entry.subjectId === subjectId && entry.name === item.topic)?.id || "";
    const subtopicId = item.subtopicId || catalog.subtopics.find((entry) => entry.topicId === topicId && entry.name === (item.subtopic || ""))?.id || "";
    renderDatalists(subjectId, topicId, subtopicId);
  }
  document.getElementById("registrar").scrollIntoView({ behavior:"smooth", block:"start" });
  if (startClock && !activeTimer?.running) activeTimer ? resumeTimer() : startTimer();
  window.setTimeout(() => (item ? studyForm.elements.questions : studyForm.elements.subject).focus(), 350);
}

function renderTodayDashboard() {
  if (!todayStudyTime) return;
  const today = toISODate();
  const todaySessions = sessions.filter((item) => ReviewEngine.normalizeISODate(item.date) === today);
  const seconds = todaySessions.reduce((sum,item) => sum + Number(item.durationSeconds || 0), 0);
  const goalMinutes = Math.max(15, Number(uiPreferences.dailyGoalMinutes || 120));
  const percentage = Math.min(100, Math.round((seconds / 60 / goalMinutes) * 100));
  const schedule = buildReviewSchedule();
  const overdue = schedule.filter((item) => item.status === "overdue");
  const dueToday = schedule.filter((item) => item.status === "today");
  const agenda = [...overdue, ...dueToday].slice(0, 6);
  const recommendation = buildSmartStudyRecommendations()[0] || null;
  suggestedStudyItem = recommendation;

  dailyGoalMinutesInput.value = goalMinutes;
  todayStudyTime.textContent = formatDuration(seconds);
  todayGoalProgressText.textContent = `${percentage}% da meta`;
  todayGoalProgressBar.style.width = `${percentage}%`;
  todayOverdueCount.textContent = overdue.length;
  todayOverdueNote.textContent = overdue.length ? `${overdue.length} ${overdue.length === 1 ? "revisão precisa" : "revisões precisam"} de atenção` : "Tudo em dia";
  todayDueCount.textContent = dueToday.length;
  todayDueNote.textContent = dueToday.length ? `${dueToday.length} ${dueToday.length === 1 ? "revisão prevista" : "revisões previstas"}` : "Nenhuma pendência";
  todayAgendaCount.textContent = overdue.length + dueToday.length;
  todaySummaryText.textContent = overdue.length
    ? `Você tem ${overdue.length} ${overdue.length === 1 ? "revisão atrasada" : "revisões atrasadas"}. Comece pela prioridade mais antiga.`
    : dueToday.length
      ? `Sua agenda tem ${dueToday.length} ${dueToday.length === 1 ? "revisão" : "revisões"} para hoje.`
      : percentage >= 100 ? "Meta diária concluída. Você pode adiantar uma prioridade ou encerrar o dia." : "Revisões em dia. Avance na sugestão abaixo ou registre um novo estudo.";

  todayAgendaList.innerHTML = agenda.length ? agenda.map((item) => `
    <div class="today-agenda-item ${item.status}">
      <i></i><div><strong>${escapeHtml(item.subtopic || item.topic)}</strong><small>${escapeHtml(item.subject)}${item.subtopic ? ` → ${escapeHtml(item.topic)}` : ""} • ${item.status === "overdue" ? `atrasada desde ${formatDate(item.nextDate)}` : "programada para hoje"}</small></div>
      <button class="table-button" type="button" data-review-action="complete" data-review-key="${escapeAttribute(item.key)}">Revisar</button>
    </div>`).join("") : `<div class="empty-state compact"><strong>Nenhuma revisão pendente</strong><span>Você está em dia com a agenda.</span></div>`;

  todayStudySuggestionButton.disabled = !recommendation;
  if (!recommendation) {
    todaySuggestionTitle.textContent = "Aguardando seus dados";
    todaySuggestionPath.textContent = "Registre estudos para receber uma sugestão.";
    todaySuggestionReason.textContent = "A prioridade considera revisões, desempenho e tempo sem contato.";
    return;
  }
  todaySuggestionTitle.textContent = recommendation.subtopic || recommendation.topic;
  todaySuggestionPath.textContent = `${recommendation.subject} → ${recommendation.topic}${recommendation.subtopic ? ` → ${recommendation.subtopic}` : ""}`;
  todaySuggestionReason.textContent = `${getRecommendationReason(recommendation)} • prioridade ${recommendation.score}/100`;
}

function parseLocalISODate(value) {
  const iso = ReviewEngine.normalizeISODate(value);
  return iso ? new Date(`${iso}T12:00:00`) : null;
}

function chartDaysBetween(start, end) {
  return Math.max(1, Math.round((end - start) / 86400000) + 1);
}

function getChartPeriodRange() {
  const today = new Date();
  today.setHours(12,0,0,0);
  let start = new Date(today);
  let end = new Date(today);
  let label = "Últimos 30 dias";

  if (/^\d+$/.test(activeChartPeriod)) {
    const days = Number(activeChartPeriod);
    start.setDate(end.getDate() - days + 1);
    label = `Últimos ${days} dias`;
  } else if (activeChartPeriod === "year") {
    start = new Date(today.getFullYear(), 0, 1, 12);
    label = `Ano de ${today.getFullYear()}`;
  } else if (activeChartPeriod === "365") {
    start.setFullYear(end.getFullYear() - 1);
    start.setDate(start.getDate() + 1);
    label = "Últimos 12 meses";
  } else if (activeChartPeriod === "all") {
    const dates = sessions.map((item) => parseLocalISODate(item.date)).filter(Boolean).sort((a,b) => a-b);
    start = dates[0] || new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 12);
    label = "Todo o período";
  } else if (activeChartPeriod === "custom") {
    const customStart = parseLocalISODate(chartStartDate?.value);
    const customEnd = parseLocalISODate(chartEndDate?.value);
    if (customStart && customEnd && customStart <= customEnd) {
      start = customStart;
      end = customEnd;
      label = `${formatDate(toISODate(start))} a ${formatDate(toISODate(end))}`;
    }
  }

  return { start, end, startISO: toISODate(start), endISO: toISODate(end), label };
}

function getChartGranularity(range) {
  const days = chartDaysBetween(range.start, range.end);
  if (activeChartPeriod === "90" || (activeChartPeriod === "custom" && days > 45 && days <= 180)) return "week";
  if (["year", "365", "all"].includes(activeChartPeriod) || (activeChartPeriod === "custom" && days > 180)) return "month";
  return "day";
}

function sessionsInChartRange(range) {
  return sessions.filter((item) => {
    const date = ReviewEngine.normalizeISODate(item.date);
    return date >= range.startISO && date <= range.endISO;
  });
}

function aggregateChartBucket(items, start, end, label) {
  const startISO = toISODate(start);
  const endISO = toISODate(end);
  const bucketSessions = items.filter((item) => {
    const date = ReviewEngine.normalizeISODate(item.date);
    return date >= startISO && date <= endISO;
  });
  const questions = bucketSessions.reduce((sum,item) => sum + Number(item.questions || 0), 0);
  const correct = bucketSessions.reduce((sum,item) => sum + Number(item.correct || 0), 0);
  const seconds = bucketSessions.reduce((sum,item) => sum + Number(item.durationSeconds || 0), 0);
  return { startISO, endISO, label, questions, correct, accuracy: questions ? (correct/questions)*100 : null, hours: seconds/3600 };
}

function getChartSeries(range, items, granularity) {
  const result = [];
  const cursor = new Date(range.start);
  const shortDate = new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"2-digit" });
  const shortMonth = new Intl.DateTimeFormat("pt-BR", { month:"short", year:"2-digit" });

  while (cursor <= range.end) {
    const bucketStart = new Date(cursor);
    let bucketEnd = new Date(cursor);
    let label;
    if (granularity === "month") {
      bucketEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0, 12);
      if (bucketEnd > range.end) bucketEnd = new Date(range.end);
      label = shortMonth.format(cursor).replace(" de ", "/");
      cursor.setMonth(cursor.getMonth() + 1, 1);
    } else if (granularity === "week") {
      bucketEnd.setDate(bucketEnd.getDate() + 6);
      if (bucketEnd > range.end) bucketEnd = new Date(range.end);
      label = shortDate.format(bucketStart);
      cursor.setDate(cursor.getDate() + 7);
    } else {
      label = shortDate.format(bucketStart);
      cursor.setDate(cursor.getDate() + 1);
    }
    result.push(aggregateChartBucket(items, bucketStart, bucketEnd, label));
  }
  return result;
}

function destroyChart(instance) {
  if (instance) instance.destroy();
  return null;
}

function renderCharts() {
  if (typeof Chart === "undefined") return;

  Chart.defaults.color = "#8292a6";
  Chart.defaults.font.family = 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  Chart.defaults.font.size = 10;
  Chart.defaults.borderColor = "rgba(148,169,194,.12)";

  const gridStyle = { color: "rgba(148,169,194,.09)", drawBorder: false };
  const tickStyle = { color: "#71839a", padding: 8 };
  const tooltipStyle = { backgroundColor: "#111923", borderColor: "rgba(148,169,194,.22)", borderWidth: 1, titleColor: "#f4f7fb", bodyColor: "#b8c4d2", padding: 11, displayColors: false };

  const range = getChartPeriodRange();
  const filteredSessions = sessionsInChartRange(range);
  const granularity = getChartGranularity(range);
  const series = getChartSeries(range, filteredSessions, granularity);
  const labels = series.map((d) => d.label);
  const totalQuestionsInRange = filteredSessions.reduce((sum,item) => sum + Number(item.questions || 0), 0);
  const totalCorrectInRange = filteredSessions.reduce((sum,item) => sum + Number(item.correct || 0), 0);
  const averageAccuracy = totalQuestionsInRange ? (totalCorrectInRange / totalQuestionsInRange) * 100 : null;
  const granularityLabel = granularity === "day" ? "dia" : granularity === "week" ? "semana" : "mês";

  chartPeriodSummary.textContent = `${range.label} • agrupado por ${granularityLabel}`;
  performanceChartCaption.textContent = averageAccuracy == null ? "Sem questões no período" : `Média de ${formatPercent(averageAccuracy)} em ${formatNumber(totalQuestionsInRange)} questões`;
  questionsChartTitle.textContent = `Questões por ${granularityLabel}`;
  questionsChartCaption.textContent = `${formatNumber(totalQuestionsInRange)} questões no período`;

  performanceChartInstance = destroyChart(performanceChartInstance);
  performanceChartInstance = new Chart(performanceChartEl, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Acertos (%)",
        data: series.map((d) => d.accuracy),
        tension: 0.36,
        spanGaps: true,
        borderColor: "#4f8cff",
        backgroundColor: "rgba(79,140,255,.12)",
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#75a6ff",
        pointBorderColor: "#0c1118",
        pointBorderWidth: 2,
        fill: true
      }, {
        label: "Média do período",
        data: series.map(() => averageAccuracy),
        borderColor: "rgba(239,184,79,.72)",
        borderWidth: 1,
        borderDash: [5,5],
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: { grid: { display: false }, ticks: tickStyle },
        y: { min: 0, max: 100, grid: gridStyle, ticks: { ...tickStyle, callback: (value) => `${value}%` } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          ...tooltipStyle,
          callbacks: {
            label(context) {
              if (context.datasetIndex === 1) return `Média: ${averageAccuracy == null ? "—" : formatPercent(averageAccuracy)}`;
              const point = series[context.dataIndex];
              return `${point.questions} questões • ${point.correct} acertos • ${point.accuracy == null ? "—" : formatPercent(point.accuracy)}`;
            }
          }
        }
      }
    }
  });

  const bySubject = new Map();
  filteredSessions.forEach((s) => bySubject.set(s.subject, (bySubject.get(s.subject) || 0) + Number(s.durationSeconds || 0)));
  const subjectRows = [...bySubject.entries()].filter(([,seconds]) => seconds > 0).sort((a,b) => b[1]-a[1]);
  const totalSecondsInRange = subjectRows.reduce((sum,[,seconds]) => sum + seconds, 0);
  studyHoursChartCaption.textContent = `${formatDuration(totalSecondsInRange)} em ${subjectRows.length} matéria${subjectRows.length === 1 ? "" : "s"}`;
  studyHoursChartInner.style.height = `${Math.max(310, subjectRows.length * 48)}px`;

  studyHoursChartInstance = destroyChart(studyHoursChartInstance);
  studyHoursChartInstance = new Chart(studyHoursChartEl, {
    type: "bar",
    data: {
      labels: subjectRows.map(([name]) => name),
      datasets: [{
        label: "Horas",
        data: subjectRows.map(([,seconds]) => +(seconds/3600).toFixed(2)),
        backgroundColor: "rgba(53,197,139,.72)",
        borderColor: "#35c58b",
        borderWidth: 1,
        borderRadius: 7,
        barThickness: 12
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { grid: gridStyle, ticks: tickStyle }, y: { grid: { display: false }, ticks: tickStyle } },
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipStyle, callbacks: { label: (context) => `${context.raw.toFixed(1).replace(".", ",")} horas` } }
      }
    }
  });

  questionsChartInstance = destroyChart(questionsChartInstance);
  questionsChartInstance = new Chart(questionsChartEl, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Questões",
        data: series.map((d) => d.questions),
        backgroundColor: "rgba(79,140,255,.68)",
        borderColor: "#4f8cff",
        borderWidth: 1,
        borderRadius: 7,
        maxBarThickness: 18
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { grid: { display: false }, ticks: tickStyle }, y: { beginAtZero: true, grid: gridStyle, ticks: tickStyle } },
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipStyle, callbacks: { label: (context) => `${formatNumber(context.raw)} questões` } }
      }
    }
  });

  const efficiencyRows = [...bySubject.keys()].map((subject) => {
    const items = filteredSessions.filter((s) => s.subject === subject);
    const q = items.reduce((sum,s) => sum+s.questions,0);
    const c = items.reduce((sum,s) => sum+s.correct,0);
    const seconds = items.reduce((sum,s) => sum+Number(s.durationSeconds||0),0);
    return {
      subject,
      hours: seconds/3600,
      accuracy: q ? (c/q)*100 : 0,
      questions: q,
      questionsPerHour: seconds > 0 ? q / (seconds/3600) : 0
    };
  }).filter((r) => r.hours > 0).sort((a,b) => b.questionsPerHour - a.questionsPerHour);

  const maxQuestionsPerHour = Math.max(...efficiencyRows.map((item) => item.questionsPerHour), 1);
  efficiencyChartCaption.textContent = efficiencyRows.length ? `Ranking de ${efficiencyRows.length} matéria${efficiencyRows.length === 1 ? "" : "s"} por questões/hora` : "Sem tempo e questões no período";
  efficiencyRankingEl.innerHTML = efficiencyRows.length ? efficiencyRows.map((item) => {
    const tone = classify(item.accuracy).className;
    const width = item.questionsPerHour > 0 ? Math.max(3, (item.questionsPerHour / maxQuestionsPerHour) * 100) : 0;
    return `<div class="efficiency-row ${tone}">
      <div class="efficiency-head"><strong>${escapeHtml(item.subject)}</strong><span>${item.questionsPerHour.toFixed(1).replace(".", ",")} q/h</span></div>
      <div class="efficiency-track"><i style="width:${width}%"></i></div>
      <small>${formatPercent(item.accuracy)} de acertos • ${formatDuration(item.hours * 3600)} • ${formatNumber(item.questions)} questões</small>
    </div>`;
  }).join("") : `<div class="empty-state compact"><strong>Sem dados de eficiência</strong><span>Registre tempo e questões no período selecionado.</span></div>`;
}

function getTopicKey(subject, topic, subtopic = "") {
  return `${subject}|||${topic}|||${subtopic || ""}`;
}

function getCompletedReviewsForTopic(subject, topic, subtopic = "") {
  return reviews
    .filter((r) => r.subject === subject && r.topic === topic && (r.subtopic || "") === (subtopic || ""))
    .sort((a, b) => ReviewEngine.normalizeISODate(a.date).localeCompare(ReviewEngine.normalizeISODate(b.date)) || Number(a.updatedAt || a.createdAt || 0) - Number(b.updatedAt || b.createdAt || 0));
}

function getReviewStreak(subject, topic, subtopic = "") {
  const completed = getCompletedReviewsForTopic(subject, topic, subtopic).slice().reverse();
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
    const topicReviews = getCompletedReviewsForTopic(topic.subject, topic.topic, topic.subtopic);
    const latestReview = topicReviews.length ? topicReviews[topicReviews.length - 1] : null;

    const latestStudySession = sessions
      .filter((s) => s.subject === topic.subject && s.topic === topic.topic && (s.subtopic || "") === (topic.subtopic || ""))
      .sort((a, b) => ReviewEngine.normalizeISODate(b.date).localeCompare(ReviewEngine.normalizeISODate(a.date)) || Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0))[0];

    const latestNormalStudySession = sessions
      .filter((s) => s.subject === topic.subject && s.topic === topic.topic && (s.subtopic || "") === (topic.subtopic || "") && s.activityType !== "review" && (s.questionContext || "study") === "study")
      .sort((a, b) => ReviewEngine.normalizeISODate(b.date).localeCompare(ReviewEngine.normalizeISODate(a.date)) || Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0))[0];
    const studyStartsNewCycle = ReviewEngine.shouldResetCycle(latestNormalStudySession, latestReview);

    const cycleStudySession = studyStartsNewCycle ? latestNormalStudySession : latestStudySession;
    let lastDate = cycleStudySession?.date || topic.latestDate;
    let lastPercentage = cycleStudySession
      ? (Number(cycleStudySession.questions) > 0 ? (cycleStudySession.correct / cycleStudySession.questions) * 100 : topic.percentage)
      : topic.percentage;
    let previousInterval = null;

    if (latestReview && !studyStartsNewCycle) {
      lastDate = latestReview.date;
      lastPercentage = (latestReview.correct / latestReview.questions) * 100;
      previousInterval = latestReview.nextInterval || ReviewEngine.getInitialInterval();
    }

    const streak = getReviewStreak(topic.subject, topic.topic, topic.subtopic);
    // Uma revisão concluída já possui o intervalo calculado. Renderizar o
    // dashboard nunca deve avançá-lo novamente; só uma nova revisão progride.
    const nextInterval = latestReview && !studyStartsNewCycle
      ? (latestReview.nextInterval || ReviewEngine.getInitialInterval())
      : ReviewEngine.getInitialInterval();

    const nextDate = ReviewEngine.addDays(lastDate, nextInterval);
    const status = ReviewEngine.compareDate(nextDate);

    return {
      key: getTopicKey(topic.subject, topic.topic, topic.subtopic),
      subjectId: topic.subjectId || null,
      topicId: topic.topicId || null,
      subtopicId: topic.subtopicId || null,
      subject: topic.subject,
      topic: topic.topic,
      subtopic: topic.subtopic || "",
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
          <strong>${escapeHtml(item.subtopic || item.topic)}</strong>
          <small>${escapeHtml(item.subject)}${item.subtopic ? ` • ${escapeHtml(item.topic)}` : ""} • ${formatPercent(item.lastPercentage)} • ${formatDate(item.nextDate)}</small>
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
  const [subject, topic, subtopic = ""] = key.split("|||");
  const currentStreak = getReviewStreak(subject, topic, subtopic);
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

  const [subject, topic, subtopic = ""] = reviewKey.split("|||");
  const schedule = buildReviewSchedule();
  const item = schedule.find((entry) => entry.key === reviewKey);
  const percentage = (correct / questions) * 100;
  const currentStreak = getReviewStreak(subject, topic, subtopic);
  const projectedStreak = percentage >= 90 ? currentStreak + 1 : 0;
  const previousInterval = item?.interval || null;
  const nextInterval = ReviewEngine.getNextInterval(percentage, previousInterval, projectedStreak, questions);

  const now = Date.now();
  const reviewId = createId();
  const sessionId = createId();
  reviews.push({
    id: reviewId,
    sessionId,
    reviewKey,
    subjectId: catalog.subjects.find((x) => x.name === subject)?.id || null,
    topicId: catalog.topics.find((x) => x.name === topic && x.subjectId === (catalog.subjects.find((y) => y.name === subject)?.id))?.id || null,
    subtopicId: catalog.subtopics.find((x) => x.name === subtopic && x.topicId === (catalog.topics.find((t) => t.name === topic && t.subjectId === (catalog.subjects.find((y) => y.name === subject)?.id))?.id))?.id || null,
    subject,
    topic,
    subtopic,
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
    subjectId: catalog.subjects.find((x) => x.name === subject)?.id || null,
    topicId: catalog.topics.find((x) => x.name === topic && x.subjectId === (catalog.subjects.find((y) => y.name === subject)?.id))?.id || null,
    subtopicId: catalog.subtopics.find((x) => x.name === subtopic && x.topicId === (catalog.topics.find((t) => t.name === topic && t.subjectId === (catalog.subjects.find((y) => y.name === subject)?.id))?.id))?.id || null,
    subject,
    topic,
    subtopic,
    reviewKey,
    questions,
    correct,
    date,
    activityType: "review",
    questionContext: "review",
    durationSeconds: 0,
    createdAt: now,
    updatedAt: now
  });

  ReviewStorage.save(reviews);
  StudyStorage.save(sessions);
  closeReviewModalNow();
  renderAll();
  StudySync.run(true);
  showToast(`Revisão concluída. Próxima em ${nextInterval} dia${nextInterval === 1 ? "" : "s"}.`, "success");
}

function aggregateTopics() {
  const topicMap = new Map();

  sessions.forEach((session) => {
    const key = getTopicKey(session.subject, session.topic, session.subtopic || "");
    const current = topicMap.get(key) || {
      subjectId: session.subjectId || null,
      topicId: session.topicId || null,
      subtopicId: session.subtopicId || null,
      subject: session.subject,
      topic: session.topic,
      subtopic: session.subtopic || "",
      questions: 0,
      correct: 0,
      durationSeconds: 0,
      sessions: 0,
      diagnosticQuestions: 0,
      diagnosticCorrect: 0,
      diagnosticSessions: 0,
      latestDate: session.date,
      percentages: []
    };

    current.questions += session.questions;
    current.correct += session.correct;
    current.durationSeconds += Number(session.durationSeconds || 0);
    current.sessions += 1;
    if (Number(session.questions) > 0) current.percentages.push((session.correct / session.questions) * 100);
    const context = session.questionContext || (session.activityType === "review" ? "review" : "study");
    if (context === "independent" || context === "review") {
      current.diagnosticQuestions += session.questions;
      current.diagnosticCorrect += session.correct;
      current.diagnosticSessions += 1;
    }

    if (session.date > current.latestDate) {
      current.latestDate = session.date;
    }

    topicMap.set(key, current);
  });

  return [...topicMap.values()].map((item) => {
    // A porcentagem exibida deve usar a mesma base das colunas Questões e Acertos.
    // Sessões sem questões somam tempo/estudo, mas não entram no cálculo de desempenho.
    const percentage = item.questions > 0 ? (item.correct / item.questions) * 100 : null;
    const evidenceQuestions = item.diagnosticQuestions || item.questions;
    const evidenceSessions = item.diagnosticQuestions ? item.diagnosticSessions : item.sessions;
    const confidence = getConfidence(evidenceQuestions, evidenceSessions);
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
  if (!questions || !Number.isFinite(percentage)) return { label: "Sem questões", className: "learning" };
  if (percentage >= 90 && confidence.className === "high") {
    return { label: "Manutenção", className: "maintenance" };
  }

  if (percentage >= 70 && questions >= 20) {
    return { label: "Consolidação", className: "consolidation" };
  }

  return { label: "Aprendizado", className: "learning" };
}

function getPriorityScore(percentage, confidence, questions) {
  if (!questions || !Number.isFinite(percentage)) return 0;
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
    .sort((a, b) => b.priorityScore - a.priorityScore || (a.percentage ?? 101) - (b.percentage ?? 101));

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
            <strong>Nenhum tema ou subtema analisado</strong>
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
        <span>Seu desempenho atual não indica temas ou subtemas de alta prioridade.</span>
      </div>`;
  } else {
    weakTopicsListEl.innerHTML = weakTopics.map((item) => `
      <div class="diagnostic-item">
        <div>
          <strong>${escapeHtml(item.subtopic || item.topic)}</strong>
          <small>${escapeHtml(item.subject)}${item.subtopic ? ` • ${escapeHtml(item.topic)}` : ""} • ${formatPercent(item.percentage)} • ${formatNumber(item.questions)} questões</small>
        </div>
        <span class="priority-score">${item.priorityScore}</span>
      </div>
    `).join("");
  }

  const analysisTerm = topicAnalysisSearch?.value.trim().toLowerCase() || "";
  const visibleTopics = analysisTerm
    ? topics.filter((item) => `${item.subject || ""} ${item.topic || ""} ${item.subtopic || ""}`.toLowerCase().includes(analysisTerm))
    : topics;

  if (!visibleTopics.length) {
    topicAnalysisBody.innerHTML = `
      <tr class="empty-table-row">
        <td colspan="9">
          <div class="empty-state">
            <strong>Nenhum resultado encontrado</strong>
            <span>Tente buscar outra matéria, tema ou subtema.</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  topicAnalysisBody.innerHTML = visibleTopics.map((item) => {
    const priority = getPriorityLabel(item.priorityScore);

    return `
      <tr>
        <td>${escapeHtml(item.subject)}</td>
        <td>${escapeHtml(item.topic)}${item.subtopic ? `<small class="table-subtopic"> › ${escapeHtml(item.subtopic)}</small>` : ""}</td>
        <td>${formatNumber(item.questions)}</td>
        <td>${formatNumber(item.correct)}</td>
        <td>${formatDuration(item.durationSeconds)}</td>
        <td><strong>${Number.isFinite(item.percentage) ? formatPercent(item.percentage) : "—"}</strong></td>
        <td><span class="confidence-badge ${item.confidence.className}">${item.confidence.label}</span></td>
        <td><span class="state-badge ${item.mastery.className}">${item.mastery.label}</span></td>
        <td><span class="priority-badge ${priority.className}">${priority.label}</span></td>
      </tr>
    `;
  }).join("");
}


function renderQuestionContextStats() {
  const groups = { study: {q:0,c:0}, independent: {q:0,c:0}, review: {q:0,c:0} };
  sessions.forEach((session) => {
    const key = session.questionContext || (session.activityType === "review" ? "review" : "study");
    const group = groups[key] || groups.study;
    group.q += Number(session.questions || 0); group.c += Number(session.correct || 0);
  });
  const apply = (group, accuracyEl, countEl) => { accuracyEl.textContent = group.q ? formatPercent((group.c/group.q)*100) : "—"; countEl.textContent = `${formatNumber(group.q)} questões`; };
  apply(groups.study, studyContextAccuracyEl, studyContextCountEl);
  apply(groups.independent, independentContextAccuracyEl, independentContextCountEl);
  apply(groups.review, reviewContextAccuracyEl, reviewContextCountEl);
}

function getQuestionContextLabel(session) {
  const context = session.questionContext || (session.activityType === "review" ? "review" : "study");
  return { study: "Durante o estudo", independent: "Bateria independente", review: "Revisão" }[context] || "Durante o estudo";
}

function syncQuestionContextMode() {
  if (!questionContextEl) return;
  const isReview = studyForm.elements.activityType.value === "review";
  if (isReview) questionContextEl.value = "review";
  questionContextEl.disabled = isReview;
}

function normalizeSubjectScores(value) {
  let items = value;
  if (!Array.isArray(items)) {
    if (!items) return [];
    try { items = JSON.parse(items); } catch { return []; }
  }
  if (!Array.isArray(items)) return [];
  return items.map((item) => ({
    ...item,
    score: Number(item.score),
    maxScore: Number(item.maxScore || 100)
  })).filter((item) => item.subject && Number.isFinite(item.score) && Number.isFinite(item.maxScore) && item.maxScore > 0);
}

function scorePercentage(score, maxScore) {
  const obtained = Number(score);
  const maximum = Number(maxScore);
  return Number.isFinite(obtained) && Number.isFinite(maximum) && maximum > 0 ? (obtained / maximum) * 100 : 0;
}

function formatScoreValue(value) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(Number(value) || 0);
}

function formatScoreWithPercentage(score, maxScore) {
  return `${formatScoreValue(score)} / ${formatScoreValue(maxScore)} (${formatPercent(scorePercentage(score, maxScore))})`;
}

function addMockSubjectRow(subject = "", score = "", maxScore = "", subjectId = "") {
  const row = document.createElement("div"); row.className = "mock-subject-row";
  const subjects = catalog.subjects.filter((item) => !item.archived).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
  const resolvedId = subjectId || subjects.find((item) => item.name === subject)?.id || "";
  row.innerHTML = `<select class="mock-subject-name"><option value="">Matéria</option>${subjects.map((item) => `<option value="${escapeAttribute(item.id)}" ${item.id === resolvedId ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select><input type="number" class="mock-subject-score" min="0" step="0.01" placeholder="Obtida" value="${escapeAttribute(String(score))}" /><input type="number" class="mock-subject-max-score" min="0.01" step="0.01" placeholder="Máxima" value="${escapeAttribute(String(maxScore))}" /><button type="button" class="table-button danger mock-remove-subject">Remover</button>`;
  mockSubjectRows.appendChild(row);
}

function getMockFormValues() {
  const subjectScores = [...mockSubjectRows.querySelectorAll(".mock-subject-row")].map((row) => {
    const subjectId = row.querySelector(".mock-subject-name").value;
    return { subjectId, subject: catalog.subjects.find((item) => item.id === subjectId)?.name || "",
    score: Number(row.querySelector(".mock-subject-score").value),
    maxScore: Number(row.querySelector(".mock-subject-max-score").value) };
  }).filter((item) => item.subject || Number.isFinite(item.score) || Number.isFinite(item.maxScore));
  return { name: mockForm.elements.name.value.trim(), date: mockForm.elements.date.value, overallScore: Number(mockForm.elements.overallScore.value), overallMaxScore: Number(mockForm.elements.overallMaxScore.value), subjectScores };
}

function resetMockForm() {
  editingMockId = null;
  mockForm.reset();
  mockDate.value = toISODate();
  mockSubjectRows.innerHTML = "";
  addMockSubjectRow();
  saveMockButton.textContent = "Salvar simulado";
  cancelMockEditButton.classList.add("hidden");
}

function renderMockFilter() {
  const current = mockChartFilter.value || "overall";
  const subjects = [...new Set(mocks.flatMap((mock) => normalizeSubjectScores(mock.subjectScores).map((item) => item.subject)))].sort((a,b) => a.localeCompare(b, "pt-BR"));
  mockChartFilter.innerHTML = `<option value="overall">Nota geral</option>${subjects.map((subject) => `<option value="${escapeAttribute(subject)}">${escapeHtml(subject)}</option>`).join("")}`;
  if (["overall", ...subjects].includes(current)) mockChartFilter.value = current;
}

function renderMockSubjectOptions() {
  const activeSubjects = catalog.subjects.filter((item) => !item.archived).sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  mockSubjectRows.querySelectorAll(".mock-subject-name").forEach((select) => {
    const current = select.value;
    select.innerHTML = `<option value="">Matéria</option>${activeSubjects.map((item) => `<option value="${escapeAttribute(item.id)}">${escapeHtml(item.name)}</option>`).join("")}`;
    if (activeSubjects.some((item) => item.id === current)) select.value = current;
  });
}

function renderMockChart() {
  if (typeof Chart === "undefined") return;
  const filter = mockChartFilter.value || "overall";
  const ordered = [...mocks].sort((a,b) => a.date.localeCompare(b.date) || Number(a.createdAt)-Number(b.createdAt));
  const points = ordered.map((mock) => {
    if (filter === "overall") {
      const maxScore = Number(mock.overallMaxScore || 100);
      return { label: formatDate(mock.date), value: scorePercentage(mock.overallScore, maxScore), score: Number(mock.overallScore), maxScore, name: mock.name };
    }
    const found = normalizeSubjectScores(mock.subjectScores).find((item) => item.subject === filter);
    return found ? { label: formatDate(mock.date), value: scorePercentage(found.score, found.maxScore), score: found.score, maxScore: found.maxScore, name: mock.name } : null;
  }).filter(Boolean);
  mockEvolutionChartInstance = destroyChart(mockEvolutionChartInstance);
  mockEvolutionChartInstance = new Chart(mockEvolutionChartEl, {
    type: "line",
    data: { labels: points.map((p) => p.label), datasets: [{ label: filter === "overall" ? "Aproveitamento geral" : `Aproveitamento — ${filter}`, data: points.map((p) => p.value), tension: .3, spanGaps: true }] },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 100, ticks: { callback: (value) => `${value}%` } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label(context) { const p = points[context.dataIndex]; return `${p.name}: ${formatScoreWithPercentage(p.score, p.maxScore)}`; } } } } }
  });
}

function renderMocks() {
  if (!mockForm) return;
  renderMockSubjectOptions();
  renderMockFilter();
  const ordered = [...mocks].sort((a,b) => b.date.localeCompare(a.date) || Number(b.createdAt)-Number(a.createdAt));
  mockCountEl.textContent = formatNumber(mocks.length);
  mockLatestScoreEl.textContent = ordered.length ? formatScoreWithPercentage(ordered[0].overallScore, ordered[0].overallMaxScore || 100) : "—";
  const best = ordered.length ? [...ordered].sort((a,b) => scorePercentage(b.overallScore, b.overallMaxScore || 100) - scorePercentage(a.overallScore, a.overallMaxScore || 100))[0] : null;
  mockBestScoreEl.textContent = best ? formatScoreWithPercentage(best.overallScore, best.overallMaxScore || 100) : "—";
  if (!ordered.length) {
    mockHistoryBody.innerHTML = `<tr class="empty-table-row"><td colspan="5"><div class="empty-state"><strong>Nenhum simulado registrado</strong><span>Adicione seu primeiro resultado para acompanhar a evolução.</span></div></td></tr>`;
  } else {
    mockHistoryBody.innerHTML = ordered.map((mock) => {
      const scores = normalizeSubjectScores(mock.subjectScores);
      const maxScore = Number(mock.overallMaxScore || 100);
      const subjectSummary = scores.length ? scores.map((item) => `${escapeHtml(item.subject)}: ${escapeHtml(formatScoreWithPercentage(item.score, item.maxScore))}`).join("<br>") : "—";
      return `<tr><td>${formatDate(mock.date)}</td><td>${escapeHtml(mock.name)}</td><td><strong>${escapeHtml(formatScoreWithPercentage(mock.overallScore, maxScore))}</strong></td><td>${subjectSummary}</td><td><div class="row-actions"><button class="table-button" data-mock-action="edit" data-id="${mock.id}">Editar</button><button class="table-button danger" data-mock-action="delete" data-id="${mock.id}">Excluir</button></div></td></tr>`;
    }).join("");
  }
  renderMockChart();
}

function editMock(id) {
  const mock = mocks.find((item) => item.id === id); if (!mock) return;
  editingMockId = id;
  mockForm.elements.name.value = mock.name;
  mockForm.elements.date.value = mock.date;
  mockForm.elements.overallScore.value = mock.overallScore;
  mockForm.elements.overallMaxScore.value = mock.overallMaxScore || 100;
  mockSubjectRows.innerHTML = "";
  const scores = normalizeSubjectScores(mock.subjectScores);
  (scores.length ? scores : [{subject:"",score:"",maxScore:""}]).forEach((item) => addMockSubjectRow(item.subject, item.score, item.maxScore, item.subjectId || ""));
  saveMockButton.textContent = "Atualizar simulado";
  cancelMockEditButton.classList.remove("hidden");
  document.getElementById("simulados").scrollIntoView({behavior:"smooth", block:"start"});
}

function deleteMock(id) {
  const mock = mocks.find((item) => item.id === id); if (!mock) return;
  if (!window.confirm(`Excluir o simulado “${mock.name}”?\n\nA nota geral e as notas por matéria serão removidas. Uma cópia automática permitirá desfazer.`)) return;
  if (!captureUndo(`Exclusão de simulado: ${mock.name}`)) return;
  const deletedAt = Date.now();
  syncMeta.mockTombstones = syncMeta.mockTombstones || {};
  syncMeta.mockTombstones[id] = deletedAt;
  mocks = mocks.filter((item) => item.id !== id);
  MockStorage.save(mocks); SyncStorage.save(syncMeta); addAuditEntry("delete", `Simulado excluído: ${mock.name}`, "A exclusão pode ser desfeita pela central de segurança."); renderAll(); StudySync.run(true); showToast("Simulado excluído.", "success");
}

function normalizeCatalogName(value) { return CatalogEngine.normalizeName(value); }
function saveUiPreferences() { UiStorage.save(uiPreferences); }
function renderCatalogBulkActions() {
  const activeIds = new Set(catalog.topics.filter((item) => !item.archived).map((item) => item.id));
  catalogTopicSelection = new Set([...catalogTopicSelection].filter((id) => activeIds.has(id)));
  catalogSelectedCount.textContent = catalogTopicSelection.size;
  catalogBulkActions.classList.toggle("hidden", !catalogTopicSelection.size);
  mergeSelectedTopicsButton.disabled = catalogTopicSelection.size < 2;
}

function renderCatalog() {
  if (!catalogList) return;
  const allSubjects = [...catalog.subjects].filter((x) => !x.archived).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
  const term = (catalogSearch?.value || "").trim().toLocaleLowerCase("pt-BR");
  catalogSubjectCount.textContent = allSubjects.length;
  renderCatalogBulkActions();
  if (!allSubjects.length) { catalogList.innerHTML = `<div class="empty-state"><strong>Nenhuma matéria cadastrada</strong><span>Cadastre sua primeira matéria e depois adicione os temas.</span></div>`; return; }
  const subjects = allSubjects.filter((subject) => {
    if (!term || subject.name.toLocaleLowerCase("pt-BR").includes(term)) return true;
    const topicIds = new Set(catalog.topics.filter((topic) => topic.subjectId === subject.id).map((topic) => topic.id));
    return catalog.topics.some((topic) => topic.subjectId === subject.id && topic.name.toLocaleLowerCase("pt-BR").includes(term))
      || catalog.subtopics.some((subtopic) => topicIds.has(subtopic.topicId) && subtopic.name.toLocaleLowerCase("pt-BR").includes(term));
  });
  if (!subjects.length) { catalogList.innerHTML = `<div class="empty-state catalog-no-results"><strong>Nenhum cadastro encontrado</strong><span>Tente pesquisar outro nome de matéria, tema ou subtema.</span></div>`; return; }
  catalogList.innerHTML = subjects.map((subject) => {
    const subjectMatches = term && subject.name.toLocaleLowerCase("pt-BR").includes(term);
    const allTopics = catalog.topics.filter((x) => x.subjectId === subject.id && !x.archived).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
    const topics = !term || subjectMatches ? allTopics : allTopics.filter((topic) => topic.name.toLocaleLowerCase("pt-BR").includes(term) || catalog.subtopics.some((subtopic) => subtopic.topicId === topic.id && subtopic.name.toLocaleLowerCase("pt-BR").includes(term)));
    const recoverableMerge = CatalogEngine.findLatestMerge({ sessions, reviews, topics: catalog.topics }, subject.id);
    const subjectOpen = term || uiPreferences.openSubjects.includes(subject.id);
    return `<details class="catalog-subject" data-subject-id="${escapeAttribute(subject.id)}" ${subjectOpen ? "open" : ""}>
      <summary class="catalog-subject-head"><div><strong>${escapeHtml(subject.name)}</strong><small>${allTopics.length} tema${allTopics.length===1?"":"s"}</small></div><div class="catalog-actions">${recoverableMerge ? `<button type="button" class="table-button" data-catalog-action="correct-merge">Corrigir última junção</button>` : ""}${allTopics.length > 1 ? `<button type="button" class="table-button" data-catalog-action="merge-topics">Mesclar temas</button>` : ""}<button type="button" class="table-button" data-catalog-action="rename-subject">Renomear</button><button type="button" class="table-button danger" data-catalog-action="archive-subject">Arquivar</button></div></summary>
      <div class="catalog-subject-body">
        <div class="catalog-topics">${topics.map((topic)=>{
          const allSubtopics=(catalog.subtopics||[]).filter((x)=>x.topicId===topic.id&&!x.archived).sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
          const topicMatches = term && topic.name.toLocaleLowerCase("pt-BR").includes(term);
          const subtopics = !term || subjectMatches || topicMatches ? allSubtopics : allSubtopics.filter((sub)=>sub.name.toLocaleLowerCase("pt-BR").includes(term));
          const topicOpen = term || uiPreferences.openTopics.includes(topic.id);
          return `<details class="catalog-topic" data-topic-id="${escapeAttribute(topic.id)}" ${topicOpen ? "open" : ""}><summary><input class="catalog-select" type="checkbox" data-topic-select="${escapeAttribute(topic.id)}" aria-label="Selecionar tema ${escapeAttribute(topic.name)}" ${catalogTopicSelection.has(topic.id) ? "checked" : ""}/><span class="catalog-topic-title"><strong>${escapeHtml(topic.name)}</strong><small>${allSubtopics.length} subtema${allSubtopics.length===1?"":"s"}</small></span><div><button type="button" class="table-button" data-catalog-action="rename-topic">Renomear</button><button type="button" class="table-button danger" data-catalog-action="archive-topic">Arquivar</button></div></summary><div class="catalog-subtopic-body"><div class="catalog-subtopics">${subtopics.map((sub)=>`<div class="catalog-subtopic" data-subtopic-id="${escapeAttribute(sub.id)}"><span>${escapeHtml(sub.name)}</span><div><button type="button" class="table-button" data-catalog-action="rename-subtopic">Renomear</button><button type="button" class="table-button danger" data-catalog-action="archive-subtopic">Arquivar</button></div></div>`).join("") || `<small class="catalog-empty-topic">${term ? "Nenhum subtema corresponde à pesquisa." : "Nenhum subtema — opcional."}</small>`}</div><form class="subtopic-catalog-form"><input name="name" maxlength="160" placeholder="Adicionar subtema (opcional)" /><button class="ghost-button" type="submit">+ Subtema</button></form></div></details>`;
        }).join("") || `<small class="catalog-empty-topic">Nenhum tema ainda.</small>`}</div>
        <form class="topic-catalog-form"><input name="name" maxlength="160" placeholder="Adicionar tema" required /><button class="ghost-button" type="submit">+ Tema</button></form>
      </div></details>`;
  }).join("");
}
function catalogNameExists(items, name, predicate = () => true, exceptId = null) { const n=normalizeCatalogName(name).toLocaleLowerCase("pt-BR"); return items.some((x)=>x.id!==exceptId && predicate(x) && !x.archived && normalizeCatalogName(x.name).toLocaleLowerCase("pt-BR")===n); }
function saveCatalogAndRefresh(message) { CatalogStorage.save(catalog); renderAll(); StudySync.run(true); if(message) showToast(message,"success"); }
function renameCatalogRecord(type, id) {
  const items = type === "subject" ? catalog.subjects : type === "topic" ? catalog.topics : catalog.subtopics;
  const record = items.find((item) => item.id === id);
  if (!record) return;
  pendingCatalogRename = { type, id };
  catalogRenameTitle.textContent = `Renomear ${type === "subject" ? "matéria" : type === "topic" ? "tema" : "subtema"}`;
  catalogRenameForm.elements.name.value = record.name;
  catalogRenameModal.classList.remove("hidden");
  window.setTimeout(() => catalogRenameForm.elements.name.focus(), 50);
}

function applyCatalogRename(type, id, requestedName) {
  const items = type === "subject" ? catalog.subjects : type === "topic" ? catalog.topics : catalog.subtopics;
  const record = items.find((item) => item.id === id);
  if (!record) return;
  const name = normalizeCatalogName(requestedName);
  if (!name || name === record.name) return;
  const duplicate = catalogNameExists(items, name, type === "topic" ? (item) => item.subjectId === record.subjectId : type === "subtopic" ? (item) => item.topicId === record.topicId : () => true, id);
  if (duplicate) { showToast("Já existe um cadastro com esse nome.", "error"); return; }
  const previousName = record.name;
  if (!captureUndo(`Renomeação de ${previousName}`)) return;
  const now = Date.now();
  record.name = name;
  record.updatedAt = now;
  sessions = sessions.map((session) => {
    if (type === "subject" && session.subjectId === id) return { ...session, subject: name, reviewKey: session.reviewKey ? getTopicKey(name, session.topic, session.subtopic || "") : session.reviewKey, updatedAt: now };
    if (type === "topic" && session.topicId === id) return { ...session, topic: name, reviewKey: session.reviewKey ? getTopicKey(session.subject, name, session.subtopic || "") : session.reviewKey, updatedAt: now };
    if (type === "subtopic" && session.subtopicId === id) return { ...session, subtopic: name, reviewKey: session.reviewKey ? getTopicKey(session.subject, session.topic, name) : session.reviewKey, updatedAt: now };
    return session;
  });
  reviews = reviews.map((review) => type === "subject" && review.subjectId === id
    ? { ...review, subject: name, reviewKey: getTopicKey(name, review.topic, review.subtopic || ""), updatedAt: now }
    : type === "topic" && review.topicId === id
      ? { ...review, topic: name, reviewKey: getTopicKey(review.subject, name, review.subtopic || ""), updatedAt: now }
      : type === "subtopic" && review.subtopicId === id
        ? { ...review, subtopic: name, reviewKey: getTopicKey(review.subject, review.topic, name), updatedAt: now }
        : review);
  if (type === "subject") {
    mocks = mocks.map((mock) => {
      const scores = normalizeSubjectScores(mock.subjectScores);
      if (!scores.some((score) => score.subjectId === id)) return mock;
      return { ...mock, subjectScores: JSON.stringify(scores.map((score) => score.subjectId === id ? { ...score, subject: name } : score)), updatedAt: now };
    });
  }
  StudyStorage.save(sessions);
  ReviewStorage.save(reviews);
  MockStorage.save(mocks);
  addAuditEntry("rename", `${type === "subject" ? "Matéria" : type === "topic" ? "Tema" : "Subtema"} renomeado`, `${previousName} → ${name}`);
  saveCatalogAndRefresh("Nome atualizado.");
}

function closeCatalogRenameNow() {
  pendingCatalogRename = null;
  catalogRenameForm.reset();
  catalogRenameModal.classList.add("hidden");
}

function getSelectedMergeSourceIds() {
  return [...catalogMergeSources.querySelectorAll('input[name="sourceTopicId"]:checked')].map((input) => input.value);
}

function updateCatalogMergeSummary() {
  if (!pendingCatalogMergeSubjectId) return;
  const sourceIds = new Set(getSelectedMergeSourceIds());
  const affectedSessions = sessions.filter((item) => sourceIds.has(item.topicId));
  const affectedReviews = reviews.filter((item) => sourceIds.has(item.topicId));
  const seconds = affectedSessions.reduce((sum, item) => sum + Number(item.durationSeconds || 0), 0);
  const questions = affectedSessions.reduce((sum, item) => sum + Number(item.questions || 0), 0);
  const selectedTarget = catalogMergeForm.elements.targetTopicId;
  const targetName = selectedTarget.value === "__new__" ? normalizeCatalogName(catalogMergeForm.elements.newTargetName.value) || "novo tema geral" : selectedTarget.options[selectedTarget.selectedIndex]?.text || "tema escolhido";
  catalogMergeSummary.innerHTML = sourceIds.size
    ? `<strong>${sourceIds.size} tema${sourceIds.size === 1 ? "" : "s"}</strong> será reunido em <strong>${escapeHtml(targetName)}</strong> • ${affectedSessions.length} sessões • ${formatDuration(seconds)} • ${formatNumber(questions)} questões • ${affectedReviews.length} revisões`
    : "Selecione ao menos um tema para incorporar.";
}

function renderCatalogMergeSources() {
  const subjectId = pendingCatalogMergeSubjectId;
  const targetTopicId = catalogMergeForm.elements.targetTopicId.value;
  const creatingNewTarget = targetTopicId === "__new__";
  catalogMergeNewTarget.hidden = !creatingNewTarget;
  catalogMergeForm.elements.newTargetName.required = creatingNewTarget;
  const selected = new Set(getSelectedMergeSourceIds());
  const topics = catalog.topics.filter((item) => item.subjectId === subjectId && !item.archived && (creatingNewTarget || item.id !== targetTopicId)).sort((a,b) => a.name.localeCompare(b.name,"pt-BR"));
  catalogMergeSources.innerHTML = topics.map((topic) => `<label class="merge-source-option"><input type="checkbox" name="sourceTopicId" value="${escapeAttribute(topic.id)}" ${selected.has(topic.id) ? "checked" : ""}/><span>${escapeHtml(topic.name)}</span></label>`).join("") || `<small class="catalog-empty-topic">Não há outro tema disponível.</small>`;
  updateCatalogMergeSummary();
}

function openCatalogMerge(subjectId) {
  const subject = catalog.subjects.find((item) => item.id === subjectId && !item.archived);
  const topics = catalog.topics.filter((item) => item.subjectId === subjectId && !item.archived).sort((a,b) => a.name.localeCompare(b.name,"pt-BR"));
  if (!subject || topics.length < 2) { showToast("É necessário ter ao menos dois temas ativos.", "error"); return; }
  pendingCatalogMergeSubjectId = subjectId;
  catalogMergeTitle.textContent = `Mesclar temas de ${subject.name}`;
  catalogMergeForm.elements.targetTopicId.innerHTML = `<option value="__new__">+ Criar um novo tema geral</option>${topics.map((topic) => `<option value="${escapeAttribute(topic.id)}">${escapeHtml(topic.name)}</option>`).join("")}`;
  renderCatalogMergeSources();
  catalogMergeModal.classList.remove("hidden");
}

function closeCatalogMergeNow() {
  pendingCatalogMergeSubjectId = null;
  catalogMergeForm.reset();
  catalogMergeSources.innerHTML = "";
  catalogMergeModal.classList.add("hidden");
}

function applyCatalogTopicMerge(subjectId, targetTopicId, sourceTopicIds) {
  const merged = CatalogEngine.mergeTopics({ sessions, reviews, subjects: catalog.subjects, topics: catalog.topics, subtopics: catalog.subtopics || [] }, { subjectId, targetTopicId, sourceTopicIds, timestamp: Date.now() });
  if (!merged.changed) { showToast("Selecione ao menos um tema válido.", "error"); return false; }
  sessions = merged.sessions;
  reviews = merged.reviews;
  catalog = { subjects: merged.subjects, topics: merged.topics, subtopics: merged.subtopics };
  StudyStorage.save(sessions);
  ReviewStorage.save(reviews);
  const targetName = catalog.topics.find((item) => item.id === targetTopicId)?.name || "tema escolhido";
  addAuditEntry("merge", `${merged.summary.mergedTopicIds.length} tema(s) mesclado(s)`, `Destino: ${targetName} • ${merged.summary.movedSessions} sessões • ${merged.summary.movedReviews} revisões`);
  saveCatalogAndRefresh(`${merged.summary.mergedTopicIds.length} tema${merged.summary.mergedTopicIds.length === 1 ? " incorporado" : "s incorporados"} sem perder o histórico.`);
  return true;
}

function openCatalogMergeCorrection(subjectId) {
  const correction = CatalogEngine.findLatestMerge({ sessions, reviews, topics: catalog.topics }, subjectId);
  if (!correction) { showToast("Não foi possível identificar uma junção recente para corrigir.", "error"); return; }
  pendingCatalogMergeCorrection = correction;
  catalogMergeCorrectionSummary.innerHTML = `<strong>${correction.sourceTopicNames.length} tema${correction.sourceTopicNames.length === 1 ? "" : "s"}</strong> foi incorporado em <strong>${escapeHtml(correction.targetTopicName)}</strong> • ${correction.movedSessions} sessões • ${correction.movedReviews} revisões`;
  catalogMergeCorrectionModal.classList.remove("hidden");
  window.setTimeout(() => catalogMergeCorrectionForm.elements.newTopicName.focus(), 50);
}

function closeCatalogMergeCorrectionNow() {
  pendingCatalogMergeCorrection = null;
  catalogMergeCorrectionForm.reset();
  catalogMergeCorrectionModal.classList.add("hidden");
}

function applyCatalogMergeCorrection(subjectId, newTopicName) {
  const corrected = CatalogEngine.redirectLatestMerge({ sessions, reviews, subjects: catalog.subjects, topics: catalog.topics, subtopics: catalog.subtopics || [] }, { subjectId, newTopicName, createId, timestamp: Date.now() });
  if (!corrected.changed) {
    showToast(corrected.error === "DUPLICATE_TOPIC" ? "Já existe um tema ativo com esse nome." : "Não foi possível recuperar essa junção.", "error");
    return false;
  }
  if (!captureUndo("Correção da última junção")) return false;
  sessions = corrected.sessions;
  reviews = corrected.reviews;
  catalog = { subjects: corrected.subjects, topics: corrected.topics, subtopics: corrected.subtopics };
  StudyStorage.save(sessions);
  ReviewStorage.save(reviews);
  addAuditEntry("merge", "Última junção corrigida", `${corrected.summary.movedSessions} sessões e ${corrected.summary.movedReviews} revisões transferidas para ${corrected.summary.newTopicName}.`);
  saveCatalogAndRefresh(`Junção corrigida: registros transferidos para ${corrected.summary.newTopicName}.`);
  return true;
}
function archiveCatalogRecord(type,id){
  const items=type==="subject"?catalog.subjects:type==="topic"?catalog.topics:catalog.subtopics;
  const record=items.find((x)=>x.id===id); if(!record)return;
  const summary=catalogImpactSummary(type,id);
  const msg=`Arquivar “${record.name}”?\n\nImpacto preservado: ${summary}\n\nNada será apagado e uma cópia automática permitirá desfazer.`; if(!window.confirm(msg))return;
  if (!captureUndo(`Arquivamento de ${record.name}`)) return;
  const now=Date.now(); record.archived=true;record.updatedAt=now;
  if(type==="subject") { catalog.topics.filter((x)=>x.subjectId===id).forEach((x)=>{x.archived=true;x.updatedAt=now;(catalog.subtopics||[]).filter((s)=>s.topicId===x.id).forEach((s)=>{s.archived=true;s.updatedAt=now;});}); }
  if(type==="topic") (catalog.subtopics||[]).filter((x)=>x.topicId===id).forEach((x)=>{x.archived=true;x.updatedAt=now;});
  addAuditEntry("archive", `Cadastro arquivado: ${record.name}`, summary);
  saveCatalogAndRefresh("Cadastro arquivado sem apagar o histórico.");
}

function getSelectedTopicImpact(topicIds) {
  const ids = new Set(topicIds);
  const affectedSessions = sessions.filter((item) => ids.has(item.topicId));
  const affectedReviews = reviews.filter((item) => ids.has(item.topicId));
  return {
    sessions: affectedSessions.length,
    reviews: affectedReviews.length,
    questions: affectedSessions.reduce((sum,item) => sum + Number(item.questions || 0), 0),
    durationSeconds: affectedSessions.reduce((sum,item) => sum + Number(item.durationSeconds || 0), 0)
  };
}

function archiveSelectedTopics() {
  const selected = catalog.topics.filter((item) => catalogTopicSelection.has(item.id) && !item.archived);
  if (!selected.length) return;
  const impact = getSelectedTopicImpact(selected.map((item) => item.id));
  const summary = `${impact.sessions} sessões • ${formatDuration(impact.durationSeconds)} • ${formatNumber(impact.questions)} questões • ${impact.reviews} revisões`;
  if (!window.confirm(`Arquivar ${selected.length} ${selected.length === 1 ? "tema selecionado" : "temas selecionados"}?\n\nImpacto preservado: ${summary}\n\nNada será apagado e uma cópia automática permitirá desfazer.`)) return;
  if (!captureUndo(`Arquivamento em lote de ${selected.length} tema(s)`)) return;
  const now = Date.now();
  selected.forEach((topic) => {
    topic.archived = true;
    topic.updatedAt = now;
    catalog.subtopics.filter((item) => item.topicId === topic.id).forEach((item) => { item.archived = true; item.updatedAt = now; });
  });
  addAuditEntry("archive", `${selected.length} tema(s) arquivado(s) em lote`, summary);
  catalogTopicSelection.clear();
  saveCatalogAndRefresh("Temas arquivados sem apagar o histórico.");
}

function mergeSelectedTopics() {
  const selected = catalog.topics.filter((item) => catalogTopicSelection.has(item.id) && !item.archived);
  if (selected.length < 2) { showToast("Selecione pelo menos dois temas.", "error"); return; }
  const subjectIds = new Set(selected.map((item) => item.subjectId));
  if (subjectIds.size !== 1) { showToast("Para mesclar, selecione temas da mesma matéria.", "error"); return; }
  openCatalogMerge(selected[0].subjectId);
  catalogMergeForm.elements.targetTopicId.value = selected[0].id;
  renderCatalogMergeSources();
  const sources = new Set(selected.slice(1).map((item) => item.id));
  catalogMergeSources.querySelectorAll('input[name="sourceTopicId"]').forEach((input) => { input.checked = sources.has(input.value); });
  updateCatalogMergeSummary();
}

function renderAll() {
  renderHistoryFilterOptions();
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
  renderQuestionContextStats();
  renderMocks();
  renderCatalog();
  renderDatalists();
  renderSafetyCenter();
  renderTodayDashboard();
}

function resetForm() {
  editingId = null;
  scheduledReviewKey = null;
  studyForm.reset();
  studyDate.value = toISODate();
  saveStudyButton.textContent = "Salvar sessão";
  cancelEditButton.classList.add("hidden");
  accuracyPreview.textContent = "0%";
  formHint.textContent = "Preencha os dados da sessão.";
  syncQuestionContextMode();
  renderDatalists();
}

function startScheduledReview(reviewKey) {
  const item = buildReviewSchedule().find((entry) => entry.key === reviewKey);
  if (!item) {
    showToast("Não foi possível localizar essa revisão.", "error");
    return;
  }

  resetForm();
  scheduledReviewKey = reviewKey;
  const reviewType = studyForm.querySelector('input[name="activityType"][value="review"]');
  if (reviewType) reviewType.checked = true;
  const subjectId = item.subjectId || catalog.subjects.find((x) => x.name === item.subject)?.id || "";
  const topicId = item.topicId || catalog.topics.find((x) => x.subjectId === subjectId && x.name === item.topic)?.id || "";
  renderDatalists(subjectId, topicId, item.subtopicId || "");
  studyForm.elements.date.value = toISODate();
  syncQuestionContextMode();
  saveStudyButton.textContent = "Concluir revisão";
  formHint.textContent = `${ReviewEngine.getStatusLabel(item.status)} • prevista para ${formatDate(item.nextDate)}. Informe questões, acertos e tempo; ao salvar, a próxima revisão será calculada automaticamente.`;
  updateAccuracyPreview();
  document.getElementById("registrar").scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => studyForm.elements.questions.focus(), 250);
}

function startEdit(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;

  editingId = id;
  scheduledReviewKey = session.activityType === "review" ? (session.reviewKey || getTopicKey(session.subject, session.topic, session.subtopic || "")) : null;
  const subjectId = session.subjectId || catalog.subjects.find((x) => x.name === session.subject)?.id || "";
  const topicId = session.topicId || catalog.topics.find((x) => x.subjectId === subjectId && x.name === session.topic)?.id || "";
  renderDatalists(subjectId, topicId, session.subtopicId || "");
  studyForm.elements.questions.value = session.questions;
  studyForm.elements.correct.value = session.correct;
  studyForm.elements.date.value = session.date;
  const typeInput = studyForm.querySelector(`input[name="activityType"][value="${session.activityType || "study"}"]`);
  if (typeInput) typeInput.checked = true;
  if (studyForm.elements.questionContext) studyForm.elements.questionContext.value = session.questionContext || (session.activityType === "review" ? "review" : "study");
  syncQuestionContextMode();
  studyForm.elements.hours.value = Math.floor((session.durationSeconds || 0) / 3600) || "";
  studyForm.elements.minutes.value = Math.floor(((session.durationSeconds || 0) % 3600) / 60) || "";

  saveStudyButton.textContent = "Atualizar sessão";
  cancelEditButton.classList.remove("hidden");
  formHint.textContent = "Editando registro existente.";
  updateAccuracyPreview();
  document.getElementById("registrar").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteSession(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;

  const linkedReviews = reviews.filter((item) => item.sessionId === id);
  const ok = window.confirm(`Excluir o registro “${session.subject} → ${session.topic}${session.subtopic ? ` → ${session.subtopic}` : ""}”?\n\n${formatDuration(session.durationSeconds || 0)} • ${formatNumber(session.questions || 0)} questões • ${linkedReviews.length} ${linkedReviews.length === 1 ? "revisão vinculada" : "revisões vinculadas"}\n\nUma cópia automática permitirá desfazer.`);
  if (!ok) return;

  if (!captureUndo(`Exclusão de sessão: ${session.subject} → ${session.topic}`)) return;
  const deletedAt = Date.now();
  sessions = sessions.filter((item) => item.id !== id);
  syncMeta.sessionTombstones[id] = deletedAt;
  if (linkedReviews.length) {
    linkedReviews.forEach((item) => { syncMeta.reviewTombstones[item.id] = deletedAt; });
    reviews = reviews.filter((item) => item.sessionId !== id);
    ReviewStorage.save(reviews);
  }
  SyncStorage.save(syncMeta);

  if (editingId === id) resetForm();
  addAuditEntry("delete", `Sessão excluída: ${session.subject} → ${session.topic}`, `${formatDuration(session.durationSeconds || 0)} • ${formatNumber(session.questions || 0)} questões`);
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
    .filter((item) => item.sessionId !== session.id && item.subject === session.subject && item.topic === session.topic && (item.subtopic || "") === (session.subtopic || ""))
    .sort((a, b) => b.date.localeCompare(a.date) || Number(b.createdAt) - Number(a.createdAt));
  const previousInterval = priorReviews[0]?.nextInterval || null;
  const percentage = (session.correct / session.questions) * 100;
  const streak = priorReviews.slice(0, 2).every((item) => (item.correct / item.questions) * 100 >= 90)
    ? Math.min(2, priorReviews.length) + 1
    : percentage >= 90 ? 1 : 0;
  const nextInterval = ReviewEngine.getNextInterval(percentage, previousInterval, streak, session.questions);
  const now = Date.now();
  const record = {
    id: existing?.id || createId(), sessionId: session.id, reviewKey: session.reviewKey || getTopicKey(session.subject, session.topic, session.subtopic || ""),
    subjectId: session.subjectId || null, topicId: session.topicId || null, subtopicId: session.subtopicId || null, subject: session.subject, topic: session.topic, subtopic: session.subtopic || "",
    questions: session.questions, correct: session.correct, date: session.date,
    previousInterval, nextInterval,
    createdAt: existing?.createdAt || session.createdAt || now,
    updatedAt: now
  };
  reviews = existing ? reviews.map((item) => item.id === existing.id ? record : item) : [...reviews, record];
}

studyForm.addEventListener("input", (event) => {
  updateAccuracyPreview();
  if (event.target.name === "activityType") syncQuestionContextMode();
  if (event.target.name === "subject") renderDatalists(event.target.value, "");
  if (event.target.name === "topic") renderDatalists(subjectInput.value, event.target.value);
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
  StudySync.run(true);
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
  openStudyRegistration();
});

searchInput.addEventListener("input", renderHistory);
if (historySubjectFilter) historySubjectFilter.addEventListener("change", () => { renderHistoryFilterOptions(); renderHistory(); });
[historyTopicFilter, historyContextFilter, historyStartDate, historyEndDate].forEach((input) => input?.addEventListener("change", renderHistory));
if (clearHistoryFilters) clearHistoryFilters.addEventListener("click", () => {
  searchInput.value = "";
  historySubjectFilter.value = "";
  historyTopicFilter.value = "";
  historyContextFilter.value = "";
  historyStartDate.value = "";
  historyEndDate.value = "";
  renderHistoryFilterOptions();
  renderHistory();
});
if (todayRegisterStudyButton) todayRegisterStudyButton.addEventListener("click", () => openStudyRegistration());
if (todayStartTimerButton) todayStartTimerButton.addEventListener("click", () => openStudyRegistration(null, true));
if (todayStudySuggestionButton) todayStudySuggestionButton.addEventListener("click", () => openStudyRegistration(suggestedStudyItem));
if (dailyGoalMinutesInput) dailyGoalMinutesInput.addEventListener("change", () => {
  uiPreferences.dailyGoalMinutes = Math.max(15, Math.min(1440, Number(dailyGoalMinutesInput.value || 120)));
  saveUiPreferences();
  renderTodayDashboard();
});
if (topicAnalysisSearch) topicAnalysisSearch.addEventListener("input", renderTopicAnalytics);




if (mockForm) {
  addMockSubjectButton.addEventListener("click", () => addMockSubjectRow());
  mockSubjectRows.addEventListener("click", (event) => { const button = event.target.closest(".mock-remove-subject"); if (button) button.closest(".mock-subject-row").remove(); });
  cancelMockEditButton.addEventListener("click", resetMockForm);
  mockChartFilter.addEventListener("change", renderMockChart);
  mockHistoryBody.addEventListener("click", (event) => { const button = event.target.closest("button[data-mock-action]"); if (!button) return; if (button.dataset.mockAction === "edit") editMock(button.dataset.id); if (button.dataset.mockAction === "delete") deleteMock(button.dataset.id); });
  mockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = getMockFormValues();
    if (!data.name || !data.date || !Number.isFinite(data.overallScore) || !Number.isFinite(data.overallMaxScore) || data.overallScore < 0 || data.overallMaxScore <= 0 || data.overallScore > data.overallMaxScore || data.subjectScores.some((item) => !item.subject || !Number.isFinite(item.score) || !Number.isFinite(item.maxScore) || item.score < 0 || item.maxScore <= 0 || item.score > item.maxScore)) { showToast("Informe nota obtida e nota máxima corretamente. A nota obtida não pode superar a máxima.", "error"); return; }
    const now = Date.now();
    const record = { id: editingMockId || createId(), ...data, subjectScores: JSON.stringify(data.subjectScores), createdAt: editingMockId ? (mocks.find((m) => m.id === editingMockId)?.createdAt || now) : now, updatedAt: now };
    mocks = editingMockId ? mocks.map((m) => m.id === editingMockId ? record : m) : [...mocks, record];
    const wasEditing = Boolean(editingMockId); MockStorage.save(mocks); resetMockForm(); renderAll(); StudySync.run(true); showToast(wasEditing ? "Simulado atualizado." : "Simulado salvo.", "success");
  });
}

if (subjectCatalogForm) subjectCatalogForm.addEventListener("submit", (event) => { event.preventDefault(); const name=normalizeCatalogName(subjectCatalogForm.elements.name.value); if(!name)return; if(catalogNameExists(catalog.subjects,name)){showToast("Essa matéria já está cadastrada.","error");return;} if(!captureUndo(`Criação de matéria: ${name}`))return; const now=Date.now(); catalog.subjects.push({id:createId(),name,archived:false,createdAt:now,updatedAt:now}); addAuditEntry("create",`Matéria criada: ${name}`); subjectCatalogForm.reset(); saveCatalogAndRefresh("Matéria adicionada."); });
if (catalogSearch) catalogSearch.addEventListener("input", renderCatalog);
if (archiveSelectedTopicsButton) archiveSelectedTopicsButton.addEventListener("click", archiveSelectedTopics);
if (mergeSelectedTopicsButton) mergeSelectedTopicsButton.addEventListener("click", mergeSelectedTopics);
if (clearCatalogSelectionButton) clearCatalogSelectionButton.addEventListener("click", () => { catalogTopicSelection.clear(); renderCatalog(); });
if (catalogList) {
  catalogList.addEventListener("submit", (event) => { const form=event.target.closest(".topic-catalog-form, .subtopic-catalog-form"); if(!form)return; event.preventDefault(); const name=normalizeCatalogName(form.elements.name.value); if(!name)return; const now=Date.now(); if(form.classList.contains("topic-catalog-form")){ const subjectId=form.closest(".catalog-subject").dataset.subjectId; if(catalogNameExists(catalog.topics,name,(x)=>x.subjectId===subjectId)){showToast("Esse tema já existe nessa matéria.","error");return;} if(!captureUndo(`Criação de tema: ${name}`))return; catalog.topics.push({id:createId(),subjectId,name,archived:false,createdAt:now,updatedAt:now}); addAuditEntry("create",`Tema criado: ${name}`); saveCatalogAndRefresh("Tema adicionado."); } else { const topicId=form.closest(".catalog-topic").dataset.topicId; if(catalogNameExists(catalog.subtopics,name,(x)=>x.topicId===topicId)){showToast("Esse subtema já existe nesse tema.","error");return;} if(!captureUndo(`Criação de subtema: ${name}`))return; catalog.subtopics.push({id:createId(),topicId,name,archived:false,createdAt:now,updatedAt:now}); addAuditEntry("create",`Subtema criado: ${name}`); saveCatalogAndRefresh("Subtema adicionado."); } });
  catalogList.addEventListener("click", (event) => { if(event.target.closest(".catalog-select")){event.stopPropagation();return;} const button=event.target.closest("[data-catalog-action]"); if(!button)return; event.preventDefault(); const subjectNode=button.closest(".catalog-subject"); const topicNode=button.closest(".catalog-topic"); const subtopicNode=button.closest(".catalog-subtopic"); const action=button.dataset.catalogAction; if(action==="correct-merge")openCatalogMergeCorrection(subjectNode.dataset.subjectId); if(action==="merge-topics")openCatalogMerge(subjectNode.dataset.subjectId); if(action==="rename-subject")renameCatalogRecord("subject",subjectNode.dataset.subjectId); if(action==="archive-subject")archiveCatalogRecord("subject",subjectNode.dataset.subjectId); if(action==="rename-topic")renameCatalogRecord("topic",topicNode.dataset.topicId); if(action==="archive-topic")archiveCatalogRecord("topic",topicNode.dataset.topicId); if(action==="rename-subtopic")renameCatalogRecord("subtopic",subtopicNode.dataset.subtopicId); if(action==="archive-subtopic")archiveCatalogRecord("subtopic",subtopicNode.dataset.subtopicId); });
  catalogList.addEventListener("change", (event) => { const checkbox=event.target.closest("[data-topic-select]"); if(!checkbox)return; if(checkbox.checked)catalogTopicSelection.add(checkbox.dataset.topicSelect);else catalogTopicSelection.delete(checkbox.dataset.topicSelect); renderCatalogBulkActions(); });
  catalogList.addEventListener("toggle", (event) => { const details=event.target; if(!details.matches?.(".catalog-subject,.catalog-topic") || catalogSearch.value.trim())return; const key=details.matches(".catalog-subject")?"openSubjects":"openTopics"; const id=details.matches(".catalog-subject")?details.dataset.subjectId:details.dataset.topicId; const values=new Set(uiPreferences[key]); if(details.open)values.add(id);else values.delete(id); uiPreferences[key]=[...values]; saveUiPreferences(); }, true);
}
if (catalogMergeForm) {
  catalogMergeForm.elements.targetTopicId.addEventListener("change", renderCatalogMergeSources);
  catalogMergeForm.elements.newTargetName.addEventListener("input", updateCatalogMergeSummary);
  catalogMergeSources.addEventListener("change", updateCatalogMergeSummary);
  catalogMergeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const subjectId = pendingCatalogMergeSubjectId;
    let targetTopicId = catalogMergeForm.elements.targetTopicId.value;
    const sourceTopicIds = getSelectedMergeSourceIds();
    if (!sourceTopicIds.length) { showToast("Selecione ao menos um tema para incorporar.", "error"); return; }
    let newTargetRecord = null;
    if (targetTopicId === "__new__") {
      const name = normalizeCatalogName(catalogMergeForm.elements.newTargetName.value);
      if (!name) { showToast("Informe o nome do novo tema geral.", "error"); return; }
      if (catalogNameExists(catalog.topics, name, (item) => item.subjectId === subjectId)) { showToast("Já existe um tema ativo com esse nome.", "error"); return; }
      const now = Date.now();
      targetTopicId = createId();
      newTargetRecord = { id: targetTopicId, subjectId, name, archived: false, createdAt: now, updatedAt: now };
    }
    if (!captureUndo("Mesclagem de temas")) return;
    if (newTargetRecord) catalog.topics.push(newTargetRecord);
    if (applyCatalogTopicMerge(subjectId, targetTopicId, sourceTopicIds)) { catalogTopicSelection.clear(); closeCatalogMergeNow(); }
  });
  closeCatalogMergeModal.addEventListener("click", closeCatalogMergeNow);
  cancelCatalogMerge.addEventListener("click", closeCatalogMergeNow);
  catalogMergeModal.addEventListener("click", (event) => { if (event.target === catalogMergeModal) closeCatalogMergeNow(); });
}
if (catalogMergeCorrectionForm) {
  catalogMergeCorrectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingCatalogMergeCorrection) return;
    if (applyCatalogMergeCorrection(pendingCatalogMergeCorrection.subjectId, catalogMergeCorrectionForm.elements.newTopicName.value)) closeCatalogMergeCorrectionNow();
  });
  closeCatalogMergeCorrectionModal.addEventListener("click", closeCatalogMergeCorrectionNow);
  cancelCatalogMergeCorrection.addEventListener("click", closeCatalogMergeCorrectionNow);
  catalogMergeCorrectionModal.addEventListener("click", (event) => { if (event.target === catalogMergeCorrectionModal) closeCatalogMergeCorrectionNow(); });
}
if (catalogRenameForm) {
  catalogRenameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingCatalogRename) return;
    const { type, id } = pendingCatalogRename;
    const name = catalogRenameForm.elements.name.value;
    closeCatalogRenameNow();
    applyCatalogRename(type, id, name);
  });
  closeCatalogRenameModal.addEventListener("click", closeCatalogRenameNow);
  cancelCatalogRename.addEventListener("click", closeCatalogRenameNow);
  catalogRenameModal.addEventListener("click", (event) => { if (event.target === catalogRenameModal) closeCatalogRenameNow(); });
}

if (openArchivedItemsButton) {
  const closeArchivedItems = () => archivedItemsModal.classList.add("hidden");
  openArchivedItemsButton.addEventListener("click", () => { renderArchivedItems(); archivedItemsModal.classList.remove("hidden"); });
  closeArchivedItemsModal.addEventListener("click", closeArchivedItems);
  doneArchivedItems.addEventListener("click", closeArchivedItems);
  archivedItemsModal.addEventListener("click", (event) => { if (event.target === archivedItemsModal) closeArchivedItems(); });
  archivedItemsList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-restore-type]");
    if (button) restoreArchivedCatalogRecord(button.dataset.restoreType, button.dataset.restoreId);
  });
  archivedItemsList.addEventListener("change", (event) => { const checkbox=event.target.closest("[data-archived-key]"); if(!checkbox)return; if(checkbox.checked)archivedSelection.add(checkbox.dataset.archivedKey);else archivedSelection.delete(checkbox.dataset.archivedKey); archivedSelectedCount.textContent=archivedSelection.size; archivedBulkActions.classList.toggle("hidden",!archivedSelection.size); });
}
if (restoreSelectedArchivedButton) restoreSelectedArchivedButton.addEventListener("click", restoreSelectedArchivedItems);
if (clearArchivedSelectionButton) clearArchivedSelectionButton.addEventListener("click", () => { archivedSelection.clear(); renderArchivedItems(); });

if (undoLastActionButton) undoLastActionButton.addEventListener("click", undoLastStructuralAction);
if (exportBackupButton) exportBackupButton.addEventListener("click", exportCompleteBackup);
if (selectBackupFileButton) selectBackupFileButton.addEventListener("click", () => backupFileInput.click());
if (backupFileInput) backupFileInput.addEventListener("change", async () => {
  const file = backupFileInput.files?.[0];
  backupFileInput.value = "";
  if (file) await importCompleteBackup(file);
});

timerStart.addEventListener("click", startTimer);
timerPause.addEventListener("click", pauseTimer);
timerResume.addEventListener("click", resumeTimer);
timerFinish.addEventListener("click", finishTimer);
timerCancel.addEventListener("click", cancelTimer);


function setCollapsibleExpanded(targetId, expanded, persist = true) {
  const content = document.getElementById(targetId);
  const button = document.querySelector(`[data-collapse-target="${targetId}"]`);
  if (!content || !button) return;
  content.hidden = !expanded;
  button.setAttribute("aria-expanded", String(expanded));
  const label = button.querySelector("span:first-child");
  if (label) label.textContent = expanded ? "Recolher" : "Expandir";
  if (persist) {
    uiPreferences.collapsible[targetId] = expanded;
    saveUiPreferences();
  }
}

function restoreCollapsibleState() {
  Object.entries(uiPreferences.collapsible || {}).forEach(([targetId, expanded]) => setCollapsibleExpanded(targetId, Boolean(expanded), false));
}

document.querySelectorAll("[data-collapse-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.collapseTarget;
    const expanded = button.getAttribute("aria-expanded") === "true";
    setCollapsibleExpanded(targetId, !expanded);
  });
});

if (performanceDetailsButton) performanceDetailsButton.addEventListener("click", () => {
  setCollapsibleExpanded("topicAnalysisContent", true);
  document.querySelector(".topic-analysis-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
if (timeExactDate) timeExactDate.addEventListener("change", () => { if (!timeExactDate.value) return; exactTimeDate = timeExactDate.value; activeTimeFilter = "exact"; timeFilterButtons.forEach((item) => item.classList.remove("active")); renderTimeDashboard(); });
timeFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeFilterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeTimeFilter = button.dataset.timeFilter;
    exactTimeDate = ""; if (timeExactDate) timeExactDate.value = "";
    renderTimeDashboard();
  });
});

if (chartPeriodFilter) {
  chartPeriodFilter.addEventListener("change", () => {
    activeChartPeriod = chartPeriodFilter.value;
    chartCustomPeriod.classList.toggle("hidden", activeChartPeriod !== "custom");
    if (activeChartPeriod === "custom") {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 29);
      if (!chartStartDate.value) chartStartDate.value = toISODate(start);
      if (!chartEndDate.value) chartEndDate.value = toISODate(end);
    }
    renderCharts();
  });
  [chartStartDate, chartEndDate].forEach((input) => input.addEventListener("change", () => {
    if (activeChartPeriod !== "custom" || !chartStartDate.value || !chartEndDate.value) return;
    if (chartStartDate.value > chartEndDate.value) { showToast("A data inicial não pode ser posterior à data final.", "error"); return; }
    renderCharts();
  }));
}

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
  startScheduledReview(button.dataset.reviewKey);
});

reviewForm.addEventListener("input", updateReviewPreview);
reviewForm.addEventListener("submit", saveReviewResult);
closeReviewModal.addEventListener("click", closeReviewModalNow);
cancelReviewModal.addEventListener("click", closeReviewModalNow);

reviewModal.addEventListener("click", (event) => {
  if (event.target === reviewModal) closeReviewModalNow();
});

function setSyncStatus(state, detail = "") {
  const labels = { local: "Somente local", locked: "Configurar acesso", pending: "Alterações pendentes", syncing: "Sincronizando...", synced: "Sincronizado", offline: "Offline", error: "Erro de sincronização" };
  syncStatus.className = `sync-status ${state}`;
  syncStatusText.textContent = detail && ["synced", "pending", "offline", "error", "local", "locked"].includes(state) ? `${labels[state]} • ${detail}` : labels[state] || labels.local;
  syncStatus.title = detail ? `${labels[state]} — ${detail}` : labels[state];
}

syncStatus.addEventListener("click", () => {
  if (!StudyApi.hasToken()) {
    authModal.classList.remove("hidden");
    window.setTimeout(() => authForm.elements.token.focus(), 50);
    return;
  }
  StudySync.run();
});

function closeAuthModalNow() {
  authModal.classList.add("hidden");
  authForm.reset();
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const token = authForm.elements.token.value.trim();
  if (!token) return;
  StudyApi.setToken(token);
  closeAuthModalNow();
  StudySync.run();
});
closeAuthModal.addEventListener("click", closeAuthModalNow);
cancelAuthModal.addEventListener("click", closeAuthModalNow);
authModal.addEventListener("click", (event) => { if (event.target === authModal) closeAuthModalNow(); });

StudySync.init({
  getState: () => ({ sessions, reviews, mocks, subjects: catalog.subjects, topics: catalog.topics, subtopics: catalog.subtopics || [], meta: syncMeta }),
  markPending: () => {
    syncMeta.pendingChanges = Number(syncMeta.pendingChanges || 0) + 1;
    SyncStorage.save(syncMeta);
    setSyncStatus("pending", `${syncMeta.pendingChanges} alteraç${syncMeta.pendingChanges === 1 ? "ão" : "ões"}`);
  },
  applyState: (state) => {
    sessions = state.sessions;
    reviews = state.reviews;
    mocks = state.mocks || [];
    catalog = { subjects: state.subjects || [], topics: state.topics || [], subtopics: state.subtopics || [] };
    migrateLegacyCatalogState();
    syncMeta = state.meta;
    StudyStorage.save(sessions);
    ReviewStorage.save(reviews);
    MockStorage.save(mocks);
    CatalogStorage.save(catalog);
    SyncStorage.save(syncMeta);
    renderAll();
  },
  setStatus: setSyncStatus
});

formatToday();
migrateLegacyCatalogState();
if (mockDate) resetMockForm();
syncQuestionContextMode();
renderAll();
restoreCollapsibleState();
updateAccuracyPreview();
renderTimer();
if (activeTimer?.running) startTimerTick();
