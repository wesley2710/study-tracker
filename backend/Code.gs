const SHEETS = {
  sessions: {
    name: 'Sessions',
    headers: ['id', 'subject', 'topic', 'questions', 'correct', 'date', 'activityType', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt']
  },
  reviews: {
    name: 'Reviews',
    headers: ['id', 'sessionId', 'subject', 'topic', 'questions', 'correct', 'date', 'previousInterval', 'nextInterval', 'createdAt', 'updatedAt', 'deletedAt']
  }
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
    upsertMany_('sessions', request.sessions || []);
    upsertMany_('reviews', request.reviews || []);
    return getAll_();
  } finally {
    lock.releaseLock();
  }
}

function getAll_() {
  return { sessions: read_('sessions', false), reviews: read_('reviews', false), serverTime: Date.now() };
}

function sheet_(type) {
  const spec = SHEETS[type];
  if (!spec) throw new Error('Tipo inválido');
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(spec.name);
  if (!sheet) sheet = spreadsheet.insertSheet(spec.name);
  const firstRow = sheet.getRange(1, 1, 1, spec.headers.length).getValues()[0];
  if (firstRow.join('|') !== spec.headers.join('|')) sheet.getRange(1, 1, 1, spec.headers.length).setValues([spec.headers]);
  sheet.setFrozenRows(1);
  return sheet;
}

function read_(type, includeDeleted) {
  const spec = SHEETS[type];
  const sheet = sheet_(type);
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, spec.headers.length).getValues()
    .map(function(row) {
      const item = {};
      spec.headers.forEach(function(header, index) { item[header] = row[index]; });
      ['questions', 'correct', 'durationSeconds', 'createdAt', 'updatedAt', 'deletedAt', 'previousInterval', 'nextInterval'].forEach(function(key) {
        if (item[key] !== '') item[key] = Number(item[key]);
      });
      return item;
    })
    .filter(function(item) { return item.id && (includeDeleted || !item.deletedAt); });
}

function upsertMany_(type, records) {
  if (!records.length) return;
  const spec = SHEETS[type];
  const sheet = sheet_(type);
  const existing = read_(type, true);
  const byId = {};
  existing.forEach(function(item, index) { byId[item.id] = { item: item, row: index + 2 }; });
  const additions = [];
  records.forEach(function(record) {
    if (!record || !record.id) return;
    const found = byId[record.id];
    const incomingTime = Number(record.deletedAt || record.updatedAt || record.createdAt || 0);
    const storedTime = found ? Number(found.item.deletedAt || found.item.updatedAt || found.item.createdAt || 0) : -1;
    if (found && incomingTime < storedTime) return;
    const row = spec.headers.map(function(header) { return record[header] == null ? '' : record[header]; });
    if (found) sheet.getRange(found.row, 1, 1, row.length).setValues([row]);
    else additions.push(row);
  });
  if (additions.length) sheet.getRange(sheet.getLastRow() + 1, 1, additions.length, spec.headers.length).setValues(additions);
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
