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

const appSource = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
assert.match(appSource, /latestReview\.nextInterval \|\| ReviewEngine\.getBaseInterval/, "render usa intervalo persistido");
assert.doesNotMatch(appSource, /latestReview\s*\?\s*ReviewEngine\.getNextInterval\(lastPercentage/, "render não progride revisão");

console.log("OK: 17 verificações de revisão, merge, tombstones, duplicidade e regressão de renderização.");
