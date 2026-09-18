const SHEETS = {
  sessions: {
    name: 'Sessions',
    headers: ['id', 'subjectId', 'topicId', 'subtopicId', 'subject', 'topic', 'subtopic', 'questions', 'correct', 'date', 'activityType', 'questionContext', 'reviewKey', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt']
  },
  reviews: {
    name: 'Reviews',
    headers: ['id', 'sessionId', 'reviewKey', 'subjectId', 'topicId', 'subtopicId', 'subject', 'topic', 'subtopic', 'questions', 'correct', 'date', 'previousInterval', 'nextInterval', 'createdAt', 'updatedAt', 'deletedAt']
  },
  mocks: {
    name: 'Mocks',
    headers: ['id', 'name', 'date', 'overallScore', 'overallMaxScore', 'subjectScores', 'createdAt', 'updatedAt', 'deletedAt']
  },
  subjects: { name: 'Subjects', headers: ['id', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt'] },
  topics: { name: 'Topics', headers: ['id', 'subjectId', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt'] },
  subtopics: { name: 'Subtopics', headers: ['id', 'topicId', 'name', 'archived', 'createdAt', 'updatedAt', 'deletedAt'] }
};

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
    const action = request.action || 'getAll';
    if (action === 'getAll') return json_({ ok: true, data: getAll_() });
    if (action === 'sync') return json_({ ok: true, data: sync_(request) });
    if (action === 'saveSession') return json_({ ok: true, data: upsertOne_('sessions', request.record) });
    if (action === 'saveReview') return json_({ ok: true, data: upsertOne_('reviews', request.record) });
    if (action === 'deleteSession') return json_({ ok: true, data: deleteOne_('sessions', request.id, request.deletedAt) });
    if (action === 'deleteReview') return json_({ ok: true, data: deleteOne_('reviews', request.id, request.deletedAt) });
    throw new Error('Ação inválida: ' + action);
  } catch (error) {
    return json_({ ok: false, error: String(error.message || error) });
  }
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

function sync_(request) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    applyTombstones_('sessions', request.sessionTombstones || {});
    applyTombstones_('reviews', request.reviewTombstones || {});
    applyTombstones_('mocks', request.mockTombstones || {});
    applyTombstones_('subjects', request.subjectTombstones || {});
    applyTombstones_('topics', request.topicTombstones || {});
    applyTombstones_('subtopics', request.subtopicTombstones || {});
    upsertMany_('sessions', request.sessions || []);
    upsertMany_('reviews', request.reviews || []);
    upsertMany_('mocks', request.mocks || []);
    upsertMany_('subjects', request.subjects || []);
    upsertMany_('topics', request.topics || []);
    upsertMany_('subtopics', request.subtopics || []);
    return getAll_();
  } finally {
    lock.releaseLock();
  }
}

function getAll_() {
  return { sessions: read_('sessions', false), reviews: read_('reviews', false), mocks: read_('mocks', false), subjects: read_('subjects', false), topics: read_('topics', false), subtopics: read_('subtopics', false), serverTime: Date.now() };
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
      ['questions', 'correct', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt', 'previousInterval', 'nextInterval', 'overallScore', 'overallMaxScore'].forEach(function(key) {
        if (item[key] !== '') item[key] = Number(item[key]);
      });
      return item;
    })
    .filter(function(item) { return item.id && (includeDeleted || !item.deletedAt); });
}

function upsertMany_(type, records) {
  if (!records.length) return;
  const spec = SHEETS[type];
  const info = headerInfo_(type);
  const sheet = info.sheet;
  const existing = read_(type, true);
  const byId = {};
  const rawRows = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, info.headers.length).getValues();
  existing.forEach(function(item, index) { byId[item.id] = { item: item, row: index + 2, raw: rawRows[index] || [] }; });
  const additions = [];
  records.forEach(function(record) {
    if (!record || !record.id) return;
    const found = byId[record.id];
    const incomingTime = Number(record.deletedAt || record.updatedAt || record.createdAt || 0);
    const storedTime = found ? Number(found.item.deletedAt || found.item.updatedAt || found.item.createdAt || 0) : -1;
    if (found && incomingTime < storedTime) return;
    const row = info.headers.map(function(header, index) {
      return spec.headers.indexOf(header) === -1 ? (found ? found.raw[index] : '') : (record[header] == null ? '' : record[header]);
    });
    if (found) sheet.getRange(found.row, 1, 1, row.length).setValues([row]);
    else additions.push(row);
  });
  if (additions.length) sheet.getRange(sheet.getLastRow() + 1, 1, additions.length, info.headers.length).setValues(additions);
}

function upsertOne_(type, record) {
  upsertMany_(type, [record]);
  return record;
}

function applyTombstones_(type, tombstones) {
  Object.keys(tombstones).forEach(function(id) { deleteOne_(type, id, tombstones[id]); });
}

function deleteOne_(type, id, deletedAt) {
  if (!id) throw new Error('ID obrigatório');
  const found = read_(type, true).find(function(item) { return item.id === id; });
  const tombstone = Object.assign({}, found || { id: id, createdAt: deletedAt }, { deletedAt: Number(deletedAt || Date.now()), updatedAt: Number(deletedAt || Date.now()) });
  upsertMany_(type, [tombstone]);
  return { id: id, deletedAt: tombstone.deletedAt };
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
