import fs from "node:fs";
import path from "node:path";
import { mergeRegistry } from "./lib.mjs";

const r = mergeRegistry();
console.log(`registry: ${r.total} entries, ${r.added} new`);

// 英文站点不该出现中文简介：sync 抓到新条目、或仓库自己改了简介时，这里会提示补译，
// 不阻断构建（缺译时页面回落到原文，不至于白屏）。
const registry = JSON.parse(fs.readFileSync(path.join("data", "registry.json"), "utf8"));
const descEn = JSON.parse(fs.readFileSync(path.join("data", "desc-en.json"), "utf8"));
const norm = (s) => s.replace(/\s+/g, " ").trim();
const untranslated = registry.filter((e) => {
  const d = norm(e.desc ?? "");
  return /[\u3040-\u30ff\u4e00-\u9fa5\uac00-\ud7af\u0400-\u04ff]/.test(d) && !descEn[d];
});
if (untranslated.length) {
  console.warn(`missing English descriptions: ${untranslated.length} -> data/desc-en.json`);
  for (const e of untranslated.slice(0, 10)) console.warn(`  ${e.id} ${e.repo}`);
}
