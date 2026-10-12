const SHEETS = {
  profiles: { name: 'Profiles', headers: ['id', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt'] },
  sessions: {
    name: 'Sessions',
    headers: ['id', 'subjectId', 'topicId', 'subtopicId', 'subject', 'topic', 'subtopic', 'questions', 'correct', 'date', 'activityType', 'questionContext', 'reviewKey', 'reviewOutcome', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId']
  },
  reviews: {
    name: 'Reviews',
    headers: ['id', 'sessionId', 'reviewKey', 'subjectId', 'topicId', 'subtopicId', 'subject', 'topic', 'subtopic', 'questions', 'correct', 'date', 'previousInterval', 'nextInterval', 'intervalReason', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId']
  },
  mocks: {
    name: 'Mocks',
    headers: ['id', 'name', 'date', 'overallScore', 'overallMaxScore', 'subjectScores', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId']
  },
  subjects: { name: 'Subjects', headers: ['id', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId'] },
  topics: { name: 'Topics', headers: ['id', 'subjectId', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId'] },
  subtopics: { name: 'Subtopics', headers: ['id', 'topicId', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId'] },
  reviewPlans: { name: 'ReviewPlans', headers: ['id', 'reviewKey', 'originalDueDate', 'plannedDate', 'reason', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId'] },
  settings: { name: 'Settings', headers: ['id', 'dailyReviewLimit', 'minimumQuestions', 'minimumAccuracy', 'studyCycleSubjectIds', 'studyCycleCurrentIndex', 'studyCyclePreviousIndex', 'studyCycleActive', 'studyCycleLastAdvancedAt', 'createdAt', 'updatedAt', 'deletedAt', 'ownerId'] }
};

const DEFAULT_OWNER_ID = 'wesley';

function doGet(e) {
  return handleRequest_((e && e.parameter) || { action: 'getAll' });
}

function doPost(e) {
  try {
    return handleRequest_(JSON.parse((e && e.postData && e.postData.contents) || '{}'));
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function handleRequest_(request) {
  try {
    authorize_(request);
    const ownerId = ownerIdFromRequest_(request);
    const action = request.action || 'getAll';
    if (action === 'getAll') return json_({ ok: true, data: getAll_(ownerId) });
    if (action === 'sync') return json_({ ok: true, data: sync_(request, ownerId) });
    if (action === 'saveSession') return json_({ ok: true, data: upsertOne_('sessions', request.record, ownerId) });
    if (action === 'saveReview') return json_({ ok: true, data: upsertOne_('reviews', request.record, ownerId) });
    if (action === 'deleteSession') return json_({ ok: true, data: deleteOne_('sessions', request.id, request.deletedAt, ownerId) });
    if (action === 'deleteReview') return json_({ ok: true, data: deleteOne_('reviews', request.id, request.deletedAt, ownerId) });
    throw new Error('Ação inválida: ' + action);
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
}

function normalizeOwnerId_(ownerId) {
  const normalized = String(ownerId || '').trim().toLowerCase();
  return /^[a-z0-9][a-z0-9_-]{0,79}$/.test(normalized) ? normalized : DEFAULT_OWNER_ID;
}

function ownerIdFromRequest_(request) {
  return normalizeOwnerId_(request && request.ownerId);
}

function recordOwnerId_(record) {
  return normalizeOwnerId_(record && record.ownerId);
}

function authorize_(request) {
  const expected = PropertiesService.getScriptProperties().getProperty('STUDY_TRACKER_TOKEN');
  if (!expected) throw new Error('AUTH_NOT_CONFIGURED');
  const received = String((request && request.token) || '');
  if (!safeEqual_(received, expected)) throw new Error('UNAUTHORIZED');
}

function safeEqual_(left, right) {
  const a = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(left));
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(right));
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) difference |= a[i] ^ b[i];
  return difference === 0;
}

function sync_(request, ownerId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    upsertMany_('profiles', request.profiles || []);
    applyTombstones_('sessions', request.sessionTombstones || {}, ownerId);
    applyTombstones_('reviews', request.reviewTombstones || {}, ownerId);
    applyTombstones_('mocks', request.mockTombstones || {}, ownerId);
    applyTombstones_('subjects', request.subjectTombstones || {}, ownerId);
    applyTombstones_('topics', request.topicTombstones || {}, ownerId);
    applyTombstones_('subtopics', request.subtopicTombstones || {}, ownerId);
    applyTombstones_('reviewPlans', request.reviewPlanTombstones || {}, ownerId);
    applyTombstones_('settings', request.settingTombstones || {}, ownerId);
    upsertMany_('sessions', request.sessions || [], ownerId);
    upsertMany_('reviews', request.reviews || [], ownerId);
    upsertMany_('mocks', request.mocks || [], ownerId);
    upsertMany_('subjects', request.subjects || [], ownerId);
    upsertMany_('topics', request.topics || [], ownerId);
    upsertMany_('subtopics', request.subtopics || [], ownerId);
    upsertMany_('reviewPlans', request.reviewPlans || [], ownerId);
    upsertMany_('settings', request.settings || [], ownerId);
    return getAll_(ownerId);
  } finally {
    lock.releaseLock();
  }
}

function readOwned_(type, includeDeleted, ownerId) {
  const normalizedOwnerId = normalizeOwnerId_(ownerId);
  return read_(type, includeDeleted)
    .filter(function(item) { return recordOwnerId_(item) === normalizedOwnerId; })
    .map(function(item) { return Object.assign({}, item, { ownerId: normalizedOwnerId }); });
}

function getAll_(ownerId) {
  return { profiles: read_('profiles', false), sessions: readOwned_('sessions', false, ownerId), reviews: readOwned_('reviews', false, ownerId), mocks: readOwned_('mocks', false, ownerId), subjects: readOwned_('subjects', false, ownerId), topics: readOwned_('topics', false, ownerId), subtopics: readOwned_('subtopics', false, ownerId), reviewPlans: readOwned_('reviewPlans', false, ownerId), settings: readOwned_('settings', false, ownerId), serverTime: Date.now() };
}

function sheet_(type) {
  const spec = SHEETS[type];
  if (!spec) throw new Error('Tipo inválido');
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(spec.name);
  if (!sheet) sheet = spreadsheet.insertSheet(spec.name);
  const currentLastColumn = Math.max(sheet.getLastColumn(), 1);
  const currentHeaders = sheet.getRange(1, 1, 1, currentLastColumn).getValues()[0].map(String);
  if (!currentHeaders.some(function(header) { return header; }) && sheet.getLastRow() <= 1) {
    sheet.getRange(1, 1, 1, spec.headers.length).setValues([spec.headers]);
  } else {
    // Migração por nome: acrescenta somente colunas ausentes e nunca limpa,
    // recria ou move células já existentes.
    const missing = spec.headers.filter(function(header) { return currentHeaders.indexOf(header) === -1; });
    if (missing.length) sheet.getRange(1, currentLastColumn + 1, 1, missing.length).setValues([missing]);
  }
  sheet.setFrozenRows(1);
  return sheet;
}

function headerInfo_(type) {
  const sheet = sheet_(type);
  const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0].map(String);
  const index = {};
  headers.forEach(function(header, position) { if (header) index[header] = position; });
  return { sheet: sheet, headers: headers, index: index };
}

function read_(type, includeDeleted) {
  const spec = SHEETS[type];
  const info = headerInfo_(type);
  const sheet = info.sheet;
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, info.headers.length).getValues()
    .map(function(row) {
      const item = {};
      spec.headers.forEach(function(header) { item[header] = info.index[header] == null ? '' : row[info.index[header]]; });
      ['questions', 'correct', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt', 'previousInterval', 'nextInterval', 'overallScore', 'overallMaxScore', 'dailyReviewLimit', 'minimumQuestions', 'minimumAccuracy', 'studyCycleCurrentIndex', 'studyCyclePreviousIndex', 'studyCycleLastAdvancedAt'].forEach(function(key) {
        if (item[key] !== '') item[key] = Number(item[key]);
      });
      return item;
    })
    .filter(function(item) { return item.id && (includeDeleted || !item.deletedAt); });
}

function upsertMany_(type, records, ownerId) {
  if (!records.length) return;
  const isGlobal = type === 'profiles';
  const normalizedOwnerId = normalizeOwnerId_(ownerId);
  const spec = SHEETS[type];
  const info = headerInfo_(type);
  const sheet = info.sheet;
  const existing = read_(type, true);
  const byId = {};
  const rawRows = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, info.headers.length).getValues();
  existing.forEach(function(item, index) { byId[(isGlobal ? '' : recordOwnerId_(item) + '|||') + item.id] = { item: item, row: index + 2, raw: rawRows[index] || [] }; });
  const additions = [];
  records.forEach(function(record) {
    if (!record || !record.id) return;
    const scopedRecord = isGlobal ? Object.assign({}, record) : Object.assign({}, record, { ownerId: normalizedOwnerId });
    const found = byId[(isGlobal ? '' : normalizedOwnerId + '|||') + scopedRecord.id];
    const incomingTime = Number(scopedRecord.deletedAt || scopedRecord.updatedAt || scopedRecord.createdAt || 0);
    const storedTime = found ? Number(found.item.deletedAt || found.item.updatedAt || found.item.createdAt || 0) : -1;
    if (found && incomingTime < storedTime) return;
    const row = info.headers.map(function(header, index) {
      return spec.headers.indexOf(header) === -1 ? (found ? found.raw[index] : '') : (scopedRecord[header] == null ? '' : scopedRecord[header]);
    });
    if (found) sheet.getRange(found.row, 1, 1, row.length).setValues([row]);
    else additions.push(row);
  });
  if (additions.length) sheet.getRange(sheet.getLastRow() + 1, 1, additions.length, info.headers.length).setValues(additions);
}

function upsertOne_(type, record, ownerId) {
  const scopedRecord = Object.assign({}, record, { ownerId: normalizeOwnerId_(ownerId) });
  upsertMany_(type, [scopedRecord], ownerId);
  return scopedRecord;
}

function applyTombstones_(type, tombstones, ownerId) {
  Object.keys(tombstones).forEach(function(id) { deleteOne_(type, id, tombstones[id], ownerId); });
}

function deleteOne_(type, id, deletedAt, ownerId) {
  if (!id) throw new Error('ID obrigatório');
  const normalizedOwnerId = normalizeOwnerId_(ownerId);
  const found = read_(type, true).find(function(item) { return item.id === id && recordOwnerId_(item) === normalizedOwnerId; });
  const tombstone = Object.assign({}, found || { id: id, createdAt: deletedAt }, { ownerId: normalizedOwnerId, deletedAt: Number(deletedAt || Date.now()), updatedAt: Number(deletedAt || Date.now()) });
  upsertMany_(type, [tombstone], normalizedOwnerId);
  return { id: id, deletedAt: tombstone.deletedAt };
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
