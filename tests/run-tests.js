const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const reviewContext = {};
vm.createContext(reviewContext);
vm.runInContext(`${fs.readFileSync(path.join(root, "js/reviews.js"), "utf8")}\nthis.engine = ReviewEngine;`, reviewContext);
const engine = reviewContext.engine;

assert.equal(engine.getInitialInterval(), 3, "primeira revisão é sempre em 3 dias");
assert.equal(engine.getInitialInterval(92), 3, "estudo com 92% continua agendando a primeira revisão em 3 dias");
assert.equal(engine.getInitialInterval(100), 3, "estudo com 100% não antecipa a progressão");
assert.equal(engine.getAdvanceInterval(3), 7);
assert.equal(engine.getAdvanceInterval(7), 15);
assert.equal(engine.getAdvanceInterval(15), 30);
assert.equal(engine.getAdvanceInterval(30), 45);
assert.equal(engine.getAdvanceInterval(45), 60);
assert.equal(engine.getAdvanceInterval(60), 90);
assert.equal(engine.getAdvanceInterval(90), 120);
assert.equal(engine.getAdvanceInterval(120), 150);
assert.equal(engine.getAdvanceInterval(180), 210, "não há teto máximo após 60 dias");
assert.equal(engine.getAdvanceInterval(300), 330, "progressão segue sem teto");
assert.equal(engine.getNextInterval(100, 15, 1, 19), 15, "menos de 20 questões não avança");
assert.equal(engine.getNextInterval(90, 15, 1, 20), 30, "90% com 20 questões avança um estágio");
assert.equal(engine.getNextInterval(100, 30, 2, 50), 45, "amostra grande não pula dois estágios");
assert.equal(engine.getNextInterval(85, 30, 0, 20), 30, "70-89% mantém intervalo");
assert.equal(engine.getNextInterval(70, 60, 0, 5), 60, "70% mantém mesmo com amostra pequena");
assert.equal(engine.getNextInterval(65, 30, 0, 20), 7, "60-69% regressa para no máximo 7 dias");
assert.equal(engine.getNextInterval(65, 3, 0, 5), 3, "regressão nunca aumenta intervalo de 3 dias");
assert.equal(engine.getNextInterval(55, 120, 0, 8), 3, "resultado ruim regressa mesmo com menos de 20 questões");
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
assert.match(appSource, /latestReview\.nextInterval \|\| ReviewEngine\.getInitialInterval/, "render usa intervalo persistido");
assert.match(appSource, /: ReviewEngine\.getInitialInterval\(\)/, "estudo com qualquer percentual agenda primeira revisão em 3 dias");
assert.doesNotMatch(appSource, /: ReviewEngine\.getBaseInterval\(lastPercentage\)/, "estudo não define intervalo pelo percentual");
assert.doesNotMatch(appSource, /latestReview\s*\?\s*ReviewEngine\.getNextInterval\(lastPercentage/, "render não progride revisão");
assert.match(appSource, /if \(session\.activityType !== "review"\)/, "somente sessão de revisão cria ou recalcula Review");
assert.match(appSource, /questionContext = activityType === "review" \? "review"/, "contexto de revisão é derivado da atividade real");
assert.match(appSource, /reviewKey = activityType === "review"/, "estudo e bateria independente não recebem vínculo de revisão");

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

console.log("OK: 43 verificações de revisão v1.2, merge, tombstones, catálogo, IDs e regressão de renderização.");
