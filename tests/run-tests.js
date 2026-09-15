const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const reviewContext = {};
vm.createContext(reviewContext);
vm.runInContext(`${fs.readFileSync(path.join(root, "js/reviews.js"), "utf8")}\nthis.engine = ReviewEngine;`, reviewContext);
const engine = reviewContext.engine;

assert.equal(engine.getBaseInterval(49), 1);
assert.equal(engine.getBaseInterval(55), 3);
assert.equal(engine.getBaseInterval(65), 7);
assert.equal(engine.getBaseInterval(75), 15);
assert.equal(engine.getBaseInterval(85), 30);
assert.equal(engine.getBaseInterval(92), 60);
assert.equal(engine.getBaseInterval(97), 90);
assert.equal(engine.getNextInterval(100, null, 1, 1), 15, "amostra pequena não pode saltar para 90");
assert.equal(engine.getNextInterval(100, null, 1, 12), 30, "amostra moderada é limitada");
assert.equal(engine.getNextInterval(96, 90, 3, 25), 120, "consistência robusta progride para 120");
assert.equal(engine.getNextInterval(96, 120, 3, 25), 180, "manutenção robusta progride para 180");
assert.equal(engine.getNextInterval(55, 90, 0, 25), 3, "queda de desempenho reduz intervalo");
assert.equal(engine.addDays("2026-01-31", 1), "2026-02-01");

const syncContext = {
  window: { addEventListener() {} }, navigator: { onLine: true },
  StudyApi: { isConfigured: () => false }, clearTimeout() {}, setTimeout() {}
};
vm.createContext(syncContext);
vm.runInContext(`${fs.readFileSync(path.join(root, "js/sync.js"), "utf8")}\nthis.sync = StudySync;`, syncContext);
const merge = syncContext.sync.mergeRecords;
assert.equal(merge([{ id: "a", updatedAt: 2, subject: "novo" }], [{ id: "a", updatedAt: 1, subject: "antigo" }], {})[0].subject, "novo");
assert.equal(merge([{ id: "a", updatedAt: 2 }], [{ id: "a", updatedAt: 3, subject: "remoto" }], {})[0].subject, "remoto");
assert.equal(merge([{ id: "a", updatedAt: 2 }], [], { a: 3 }).length, 0, "tombstone mais novo vence");
assert.equal(merge([{ id: "a", updatedAt: 4 }], [], { a: 3 }).length, 1, "edição mais nova vence tombstone antigo");
assert.equal(merge([{ id: "same", updatedAt: 1 }], [{ id: "same", updatedAt: 1 }], {}).length, 1, "id não duplica");
assert.match(fs.readFileSync(path.join(root, "js/sync.js"), "utf8"), /!StudyApi\.hasToken\(\).*setStatus\("locked"/, "segredo ausente não gera tentativa nem erro de console");

const appSource = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
assert.match(appSource, /latestReview\.nextInterval \|\| ReviewEngine\.getBaseInterval/, "render usa intervalo persistido");
assert.doesNotMatch(appSource, /latestReview\s*\?\s*ReviewEngine\.getNextInterval\(lastPercentage/, "render não progride revisão");

const catalogContext = {};
vm.createContext(catalogContext);
vm.runInContext(`${fs.readFileSync(path.join(root, "js/catalog.js"), "utf8")}\nthis.catalog = CatalogEngine;`, catalogContext);
const catalogEngine = catalogContext.catalog;
let idCounter = 0;
const migrated = catalogEngine.migrate({
  sessions: [{ id: "s1", subject: "Português", topic: "Crase", updatedAt: 1 }],
  reviews: [{ id: "r1", subject: "Português", topic: "Crase", updatedAt: 1 }],
  mocks: [{ id: "m1", subjectScores: JSON.stringify([{ subject: "Português", score: 9, maxScore: 10 }]), updatedAt: 1 }],
  subjects: [], topics: []
}, () => `id-${++idCounter}`, 100);
assert.equal(migrated.subjects.length, 1, "migração cria uma matéria única");
assert.equal(migrated.topics.length, 1, "migração cria um subtema único");
assert.equal(migrated.sessions[0].subjectId, migrated.reviews[0].subjectId, "sessão e revisão compartilham subjectId");
assert.equal(migrated.sessions[0].topicId, migrated.reviews[0].topicId, "sessão e revisão compartilham topicId");
assert.equal(JSON.parse(migrated.mocks[0].subjectScores)[0].subjectId, migrated.subjects[0].id, "simulado é ligado ao catálogo");
const migratedAgain = catalogEngine.migrate(migrated, () => `id-${++idCounter}`, 200);
assert.equal(migratedAgain.subjects.length, 1, "nova migração não duplica matéria");
assert.equal(migratedAgain.topics.length, 1, "nova migração não duplica subtema");
assert.equal(migratedAgain.sessions[0].subjectId, migrated.sessions[0].subjectId, "IDs permanecem estáveis");

console.log("OK: 26 verificações de revisão, merge, tombstones, catálogo, IDs e regressão de renderização.");
